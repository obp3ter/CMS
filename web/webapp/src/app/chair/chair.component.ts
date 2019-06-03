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
  chairId: number;
  chairEmail : string;
  chairDeadline : boolean
  constructor(private route: ActivatedRoute,  private router: Router,public chairService : ChairService) { }

  public showDeadline(){
    this.proposalsShow =false;
    this.chairDeadline = !this.chairDeadline;
  }

  public showProposals(){
    this.chairDeadline=false;
    this.proposalsShow = !this.proposalsShow;
  }
  public addSession(){
    this.showSessionAdd = !this.showSessionAdd;
  }

  ngOnInit() {
    this.showSessionAdd = false;
    this.chairDeadline  = false;
    console.log(sessionStorage.getItem("userType")!="chair")
    if(sessionStorage.getItem("userType")!="chair"){
      this.router.navigate(['login//login-chair'], { skipLocationChange: true});}
    this.chairId = toNumbers(sessionStorage.getItem("id"))[0];
    this.chairService.getChairById(this.chairId).subscribe( ac => this.chairEmail = ac[0].email);

  }

}
