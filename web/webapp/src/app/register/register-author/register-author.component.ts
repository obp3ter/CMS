import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import {AuthorService} from "@app/shared/services/author.service";

@Component({
  selector: 'app-register-author',
  templateUrl: './register-author.component.html',
  styleUrls: ['./register-author.component.css']
})
export class RegisterAuthorComponent implements OnInit {

  angForm: FormGroup;
  constructor(private fb: FormBuilder,public authorService: AuthorService) {
    this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({
      author_email: ['', Validators.required ],
      author_password: ['', Validators.required ],
      author_password_confirm: ['', Validators.required ],
      author_company: ['', Validators.required ]
    });
  }

  addAuthor(author_email, author_password, author_password_confirm, author_company) {
    if(author_password == author_password_confirm){
    this.authorService.addAuthor(author_email, author_password, author_company);}
  }

  setColorRed(what: string) {
    if (what == 'email') {
      var label = <HTMLLabelElement> document.getElementsByClassName('col-md-4').item(0);
      label.style.color = 'red';
    }
    if(what == "password"){
      var label = <HTMLLabelElement> document.getElementsByClassName('col-md-4').item(1);
      label.style.color = 'red';
    }

    if(what == "check"){
      var label = <HTMLLabelElement> document.getElementsByClassName('col-md-4').item(2);
      label.style.color = 'red';
    }

    if(what == "company"){
      var label = <HTMLLabelElement> document.getElementsByClassName('col-md-4').item(3);
      label.style.color = 'red';
    }
  }
  setColorGreen(what: string){
    if (what == 'email') {
      var label = <HTMLLabelElement> document.getElementsByClassName('col-md-4').item(0);
      label.style.color = 'green';
    }
    if(what == "password"){
      var label = <HTMLLabelElement> document.getElementsByClassName('col-md-4').item(1);
      label.style.color = 'green';
    }
    if(what == "check"){
      var label = <HTMLLabelElement> document.getElementsByClassName('col-md-4').item(2);
      label.style.color = 'green';
    }
    if(what == "company"){
      var label = <HTMLLabelElement> document.getElementsByClassName('col-md-4').item(3);
      label.style.color = 'green';
    }
  }

  ngOnInit() {
  }

}
