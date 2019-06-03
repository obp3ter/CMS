import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import {ReviewerService} from "@app/shared/services/reviewer.service";
import {Router} from "@angular/router";
import {Author} from "@app/shared/models/author.model";
import {Reviewer} from "@app/shared/models/reviewer.model";

@Component({
  selector: 'app-register-reviewer',
  templateUrl: './register-reviewer.component.html',
  styleUrls: ['./register-reviewer.component.css']
})
export class RegisterReviewerComponent implements OnInit {

  angForm: FormGroup;
  constructor(private fb: FormBuilder,public reviewerService: ReviewerService, private router: Router) {
    this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({
      reviewer_email: ['', Validators.required ],
      reviewer_password: ['', Validators.required ],
      reviewer_password_confirm: ['', Validators.required ]
    });
  }

  addReviewer(reviewer_email, reviewer_password, reviewer_password_confirm, reviewer_company) {
    this.reviewerService.getAllReviewers().subscribe((l: Reviewer[]) => {
      console.log(l);
      for (var i = 0; i < l.length; i++)
        if (l[i].email == reviewer_email) {
          console.log("Duplicate email");
          return;
        }
      if (reviewer_password == reviewer_password_confirm) {
        this.reviewerService.addReviewer(reviewer_email, reviewer_password, reviewer_company);
        this.router.navigateByUrl("login/login-reviewer", {skipLocationChange: true});
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

    if(what == "check"){
      var label = <HTMLLabelElement> document.getElementsByClassName('col-md-4').item(2);
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
  }

  ngOnInit() {
  }

}
