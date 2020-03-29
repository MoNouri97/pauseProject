import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GamesService {
data1 : any;


getGames(i: any) :any{



	 let URL  =`http://localhost:5000/api/Games/${i} `;
	
	this.data1 =  this.http.get(URL) ;
	
	
	 return this.data1;
}
  
  constructor(private http : HttpClient) { }
}