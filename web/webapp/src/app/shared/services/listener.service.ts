import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Listener} from "../models/listener.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ListenerService {
  path = 'http://localhost:8080/listeners';
  listenerRes:Array<Listener>;

  constructor(public httpClient: HttpClient) {
    this.listenerRes = new Array<Listener>();
  }

  getAllListeners(): Observable<Array<Listener>> {
    console.log('getAllListeners() enter ');
    const a = this.httpClient.get<Array<Listener>>(this.path);
    console.log('getAllListeners() exit ' + a);
    return a;
  }
  getListenerByEmail(email):Observable<Array<Listener>>
  {

    let a:Listener;
    this.listenerRes=new Array<Listener>();
    return this.httpClient.get<Array<Listener>>(this.path+"?email="+email)

  }
  addListener(listener_email, listener_password) {
    const formData: FormData = new FormData();
    formData.append("email",listener_email);
    formData.append("password",listener_password);
    console.log(formData);
    this.httpClient.post(`${this.path}`, formData)
      .subscribe(res => console.log('Done'));
  }

//@RequestMapping(value = "/listeners/{id}", method = RequestMethod.DELETE)
}
