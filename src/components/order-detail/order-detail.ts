import { Component, Input } from '@angular/core';
import { Order } from '../../models/order';

@Component({
    selector: 'order-detail',
    templateUrl: 'order-detail.html'
})
export class OrderDetailComponent {
    @Input()
    order: Order;

    constructor() {
        console.log('Hello OrderDetailComponent Component');
    }

}
