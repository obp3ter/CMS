import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintProposalComponent } from './print-proposal.component';

describe('PrintProposalComponent', () => {
  let component: PrintProposalComponent;
  let fixture: ComponentFixture<PrintProposalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrintProposalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintProposalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
