import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
@Injectable({
  providedIn: "root",
})
export class SeriesService {
  data1: any;
  constructor(private http: HttpClient) {}
  getSeries(i: any): any {
    let URL = `http://localhost:5000/api/anime/${i}`;
    this.data1 = this.http.get(URL);

    return this.data1;
  }
}
