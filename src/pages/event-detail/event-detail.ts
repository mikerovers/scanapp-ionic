import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OnInit} from '@angular/core';

import { Event } from '../../models/event';
import { EventProvider } from '../../providers/event/event';

@IonicPage({
    name: 'event',
    segment: 'event/:id'
})
@Component({
    selector: 'page-event-detail',
    templateUrl: 'event-detail.html',
})
export class EventDetailPage implements OnInit {
    eventId: number;
    event: Event;

    constructor(public navCtrl: NavController, public navParams: NavParams, public eventProvider: EventProvider) {
        this.eventId = this.navParams.get('id');
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad EventDetailPage');
    }

    getEvent(id: number): void {
        this.eventProvider.getEvent(id).subscribe(result => this.event = result);
    }

    ngOnInit(): void {
        this.getEvent(this.eventId);
    }
}
