import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class GameService {
  game: any; //observable on the game
  gameData: any; // Actual game json object
  constructor(private http: HttpClient) {}
  getGame(j: number): any {
    let URL = `http://localhost:5000/api/Game/${j} `;

    this.game = this.http.get(URL);
    return this.game;
  }
}
