import { Component, Input } from '@angular/core';

import { Order } from '../../models/order';
import { Note, NavController } from 'ionic-angular';
import { AddNotePage } from '../../pages/add-note/add-note';

@Component({
    selector: 'order-detail',
    templateUrl: 'order-detail.html'
})
export class OrderDetailComponent {
    @Input()
    order: Order;
    @Input()
    notes: Note[]

    constructor(public navCtrl: NavController) {
    }

    openAddNotePage() {
        this.navCtrl.push(AddNotePage, {
            order: this.order,
            notes: this.notes
        });
    }
}
