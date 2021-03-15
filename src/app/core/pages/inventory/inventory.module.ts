import { EditItemPageModule } from './../../../shared/components/modals/edit-item/edit-item.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InventoryPageRoutingModule } from './inventory-routing.module';

import { InventoryPage } from './inventory.page';

import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		InventoryPageRoutingModule,
		MatTableModule,
		MatFormFieldModule,
		EditItemPageModule
	],
	declarations: [InventoryPage]
})
export class InventoryPageModule { }
