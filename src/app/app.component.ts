import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { OneSignal } from '@ionic-native/onesignal';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { ScanPage } from '../pages/scan/scan';
import { SettingsPage } from '../pages/settings/settings';
import { EventListPage } from '../pages/event-list/event-list';

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;

    rootPage: any = LoginPage;

    pages: Array<{ title: string, component: any }>;

    constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public oneSignal: OneSignal) {
        this.initializeApp();

        this.platform.ready().then(() => {
            this.oneSignal.startInit('6d28f287-f28c-4e4e-a850-7c31e5b77ffa', '127142718117');
            this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);

            this.oneSignal.handleNotificationReceived().subscribe((notification) => {
                if(notification.isAppInFocus) {
                    console.log('In focus', notification);
                } else {
                    console.log('Not in focus', notification);
                    
                }
            });

            this.oneSignal.handleNotificationOpened().subscribe((openEvent) => {

            });

            this.oneSignal.endInit();
        });

        // used for an example of ngFor and navigation
        this.pages = [
            { title: 'Home', component: HomePage },
            { title: 'Scan', component: ScanPage },
            { title: 'List', component: ListPage },
            { title: 'Events', component: EventListPage },
            { title: 'Settings', component: SettingsPage }
        ];

    }

    initializeApp() {
        this.platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }

    openPage(page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    }
}
