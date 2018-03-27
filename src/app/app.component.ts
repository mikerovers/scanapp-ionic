import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { ScanPage } from '../pages/scan/scan';
import { SettingsPage } from '../pages/settings/settings';
import { EventListPage } from '../pages/event-list/event-list';
import { OneSignal } from '@ionic-native/onesignal';

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;

    rootPage: any = LoginPage;

    pages: Array<{ title: string, component: any }>;

    constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private oneSignal: OneSignal) {
        this.initializeApp();

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
            if (this.platform.is('android')) {
                this.oneSignal.startInit('474ee522-5530-4a2d-8cb5-59ec54a44af3', '584570705732');
                this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);
                this.oneSignal.handleNotificationReceived().subscribe(notification => {
                    if (notification.isAppInFocus) {
                        // vraag de gebruiker of hij in wil gaan op de notificatie. 
                    } else {
                        // de gebruiker klikte op een notificatie en wil sowieso naar je item navigeren (optie 1). 
                    }
                });
                this.oneSignal.handleNotificationOpened().subscribe(openEvent => {
                    // de gebruiker klikte op een notificatie en wil sowieso naar je item navigeren (optie 2). this.nav.setRoot(TabsPage, { tabname: openEvent.notification.payload.additionalData.tabname }); 
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
