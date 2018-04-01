import { Injectable } from '@angular/core';
import { Diagnostic } from '@ionic-native/diagnostic';
import { BarcodeScanner, BarcodeScanResult } from '@ionic-native/barcode-scanner';
import { Platform } from 'ionic-angular';
import { Vibration} from '@ionic-native/vibration';

@Injectable()
export class ScanProvider {

    constructor(public vibration: Vibration, public diagnostics: Diagnostic, public platform: Platform, public scanner: BarcodeScanner) {
        console.log('Hello ScanProvider Provider');
    }

    canScan(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.diagnostics.isCameraAuthorized().then((authorized) => {
                console.log(authorized);
                
                if(!authorized) {
                    resolve(false);
                } else {
                    resolve(true);
                }
            }, (error) => {
                reject(error);
            });
        });
    }

    startScanning(): Promise<BarcodeScanResult> {
        return new Promise((resolve, reject) => {
            this.platform.ready().then((readySource) => {
                this.scanner.scan().then((barcodeData) => {
                    this.vibration.vibrate(500);
                    resolve(barcodeData);
                }, (error) => {
                    reject(error);
                });
            });
        });
    }

}
