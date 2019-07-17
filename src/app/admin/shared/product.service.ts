import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ProductService {
    constructor(private http: HttpClient) {}

    public getProductId(productId: string): any {
        return this.http.get('/api/v1/admin/' + productId);
    }

    public getProducts(): Observable<any> {
        return this.http.get('/api/v1/admin');
    }
}