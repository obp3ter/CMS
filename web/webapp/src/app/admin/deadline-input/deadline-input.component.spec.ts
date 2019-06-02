import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeadlineInputComponent } from './deadline-input.component';

describe('DeadlineInputComponent', () => {
  let component: DeadlineInputComponent;
  let fixture: ComponentFixture<DeadlineInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeadlineInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeadlineInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
