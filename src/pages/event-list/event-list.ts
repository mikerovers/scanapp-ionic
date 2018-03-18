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
    selectedEvent: Event;
    events: Event[] = [];
    page: number = 1;
    perPage: number = 10;
    pageStart: number = 0;
    total: number; 

    constructor(public navCtrl: NavController, public navParams: NavParams, public eventProvider: EventProvider) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad EventListPage');
    }

    getEventList(): void {
        this.eventProvider.getEventList().subscribe(result => {{
            this.total = result.length;
            console.log(this.total);
            for(let i = this.pageStart; i < (this.page*this.perPage); i++){
                if(i < this.total){
                    this.events.push(result[i]);
                }       
            }
        }}
    );
    }

    ngOnInit(): void {
        this.getEventList();
    }

    goToEventDetailPage(event: Event): void {
        this.navCtrl.push('event', {
            'id': event.id
        })
    }

    doInfinite(infiniteScroll): void {
        this.pageStart = (this.page*this.perPage) + 1;
        this.page++;
        console.log(this.pageStart);
        console.log(this.perPage);
        setTimeout(() => {
            this.getEventList();
            infiniteScroll.complete();
          }, 500);
    }
}
