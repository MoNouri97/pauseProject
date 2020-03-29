import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  data1 : any;
  getMovies(i: any) :any{
  
     let URL  =`http://localhost:5000/api/Movies/${i} `;
    
    this.data1 =  this.http.get(URL) ;
    
    
     return this.data1;
  }
    

  constructor(private http : HttpClient) { }

}
