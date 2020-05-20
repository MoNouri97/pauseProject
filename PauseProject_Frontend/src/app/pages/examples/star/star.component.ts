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
  service;
  serviceID;

  constructor(
    private _StarService: StarService,
    private _AuthService: AuthenticationService,
    private injector: Injector
  ) {}

  ngOnInit() {
    this._StarService.setCollectionName(this.collectionName);

    if (this.collectionName === "game") {
      this.gameService = <GameService>this.injector.get(GameService);
      this.service = this.gameService;
      this.service.game.subscribe((data) => (this.serviceID = data.id));

      this.service.getGameObservable().subscribe((data) => {
        this._StarService
          .getUserStar(this._AuthService.getUserID(), data.id)
          .subscribe((data) => {
            if (data.length != 0) this.rating = (data[0] as Star).value;
          });
      });
    } else if (this.collectionName === "book") {
      this.bookService = <BookService>this.injector.get(BookService);
      this.service = this.bookService;
      this.service.book.subscribe((data) => (this.serviceID = data[0].data.id));

      this.service.getBookObservable().subscribe((data) => {
        this._StarService
          .getUserStar(this._AuthService.getUserID(), data[0].data.id)
          .subscribe((data) => {
            if (data.length != 0) this.rating = (data[0] as Star).value;
          });
      });
    }
  }

  resetStars() {
    this.rating = 0;
    //delete item from menu
    this._StarService.deleteStar(
      this._AuthService.userData.uid,
      this.serviceID
    );
  }

  rate() {
    this._StarService.setStar(
      this._AuthService.userData.uid,
      this.serviceID,
      this.rating
    );
  }
}
