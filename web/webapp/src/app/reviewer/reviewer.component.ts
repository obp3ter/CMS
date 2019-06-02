import { Component, OnInit } from '@angular/core';
import {Reviewer} from "@app/shared/models/reviewer.model";
import {toNumbers} from "@angular/compiler-cli/src/diagnostics/typescript_version";
import {ActivatedRoute, Router} from "@angular/router";
import {ReviewerService} from "@app/shared/services/reviewer.service";

@Component({
  selector: 'app-reviewer',
  templateUrl: './reviewer.component.html',
  styleUrls: ['./reviewer.component.css']
})
export class ReviewerComponent implements OnInit {
  reviewerId: number
  constructor(private route: ActivatedRoute,  private router: Router) { }

  ngOnInit() {
    console.log(sessionStorage.getItem("userType")!="reviewer")
    if(sessionStorage.getItem("userType")!="reviewer"){
      this.router.navigate(['login//login-reviewer'], { skipLocationChange: true});}
    this.reviewerId = toNumbers(sessionStorage.getItem("id"))[0];
  }

}
