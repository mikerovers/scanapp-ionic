import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { ScanPage } from '../pages/scan/scan';
import { SettingsPage } from '../pages/settings/settings';
import { AddNotePage } from '../pages/add-note/add-note';

import { ComponentsModule } from '../components/components.module';

import { AuthProvider } from '../providers/auth/auth';
import { ScanProvider } from '../providers/scan/scan';
import { OrderProvider } from '../providers/order/order';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule } from '@ionic/storage';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Vibration } from '@ionic-native/vibration';
import { HttpClientModule } from '@angular/common/http';
import { EventProvider } from '../providers/event/event';
import { EventListPage } from '../pages/event-list/event-list';
import { Diagnostic } from '@ionic-native/diagnostic';
import { AppPreferences } from '@ionic-native/app-preferences';
import { FormBuilder } from '@angular/forms';
import { SocialSharing } from '@ionic-native/social-sharing';
import { OneSignal } from '@ionic-native/onesignal';
import { SettingsProvider } from '../providers/settings/settings';

@NgModule({
    declarations: [
        MyApp,
        AddNotePage,
        LoginPage,
        SettingsPage,
        EventListPage,
        ScanPage,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        ComponentsModule,
        IonicModule.forRoot(MyApp),
        IonicStorageModule.forRoot()
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        AddNotePage,
        ScanPage,
        LoginPage,
        SettingsPage,
        EventListPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        Diagnostic,
        SettingsProvider,
        FormBuilder,
        BarcodeScanner,
        ScanProvider,
        Vibration,
        AppPreferences,
        { provide: ErrorHandler, useClass: IonicErrorHandler },
        AuthProvider,
        EventProvider,
        ScanProvider,
        OrderProvider,
        SocialSharing,
        OneSignal
    ]
})
export class AppModule { }
