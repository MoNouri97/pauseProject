import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from './movie.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {
public movie;
  constructor(private route: ActivatedRoute, private MovieService : MovieService) { }

  ngOnInit() {
      let id = parseInt(this.route.snapshot.paramMap.get('id'));
  
      this.MovieService.getMovies(id)
      .subscribe(
      data => {this.movie = data;},err => console.error(err),()=>console.log('done') ) }
  
  }


