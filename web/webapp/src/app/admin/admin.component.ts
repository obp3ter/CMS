import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  deadlines =false;
  chair = false;
  isChair =false;
  showSessionB = false;
  constructor() { }

  inputChair(){
    this.deadlines = false;
    this.chair = true;
  }



  inputDeadlines(){
    this.chair = false;
    this.deadlines = true;
  }

  ngOnInit() {
  }

}
