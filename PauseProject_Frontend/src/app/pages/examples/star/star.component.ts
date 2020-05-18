import { Observable } from "rxjs";
import { GameService } from "./../../../game/game.service";
import { AuthenticationService } from "src/app/authentication.service";
import { StarService } from "./star.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-star",
  templateUrl: "./star.component.html",
  styleUrls: ["./star.component.scss"],
})
export class StarComponent implements OnInit {
  max: number = 5;
  rating: number = 0;
  constructor(
    private _StarService: StarService,
    private _AuthService: AuthenticationService,
    private _GameService: GameService
  ) {}

  ngOnInit() {}

  resetStars() {
    this.rating = 0;
    //delete item from menu
    this._StarService.deleteStar(
      this._AuthService.userData.uid,
      this._GameService.gameData.id
    );
  }

  rate() {
    this._StarService.setStar(
      this._AuthService.userData.uid,
      this._GameService.gameData.id,
      this.rating
    );
  }
}
