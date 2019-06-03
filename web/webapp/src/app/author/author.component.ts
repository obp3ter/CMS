import { Component, OnInit } from '@angular/core';
import {Author} from "@app/shared/models/author.model";
import {toNumbers} from "@angular/compiler-cli/src/diagnostics/typescript_version";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthorService} from "@app/shared/services/author.service";

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit {
  authorId: number;
  authorEmail: string;
  constructor(private route: ActivatedRoute,  private router: Router,public authorService : AuthorService) { }

  ngOnInit() {
    console.log(sessionStorage.getItem("userType")!="author");
    if(sessionStorage.getItem("userType")!="author"){
      this.router.navigate(['login//login-author'], { skipLocationChange: true});}
    this.authorId = toNumbers(sessionStorage.getItem("id"))[0];
    this.authorService.getAuthorById(this.authorId).subscribe( a => {this.authorEmail = a[0].email; console.log("author" + a[0].email)});

  }

}
