import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ChairService} from "@app/shared/services/chair.service";
import {Chair} from "@app/shared/models/chair.model";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-chair',
  templateUrl: './login-chair.component.html',
  styleUrls: ['./login-chair.component.css']
})
export class LoginChairComponent implements OnInit {
  chair:Chair;
  angForm: FormGroup;
  constructor(private fb: FormBuilder,public chairService: ChairService,  private router: Router) {
    this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({
      chair_email: ['', Validators.required ],
      chair_password: ['', Validators.required ]
    });
  }

  loginChair(chair_email, chair_password) {

    this.chairService.getChairByEmail(chair_email).subscribe(res =>
    {
      this.chair=(res[0]);
      if(this.chair.password == chair_password)
      {
        console.log("OK!");
        //window.open('/sucess','_self');
        sessionStorage.setItem("id", this.chair.id.toString());
        sessionStorage.setItem("userType", "chair");
        this.router.navigate(['/chair'], { skipLocationChange: true});

      }
    });
  }

  ngOnInit() {
  }

}
