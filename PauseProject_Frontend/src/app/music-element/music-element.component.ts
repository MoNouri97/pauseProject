import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { MusicElementService } from "./music.service";
@Component({
  selector: "app-music-element",
  templateUrl: "./music-element.component.html",
  styleUrls: ["./music-element.component.scss"],
})
export class MusicElementComponent implements OnInit {
  public music;
  public musicid;

  constructor(
    private route: ActivatedRoute,
    private _MusicService: MusicElementService
  ) {}
  ngOnInit() {
    this.musicid = parseInt(this.route.snapshot.paramMap.get("id"));

    this._MusicService.getMusic(this.musicid).subscribe(
      (data) => {
        this._MusicService.musicData = this.music = data;
      },
      (err) => console.error(err)
    );
  }
}
