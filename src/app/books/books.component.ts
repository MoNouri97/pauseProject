import { Component, OnInit } from '@angular/core';
import { BooksService } from '../books.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {
public books = [];
  constructor(private _BooksService : BooksService) { }

  ngOnInit() {
    this._BooksService.getBooks()
    .subscribe( data => this.books = data)  }

}
