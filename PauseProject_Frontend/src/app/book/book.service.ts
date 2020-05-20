import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
@Injectable({
  providedIn: "root",
})
export class BookService {
  book: any;
  bookData: any;
  constructor(private http: HttpClient) {}
  getBooks(i: any): any {
    let URL = `http://localhost:5000/api/book/${i}`;
    this.book = this.http.get(URL);
    return this.book;
  }
  getBookObservable() {
    return this.book;
  }
}
