import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginListenerComponent } from './login-listener.component';

describe('LoginListenerComponent', () => {
  let component: LoginListenerComponent;
  let fixture: ComponentFixture<LoginListenerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginListenerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginListenerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
