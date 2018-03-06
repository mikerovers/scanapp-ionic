import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { UserCredentials } from '../../models/user-credentials';

@Injectable()
export class AuthProvider {
    token: any;

    constructor(public storage: Storage, public http: HttpClient) {
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

    checkAuthentication(): Promise<any> {
        console.log('Authenticating...');
        return new Promise((resolve, reject) => {
            this.storage.get('token').then((result) => {                
                this.token = result;

                this.http.get('https://ilgrigioreservation.test.roerroe.com/api', {
                    headers: this.getHeaders()
                }).subscribe((res) => {
                    resolve(res);
                }, (err) => {
                    reject(err);
                });
            }).catch((err) => { 
                reject(err);
            });
        });
    }

    login(credentials: UserCredentials): Promise<any> {
        return new Promise((resolve, reject) => {
            let loginHeaders = new HttpHeaders({
                'Content-Type': 'application/json'
            });

            this.http.post<any>('https://ilgrigioreservation.test.roerroe.com/oauth/token', JSON.stringify({
                'grant_type': 'password',
                'client_id': '2',
                'client_secret': 'WGZMN9x7j3OvYdZpXdNGGzwJtydA2vqfSZwjfDA6',
                'username': credentials.email,
                'password': credentials.password,
                'scope': '*'
            }), { headers: loginHeaders })
                .subscribe((res) => {
                    let data = res;
                    this.token = data.access_token;
                    this.storage.set('token', this.token).then((res) => {
                        resolve(this.token);
                    }, (err) => {
                        reject(err);
                    });
                }, (err) => {
                    reject(err);
                });
        });
    }
    
    logout(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.storage.set('token', '').then((res) => {
                resolve(true);
            }, (err) => {
                reject(err);
            });
        });
    }
}
