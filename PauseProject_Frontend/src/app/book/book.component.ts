import { Component, OnInit } from '@angular/core';
import {ActivatedRoute , Router} from '@angular/router';
import { BookService } from './book.service';
@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {

constructor(private route: ActivatedRoute,private _BooksService : BookService) { }
public bookid;
public book;
  ngOnInit() {
      let id = parseInt(this.route.snapshot.paramMap.get('id'));
      this.bookid = id;
      this._BooksService.getBooks(id)
      .subscribe(
      data => {  this.book = data;},err => console.error(err),()=>console.log('done') ) }
  }


  


