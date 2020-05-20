import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class MovieService {
  movie: any;
  movieData: any;
  constructor(private http: HttpClient) {}
  getMovies(i: any): any {
    let URL = `http://localhost:5000/api/Movie/${i} `;
    this.movie = this.http.get(URL);
    return this.movie;
  }
  getMovieObservable() {
    return this.movie;
  }
}
