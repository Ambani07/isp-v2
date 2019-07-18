import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-add',
  templateUrl: './customer-add.component.html',
  styleUrls: ['./customer-add.component.scss']
})
export class CustomerAddComponent implements OnInit {
  @Input() isAdmin: boolean;

  customerForm: FormGroup;
  errors: any[] = [];
  notifyMessage = '';
  breadCrumps: any[] = [];

  constructor(private fb: FormBuilder,
              private router: Router) { }

  ngOnInit() {
    this.customerFormInit();
  }

  customerFormInit() {
    this.customerForm = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [ Validators.required,
                    Validators.pattern('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@+(?:\.[a-zA-Z0-9-]+)*$')]],
      company: ['', Validators.required],
      address: ['', Validators.required],
      contactPersonName: ['', [Validators.required]],
      contactPersonCellNo: ['', Validators.required],
      contactPersonPhoneNo: ['', Validators.required]
    });
  }

  isInvalidForm(fieldName): boolean{
    return this.customerForm.controls[fieldName].invalid &&
          (this.customerForm.controls[fieldName].dirty || this.customerForm.controls[fieldName].touched);
  }

  isRequired(fieldName){
    return this.customerForm.controls[fieldName].errors.required;
  }

  customerDetails() {

    localStorage.setItem('isp_customer_details',  JSON.stringify(this.customerForm.value));

    this.router.navigate(['/admin/customer-product-add']);
  }
}
