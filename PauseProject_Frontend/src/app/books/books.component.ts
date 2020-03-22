import { Component, OnInit } from '@angular/core';
import { BooksService } from './books.service';
import {ActivatedRoute , Router} from '@angular/router';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {
public books = [];
items = [];
pageOfItems: Array<any>;
id;
  constructor(private _BooksService : BooksService, private activatedRoute: ActivatedRoute ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(paramsId => {
      this.id = paramsId.id; });
      this._BooksService.getBooks(1)
      .subscribe(
      data => {  this.books = data;},err => console.error(err),()=>console.log('done') 
       ) }
  
       pageChange(ind) {
        
        this._BooksService.getBooks(ind)
        .subscribe(
        data => {  this.books = data;},err => console.error(err),()=>console.log('done') 
         ) }


}
