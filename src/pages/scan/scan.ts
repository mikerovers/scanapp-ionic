import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ScanProvider } from '../../providers/scan/scan';

@IonicPage()
@Component({
    selector: 'page-scan',
    templateUrl: 'scan.html',
})
export class ScanPage {

    constructor(public scan: ScanProvider, public navCtrl: NavController) {
    }

    ionViewDidLoad() {
        
    }

    onStartScanning(event) {
        this.scan.startScanning().then((scanData) => {
            console.log(`Scanned: ${scanData.text}`);
        });
    }

}
