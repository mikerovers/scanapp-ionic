import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Order } from '../../models/order';

import { ScanProvider } from '../../providers/scan/scan';
import { OrderProvider } from '../../providers/order/order';
import { AddNotePage } from '../add-note/add-note';
import { Note } from '../../models/note';
import { AuthProvider } from '../../providers/auth/auth';
import { LoginPage } from '../login/login';

@IonicPage()
@Component({
    selector: 'page-scan',
    templateUrl: 'scan.html',
})
export class ScanPage {
    order: Order;
    notes: Note[];

    constructor(public auth: AuthProvider, public scanService: ScanProvider, public orderService: OrderProvider, public navCtrl: NavController) {
    }

    ionViewDidLoad() {
        this.orderService.getOrder(2).subscribe(result => {
            this.order = result;
        })
   
        this.orderService.getNotesFromOrder(2).subscribe((result) => {
            this.notes = result;
        }, (error) => {
            console.log('Something went wrong with retreiving the notes', error.text);
        });
    }

    ionViewCanEnter() {
        this.auth.checkAuthentication()
            .then((result) => {
                return true;
            }).catch((err) => {
                return false;
            });
    }

    onStartScanning(event) {
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
                console.log(result);
                
            }, (error) => {
                console.log('Something went wrong with retreiving the notes', error.text);
            });
        });
    }

}
