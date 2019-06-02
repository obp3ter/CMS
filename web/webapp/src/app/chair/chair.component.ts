import { Component, OnInit } from '@angular/core';
import {Chair} from "@app/shared/models/chair.model";
import {toNumbers} from "@angular/compiler-cli/src/diagnostics/typescript_version";
import {ActivatedRoute, Router} from "@angular/router";
import {ChairService} from "@app/shared/services/chair.service";

@Component({
  selector: 'app-chair',
  templateUrl: './chair.component.html',
  styleUrls: ['./chair.component.css']
})
export class ChairComponent implements OnInit {
  chairId: number
  constructor(private route: ActivatedRoute,  private router: Router) { }

  ngOnInit() {
    console.log(sessionStorage.getItem("userType")!="chair")
    if(sessionStorage.getItem("userType")!="chair"){
      this.router.navigate(['login//login-chair'], { skipLocationChange: true});}
    this.chairId = toNumbers(sessionStorage.getItem("id"))[0];
  }

}
