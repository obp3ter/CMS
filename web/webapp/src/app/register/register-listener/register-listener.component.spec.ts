import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterListenerComponent } from './register-listener.component';

describe('RegisterListenerComponent', () => {
  let component: RegisterListenerComponent;
  let fixture: ComponentFixture<RegisterListenerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterListenerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterListenerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
