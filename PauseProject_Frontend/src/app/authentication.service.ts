import { StarService } from "./pages/examples/star/star.service";
import { Observable, BehaviorSubject, zip } from "rxjs";
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
  user: User;
  lastLoginDate;
  createdAtDate;
  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone,
    public _starService: StarService
  ) {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem("user", JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem("user"));
      } else {
        this.userData = null;
        localStorage.setItem("user", null);
        JSON.parse(localStorage.getItem("user"));
      }
    });
    if (localStorage.getItem("user") != null) {
      this.lastLoginDate = +JSON.parse(localStorage.getItem("user"))
        .lastLoginAt;
      this.createdAtDate = +JSON.parse(localStorage.getItem("user")).createdAt;
    }
  }
  SignIn(email, password) {
    return this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        /*this.ngZone.run(() => {
          this.SetUserData(result.user);
        });*/
        this.SetUserData(result.user);
        this.router.navigate(["profile"]);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }
  SignUp(email, password, userName) {
    this.userName = userName;
    return this.afAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        result.user.updateProfile({
          displayName: userName,
        });
        console.log(result.user);
        this.SetUserData(result.user);
        this.router.navigate(["/profile"]);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  collectionCounter(collectionName, user) {
    return this.afs
      .collection(collectionName, (ref) => ref.where("userID", "==", user))
      .valueChanges() as Observable<any>;
  }

  SetUserData(user) {
    let userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    let gamesCounter = this.collectionCounter("gameStars", user.uid);
    let booksCounter = this.collectionCounter("bookStars", user.uid);
    let seriesCounter = this.collectionCounter("serieStars", user.uid);
    let musicsCounter = this.collectionCounter("musicStars", user.uid);
    let moviesCounter = this.collectionCounter("movieStars", user.uid);
    zip(
      gamesCounter,
      booksCounter,
      seriesCounter,
      musicsCounter,
      moviesCounter
    ).subscribe((data) => {
      let total: number = 0;
      for (let d of data) {
        total += d.length;
      }
      user.totalLikes = total;
      let userData: User = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        emailVerified: user.emailVerified,
        fullName: this.userName,
        totalLikes: user.totalLikes,
        description: "no description",
        createdAt: this.createdAtDate,
        lastLoginAt: this.lastLoginDate,
      };
      this.user = userData;
      return userRef.set(this.user, {
        merge: true,
      });
    });
  }
  isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem("user"));
    return user !== null ? true : false;
  }

  getCurrentUser() {
    return this.afAuth.authState;
  }

  userConnected() {
    const user = JSON.parse(localStorage.getItem("user"));
    return user;
  }

  getUserID() {
    //to check user by local storage
    const user = JSON.parse(localStorage.getItem("user"));
    return user.uid;
    //return this.afAuth.authState;
    //to change return type (null) to exception if the user is null
    //return this.user !== undefined ? this.user.uid : null;
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
      //this.userData = null;
      this.user = null;
      localStorage.removeItem("user");
      this.router.navigate(["home"]);
    });
  }
}
