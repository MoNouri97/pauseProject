import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class RecommendationsService {
  recommendations: any;

  getGames(userID): any {
    let URL = `http://localhost:5000/api/Recommender/${userID} `;

    this.recommendations = this.http.get(URL);

    return this.recommendations;
  }

  constructor(private http: HttpClient) {}
}
