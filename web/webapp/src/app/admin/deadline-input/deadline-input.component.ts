import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-deadline-input',
  templateUrl: './deadline-input.component.html',
  styleUrls: ['./deadline-input.component.css']
})
export class DeadlineInputComponent implements OnInit {

  @Input() show : boolean;

  constructor() { }

  ngOnInit() {
  }

}
