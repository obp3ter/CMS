import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Conference Management System';
  logout()
  {
    sessionStorage.clear();
  }
  show():boolean
  {
    return sessionStorage.getItem("id")=="undefined";
  }
}
