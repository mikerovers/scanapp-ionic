import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    constructor(public storage: Storage, public navCtrl: NavController) {
        storage.set('hey', 'doei');

        storage.get('hey').then((val) => {
            console.log(val);
            
        });
    }

}
