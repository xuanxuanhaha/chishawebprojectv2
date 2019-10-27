import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayfromcartComponent } from './payfromcart.component';

describe('PayfromcartComponent', () => {
  let component: PayfromcartComponent;
  let fixture: ComponentFixture<PayfromcartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayfromcartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayfromcartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
