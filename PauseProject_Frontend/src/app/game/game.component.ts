import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { GameService } from "./game.service";
@Component({
  selector: "app-game",
  templateUrl: "./game.component.html",
  styleUrls: ["./game.component.scss"],
})
export class GameComponent implements OnInit {
  public id;
  public index;
  public game;
  loading: boolean;

  constructor(
    private route: ActivatedRoute,
    private _GameService: GameService
  ) {}

  ngOnInit() {
    this.loading = true;
    let id = parseInt(this.route.snapshot.paramMap.get("id"));
    this._GameService.getGame(id).subscribe(
      (data) => {
        this.game = data;
        this._GameService.gameData = this.game;
        this.loading = false;
      },
      (err) => console.error(err),
      () => console.log("done")
    );
  }
}
