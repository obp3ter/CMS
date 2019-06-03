import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import {ListenerService} from "@app/shared/services/listener.service";
import {Router} from "@angular/router";
import {Author} from "@app/shared/models/author.model";
import {Listener} from "@app/shared/models/listener.model";

@Component({
  selector: 'app-register-listener',
  templateUrl: './register-listener.component.html',
  styleUrls: ['./register-listener.component.css']
})
export class RegisterListenerComponent implements OnInit {

  angForm: FormGroup;
  constructor(private fb: FormBuilder,public listenerService: ListenerService, private router: Router) {
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
    this.listenerService.getAllListeners().subscribe((l: Listener[]) => {
      console.log(l);
      for (var i = 0; i < l.length; i++)
        if (l[i].email == listener_email) {
          console.log("Duplicate email");
          return;
        }
      if (listener_password == listener_password_confirm) {
        this.listenerService.addListener(listener_email, listener_password);
        this.router.navigateByUrl("login/login-listener", {skipLocationChange: true});
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
