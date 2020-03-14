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

  constructor(private _GamesService : GamesService, private activatedRoute: ActivatedRoute ) { 
}

  ngOnInit() {
    this.activatedRoute.params.subscribe(paramsId => {
      this.id = paramsId.id;
  });
   this.items = Array(150).fill(0).map((x, i) => ({ id: (i + 1), name: `Item ${i + 1}`}));


    this._GamesService.getGames(this.id)
    .subscribe(
    data => {  this.games = data;},err => console.error(err),()=>console.log('done') 
     ) }

     onChangePage(pageOfItems: Array<any>) {
      // update current page of items
      this.pageOfItems = pageOfItems;
  }
    

}
