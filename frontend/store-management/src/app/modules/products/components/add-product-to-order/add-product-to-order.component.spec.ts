import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProductToOrderComponent } from './add-product-to-order.component';

describe('AddProductToOrderComponent', () => {
  let component: AddProductToOrderComponent;
  let fixture: ComponentFixture<AddProductToOrderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddProductToOrderComponent]
    });
    fixture = TestBed.createComponent(AddProductToOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
