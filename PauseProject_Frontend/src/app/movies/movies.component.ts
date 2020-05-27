import { Component, OnInit } from '@angular/core';
import { MoviesService } from './movies.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {

  
  public movies=[];
  page =1;

  add;
  id;
  constructor(private router : Router,private _MoviesService : MoviesService, private activatedRoute: ActivatedRoute ) { }

  ngOnInit() {
     //this.add=1;
    
    this.activatedRoute.params.subscribe(paramsId => {
      this.id = paramsId.id; });
      this.pageChanged(1); }
  
       pageChange(ind) {
        
       /* var ind = index.text;
        
        console.log(ind);

        if(typeof(ind) == 'undefined') {
          console.log(index);
          var text =String(index);
         // console.log(typeof text);
          console.log( text);
          ind = text.replace('<span aria-hidden=​"true">','');
          ind = ind.replace('</span>​','');
          console.log(ind);
        }
        
        if (ind.localeCompare("»") ==0 ) {
          ind = parseInt(this.add) + 1 ;
        }
        else if (ind.includes("«")) {
          ind = parseInt(this.add)  - 1 ;

        }
        else if(ind.localeCompare("»»") == 0) {
          ind= "50";

        }
        else if(ind.localeCompare("««") == 0) {
          ind ="1";
        }
        else {
         ind= ind.trim();
         ind = ind.replace(' (current)','');

        }
      
      */
     
        
         this.add = ind;
        }
         
        pageChanged(ind){
         
          console.log(ind);
     
        this._MoviesService.getMovies(ind)
        .subscribe(
        data => {  this.movies = data;},err => console.error(err),()=>console.log('done') 
         ) 
        }
         
       onSelect(movie) {
          this.router.navigate(['/movie', movie]);

         }
         

         
        }
