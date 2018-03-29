import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, NavController, AlertController, App } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/login/login';
import { ScanPage } from '../pages/scan/scan';
import { SettingsPage } from '../pages/settings/settings';
import { EventListPage } from '../pages/event-list/event-list';
import { OneSignal } from '@ionic-native/onesignal';

import { SettingsProvider } from '../providers/settings/settings';
import { AuthProvider } from '../providers/auth/auth';

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;

    rootPage: any = LoginPage;
    selectedTheme: String;
    pages: Array<{ title: string, component: any }>;

    constructor(public platform: Platform, 
        public statusBar: StatusBar, 
        public splashScreen: SplashScreen, 
        public oneSignal: OneSignal, 
        public settings: SettingsProvider, 
        public auth: AuthProvider,
        public alertCtrl: AlertController,
        public app: App
    ) {
        // Initialize theming.
        this.settings.getActiveTheme().subscribe((val) => {
            this.selectedTheme = val;
        });

        this.initializeApp();

        // used for an example of ngFor and navigation
        this.pages = [
            { title: 'Scan', component: ScanPage },
            { title: 'Events', component: EventListPage },
            { title: 'Settings', component: SettingsPage }
        ];

    }

    gotoScanPage() {
        this.auth.checkAuthentication().then((res) => {
            this.app.getActiveNav().setRoot(ScanPage);
        }).catch((err) => {
            this.app.getActiveNav().setRoot(LoginPage);
        });
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
            if (this.platform.is('windows')) {
                this.oneSignal.startInit('474ee522-5530-4a2d-8cb5-59ec54a44af3', '584570705732');
                this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);
                this.oneSignal.handleNotificationReceived().subscribe(notification => {
                    if (notification.isAppInFocus) {
                        let alert = this.alertCtrl.create({
                            title: 'Start scanning?',
                            message: 'Do you want to open the scan page?',
                            buttons: [
                                {
                                    text: 'No',
                                    role: 'cancel',
                                }, 
                                {
                                    text: 'Open',
                                    handler: () => {
                                        this.gotoScanPage();
                                    }
                                }
                            ]
                        });
                    } else {
                        this.gotoScanPage();
                    }
                });
                this.oneSignal.handleNotificationOpened().subscribe(openEvent => {
                    this.auth.checkAuthentication().then((res) => {
                        this.gotoScanPage();
                    }).catch((err) => {
                        this.gotoScanPage();
                    });
                });
                this.oneSignal.endInit();
            }
        });
    }


    openPage(page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    }
}
