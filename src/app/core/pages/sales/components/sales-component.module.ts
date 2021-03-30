import { MatTableModule } from '@angular/material/table';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScannedItemsTableComponent } from './scanned-items-table/scanned-items-table.component';



@NgModule({
	declarations: [
		ScannedItemsTableComponent
	],
	imports: [
		CommonModule,
		IonicModule,
		MatTableModule
	],
	exports: [
		ScannedItemsTableComponent
	]
})
export class SalesComponentModule { }
