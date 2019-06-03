import {Component, Input, OnInit} from '@angular/core';
import {ProposalService} from "@app/shared/services/proposal.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-deadline-input',
  templateUrl: './deadline-input.component.html',
  styleUrls: ['./deadline-input.component.css']
})
export class DeadlineInputComponent implements OnInit {

  @Input() show : boolean;
  angForm : FormGroup;

  constructor(private fb : FormBuilder,public proposalService : ProposalService) {
  }

  createForm() {
    this.angForm = this.fb.group({
      date_abstracts: ['', Validators.required ],
      date_papers: ['', Validators.required ],
      date_biding: ['', Validators.required ]});
  }

  addDate(abstracts,paper,bidding){
    if(DeadlineInputComponent.isValidDate(abstracts)){
      var abstracts2  = DeadlineInputComponent.transformDate(abstracts);
      this.proposalService.addDeadline("abstracts",abstracts2);
    }
    if(DeadlineInputComponent.isValidDate(paper)){
      var paper2 = DeadlineInputComponent.transformDate(paper);
      this.proposalService.addDeadline("papers",paper2);
    }
    if(DeadlineInputComponent.isValidDate(bidding)){
      var bidding2 = DeadlineInputComponent.transformDate(bidding);
      this.proposalService.addDeadline("bidding",bidding2);
    }
  }

  static transformDate(date : string) : string{
    if(date.indexOf("-") > -1) {
      var splits = date.split('-');
      return splits[0] + "/" + splits[1] + "/" + splits[2];
    }
    if(date.indexOf("/") > -1){
      var splits = date.split("/");
      return splits[0] + "-" + splits[1] + "-" + splits[2];
    }
  }



  // checks for mm/dd/yyyy
  static isValidDate(dateString)
  {
    // First check for the pattern
    var regex_date = /^\d{4}\-\d{1,2}\-\d{1,2}$/;

    if(!regex_date.test(dateString))
    {
      return false;
    }

    // Parse the date parts to integers
    var parts   = dateString.split("-");
    var day     = parseInt(parts[2], 10);
    var month   = parseInt(parts[1], 10);
    var year    = parseInt(parts[0], 10);

    // Check the ranges of month and year
    if(year < 1000 || year > 3000 || month == 0 || month > 12)
    {
      return false;
    }

    var monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

    // Adjust for leap years
    if(year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
    {
      monthLength[1] = 29;
    }

    // Check the range of the day
    return day > 0 && day <= monthLength[month - 1];
  }

  ngOnInit() {
  }

}
