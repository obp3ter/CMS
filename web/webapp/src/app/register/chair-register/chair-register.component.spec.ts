import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChairRegisterComponent } from './chair-register.component';

describe('ChairRegisterComponent', () => {
  let component: ChairRegisterComponent;
  let fixture: ComponentFixture<ChairRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChairRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChairRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
