import { Observable, BehaviorSubject } from "rxjs";
import {
  AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection,
} from "angularfire2/firestore";
import { Injectable, Input } from "@angular/core";
export interface Star {
  collectionID: number;
  userID: string;
  value: number;
}

@Injectable()
export class StarService {
  public collectionNameString: string;
  public collectionName = new BehaviorSubject("");
  collectionNameObservable = this.collectionName.asObservable();

  constructor(private afs: AngularFirestore) {
    this.collectionNameObservable.subscribe((data) => {
      this.collectionNameString = data;
    });
  }
  getUserStars(userID) {
    const starsRef = this.afs.collection(
      this.collectionNameString + "Stars",
      (ref) => ref.where("userID", "==", userID)
    );
    return starsRef.valueChanges();
  }

  getUserStar(userID, collectionID) {
    const starsRef = this.afs.collection(
      this.collectionNameString + "Stars",
      (ref) =>
        ref
          .where("userID", "==", userID)
          .where("collectionID", "==", collectionID)
    );
    return starsRef.valueChanges();
  }

  setStar(userID, collectionID, value) {
    let star: Star = { userID, collectionID, value };
    const starPath =
      this.collectionNameString + `Stars/${star.userID}_${star.collectionID}`;
    return this.afs.doc(starPath).set(star);
  }

  deleteStar(userID, collectionID) {
    const starPath =
      this.collectionNameString + `Stars/${userID}_${collectionID}`;
    return this.afs.doc(starPath).delete();
  }

  setCollectionName(collectionName: string) {
    this.collectionName.next(collectionName);
  }
}
