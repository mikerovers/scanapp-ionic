import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { LoginPage } from '../login/login';

import { SettingsProvider } from '../../providers/settings/settings';

@IonicPage()
@Component({
    selector: 'page-settings',
    templateUrl: 'settings.html',
})
export class SettingsPage {
    selectedTheme: String;

    constructor(public settings: SettingsProvider, public navCtrl: NavController, public authProvider: AuthProvider) {
        this.settings.getActiveTheme().subscribe((val) => {
            this.selectedTheme = val;
        });
    }

    toggleAppTheme() {
        if (this.selectedTheme === 'dark-theme') {
            this.settings.setActiveTheme('light-theme');
        } else {
            this.settings.setActiveTheme('dark-theme');
        }
    }

    logout() {
        this.authProvider.logout().then((res) => {
            this.navCtrl.setRoot(LoginPage);
        }); 
    }
}
