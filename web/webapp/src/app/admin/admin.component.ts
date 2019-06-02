import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  deadlines =false;
  chair = false;
  constructor() { }

  inputChair(){
    if(this.deadlines){
      this.deadlines = false;
    }
    this.chair = true;
  }

  inputDeadlines(){
    if(this.chair){
      this.chair = false;
    }
    this.deadlines = true;
  }

  ngOnInit() {
  }

}
