import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ChairService} from "@app/shared/services/chair.service";

@Component({
  selector: 'app-chair-register',
  templateUrl: './chair-register.component.html',
  styleUrls: ['./chair-register.component.css']
})
export class ChairRegisterComponent implements OnInit {

  @Input() show : boolean;

  constructor(private fb: FormBuilder,public chairService : ChairService) { }

  angForm : FormGroup;

  createForm() {
    this.angForm = this.fb.group({
      chair_email: ['', Validators.required ],
      chair_password: ['', Validators.required ],
      chair_password_confirm: ['', Validators.required ]});
  }

  addChair(chair_email,chair_password,chair_password_confirm){
    if(chair_password == chair_password_confirm){
      this.chairService.addChair(chair_email,chair_password);
    }
    this.show = false;
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

  setColorGreen(what: string) {
    if (what == 'email') {
      var label = <HTMLLabelElement>document.getElementsByClassName('col-md-4').item(0);
      label.style.color = 'green';
    }
    if (what == "password") {
      var label = <HTMLLabelElement>document.getElementsByClassName('col-md-4').item(1);
      label.style.color = 'green';
    }
    if (what == "check") {
      var label = <HTMLLabelElement>document.getElementsByClassName('col-md-4').item(2);
      label.style.color = 'green';
    }
  }

  ngOnInit(){
    this.createForm()
  }

}
