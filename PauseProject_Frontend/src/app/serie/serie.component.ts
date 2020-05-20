import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { SerieService } from "./serie.service";
@Component({
  selector: "app-serie",
  templateUrl: "./serie.component.html",
  styleUrls: ["./serie.component.scss"],
})
export class SerieComponent implements OnInit {
  public serie;
  public serieid;
  constructor(
    private route: ActivatedRoute,
    private _SerieService: SerieService
  ) {}

  ngOnInit() {
    this.serieid = parseInt(this.route.snapshot.paramMap.get("id"));
    this._SerieService.getSerie(this.serieid).subscribe(
      (data) => {
        this._SerieService.serieData = this.serie = data;
      },
      (err) => console.error(err)
    );
  }
}
