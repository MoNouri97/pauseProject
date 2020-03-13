import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Games} from './games';
import { HttpClient,HttpHeaders } from '@angular/common/http';
const httpOptions = {
	headers: new HttpHeaders({ "x-rapidapi-host": "rawg-video-games-database.p.rapidapi.com",
	"x-rapidapi-key": "b4ffabe329msh6a4570ddd8934eap1fd831jsne57777e93e67" })
};
@Injectable({
  providedIn: 'root'
})
export class GamesService {

private _url: string ="";
  getGame() : Observable<Games[]> {
    fetch("https://rawg-video-games-database.p.rapidapi.com/games", {
	"method": "GET",
	"headers": {
		
	}
})
.then(_url => {
	console.log(_url);
})
.catch(err => {
	console.log(err);
});
    return this.http.get<Games[]>(this._url);
}
getGames() :any{

	return this.http.get('https://rawg-video-games-database.p.rapidapi.com/games',httpOptions);

}
  
  constructor(private http : HttpClient) { }
}
