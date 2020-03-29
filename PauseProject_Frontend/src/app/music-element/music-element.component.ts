import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import{MusicElementService} from './music.service';
@Component({
  selector: 'app-music-element',
  templateUrl: './music-element.component.html',
  styleUrls: ['./music-element.component.scss']
})
export class MusicElementComponent implements OnInit {

  constructor(private route: ActivatedRoute,private MusicElementService : MusicElementService ) { }

  public music;
  ngOnInit() {
      let id = parseInt(this.route.snapshot.paramMap.get('id'));
      
      this.MusicElementService.getMusic(id)
      .subscribe(
      data => {  this.music = data;},err => console.error(err),()=>console.log('done') ) }
  }
