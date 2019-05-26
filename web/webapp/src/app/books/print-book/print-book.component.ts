import {Component, OnInit} from "@angular/core";
import {Book} from "../shared/book.model";
import {BookService} from "../shared/book.service";

@Component({
  selector: 'app-print-book',
  templateUrl: './print-book.component.html',
  styleUrls: ['./print-book.component.css']
})


export class PrintBookComponent implements OnInit {
  books: Array<Book>;
  selectedBook: Book;

  constructor(public bookService: BookService) {
  }

  ngOnInit() {
    this.getAllBooks();
  }

  getAllBooks(): void {
    this.bookService.getAllBooks()
      .subscribe(stud => this.books = stud["books"]);
  }

  deleteBook(book_id):void
  {
    this.bookService.deleteBook(book_id);
  }

  sortEm(val)
  {
    if(val==0)
      this.getAllBooks();
    else if (val == 1)
      this.bookService.getAllBooks()
        .subscribe(stud => this.books = stud["books"].sort((n1,n2) => {
          if (n1.title > n2.title) {
            return 1;
          }

          if (n1.title < n2.title) {
            return -1;
          }

          return 0;
        }));
    else if (val == 2)
      this.bookService.getAllBooks()
        .subscribe(stud => this.books = stud["books"].sort((n1,n2) => {
          if (n1.price > n2.price) {
            return 1;
          }

          if (n1.price  < n2.price) {
            return -1;
          }

          return 0;
        }));
    else if (val == 3)
      this.bookService.getAllBooks()
        .subscribe(stud => this.books = stud["books"].sort((n1,n2) => {
          if (n1.author > n2.author) {
            return 1;
          }

          if (n1.author < n2.author) {
            return -1;
          }

          return 0;
        }));
  }

  onSelect(book): void {
    this.selectedBook = book;
  }
}
