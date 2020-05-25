import { GameService } from "./../../../game/game.service";
import { User } from "./../../../user";
import { CommentService } from "./comment.service";
import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "src/app/authentication.service";

@Component({
  selector: "app-comment",
  templateUrl: "./comment.component.html",
  styleUrls: ["./comment.component.scss"],
})
export class CommentComponent implements OnInit {
  comment = "";
  comments = [];
  showdelete: boolean;

  constructor(
    private _AuthService: AuthenticationService,
    private _CommentService: CommentService,
    private _GameService: GameService
  ) {}

  ngOnInit() {
    this._GameService.getGameObservable().subscribe((data) => {
      this._CommentService.getComments(data.id).subscribe((data) => {
        this.comments = data;
      });
    });

    this._AuthService.fetch(this._AuthService.getUserID()).subscribe((data) => {
      this._AuthService.setUserName((data[0] as User).displayName);
    });
  }

  postComment() {
    this._CommentService.setComment(
      this.comment,
      this._AuthService.getUserID(),
      this._AuthService.getUserName()
    );
    this.comments.push(this._AuthService.getUserName() + " : " + this.comment);
    this.comment = "";
  }
  showDelete(index: number) {
    if (this.comments[index].userID == this._AuthService.getUserID()) {
      this.showdelete = true;
    } else {
      this.showdelete = false;
    }
    return this.showdelete;
  }
  deleteComment(index: number) {
    this._CommentService.deleteComment(
      this.comments[index].userID,
      this.comments[index].commentID
    );
  }
}
