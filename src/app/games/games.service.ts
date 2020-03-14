import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
const httpOptions = {
	headers: new HttpHeaders({ "x-rapidapi-host": "rawg-video-games-database.p.rapidapi.com",
	"x-rapidapi-key": "b4ffabe329msh6a4570ddd8934eap1fd831jsne57777e93e67" })
};
@Injectable({
  providedIn: 'root'
})
export class GamesService {
data1 : any;


getGames(i: any) :any{


	 let j = 2;
	 let URL  =`https://rawg-video-games-database.p.rapidapi.com/games?page=${i} `;
	
	this.data1 =  this.http.get(URL,httpOptions) ;
	
	
	 return this.data1;
}
  
  constructor(private http : HttpClient) { }
}