import { Component, OnInit } from '@angular/core';
import { GamesService } from './games.service';
import {ActivatedRoute , Router} from '@angular/router';


@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {
public games=[];

items = [];
pageOfItems: Array<any>;
id;

  constructor( private router : Router ,private _GamesService : GamesService, private activatedRoute: ActivatedRoute ) { 
}

  ngOnInit() {

    this._GamesService.getGames(1)
    .subscribe(
    data => {  this.games = data;},err => console.error(err),()=>console.log('done') 
     ) }

     pageChange(ind) {
      
      this._GamesService.getGames(ind)
      .subscribe(
      data => {  this.games = data;},err => console.error(err),()=>console.log('done') 
       ) }
    
       onSelect(id,game) {
        this.router.navigate(['/game',id, game.gameID]);
       }
}
