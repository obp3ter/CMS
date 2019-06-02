import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthorService} from "@app/shared/services/author.service";
import {Author} from "@app/shared/models/author.model";
import {Router} from '@angular/router';

@Component({
  selector: 'app-login-author',
  templateUrl: './login-author.component.html',
  styleUrls: ['./login-author.component.css']
})
export class LoginAuthorComponent implements OnInit {
  author: Author;
  angForm: FormGroup;

  constructor(private fb: FormBuilder, public authorService: AuthorService, private router: Router) {
    this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({
      author_email: ['', Validators.required],
      author_password: ['', Validators.required]
    });
  }

  loginAuthor(author_email, author_password) {

    this.authorService.getAuthorByEmail(author_email).subscribe(res => {
      this.author = (res[0]);
      if (this.author.password == author_password) {
        console.log("OK!");
        //window.open('/sucess','_self');
        sessionStorage.setItem("id", this.author.id.toString());
        sessionStorage.setItem("userType", "author");
        this.router.navigate(['/author'], {skipLocationChange: true});

      }
    });
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
  }

  ngOnInit() {
  }

}
