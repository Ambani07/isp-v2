import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../shared/customer.service';
import { ActivatedRoute } from '@angular/router';
import { Customer } from '../../shared/customer.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  customers: Customer[];

  constructor( private route: ActivatedRoute,
               private customerService: CustomerService) { }

  ngOnInit() {
  this.route.params.subscribe(
    (params) => {
        this.getCustomersByProduct(params.productId);
    });
  }

  getCustomersByProduct(productId){
    this.customerService.getCustomerByProduct(productId).subscribe(
      (customers: Customer[]) => {
        this.customers = customers;
      }
    );
  }

}
