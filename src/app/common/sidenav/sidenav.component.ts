import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { CustomerService } from '../../admin/shared/customer.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  // @Input() products: any[];
  products: any[];

  constructor(private customerService: CustomerService) { 
    // console.log(this.products);
  }

  ngOnInit() {
    this.getProducts();

    $('#sidebarToggle').on('click', (e: { preventDefault: () => void; }) => {
      e.preventDefault();
      $('body').toggleClass('sidebar-toggled');
      $('.sidebar').toggleClass('toggled');
    });

    
  }

  getProducts() {
    this.customerService.getCustomers().subscribe(
      (products: any[]) => {
        this.products = products[1];
        localStorage.setItem('isp_products',  JSON.stringify(this.products));
        // console.log( this.products);
      }
    );
  }

}
