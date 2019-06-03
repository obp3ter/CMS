import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import {ListenerService} from "@app/shared/services/listener.service";

@Component({
  selector: 'app-register-listener',
  templateUrl: './register-listener.component.html',
  styleUrls: ['./register-listener.component.css']
})
export class RegisterListenerComponent implements OnInit {

  angForm: FormGroup;
  constructor(private fb: FormBuilder,public listenerService: ListenerService) {
    this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({
      listener_email: ['', Validators.required ],
      listener_password: ['', Validators.required ],
      listener_password_confirm: ['', Validators.required ]
    });
  }

  addListener(listener_email, listener_password, listener_password_confirm) {
    if(listener_password == listener_password_confirm){
      this.listenerService.addListener(listener_email, listener_password);}
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
