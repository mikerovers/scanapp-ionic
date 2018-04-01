import { Component } from '@angular/core';
import { IonicPage, NavController, Loading, LoadingController } from 'ionic-angular';

import { AuthProvider } from '../../providers/auth/auth';
import { ScanPage } from '../scan/scan';
import { UserCredentials } from '../../models/user-credentials';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class LoginPage {
    email: String;
    password: String;
    loader: Loading;

    constructor(public navCtrl: NavController, public authProvider: AuthProvider, public loadingCtrl: LoadingController) {
        this.createLoader();
    }

    ionViewDidLoad() {
        this.loader.present();

        this.authProvider.checkAuthentication().then((res) => {
            console.log('User is authenticated');
            this.loader.dismiss();
            this.navCtrl.setRoot(ScanPage);
        }, (errr) => {
            console.error('User not authenticated');
            this.loader.dismiss();
        });
    }

    login() {
        let credentials: UserCredentials = {
            email: this.email,
            password: this.password
        }

        this.authProvider.login(credentials).then((result) =>  {
            this.loader.dismiss();
            this.navCtrl.setRoot(ScanPage);
        }, (err) => {
            this.loader.dismiss();
            console.error('User credentials are not correctx§');
        });
    }

    createLoader() {
        this.loader = this.loadingCtrl.create({
            content: 'Authenticating...'
        });
    }
}
