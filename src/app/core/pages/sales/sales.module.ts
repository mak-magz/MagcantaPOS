import { MatTableModule } from '@angular/material/table';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SalesPageRoutingModule } from './sales-routing.module';

import { SalesPage } from './sales.page';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		SalesPageRoutingModule,
		MatTableModule
	],
	declarations: [SalesPage]
})
export class SalesPageModule { }
