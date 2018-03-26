import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { Order } from '../../models/order';
import { Note } from '../../models/note';
import { OrderProvider } from '../../providers/order/order';

@IonicPage()
@Component({
    selector: 'page-add-note',
    templateUrl: 'add-note.html',
})
export class AddNotePage {
    public note: FormGroup;
    public order: Order;
    public notes: Note[];

    constructor(public formBuilder: FormBuilder, public orderProvider: OrderProvider, public navParams: NavParams, public navCtrl: NavController) {
        this.order = this.navParams.get('order');
        this.notes = this.navParams.get('notes');

        this.note = this.formBuilder.group({
            text: ['notetext', Validators.compose([
                Validators.required,
                Validators.minLength(1)
            ])]
        });
    }

    submitNote() {
        let note: Note = {
            note_text: this.note.value.text
        }

        this.orderProvider.addNote(this.order.id, note).subscribe((result) => {
            this.notes.push({
                'id': result.id,
                'note_text': result.note_text,
                'created_at': result.created_at
            });

            this.navCtrl.pop();
        });
    }
}
