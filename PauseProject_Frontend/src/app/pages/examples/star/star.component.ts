import { SerieService } from "./../../../serie/serie.service";
import { MovieService } from "./../../../movie/movie.service";
import { MusicElementService } from "./../../../music-element/music.service";
import { BookService } from "./../../../book/book.service";
import { Observable } from "rxjs";
import { GameService } from "./../../../game/game.service";
import { AuthenticationService } from "src/app/authentication.service";
import { StarService, Star } from "./star.service";
import { Component, OnInit, Input, Injector } from "@angular/core";

@Component({
  selector: "app-star",
  templateUrl: "./star.component.html",
  styleUrls: ["./star.component.scss"],
})
export class StarComponent implements OnInit {
  @Input() collectionName: string;
  max: number = 5;
  rating: number = 0;
  gameService: GameService;
  bookService: BookService;
  musicService: MusicElementService;
  movieService: MovieService;
  serieService: SerieService;
  service;
  serviceID;
  userNotConnected: boolean;

  constructor(
    private _StarService: StarService,
    private _AuthService: AuthenticationService,
    private injector: Injector
  ) {}

  ngOnInit() {
    if (this._AuthService.userConnected() == null) {
      this.userNotConnected = true;
    } else {
      this.userNotConnected = false;
    }
    this._StarService.setCollectionName(this.collectionName);
    if (this.collectionName === "game") {
      this.service = this.gameService = <GameService>(
        this.injector.get(GameService)
      );
      this.service.game.subscribe((data) => (this.serviceID = data.id));

      this.service.getGameObservable().subscribe((data) => {
        this._StarService
          .getUserStar(this._AuthService.getUserID(), data.id)
          .subscribe((data) => {
            if (data.length != 0) this.rating = (data[0] as Star).value;
          });
      });
    } else if (this.collectionName === "book") {
      this.service = this.bookService = <BookService>(
        this.injector.get(BookService)
      );
      this.service.book.subscribe((data) => (this.serviceID = data[0].data.id));

      this.service.getBookObservable().subscribe((data) => {
        this._StarService
          .getUserStar(this._AuthService.getUserID(), data[0].data.id)
          .subscribe((data) => {
            if (data.length != 0) this.rating = (data[0] as Star).value;
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
        this._StarService
          .getUserStar(this._AuthService.getUserID(), data[0].musicID)
          .subscribe((data) => {
            if (data.length != 0) this.rating = (data[0] as Star).value;
          });
      });
    } else if (this.collectionName === "movie") {
      this.service = this.movieService = <MovieService>(
        this.injector.get(MovieService)
      );
      this.service.movie.subscribe((data) => (this.serviceID = data[0].id));

      this.service.getMovieObservable().subscribe((data) => {
        this._StarService
          .getUserStar(this._AuthService.getUserID(), data[0].id)
          .subscribe((data) => {
            if (data.length != 0) this.rating = (data[0] as Star).value;
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
        this._StarService
          .getUserStar(this._AuthService.getUserID(), data[0].data.id)
          .subscribe((data) => {
            if (data.length != 0) this.rating = (data[0] as Star).value;
          });
      });
    }
  }

  resetStars() {
    if (this.userNotConnected) {
      return;
    }
    this.rating = 0;
    //delete item from menu
    this._StarService.deleteStar(
      this._AuthService.userData.uid,
      this.serviceID
    );
  }

  rate() {
    if (this.userNotConnected) {
      return;
    }
    this._StarService.setStar(
      this._AuthService.userData.uid,
      this.serviceID,
      this.rating
    );
  }
}
