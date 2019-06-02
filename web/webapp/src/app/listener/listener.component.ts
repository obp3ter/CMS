import { Component, OnInit } from '@angular/core';
import {Listener} from "@app/shared/models/listener.model";
import {toNumbers} from "@angular/compiler-cli/src/diagnostics/typescript_version";
import {ActivatedRoute, Router} from "@angular/router";
import {ListenerService} from "@app/shared/services/listener.service";

@Component({
  selector: 'app-listener',
  templateUrl: './listener.component.html',
  styleUrls: ['./listener.component.css']
})
export class ListenerComponent implements OnInit {
  listenerId: number
  constructor(private route: ActivatedRoute,  private router: Router) { }

  ngOnInit() {
    console.log(sessionStorage.getItem("userType")!="listener")
    if(sessionStorage.getItem("userType")!="listener"){
      this.router.navigate(['login//login-listener'], { skipLocationChange: true});}
    this.listenerId = toNumbers(sessionStorage.getItem("id"))[0];
  }

}
