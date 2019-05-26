import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class ProposalService {
  path = 'http://localhost:8080/proposals';
  proposalRes:Array<Proposal>;

  constructor(public httpClient: HttpClient) {
    this.proposalRes = new Array<Proposal>();
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
  updateFiles(data)
  {
    this.httpClient.post(`${this.path}/uploadfile`, data)
      .subscribe(res => console.log('Done'));
  }

  addProposal(proposal_name, proposal_keywords, proposal_topics) {
    const formData: FormData = new FormData();
    formData.append("authorID",sessionStorage.getItem("id"));
    formData.append("proposalName",proposal_name);
    formData.append("keyWords",proposal_keywords);
    formData.append("topics",proposal_topics);
    console.log(formData);
    this.httpClient.post(`${this.path}`, formData)
      .subscribe(res => console.log('Done'));
  }

  // @RequestParam("authorID") Integer aID,
  // @RequestParam("proposalName") String proposalName,
  // @RequestParam("keyWords") String keyWords,
  // @RequestParam("topics") String topics,
}
import {Proposal} from "../models/proposal.model";

import {Observable} from "rxjs";
