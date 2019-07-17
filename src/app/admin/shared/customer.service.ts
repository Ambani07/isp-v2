import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CustomerService {
    constructor(private http: HttpClient) {}

    public getCustomerId(customerId: string): any {
        return this.http.get('/api/v1/admin/' + customerId);
    }

    public getCustomers(): Observable<any> {
        return this.http.get('/api/v1/admin');
    }

    public getProducts(): Observable<any>{
        return this.http.get('/api/v1/admin/customer-product-add');
    }

    public customerProduct(customerProductData): Observable<any> {
        return this.http.post('api/v1/admin/customer-product-add', customerProductData);
    }

    public getCustomerByProduct(productId): Observable<any> {
        return this.http.get('/api/v1/admin/customers/products/' + productId);
    }

}