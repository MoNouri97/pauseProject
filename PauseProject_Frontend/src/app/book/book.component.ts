import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BookService } from "./book.service";
@Component({
  selector: "app-book",
  templateUrl: "./book.component.html",
  styleUrls: ["./book.component.scss"],
})
export class BookComponent implements OnInit {
  public bookid;
  public book;

  constructor(
    private route: ActivatedRoute,
    private _BooksService: BookService
  ) {}
  ngOnInit() {
    this.bookid = parseInt(this.route.snapshot.paramMap.get("id"));

    this._BooksService.getBooks(this.bookid).subscribe(
      (data) => {
        this._BooksService.bookData = this.book = data[0].data.attributes;
      },
      (err) => console.error(err)
    );
  }
}
