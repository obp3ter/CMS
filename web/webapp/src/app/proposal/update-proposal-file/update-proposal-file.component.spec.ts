import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateProposalFileComponent } from './update-proposal-file.component';

describe('UpdateProposalFileComponent', () => {
  let component: UpdateProposalFileComponent;
  let fixture: ComponentFixture<UpdateProposalFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateProposalFileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateProposalFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
