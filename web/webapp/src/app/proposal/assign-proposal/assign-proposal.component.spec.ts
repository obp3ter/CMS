import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignProposalComponent } from './assign-proposal.component';

describe('AssignProposalComponent', () => {
  let component: AssignProposalComponent;
  let fixture: ComponentFixture<AssignProposalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignProposalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignProposalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
