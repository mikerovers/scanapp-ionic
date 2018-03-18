import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { Event } from '../../models/event';
import { AuthProvider } from '../auth/auth';

@Injectable()
export class EventProvider {

    private url: string = 'https://ilgrigioreservation.test.roerroe.com/api/events';

    constructor(public http: HttpClient, public authProvider: AuthProvider) {
        console.log('Hello EventProvider Provider');
    }

    getEventList(options: Object): Observable<Event[]> {
        return this.http.get<Event[]>(this.url, { headers: this.authProvider.getHeaders(), params: this.authProvider.generateParams(options) });
    }

    getEvent(id: number): Observable<Event> {
        const url: string = `${this.url}/${id}`;
        return this.http.get<Event>(url, { headers: this.authProvider.getHeaders() });
    }
}