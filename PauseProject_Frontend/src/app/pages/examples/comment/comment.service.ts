import { AuthenticationService } from "./../../../authentication.service";
import { Observable, BehaviorSubject, Subject } from "rxjs";
import { GameService } from "./../../../game/game.service";
import { Injectable } from "@angular/core";
import { AngularFirestore } from "angularfire2/firestore";
import * as firebase from "firebase";

export interface Comment {
  collectionID: number;
  commentID: number;
  comment: string;
  userID: string;
  userName: string;
}

@Injectable({
  providedIn: "root",
})
export class CommentService {
  commentObservable;
  public _comment: Comment;
  public commentRef;
  private collectionIDSubject = new BehaviorSubject(0);
  public collectionIDObservable;
  collectionID: number;
  constructor(
    private afs: AngularFirestore,
    private _GameService: GameService,
    private _AuthService: AuthenticationService
  ) {
    this.collectionIDSubject.asObservable().subscribe((data) => {
      this.collectionID = data;
    });
    /*
    this.commentRef = this.afs.collection("gameComments", (ref) =>
      ref.where("collectionID", "==", this.collectionID)
    );
    this.commentObservable = this.commentRef.valueChanges();*/
  }

  getComments(gameID: number) {
    return this.afs
      .collection("gameComments", (ref) =>
        ref.where("collectionID", "==", gameID)
      )
      .valueChanges();
  }
  setCollectionID(id: number) {
    this.collectionIDSubject.next(id);
  }

  getCommentObservable() {
    return this.commentObservable;
  }

  setComment(comment, userID, userName) {
    let collectionID = this._GameService.gameData.id;
    let commentID = Date.now();
    this._comment = { collectionID, commentID, comment, userID, userName };

    const commentPath = `gameComments/${collectionID}_${commentID}`;
    return this.afs.doc(commentPath).set(this._comment);
  }
  deleteComment(userID, commentID) {
    let gameID = this._GameService.gameData.id;
    if (userID == this._AuthService.getUserID()) {
      const commentPath = `gameComments/${gameID}_${commentID}`;
      //this result is expect to be different than false
      return this.afs.doc(commentPath).delete();
    } else {
      return false;
    }
  }
}
