import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class ProposalService {
  path = 'http://localhost:8080/proposals';
  proposalRes:Array<Proposal>;
  public todayDate = new Date(Date.parse(Date()));

  constructor(public httpClient: HttpClient) {
    this.proposalRes = new Array<Proposal>();
  }

  updateDeadline(type,date){
    const form : FormData = new FormData();
    form.append("deadlineName",type);
    form.append("date",date);
    this.httpClient.post(`${this.path}/deadlines`,form)
  }

  getAllProposals(): Observable<Array<Proposal>> {
    console.log('getAllProposals() enter ');
    const a = this.httpClient.get<Array<Proposal>>(this.path);
    console.log('getAllProposals() exit ' + a);
    return a;
  }
  getProposalByAuthorId(id):Observable<Array<Proposal>>
  {
    console.log("getbyid:",id)
    return this.httpClient.get<Array<Proposal>>(this.path+"?authorId="+id)

  }
  getProposalByReviewerId(id):Observable<Array<Proposal>>
  {
    return this.httpClient.get<Array<Proposal>>(this.path+"?reviewerId="+id)

  }
  getProposalByAssigned(id)
  {
    return this.httpClient.get<Array<Proposal>>(this.path+"?reviewerId="+id+"&phase=review")
  }
  updateFiles(file)
  {
    this.httpClient.post(`${this.path}/uploadfile`,file)
      .subscribe(res => console.log('Done'));
  }

  addProposal(proposal_name, proposal_keywords, proposal_topics, proposal_listOfAuthors) {
    const formData: FormData = new FormData();
    formData.append("authorID",sessionStorage.getItem("id"));
    formData.append("proposalName",proposal_name);
    formData.append("keyWords",proposal_keywords);
    formData.append("topics",proposal_topics);
    formData.append("listOfAuthors",proposal_listOfAuthors);
    console.log(formData);
    this.httpClient.post(`${this.path}`, formData)
      .subscribe(res => console.log('Done'));
  }
  bidProposal(id)
  {
    const formData: FormData = new FormData();
    formData.append("proposalID",id.toString())
    formData.append("reviewerID",sessionStorage.getItem("id"))
    this.httpClient.post(`${this.path}/bid`, formData)
      .subscribe(res => console.log('Done'));
  }
  refuseProposal(id)
  {
    const formData: FormData = new FormData();
    formData.append("proposalID",id.toString())
    formData.append("reviewerID",sessionStorage.getItem("id"))
    this.httpClient.post(`${this.path}/refuse`, formData)
      .subscribe(res => console.log('Done'));
  }
  reviewProposal(body)
  {
    this.httpClient.post(`${this.path}/review`, body)
      .subscribe(res => console.log('Done'));
  }
  assignProposal(body)
  {
    this.httpClient.post(`${this.path}/assign`, body)
      .subscribe(res => console.log('Done'));
  }

  getDeadline(deadlineName:string)
  {
    return this.httpClient.get(this.path+"/deadlines?deadlineName="+deadlineName)

  }
  getDeadline2(name)
  {
    this.getDeadline(name).subscribe(stud => {
      console.log("innerlog",stud,(stud["value"]));
      sessionStorage.setItem("deadline-"+name,stud["value"]);
    });
  }

  addDeadline(type: string,date:string){
    const form = new FormData();
    form.append("type",type);
    form.append("date",date);
    this.httpClient.post(`${this.path}/setDeadlines`,form).subscribe(res => console.log("Done"));
  }

  isBeforeDeadline(name)
  {
    let date:string;
    if(this.todayDate.getMonth().toString()[0]=='1')
      date= this.todayDate.getFullYear().toString()+"-"+(this.todayDate.getMonth()+1).toString()+"-"+this.todayDate.getDate().toString()
    else
      date= this.todayDate.getFullYear().toString()+"-0"+(this.todayDate.getMonth()+1).toString()+"-"+this.todayDate.getDate().toString()
    if(sessionStorage.getItem("deadline-"+name)==null)
      this.getDeadline2(name);
    console.log("deadline-"+name,sessionStorage.getItem("deadline-"+name).replace('-','').replace('-',''),date.replace('-','').replace('-',''))
    return sessionStorage.getItem("deadline-"+name).replace('-','').replace('-','')>date.replace('-','').replace('-','');
  }

  // @RequestParam("authorID") Integer aID,
  // @RequestParam("proposalName") String proposalName,
  // @RequestParam("keyWords") String keyWords,
  // @RequestParam("topics") String topics,
}
import {Proposal} from "../models/proposal.model";

import {Observable} from "rxjs";
