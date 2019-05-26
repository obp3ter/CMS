import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProposalService} from "@app/shared/services/proposal.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-update-proposal-file',
  templateUrl: './update-proposal-file.component.html',
  styleUrls: ['./update-proposal-file.component.css']
})
export class UpdateProposalFileComponent implements OnInit {
  form: FormGroup;
  loading: boolean = false;

  @ViewChild('fileInput') fileInput: ElementRef;

  constructor(private fb: FormBuilder,public proposalService:ProposalService,  private router: Router) {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      myFile:['', Validators.required],
    });
  }

  onFileChange(event) {
    if(event.target.files.length > 0) {
      let file = event.target.files[0];
      this.form.get('myFile').setValue(file);
    }
  }

  private prepareSave(): any {
    let input = new FormData();
    input.append("proposalID", sessionStorage.getItem("proposalID"));
    input.append("whichFile", sessionStorage.getItem("whichFile"));
    input.append('file', this.form.get('myFile').value);
    return input;
  }

  onSubmit() {
    const formModel = this.prepareSave();
    console.log(formModel.toString(), sessionStorage.getItem("proposalID"), sessionStorage.getItem("whichFile"));
    this.proposalService.updateFiles(formModel);
    this.loading = true;

    setTimeout(() => {
      // FormData cannot be inspected (see "Key difference"), hence no need to log it here
      //alert('done!');
      this.loading = false;
    }, 1000);
    this.router.navigate(['/author'], { skipLocationChange: true});
  }

  clearFile() {
    this.form.get('myFile').setValue(null);
    this.fileInput.nativeElement.value = '';
  }
  ngOnInit(): void {
  }
}
