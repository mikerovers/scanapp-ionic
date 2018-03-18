import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OnInit } from '@angular/core';

import { EventProvider } from '../../providers/event/event';
import { Event } from '../../models/event';

@IonicPage()
@Component({
    selector: 'page-event-list',
    templateUrl: 'event-list.html',
})
export class EventListPage implements OnInit {
    events: Event[] = [];
    page: number = 1;
    perPage: number = 10;
    pageStart: number = 0;
    pageEnd: number = this.page * this.perPage;
    total: number; 

    constructor(public navCtrl: NavController, public navParams: NavParams, public eventProvider: EventProvider) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad EventListPage');
    }

    getEventList(): void {
        const options = {
            limit: this.perPage,
            offset: this.pageStart
        };
        console.log(options);
        this.eventProvider.getEventList(options).subscribe(result => {{
            for(let i = 0; i < result.length; i++){
                this.events.push(result[i]);
            }
        }});
    }

    ngOnInit(): void {
        this.getEventList();
    }

    goToEventDetailPage(event: Event): void {
        this.navCtrl.push('event', {
            'event': event
        })
    }

    doInfinite(infiniteScroll): void {
        this.pageStart = this.pageEnd + 1;
        this.page++;
        this.pageEnd = this.page * this.perPage;
        setTimeout(() => {
            this.getEventList();
            infiniteScroll.complete();
          }, 1000);
    }
}
