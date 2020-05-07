import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MusicElementService {

  data1 : any;


  getMusic(i: any) :any{
  
  
     
     let URL  =`http://localhost:5000/api/Music/${i} `;
    
    this.data1 =  this.http.get(URL) ;
    
    
     return this.data1;
  }
    
    constructor(private http : HttpClient) { }
}


