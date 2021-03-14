import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FunctionButtonsPage } from './function-buttons.page';
import { NewItemPageModule } from 'src/app/shared/components/modals/new-item/new-item.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewItemPageModule
  ],
  declarations: [FunctionButtonsPage],
  exports: [FunctionButtonsPage],
})
export class FunctionButtonsPageModule { }
