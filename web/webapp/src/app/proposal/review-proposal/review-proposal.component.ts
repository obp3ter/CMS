import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import {ProposalService} from "@app/shared/services/proposal.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-bid-proposal',
  templateUrl: './review-proposal.component.html',
  styleUrls: ['./review-proposal.component.css']
})
export class ReviewProposalComponent implements OnInit {

  angForm: FormGroup;
  protected options: string[];
  constructor(private fb: FormBuilder,public proposalService: ProposalService,  private router: Router) {
    this.options =['strong reject','reject','weak reject','borderline paper','weak accept','accept','strong accept'];
    console.log(this.options)
    this.createForm();

    //strong accept, accept, weak accept, borderline paper, weak reject, reject and strong reject
  }

  createForm() {
    this.angForm = this.fb.group({
      proposal_grade: ['', Validators.required ]
    });
  }

  bidProposal(proposal_grade) {
    console.log(proposal_grade)
    let input = new FormData();
    input.append("proposalID", sessionStorage.getItem("proposalID"));
    input.append("reviewerID",sessionStorage.getItem("id"));
    switch (proposal_grade) {
      case("strong reject"):
      {
        input.append('grade',"0");
      }
      case("reject"):
      {
        input.append('grade',"1");
      }
      case("weak reject"):
      {
        input.append('grade',"2");
      }
      case("borderline paper"):
      {
        input.append('grade',"3");
      }
      case("weak accept"):
      {
        input.append('grade',"4");
      }
      case("accept"):
      {
        input.append('grade',"5");
      }
      case("strong accept")
      :
      {
        input.append('grade',"6");
      }

    }
    console.log(input.get("grade"))
    this.proposalService.reviewProposal(input);
    this.router.navigate(['/reviewer'] );
  }


  ngOnInit() {
  }

}
