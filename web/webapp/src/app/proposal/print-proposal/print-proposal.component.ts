import {Component, OnInit} from "@angular/core";
import {Proposal} from "@app/shared/models/proposal.model";
import {ProposalService} from "@app/shared/services/proposal.service";
import {toNumbers} from "@angular/compiler-cli/src/diagnostics/typescript_version";
import {AuthorService} from "@app/shared/services/author.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-print-proposal',
  templateUrl: './print-proposal.component.html',
  styleUrls: ['./print-proposal.component.css']
})


export class PrintProposalComponent implements OnInit {
  proposals: Array<Proposal>;
  selectedProposal: Proposal;

  constructor(public proposalService: ProposalService,  private router: Router) {
  }

  ngOnInit() {
    console.log("id:", sessionStorage.getItem("id")=="undefined")
    if(sessionStorage.getItem("id")=="undefined")
      this.getAllProposals();
    else
      if(sessionStorage.getItem("userType")=="author")
      this.getAllbyIdAuthor();
      else if(sessionStorage.getItem("userType")=="reviewer") {
        this.getAllbyIdReviewer();
      }
      else if(sessionStorage.getItem("userType")=="chair") {
        this.getAllProposals();
      }
  }

  getAllProposals(): void {
    this.proposalService.getAllProposals()
      .subscribe(stud => this.proposals = stud);
    console.log(this.proposals)
  }
  getAllbyIdAuthor(): void {
    this.proposalService.getProposalByAuthorId(toNumbers(sessionStorage.getItem("id"))[0])
      .subscribe(stud => this.proposals = stud);
    console.log(this.proposals)
  }
  getAllbyIdReviewer(): void {
    if(this.proposalService.isBeforeDeadline("bidding"))
    {
      this.proposalService.getProposalByReviewerId(toNumbers(sessionStorage.getItem("id"))[0])
        .subscribe(stud => this.proposals = stud);
    }
    else
    {
      console.log("getting by assigned")
      this.proposalService.getProposalByAssigned(toNumbers(sessionStorage.getItem("id"))[0])
        .subscribe(stud => this.proposals = stud);
    }
    console.log(this.proposals)
  }
  // deleteProposal(proposal_id):void
  // {
  //   this.proposalService.deleteProposal(proposal_id);
  // }
  isBeforeDeadline(name)
  {
    console.log(name)
    return this.proposalService.isBeforeDeadline(name);
  }
  updateFile(id,wf)
  {
    sessionStorage.setItem("proposalID",id.toString());
    sessionStorage.setItem("whichFile",wf);
    this.router.navigate(['/proposals/upload'], { skipLocationChange: true});

  }
  reviewerShow()
  {
    return sessionStorage.getItem("userType")=="reviewer";
  }
  authorShow()
  {
    return sessionStorage.getItem("userType")=="author";
  }
  chairShow()
  {
    return sessionStorage.getItem("userType")=="chair";
  }


  bidProposal(id)
  {
    this.proposalService.bidProposal(id);
    this.router.navigate(['/reviewer'], { skipLocationChange: true});
  }
  refuseProposal(id)
  {
    this.proposalService.refuseProposal(id);
    this.router.navigate(['/reviewer'], { skipLocationChange: true});
  }
  reviewProposal(id)
  {
    sessionStorage.setItem("proposalID",id.toString())
    this.router.navigate(['/proposals/review-proposal'], { skipLocationChange: true});
  }

  onSelect(proposal): void {
    this.selectedProposal = proposal;
  }

  reviewGrade(grade)
  {
    switch(grade)
    {
      case(0):
      {
        return "strong reject"
      }
      case(1):
      {
        return "reject"
      }
      case(2):
      {
        return "weak reject"
      }
      case(3):
      {
        return "borderline paper"
      }
      case(4):
      {
        return "weak accept"
      }
      case(5):
      {
        return "accept"
      }
      case(6):
      {
        return "strong accept"
      }
    }
  }
}
