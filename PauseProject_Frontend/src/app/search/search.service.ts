import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class SearchService {
data:any;
  constructor(private http : HttpClient) { }
  getResult(req: string) {
    let URL =`http://localhost:5000/api/search/test/${req}`;
    this.data =  this.http.get(URL) ; 
    return this.data;
  }
}
