import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { MovieService } from "./movie.service";

@Component({
  selector: "app-movie",
  templateUrl: "./movie.component.html",
  styleUrls: ["./movie.component.scss"],
})
export class MovieComponent implements OnInit {
  public movie;
  public movieid;
  constructor(
    private route: ActivatedRoute,
    private _MovieService: MovieService
  ) {}

  ngOnInit() {
    let id = parseInt(this.route.snapshot.paramMap.get("id"));
    this._MovieService.getMovies(id).subscribe(
      (data) => {
        this._MovieService.movieData = this.movie = data;
        //console.log(this.movie);
      },
      (err) => console.error(err)
    );
  }
}
