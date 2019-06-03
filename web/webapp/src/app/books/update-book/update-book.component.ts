import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import {BookService} from "../shared/book.service";

@Component({
  selector: 'app-update-book',
  templateUrl: './update-book.component.html',
  styleUrls: ['./update-book.component.css']
})
export class UpdateBookComponent implements OnInit {

  book: any = {};
  angForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private bs: BookService,
              private fb: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({
      book_title: ['', Validators.required ],
      book_author: ['', Validators.required ],
      book_price: ['', Validators.required ]
    });
  }


  ngOnInit() {
    this.route.params.subscribe(params => {
      this.bs.editBook(params['id']).subscribe(res => {
        this.book = res;
      });
    });
  }

  updateBook(book_title, book_author, book_price) {
      this.route.params.subscribe(params => {
        this.bs.updateBook(book_title, book_author, book_price, params['id']);
        this.router.navigate(['book']);
      });
  }
  
}
