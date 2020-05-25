import { Observable } from "rxjs";
import { Injectable, NgZone } from "@angular/core";
import { auth } from "firebase/app";
import { AngularFireAuth } from "@angular/fire/auth";
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from "@angular/fire/firestore";
import { Router } from "@angular/router";
import { User } from "./user";

@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  userData: any;
  userName: any;
  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone
  ) {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem("user", JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem("user"));
      } else {
        localStorage.setItem("user", null);
        JSON.parse(localStorage.getItem("user"));
      }
    });
  }
  SignIn(email, password) {
    return this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(["profile"]);
        });
        this.SetUserData(result.user);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }
  SignUp(email, password, userName) {
    return this.afAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        result.user.updateProfile({
          displayName: userName,
        });
        /* Call the SendVerificaitonMail() function when new user sign 
        up and returns promise */
        //this.SendVerificationMail();
        this.SetUserData(result.user);
        this.router.navigate(["/profile"]);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }
  SetUserData(user) {
    let userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );

    let userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: this.userData.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }
  isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem("user"));
    return user !== null ? true : false;
  }
  getUserID(): string {
    const user = JSON.parse(localStorage.getItem("user"));
    return user !== null ? user.uid : false;
  }
  fetch(userID) {
    let user = this.afs.collection("users", (ref) =>
      ref.where("uid", "==", userID)
    );
    return user.valueChanges();
  }
  getUserName(): string {
    return this.userName;
  }
  setUserName(name: string) {
    this.userName = name;
  }

  SignOut() {
    return this.afAuth.auth.signOut().then(() => {
      localStorage.removeItem("user");
      this.router.navigate(["home"]);
    });
  }
}
