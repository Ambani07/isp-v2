import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerProductAddComponent } from './customer-product-add.component';

describe('CustomerProductAddComponent', () => {
  let component: CustomerProductAddComponent;
  let fixture: ComponentFixture<CustomerProductAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerProductAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerProductAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
