import { Component, OnInit } from '@angular/core';
import {ActivatedRoute , Router} from '@angular/router';
import { MusicService } from './music.service';
@Component({
  selector: 'app-music',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.scss']
})
export class MusicComponent implements OnInit {
  public music=[];
  page=1;

  items = [];
  pageOfItems: Array<any>;
  id;
  constructor(private router : Router,private _MusicService : MusicService, private activatedRoute: ActivatedRoute ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(paramsId => {
      this.id = paramsId.id; });
      this.pageChanged(1); }
  
       pageChanged(ind) {
        
        this._MusicService.getMusic(ind)
        .subscribe(
        data => {  this.music = data;},err => console.error(err),()=>console.log('done') 
         ) }

         onSelect(music) {
          this.router.navigate(['/music/item', music]);

         }

        }