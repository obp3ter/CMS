import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import {AuthorService} from "@app/shared/services/author.service";
import {Author} from "@app/shared/models/author.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register-author',
  templateUrl: './register-author.component.html',
  styleUrls: ['./register-author.component.css']
})
export class RegisterAuthorComponent implements OnInit {

  //router: Router;
  angForm: FormGroup;
  constructor(private fb: FormBuilder,public authorService: AuthorService, private router: Router) {
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

  //checkauthor(author_email):

  addAuthor(author_email, author_password, author_password_confirm, author_company):boolean {
    let saved: boolean = false;
    this.authorService.getAllAuthors().subscribe((a: Author[])=>{
      console.log(a);
      for(var i= 0; i < a.length; i++)
        if (a[i].email == author_email) {
          console.log("Duplicate email");
          return;
        }
      if(author_password == author_password_confirm){
        this.authorService.addAuthor(author_email, author_password, author_company);
        this.router.navigateByUrl("login/login-author",{ skipLocationChange: true});
        saved = true;
      }

    } );
    if(saved){
      console.log("saved");
      //this.router.navigate(['login/login-author'],{ skipLocationChange: true});
      return true;
    }else {
      console.log("not saved");
      return false;
    }
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
