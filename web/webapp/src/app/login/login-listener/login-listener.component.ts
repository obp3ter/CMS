import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthorService} from "@app/shared/services/author.service";
import {Author} from "@app/shared/models/author.model";
import { Router } from '@angular/router';
import {Listener} from "@app/shared/models/listener.model";

@Component({
  selector: 'app-login-listener',
  templateUrl: './login-listener.component.html',
  styleUrls: ['./login-listener.component.css']
})
export class LoginListenerComponent implements OnInit {
  listener:Listener;
  angForm: FormGroup;
  constructor() { }
  ngOnInit() {
  }

}
