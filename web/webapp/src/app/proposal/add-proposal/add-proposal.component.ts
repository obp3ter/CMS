import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import {ProposalService} from "@app/shared/services/proposal.service";

@Component({
  selector: 'app-add-proposal',
  templateUrl: './add-proposal.component.html',
  styleUrls: ['./add-proposal.component.css']
})
export class AddProposalComponent implements OnInit {

  angForm: FormGroup;
  constructor(private fb: FormBuilder,public proposalService: ProposalService) {
    this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({
      proposal_name: ['', Validators.required ],
      proposal_keywords: ['', Validators.required ],
      proposal_topics: ['', Validators.required ],
      proposal_listOfAuthors: ['', Validators.required ]
    });
  }

  addProposal(proposal_name, proposal_keywords, proposal_topics, proposal_listOfAuthors) {
      this.proposalService.addProposal(proposal_name, proposal_keywords, proposal_topics, proposal_listOfAuthors);
  }


  ngOnInit() {
  }

}
