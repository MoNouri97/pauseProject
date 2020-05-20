import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class SerieService {
  serie: any;
  serieData: any;
  constructor(private http: HttpClient) {}
  getSerie(i: any): any {
    let URL = `http://localhost:5000/api/serie/${i}`;
    this.serie = this.http.get(URL);
    return this.serie;
  }
  getSerieObservable() {
    return this.serie;
  }
}
