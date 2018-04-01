import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AuthProvider } from '../../providers/auth/auth';

import { Order } from '../../models/order';
import { Note } from '../../models/note';

@Injectable()
export class OrderProvider {

    private url: string = 'https://ilgrigioreservation.test.roerroe.com/api/orders/';

    constructor(public http: HttpClient, public auth: AuthProvider) {
        console.log('Hello OrderProvider Provider');
    }

    getOrder(id: any): Observable<Order> {
        return this.http.get<Order>(`${this.url}${id}`, {
            headers: this.auth.getHeaders()
        });
    }

    getNotesFromOrder(id: any): Observable<Note[]> {
        return this.http.get<Note[]>(`${this.url}${id}/notes`, {
            headers: this.auth.getHeaders() 
        });
    }

    addNote(id: any, note: Note): Observable<Note> {
        return this.http.post<Note>(`${this.url}${id}/notes`, note, {
            headers: this.auth.getHeaders()
        })
    }

    getOrderList(options: Object): Observable<Order[]> {
        return this.http.get<Order[]>(this.url, { headers: this.auth.getHeaders(), params: this.auth.generateParams(options) });
    }
}
