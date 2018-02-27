import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { IlgrigioProvider } from '../../providers/ilgrigio/ilgrigio';

@IonicPage()
@Component({
    selector: 'page-event-list',
    templateUrl: 'event-list.html',
})
export class EventListPage {

    constructor(private ilgrigio: IlgrigioProvider) {
    }

    ionViewDidLoad() {
        this.ilgrigio.getEvents({
            'limit': 2
        }).subscribe((result) => {
            console.log(result);
        });
    }

}
