import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Book} from "./book.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BookService {
  path = 'http://localhost:8080/api/books';

  constructor(public httpClient: HttpClient) {
  }

  getAllBooks(): Observable<Array<Book>> {
    console.log('getAllBooks() enter ');
    const a = this.httpClient.get<Array<Book>>(this.path);
    console.log('getAllBooks() exit ' + a);
    return a;
  }
  addBook(book_title, book_author, book_price) {
    const obj = {
      title: book_title,
      author: book_author,
      price: book_price
    };
    console.log(obj);
    this.httpClient.post(`${this.path}`, obj)
      .subscribe(res => console.log('Done'));
  }
  deleteBook(book_id){
    console.log('Deletebook() enter '+book_id);
    this.httpClient.delete(`${this.path}/${book_id}`).subscribe(res => console.log('Done'));;
    console.log(`${this.path}/${book_id}`);
  }

  editBook(id) {
    return this
      .httpClient
      .get(`${this.path}/${id}`);
  }

  updateBook(book_title, book_author, book_price,id) {
    const obj = {
      title: book_title,
      author: book_author,
      price: book_price
    };
    this
      .httpClient
      .put(`${this.path}/${id}`, obj)
      .subscribe(res => console.log('Done'));
  }

//@RequestMapping(value = "/books/{id}", method = RequestMethod.DELETE)
}
