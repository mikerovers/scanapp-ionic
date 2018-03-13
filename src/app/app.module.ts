import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { ScanPage } from '../pages/scan/scan';
import { SettingsPage } from '../pages/settings/settings';

import { AuthProvider } from '../providers/auth/auth';
import { ScanProvider } from '../providers/scan/scan';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule } from '@ionic/storage';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Vibration } from '@ionic-native/vibration';
import { HttpClientModule } from '@angular/common/http';
import { Diagnostic } from '@ionic-native/diagnostic';

@NgModule({
    declarations: [
        MyApp,
        HomePage,
        ListPage,
        LoginPage,
        ScanPage,
        SettingsPage
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        IonicModule.forRoot(MyApp),
        IonicStorageModule.forRoot()
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage,
        ListPage,
        ScanPage,
        LoginPage,
        SettingsPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        Diagnostic,
        BarcodeScanner,
        ScanProvider,
        Vibration,
        { provide: ErrorHandler, useClass: IonicErrorHandler },
        AuthProvider,
    ScanProvider
    ]
})
export class AppModule { }
