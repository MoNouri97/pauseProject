import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import {Books} from './books';
@Injectable({
  providedIn: 'root'
})
export class BooksService {
//private _url: string ="/assets/data/books.json"
private _url: string ="https://www.googleapis.com/books/v1/volumes?q=donia&key=AIzaSyB2xuV04xn61GB5TIzB0mfKUPHIRH6K_Fc";
constructor(private http : HttpClient) {
    
   }
getBooks() : Observable<Books[]> {
  return this.http.get<Books[]>(this._url);
}
}
