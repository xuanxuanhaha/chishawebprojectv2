import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoicefinishpayComponent } from './invoicefinishpay.component';

describe('InvoicefinishpayComponent', () => {
  let component: InvoicefinishpayComponent;
  let fixture: ComponentFixture<InvoicefinishpayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoicefinishpayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoicefinishpayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
