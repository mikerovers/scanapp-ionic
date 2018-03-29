import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { EventProvider } from '../../providers/event/event';
import { Event } from '../../models/event';
import { AuthProvider } from '../../providers/auth/auth';
import { LoginPage } from '../login/login';

@IonicPage()
@Component({
    selector: 'page-event-list',
    templateUrl: 'event-list.html',
})
export class EventListPage implements OnInit {
    events: Event[] = [];
    page: number = 1;
    perPage: number = 15;
    pageStart: number = 0;
    pageEnd: number = this.page * this.perPage;

    constructor(public auth: AuthProvider, public navCtrl: NavController, public navParams: NavParams, public eventProvider: EventProvider) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad EventListPage');
    }

    ionViewCanEnter() {
        this.auth.checkAuthentication()
            .then((result) => {
                return true;
            }).catch((err) => {
                this.navCtrl.setRoot(LoginPage);
                return false;
            });
    }

    getEventList(): Promise<any> {
        const options: object = {
            limit: this.perPage,
            offset: this.pageStart
        };
        return new Promise((resolve, reject) => {
            this.eventProvider.getEventList(options).subscribe(result => {{
                resolve(result);
            }});
        });
    }

    ngOnInit(): void {
        this.getEventList().then((result) => {
           this.fillEventList(result);
        });
    }

    goToEventDetailPage(event: Event): void {
        this.navCtrl.push('event', {
            'event': event
        });
    }

    fillEventList(result): void {
        for(let i = 0; i < result.length; i++){
            this.events.push(result[i]);
        }   
    }

    doInfinite(infiniteScroll): void {
        this.pageStart = this.pageEnd + 1;
        this.page++;
        this.pageEnd = this.page * this.perPage;
        this.getEventList().then((result) => {
            this.fillEventList(result);
            infiniteScroll.complete();
        });
    }
}
