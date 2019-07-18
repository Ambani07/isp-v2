import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerService } from '../shared/customer.service';
import { AuthService } from '../../auth/shared/auth.service';
import { Product } from '../../admin/shared/product.model';
@Component({
  selector: 'app-customer-product-add',
  templateUrl: './customer-product-add.component.html',
  styleUrls: ['./customer-product-add.component.scss']
})
export class CustomerProductAddComponent implements OnInit {

  customerDetails: any;
  customerProductForm: FormGroup;
  products: any;
  customerProductInformation = {};
  errors: any;
  userCreatorId: string;

  constructor(private customerService: CustomerService,
              private fb: FormBuilder,
              private router: Router,
              private auth: AuthService) {
                this.products = JSON.parse(localStorage.getItem('isp_products'));
  }

  ngOnInit() {

    

    const productsObservable = this.customerService.getProducts();
    productsObservable.subscribe(
      (products: any) => {
        this.products = JSON.parse(localStorage.getItem('isp_products'));
      }
    );
    this.customerDetails = JSON.parse(localStorage.getItem('isp_customer_details'));

    this.customerProductInit();

    if (!this.customerDetails) {
        this.router.navigate(['/admin/customer-add']);
    }

    this.userCreatorId = this.auth.getUserId();
  }

  customerProductInit() {
    this.customerProductForm = this.fb.group({
      vlanId: ['', Validators.required],
      productId: ['', Validators.required],
      term: ['', Validators.required],
      circuitNo: ['', Validators.required],
      accessType: ['', Validators.required],
      accessSpeed: ['', Validators.required],
      noIPs: ['', Validators.required],
      totalBandwidth: ['', Validators.required],
      localBandwidth: ['', Validators.required],
      intBandwidth: ['', Validators.required],
      teracoConnect: [''],
      eiOption: [''],
      prioritisation: [''],
      productName: ['', Validators.required],
      username: ['', Validators.required],
      accessUsername: ['', Validators.required]
    });


  }

  isInvalidForm(fieldName): boolean {
    return this.customerProductForm.controls[fieldName].invalid &&
          (this.customerProductForm.controls[fieldName].dirty || this.customerProductForm.controls[fieldName].touched);
  }

  isRequired(fieldName) {
    return this.customerProductForm.controls[fieldName].errors.required;
  }

  customerProductDetails() {
    // submit forms data

    this.customerProductInformation = {
      customerDetails : this.customerDetails,
      productDetails: this.customerProductForm.value,
      userId : this.userCreatorId
    };

    this.customerService.customerProduct(this.customerProductInformation).subscribe(
      () => {
        this.router.navigate(['/admin/customers', {customerProductStatus: 'success'}]);
      },
      (errorResponse) => {
        this.errors = errorResponse.error.errors;
      },
    );

    // console.log(this.customerProductInformation);

    localStorage.removeItem('isp_customer_details');
  }

}
