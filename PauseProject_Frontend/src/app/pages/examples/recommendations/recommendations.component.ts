import { GameService } from "./../../../game/game.service";
import { RecommendationsService } from "./recommendations.service";
import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "src/app/authentication.service";

@Component({
  selector: "app-recommendations",
  templateUrl: "./recommendations.component.html",
  styleUrls: ["./recommendations.component.scss"],
})
export class RecommendationsComponent implements OnInit {
  gameIDs;
  games = [];
  constructor(
    _recommendation: RecommendationsService,
    auth: AuthenticationService,
    public _game: GameService
  ) {
    this.gameIDs = _recommendation.getGames(auth.getUserID());
  }

  ngOnInit() {
    this.gameIDs.subscribe((data) => {
      //data as int[]
      for (let i in data) {
        this._game.getGame(data[i]).subscribe((instance) => {
          this.games.push(instance);
        });
      }
    });
  }
}
