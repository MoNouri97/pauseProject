import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class MusicElementService {
  music: any;
  musicData: any;
  constructor(private http: HttpClient) {}

  getMusic(i: any): any {
    let URL = `http://localhost:5000/api/Music/${i} `;
    this.music = this.http.get(URL);
    return this.music;
  }

  getMusicObservable() {
    return this.music;
  }
}
