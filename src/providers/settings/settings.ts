import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/Rx';
import { Storage } from '@ionic/storage';

@Injectable()
export class SettingsProvider {
    private theme: BehaviorSubject<String>;
    private selectedTheme: String;

    constructor(public storage: Storage) {
        console.log('Hello SettingsProvider Provider');

        this.theme = new BehaviorSubject('dark-theme');
        this.storage.ready().then(() => {
            this.storage.get('theme').then((value) => {
                this.setActiveTheme(value);
            });
        }); 
    }

    setActiveTheme(val) {
        this.theme.next(val);
        this.storage.set('theme', val);
    }

    getActiveTheme() {
        return this.theme.asObservable();
    }
}
