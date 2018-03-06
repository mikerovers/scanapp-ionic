import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  constructor(public navCtrl: NavController, public authProvider: AuthProvider ) {
  }

  logout() {
      this.authProvider.logout().then((res) => {
          this.navCtrl.setRoot(LoginPage);
      });
  }
}
