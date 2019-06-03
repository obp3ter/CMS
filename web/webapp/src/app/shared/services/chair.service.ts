import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Chair} from "../models/chair.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ChairService {
  path = 'http://localhost:8080/chairs';
  chairRes:Array<Chair>;

  constructor(public httpClient: HttpClient) {
    this.chairRes = new Array<Chair>();
  }

  getAllChairs(): Observable<Array<Chair>> {
    console.log('getAllChairs() enter ');
    const a = this.httpClient.get<Array<Chair>>(this.path);
    console.log('getAllChairs() exit ' + a);
    return a;
  }
  getChairByEmail(email):Observable<Array<Chair>>
  {

    let a:Chair;
    this.chairRes=new Array<Chair>();
    return this.httpClient.get<Array<Chair>>(this.path+"?email="+email)

  }

  getChairById(id) : Observable<Array<Chair>> {
    return this.httpClient.get<Array<Chair>>(this.path+"?id=" + id);
}

  addChair(chair_email, chair_password) {
    const formData: FormData = new FormData();
    formData.append("email",chair_email);
    formData.append("password",chair_password);
    console.log(formData);
    this.httpClient.post(`${this.path}`, formData)
      .subscribe(res => console.log('Done'));
  }

//@RequestMapping(value = "/chairs/{id}", method = RequestMethod.DELETE)
}
