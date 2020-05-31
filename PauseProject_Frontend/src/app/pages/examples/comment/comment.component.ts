import { StarService } from "./../star/star.service";
import { GameService } from "./../../../game/game.service";
import { User } from "./../../../user";
import { CommentService } from "./comment.service";
import { Component, OnInit, Input, Injector } from "@angular/core";
import { AuthenticationService } from "src/app/authentication.service";
import { BookService } from "src/app/book/book.service";
import { MusicElementService } from "src/app/music-element/music.service";
import { MovieService } from "src/app/movie/movie.service";
import { SerieService } from "src/app/serie/serie.service";

@Component({
  selector: "app-comment",
  templateUrl: "./comment.component.html",
  styleUrls: ["./comment.component.scss"],
})
export class CommentComponent implements OnInit {
  @Input() collectionName: string;
  service;
  serviceID;
  gameService: GameService;
  bookService: BookService;
  musicService: MusicElementService;
  movieService: MovieService;
  serieService: SerieService;
  comment = "";
  comments = [];
  showdelete: boolean;
  userNotConnected: boolean;
  constructor(
    private _AuthService: AuthenticationService,
    private _CommentService: CommentService,
    private injector: Injector
  ) {}

  ngOnInit() {
    if (this._AuthService.userConnected() == null) {
      this.userNotConnected = true;
    } else {
      this.userNotConnected = false;
    }

    this._CommentService.setCollectionName(this.collectionName);
    if (this.collectionName === "game") {
      this.service = this.gameService = <GameService>(
        this.injector.get(GameService)
      );
      this.service.game.subscribe((data) => {
        this.serviceID = data.id;
      });

      this.service.getGameObservable().subscribe((data) => {
        this._CommentService.getComments(data.id).subscribe((data) => {
          this.comments = data;
        });
      });
    } else if (this.collectionName === "book") {
      this.service = this.bookService = <BookService>(
        this.injector.get(BookService)
      );
      this.service.book.subscribe((data) => (this.serviceID = data[0].data.id));

      this.service.getBookObservable().subscribe((data) => {
        this._CommentService.getComments(data[0].data.id).subscribe((data) => {
          this.comments = data;
        });
      });
    } else if (this.collectionName === "music") {
      this.service = this.musicService = <MusicElementService>(
        this.injector.get(MusicElementService)
      );

      this.service.music.subscribe(
        (data) => (this.serviceID = data[0].musicID)
      );

      this.service.getMusicObservable().subscribe((data) => {
        this._CommentService.getComments(data[0].musicID).subscribe((data) => {
          this.comments = data;
        });
      });
    } else if (this.collectionName === "movie") {
      this.service = this.movieService = <MovieService>(
        this.injector.get(MovieService)
      );
      this.service.movie.subscribe((data) => {
        this.serviceID = data.id;
      });

      this.service.getMovieObservable().subscribe((data) => {
        this._CommentService.getComments(data.id).subscribe((data) => {
          this.comments = data;
        });
      });
    } else if (this.collectionName === "serie") {
      this.service = this.serieService = <SerieService>(
        this.injector.get(SerieService)
      );
      this.service.serie.subscribe(
        (data) => (this.serviceID = data[0].data.id)
      );

      this.service.getSerieObservable().subscribe((data) => {
        this._CommentService.getComments(data[0].data.id).subscribe((data) => {
          this.comments = data;
        });
      });
    }
    this._AuthService.fetch(this._AuthService.getUserID()).subscribe((data) => {
      this._AuthService.setUserName((data[0] as User).displayName);
    });
  }

  postComment() {
    console.log(this.serviceID);
    let username;
    if (
      this._AuthService.user &&
      this._AuthService.user.displayName != null &&
      this._AuthService.user.displayName != undefined
    ) {
      username = this._AuthService.user.displayName;
    } else if (
      this._AuthService.user &&
      this._AuthService.user.fullName != null &&
      this._AuthService.user.fullName != undefined
    ) {
      username = this._AuthService.user.fullName;
    } else if (this._AuthService.getUserName() != null) {
      username = this._AuthService.getUserName();
    } else {
      username = "";
    }
    this._CommentService.setComment(
      this.comment,
      this._AuthService.getUserID(),
      username,
      this.serviceID
    );
    this.comments.push(username + " : " + this.comment);
    this.comment = "";
  }
  showDelete(index: number) {
    if (this._AuthService.userConnected() == null) {
      return false;
    }
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
      this.comments[index].commentID,
      this.serviceID
    );
  }
}
