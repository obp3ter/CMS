import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ListenerService} from "@app/shared/services/listener.service";
import {Listener} from "@app/shared/models/listener.model";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-listener',
  templateUrl: './login-listener.component.html',
  styleUrls: ['./login-listener.component.css']
})
export class LoginListenerComponent implements OnInit {
  listener:Listener;
  angForm: FormGroup;
  constructor(private fb: FormBuilder,public listenerService: ListenerService,  private router: Router) {
    this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({
      listener_email: ['', Validators.required ],
      listener_password: ['', Validators.required ]
    });
  }

  loginListener(listener_email, listener_password) {

    this.listenerService.getListenerByEmail(listener_email).subscribe(res =>
    {
      this.listener=(res[0]);
      if(this.listener.password == listener_password)
      {
        console.log("OK!");
        //window.open('/sucess','_self');
        sessionStorage.setItem("id", this.listener.id.toString());
        sessionStorage.setItem("userType", "listener");
        this.router.navigate(['/listener'], { skipLocationChange: true});

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
