import { Component, OnInit } from '@angular/core';
import { BooksService } from './books.service';
import {ActivatedRoute , Router} from '@angular/router';
import {BookComponent} from  '../book/book.component';
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
show = false;
  constructor(private _BooksService : BooksService, private activatedRoute: ActivatedRoute, private router : Router ) { }

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

onSelect(book) {
  this.router.navigate(['/book', book.id]);
  //this._BookComponent.setInfo(book);



}
}
