import { NgModule } from '@angular/core';
import { OrderDetailComponent } from './order-detail/order-detail';
import { IonicModule } from 'ionic-angular'
import { CommonModule } from '@angular/common';

@NgModule({
	declarations: [OrderDetailComponent],
	imports: [CommonModule, IonicModule],
	exports: [OrderDetailComponent]
})
export class ComponentsModule {}
