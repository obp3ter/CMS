import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import {ProposalService} from "@app/shared/services/proposal.service";
import {Router} from "@angular/router";
import {Proposal} from "@app/shared/models/proposal.model";
import {Reviewer} from "@app/shared/models/reviewer.model";
import {ReviewerService} from "@app/shared/services/reviewer.service";

@Component({
  selector: 'app-bid-proposal',
  templateUrl: './assign-proposal.component.html',
  styleUrls: ['./assign-proposal.component.css']
})
export class AssignProposalComponent implements OnInit {

  angForm: FormGroup;
  protected options: string[];
  proposals: Array<Proposal>;
  reviewers: Array<Reviewer>;
  orreviewers: Array<Reviewer>;

  constructor(private fb: FormBuilder,public proposalService: ProposalService,  private router: Router, private reviewerService: ReviewerService) {
  }

  ngOnInit() {
    this.getAllProposals()
    this.getAllReviewers()
    this.createForm();
  }

  createForm() {
    console.log(this.proposals)
    this.angForm = this.fb.group({
      proposal_id: ['', Validators.required ],
      reviewer_id: ['', Validators.required ]
    });
  }

  assignProposal(proposal_id,reviewer_id) {
    console.log(proposal_id)
    let input = new FormData();
    input.append("proposalID", proposal_id);
    input.append("reviewerID",reviewer_id);
    //this.proposalService.assignProposal(input);
    //this.router.navigate(['/assigner'] );
  }
  getAllProposals(): void {
    this.proposalService.getAllProposals()
      .subscribe(stud => this.proposals = stud);
    console.log(this.proposals)
  }
  getAllReviewers()
  {
    this.reviewerService.getAllReviewers()
      .subscribe(stud => {
        this.orreviewers = stud

      });
    console.log(this.reviewers)
  }
  filterReviewes(id)
  {
    console.log(this.reviewers)
    let nr = new Array<Reviewer>();
    this.orreviewers.forEach(s =>
    {
      let b=false;

      s.papersToReview.forEach(s=>
      {
        if(!b && s == id)
          b=true;
      })

      if(b) {
        nr.push(s);
      }
    })
    this.reviewers=nr;
    console.log(this.reviewers)
  }




}
