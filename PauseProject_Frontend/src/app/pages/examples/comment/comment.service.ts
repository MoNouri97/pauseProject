import { StarService } from "./../star/star.service";
import { AuthenticationService } from "./../../../authentication.service";
import { Observable, BehaviorSubject, Subject } from "rxjs";
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

  public collectionNameString: string;
  public collectionName = new BehaviorSubject("");
  collectionNameObservable = this.collectionName.asObservable();
  constructor(
    private afs: AngularFirestore,
    private _AuthService: AuthenticationService,
    public _starService: StarService
  ) {
    this.collectionIDSubject.asObservable().subscribe((data) => {
      this.collectionID = data;
    });
    this.collectionNameObservable.subscribe((data) => {
      this.collectionNameString = data;
    });
  }

  getComments(collectionID: number) {
    return this.afs
      .collection(this.collectionNameString + "Comments", (ref) =>
        ref.where("collectionID", "==", collectionID)
      )
      .valueChanges();
  }

  setCollectionID(id: number) {
    this.collectionIDSubject.next(id);
  }

  getCommentObservable() {
    return this.commentObservable;
  }

  setComment(comment, userID, userName, collectionID) {
    //let collectionID = this._GameService.gameData.id;
    let commentID = Date.now();
    this._comment = { collectionID, commentID, comment, userID, userName };

    const commentPath =
      this.collectionNameString + `Comments/${collectionID}_${commentID}`;
    return this.afs.doc(commentPath).set(this._comment);
  }
  deleteComment(userID, commentID, collectionID) {
    //let gameID = this._GameService.gameData.id;
    if (userID == this._AuthService.getUserID()) {
      const commentPath =
        this.collectionNameString + `Comments/${collectionID}_${commentID}`;
      //this result is expect to be different than false
      return this.afs.doc(commentPath).delete();
    } else {
      return false;
    }
  }

  setCollectionName(collectionName: string) {
    this.collectionName.next(collectionName);
  }
}
