import { Component, OnInit } from '@angular/core';
import { CustomerService } from './shared/customer.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  products: any[];
  constructor(private customerService: CustomerService) { }

  ngOnInit() {
    this.customerService.getCustomers().subscribe(
      (products: any[]) => {
        this.products = products[1];
      }
    );
  }

}
