import { Component } from '@angular/core';
import { IonicPage, NavController, Platform, AlertController } from 'ionic-angular';

import { Order } from '../../models/order';

import { ScanProvider } from '../../providers/scan/scan';
import { OrderProvider } from '../../providers/order/order';
import { Note } from '../../models/note';
import { AuthProvider } from '../../providers/auth/auth';

@IonicPage()
@Component({
    selector: 'page-scan',
    templateUrl: 'scan.html',
})
export class ScanPage {
    order: Order;
    notes: Note[];

    constructor(
        public platform: Platform,
        public auth: AuthProvider,
        public scanService: ScanProvider, 
        public orderService: OrderProvider, 
        public navCtrl: NavController,
        public alertCtrl: AlertController) {
    }

    ionViewCanEnter() {
        this.auth.checkAuthentication()
            .then((result) => {
                return true;
            }).catch((err) => {
                return false;
            });
    }

    showNotAvailableError() {
        let alert = this.alertCtrl.create({
            title: 'Barcode scanner not available',
            buttons: ['Dismiss']
        });

        alert.present();
    }

    onStartScanning(event) {
        // this.scanService.canScan().then((canScan) => {
        //     if(canScan) {
                this.scanService.startScanning().then((scanData) => {
                    console.log(`Scanned: ${scanData.text}`);
                    
                    this.orderService.getOrder(scanData.text).subscribe((result) => {
                        this.order = result;
                        console.log(this.order.contact_information.full_name);
                    }, (error) => {
                        console.log('Something went wrong with retreiving the order', error.text);
                    });

                                    
                    this.orderService.getNotesFromOrder(scanData.text).subscribe((result) => {
                        this.notes = result;
                    }, (error) => {
                        console.log('Something went wrong with retreiving the notes', error.text);
                    });
                });
        //     } else {
        //         this.showNotAvailableError();
        //     }
        // }).catch((err) => {
        //     this.showNotAvailableError();
        // });
    }
}
