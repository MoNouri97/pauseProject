import { Component, OnInit } from '@angular/core';
import { GamesService } from '../games.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {
public games=[];
  constructor(private _GamesService : GamesService) { }

  ngOnInit() {
    this._GamesService.getGames()
    .subscribe(
    data => { this.games = data;console.log(data);},err => console.error(err),()=>console.log('done') 
     ) }

}
