import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class AuthProvider {
    token: any;

    constructor(private http: HttpClient, private storage: Storage) {
    }

    getHeaders(): HttpHeaders {
        return new HttpHeaders({
            'Authorization': `Bearer ${this.token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        });
    }

    generateParams(options: Object): HttpParams {
        let params = new HttpParams();
        Object.keys(options).forEach((key) => {
            params = params.set(key, options[key]);
        });

        return params;
    }

    checkAuthentication(params: any[]) {
        return new Promise((resolve, reject) => {
            this.storage.get('token').then(result => { 
                this.token = result; 

                this.http.get('https://ilgrigioreservation.test.roerroe.com/api', {
                    headers: this.getHeaders(),
                })
                    .subscribe(res => {
                        resolve(res);
                    }, (err) => {
                        reject(err);
                    });
            });
        });
    }

    login(credentials) {
        return new Promise((resolve, reject) => {
            let headers = new HttpHeaders({
                'Content-Type': 'application/json'
            });

            this.http.post<any>('https://ilgrigioreservation.test.roerroe.com/oauth/token', JSON.stringify({
                'grant_type': 'password',
                'client_id': '2',
                'client_secret': 'WGZMN9x7j3OvYdZpXdNGGzwJtydA2vqfSZwjfDA6',
                'username': credentials.email,
                'password': credentials.password,
                'scope': '*'
            }), { headers: headers })
                .subscribe(res => {
                    let data = res
                    this.token = data.access_token;
                    this.storage.set('token', data.access_token);

                    resolve(data);
                    resolve(res);
                }, (err) => {
                    console.error(err);
                    reject(err);
                });
        });
    }

    logout() {
        this.storage.set('token', '');
    }
}
