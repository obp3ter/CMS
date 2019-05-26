import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import {BookService} from "../shared/book.service";

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {

  angForm: FormGroup;
  constructor(private fb: FormBuilder,public bookService: BookService) {
    this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({
      book_title: ['', Validators.required ],
      business_name: ['', Validators.required ],
      book_price: ['', Validators.required ]
    });
  }

  addBook(book_title, book_author, book_price) {
    this.bookService.addBook(book_title, book_author, book_price);
  }

  ngOnInit() {
  }

}
