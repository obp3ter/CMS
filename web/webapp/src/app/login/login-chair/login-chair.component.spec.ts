import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginChairComponent } from './login-chair.component';

describe('LoginChairComponent', () => {
  let component: LoginChairComponent;
  let fixture: ComponentFixture<LoginChairComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginChairComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginChairComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
