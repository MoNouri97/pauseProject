import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {Books} from './books';
const httpOptions= {
  headers: new HttpHeaders()
};
@Injectable({
  providedIn: 'root'
})
export class BooksService {
//private _url: string ="/assets/data/books.json"
data1 : any;
constructor(private http : HttpClient) { }
getBooks(i: any) : any {
  let URL =`http://localhost:5000/api/books/${i}`;
  this.data1 =  this.http.get(URL,httpOptions) ;
    
    
  return this.data1;
}
}
