import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ReviewerService} from "@app/shared/services/reviewer.service";
import {Reviewer} from "@app/shared/models/reviewer.model";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-reviewer',
  templateUrl: './login-reviewer.component.html',
  styleUrls: ['./login-reviewer.component.css']
})
export class LoginReviewerComponent implements OnInit {
  reviewer:Reviewer;
  angForm: FormGroup;
  constructor(private fb: FormBuilder,public reviewerService: ReviewerService,  private router: Router) {
    this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({
      reviewer_email: ['', Validators.required ],
      reviewer_password: ['', Validators.required ]
    });
  }

  loginReviewer(reviewer_email, reviewer_password) {

    this.reviewerService.getReviewerByEmail(reviewer_email).subscribe(res =>
    {
      this.reviewer=(res[0]);
      if(this.reviewer.password == reviewer_password)
      {
        console.log("OK!");
        //window.open('/sucess','_self');
        sessionStorage.setItem("id", this.reviewer.id.toString());
        sessionStorage.setItem("userType", "reviewer");
        this.router.navigate(['/reviewer'], { skipLocationChange: true});

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
