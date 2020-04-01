import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  data1 : any;
  constructor(private http : HttpClient) { }
  getGame(i: any, j: any) :any{



    let URL  =`http://localhost:5000/api/Game/${i}/${j} `;
   
   this.data1 =  this.http.get(URL) ;
   
   
    return this.data1;
 }
}
