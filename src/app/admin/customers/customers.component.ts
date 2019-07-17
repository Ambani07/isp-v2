import { Component, OnInit, Input } from '@angular/core';
import { Customer } from '../shared/customer.model';

import {CustomerService} from '../shared/customer.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {


  @Input() isAdmin: boolean;
  breadCrumps: any[] = [];
  customers: any[];
  products: any[];
  constructor(private customerService: CustomerService) {}

  ngOnInit() {
    this.breadCrumps = ['Dashboard', 'customers'];
    const customersObservable = this.customerService.getCustomers();
    customersObservable.subscribe(
      (customers: any[]) => {
        this.customers = customers[0];
        
        // console.log(this.customers);
      },
      (err) => {

      }
    );
  }







}
