import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginReviewerComponent } from './login-reviewer.component';

describe('LoginReviewerComponent', () => {
  let component: LoginReviewerComponent;
  let fixture: ComponentFixture<LoginReviewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginReviewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginReviewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
