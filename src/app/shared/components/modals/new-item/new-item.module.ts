import { NewItemPage } from 'src/app/shared/components/modals/new-item/new-item.page';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewItemPageRoutingModule } from './new-item-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewItemPageRoutingModule
  ],
  declarations: [NewItemPage],
  exports: [NewItemPage]
})
export class NewItemPageModule { }
