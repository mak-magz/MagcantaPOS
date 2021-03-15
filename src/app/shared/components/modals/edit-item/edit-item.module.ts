import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditItemPage } from './edit-item.page';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
	],
	declarations: [EditItemPage],
	exports: [EditItemPage]
})
export class EditItemPageModule { }
