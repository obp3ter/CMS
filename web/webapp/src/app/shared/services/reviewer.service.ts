import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Reviewer} from "../models/reviewer.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ReviewerService {
  path = 'http://localhost:8080/reviewers';
  reviewerRes:Array<Reviewer>;

  constructor(public httpClient: HttpClient) {
    this.reviewerRes = new Array<Reviewer>();
  }

  getAllReviewers(): Observable<Array<Reviewer>> {
    console.log('getAllReviewers() enter ');
    const a = this.httpClient.get<Array<Reviewer>>(this.path);
    console.log('getAllReviewers() exit ' + a);
    return a;
  }
  getReviewerByEmail(email):Observable<Array<Reviewer>>
  {

    let a:Reviewer;
    this.reviewerRes=new Array<Reviewer>();
    return this.httpClient.get<Array<Reviewer>>(this.path+"?email="+email)

  }
  addReviewer(reviewer_email, reviewer_password, reviewer_company) {
    const formData: FormData = new FormData();
    formData.append("email",reviewer_email);
    formData.append("password",reviewer_password);
    formData.append("company",reviewer_company);
    console.log(formData);
    this.httpClient.post(`${this.path}`, formData)
      .subscribe(res => console.log('Done'));
  }

//@RequestMapping(value = "/reviewers/{id}", method = RequestMethod.DELETE)
}
