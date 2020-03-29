import { Component, OnInit } from '@angular/core';
import {ActivatedRoute , Router} from '@angular/router';
import { GameService } from './game.service';
@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
public id;
public index;
public game;
  constructor(private route: ActivatedRoute,private _GameService : GameService) { }

  ngOnInit() {
  
  let id = parseInt(this.route.snapshot.paramMap.get('id'));
  let index = parseInt(this.route.snapshot.paramMap.get('index'));
  this._GameService.getGame(id,index)
.subscribe(
data => {  this.game = data;},err => console.error(err),()=>console.log('done') ) }
  

}


