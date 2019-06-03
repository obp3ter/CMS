import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintBookComponent } from './print-book.component';

describe('PrintBookComponent', () => {
  let component: PrintBookComponent;
  let fixture: ComponentFixture<PrintBookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrintBookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
