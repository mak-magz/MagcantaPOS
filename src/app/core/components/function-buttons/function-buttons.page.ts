import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NewItemPage } from 'src/app/shared/components/modals/new-item/new-item.page';

@Component({
  selector: 'app-function-buttons',
  templateUrl: './function-buttons.page.html',
  styleUrls: ['./function-buttons.page.scss'],
})
export class FunctionButtonsPage implements OnInit {

  constructor(
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
  }

  async addNewItem() {
    const modal = await this.modalCtrl.create({ component: NewItemPage });

    await modal.present();
  }

}
