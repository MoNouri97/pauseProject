import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {SerieService} from './serie.service';
@Component({
  selector: 'app-serie',
  templateUrl: './serie.component.html',
  styleUrls: ['./serie.component.scss']
})
export class SerieComponent implements OnInit {
public serie;
  constructor(private route: ActivatedRoute,private SerieService : SerieService) { }

  ngOnInit() {
    let id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.SerieService.getSerie(id)
      .subscribe(
      data => {  this.serie = data;},err => console.error(err),()=>console.log('done') ) }
 
 
    }


