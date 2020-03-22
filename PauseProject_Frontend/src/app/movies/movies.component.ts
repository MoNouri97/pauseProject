import { Component, OnInit } from '@angular/core';
import { MoviesService } from './movies.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  public movies=[];

  items = [];
  pageOfItems: Array<any>;
  id;
  constructor(private _MoviesService : MoviesService, private activatedRoute: ActivatedRoute ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(paramsId => {
      this.id = paramsId.id; });
      this._MoviesService.getMovies(1)
      .subscribe(
      data => {  this.movies = data;},err => console.error(err),()=>console.log('done') 
       ) }
  
       pageChange(ind) {
        
        this._MoviesService.getMovies(ind)
        .subscribe(
        data => {  this.movies = data;},err => console.error(err),()=>console.log('done') 
         ) }
  

}
