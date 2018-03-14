import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AuthProvider } from '../../providers/auth/auth';

import { Order } from '../../models/order';

@Injectable()
export class OrderProvider {

    constructor(public http: HttpClient, public auth: AuthProvider) {
        console.log('Hello OrderProvider Provider');
    }

    getOrder(id: any): Observable<Order> {
        return this.http.get<Order>(`https://ilgrigioreservation.test.roerroe.com/api/orders/${id}`, {
            headers: this.auth.getHeaders()
        });
    }

}
