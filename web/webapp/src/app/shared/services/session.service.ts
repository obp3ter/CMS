import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Session} from "@app/shared/models/session.model";
import {HttpClient} from "@angular/common/http";
import {Listener} from "@app/shared/models/listener.model";
import {forEach} from "@angular/router/src/utils/collection";

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  path = 'http://localhost:8080/sessions';



  public getAll(): Observable<Array<Session>>{
    return this.httpClient.get<Array<Session>>(`${this.path}`);
  }

  public addSession(speaker,chair,time,date) {
    const form = new FormData();
    form.append("speaker",speaker);
    form.append("chair",chair);
    form.append("time",time);
    form.append("date",date);
    this.httpClient.post(`${this.path}`,form);
  }

  // public filterAllByAuthorId(id) : Array<Session>{
  //   var array = new Array<Session>();
  //   this.getAll().subscribe(sesionArray => {
  //     sesionArray.forEach(session =>{
  //       if(session.speaker.id == id){
  //         array.push(session);
  //       }
  //       })
  //   });
  //   return array;
  // }

  constructor(public httpClient: HttpClient) {

  }



}
