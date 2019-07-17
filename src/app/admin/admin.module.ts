// modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InternationalPhoneNumberModule } from 'ngx-international-phone-number';
import { AuthModule } from '../auth/auth.module';
// services
import { CustomerService } from './shared/customer.service';
import { ProductService } from './shared/product.service';
import { AuthGuard } from '../auth/shared/auth.guard';

// components
import { AdminComponent } from './admin.component';
import { CustomersComponent } from './customers/customers.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from '../common/header/header.component';
import { SidenavComponent } from '../common/sidenav/sidenav.component';
import { CustomerAddComponent } from './customer-add/customer-add.component';
import { CustomerProductAddComponent } from './customer-product-add/customer-product-add.component';
import { CustomerDetailsComponent } from './customers/customer-details/customer-details.component';
import { DashCardsComponent } from './dashboard/dash-cards/dash-cards.component';
import { BreadcrumsComponent } from '../common/breadcrums/breadcrums.component';
import { ProductComponent } from './customers/product/product.component';


// routing in Admin
const routes: Routes = [
    {path: 'admin',
    component: AdminComponent,
    children: [
        {path: '', component: DashboardComponent, canActivate: [AuthGuard]},
        {path: 'customers', component: CustomersComponent, canActivate: [AuthGuard]},
        {path: 'customer/:customerId', component: CustomerDetailsComponent, canActivate: [AuthGuard]},
        {path: 'customer-add', component: CustomerAddComponent, canActivate: [AuthGuard]},
        {path: 'customer-product-add', component: CustomerProductAddComponent, canActivate: [AuthGuard]},
        {path: 'customers/products/:productId', component: ProductComponent, canActivate: [AuthGuard]}
    ]
}]

@NgModule({
  declarations: [
    AdminComponent,
    DashboardComponent,
    CustomersComponent,
    HeaderComponent,
    SidenavComponent,
    CustomerAddComponent,
    CustomerProductAddComponent,
    CustomerDetailsComponent,
    DashCardsComponent,
    BreadcrumsComponent,
    ProductComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forChild(routes),
    InternationalPhoneNumberModule,
    AuthModule
  ],
  providers: [CustomerService,
              AuthGuard,
              ProductService],
  bootstrap: []
})
export class AdminModule { }