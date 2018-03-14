import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Order } from '../../models/order';

import { ScanProvider } from '../../providers/scan/scan';
import { OrderProvider } from '../../providers/order/order';

@IonicPage()
@Component({
    selector: 'page-scan',
    templateUrl: 'scan.html',
})
export class ScanPage {
    order: Order;

    constructor(public scanService: ScanProvider, public orderService: OrderProvider, public navCtrl: NavController) {
    }

    ionViewDidLoad() {
    }

    onStartScanning(event) {
        this.scanService.startScanning().then((scanData) => {
            console.log(`Scanned: ${scanData.text}`);
            
            this.orderService.getOrder(scanData.text).subscribe((result) => {
                this.order = result;
            }, (error) => {
                console.log('Something went wrong with retreiving the order', error.text);
            });
        });
    }

}
