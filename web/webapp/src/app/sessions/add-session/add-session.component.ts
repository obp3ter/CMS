import {Component, Input, OnInit} from '@angular/core';
import {SessionService} from "@app/shared/services/session.service";
import {DeadlineInputComponent} from "@app/admin/deadline-input/deadline-input.component";

@Component({
  selector: 'app-add-session',
  templateUrl: './add-session.component.html',
  styleUrls: ['./add-session.component.css']
})
export class AddSessionComponent implements OnInit {

  @Input() showAdd : boolean;
  public addSession(speaker,chair,time,date){
    if(DeadlineInputComponent.isValidDate(date)) {
      var date2 = DeadlineInputComponent.transformDate(date);
      this.sessionService.addSession(speaker, chair, time, date2);
    }
  }

  constructor(public sessionService : SessionService) {

  }

  ngOnInit() {
  }

}
