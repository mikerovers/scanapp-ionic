import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";

import { AuthProvider } from '../../providers/auth/auth';

@Injectable()
export class IlgrigioProvider {

    constructor(private http: HttpClient, private auth: AuthProvider) {
    }

    public getEvents(options = {}): Observable<any[]> {
        return this.http.get<any[]>('https://ilgrigioreservation.test.roerroe.com/api/events', {
            headers: this.auth.getHeaders(),
            params: this.auth.generateParams(options)
        });
    }

}
