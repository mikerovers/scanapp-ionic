import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Event } from '../../models/event';
import { Order } from '../../models/order';
import { OrderProvider } from '../../providers/order/order';
import { SocialSharing } from '@ionic-native/social-sharing';
import _ from 'lodash';

@IonicPage({
    name: 'event',
    segment: 'event/:event'
})
@Component({
    selector: 'page-event-detail',
    templateUrl: 'event-detail.html',
})
export class EventDetailPage implements OnInit {
    event: Event;
    orders: Order[] = [];
    page: number = 1;
    perPage: number = 15;
    pageStart: number = 0;
    pageEnd: number = this.page * this.perPage;
    size: number = 0;

    constructor(public navCtrl: NavController, public navParams: NavParams, public orderProvider: OrderProvider, private socialSharing: SocialSharing) {
        this.event = this.navParams.get('event');
        this.size = _.size(this.event.contingents);
    }

    ngOnInit(): void {
        this.getOrderList().then((result) => {
            this.fillOrdersList(result);  
        });
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad EventDetailPage');
    }

    getOrderList(): Promise<any> {
        const options: object = {
            limit: this.perPage,
            offset: this.pageStart
        };
        return new Promise((resolve, reject) => {
            this.orderProvider.getOrderList(options).subscribe(result => {{
                resolve(result);
            }});
        });
    }

    fillOrdersList(result): void {
        for(let i = 0; i < result.length; i++){
            if(result[i].validated != 0) {
                if(result[i].event_id == this.event.id){
                    this.orders.push(result[i]); 
                }
            }
        }   
    }

    doInfinite(infiniteScroll): void {
        this.pageStart = this.pageEnd + 1;
        this.page++;
        this.pageEnd = this.page * this.perPage;    
        this.getOrderList().then((result) => {
            this.fillOrdersList(result);  
            infiniteScroll.complete();
        });
    }

    getMessage(): string {
        let message: string = '';
        let title = this.event.name.toUpperCase();
        for(let i = 0; i < this.size; i++){
            message += `Event ${title} has ${this.event.contingents[i].available} places left at section ${this.event.contingents[i].name}. \n`;
        }
        return message; 
    }

    whatsAppShare(): void {
        let message: string = this.getMessage();
        this.socialSharing.shareViaWhatsApp(message, null);
    }

    facebookShare(): void {
        let message: string = this.getMessage();
        this.socialSharing.shareViaFacebookWithPasteMessageHint(message, null, null, message);
    }

    twitterShare(): void {
        let message: string = this.getMessage();
        this.socialSharing.shareViaTwitter(message, null, null);
    }
}
