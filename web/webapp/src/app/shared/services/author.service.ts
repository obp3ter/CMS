import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Author} from "../models/author.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthorService {
  path = 'http://localhost:8080/authors';
  authorRes:Array<Author>;

  constructor(public httpClient: HttpClient) {
    this.authorRes = new Array<Author>();
  }

  getAllAuthors(): Observable<Array<Author>> {
    console.log('getAllAuthors() enter ');
    const a = this.httpClient.get<Array<Author>>(this.path);
    console.log('getAllAuthors() exit ' + a);
    return a;
  }
  getAuthorByEmail(email):Observable<Array<Author>>
  {
    this.authorRes=new Array<Author>();
    return this.httpClient.get<Array<Author>>(this.path + "?email=" + email);

  }

  getAuthorById(id):Observable<Array<Author>>
  {

    return this.httpClient.get<Array<Author>>(this.path + "?id=" + id);
  }

  addAuthor(author_email, author_password, author_company) {
    const formData: FormData = new FormData();
    formData.append("email",author_email);
    formData.append("password",author_password);
    formData.append("company",author_company);
    console.log(formData);
    this.httpClient.post(`${this.path}`, formData)
      .subscribe(res => console.log('Done'));
  }

//@RequestMapping(value = "/authors/{id}", method = RequestMethod.DELETE)
}
