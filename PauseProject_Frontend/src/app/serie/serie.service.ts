import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SerieService {
  data1 : any;
  constructor(private http : HttpClient) { }
  getSerie(i: any) : any {
    let URL =`http://localhost:5000/api/serie/${i}`;
    this.data1 =  this.http.get(URL) ;
      
      
    return this.data1;
  }
}
