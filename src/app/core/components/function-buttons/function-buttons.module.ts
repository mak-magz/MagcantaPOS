import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FunctionButtonsPage } from './function-buttons.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  declarations: [FunctionButtonsPage],
  exports: [FunctionButtonsPage]
})
export class FunctionButtonsPageModule {}
