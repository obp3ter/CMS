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

  ngOnInit() {
  }

}
