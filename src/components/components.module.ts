import { NgModule } from '@angular/core';
import { OrderDetailComponent } from './order-detail/order-detail';
import { CommonModule } from '@angular/common';

@NgModule({
	declarations: [OrderDetailComponent],
	imports: [CommonModule],
	exports: [OrderDetailComponent]
})
export class ComponentsModule {}
