import {
  AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection,
} from "angularfire2/firestore";
import { Injectable } from "@angular/core";

export interface Star {
  gameID: number;
  userID: string;
  value: number;
}

@Injectable()
export class StarService {
  constructor(private afs: AngularFirestore) {}
  getUserStars(userID) {
    const starsRef = this.afs.collection("gameStars", (ref) =>
      ref.where("userID", "==", userID)
    );
    return starsRef.valueChanges();
  }

  setStar(userID, gameID, value) {
    let star: Star = { userID, gameID, value };
    const starPath = `gameStars/${star.userID}_${star.gameID}`;
    return this.afs.doc(starPath).set(star);
  }

  deleteStar(userID, gameID) {
    const starPath = `gameStars/${userID}_${gameID}`;
    return this.afs.doc(starPath).delete();
  }
}
