import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NewItemPage } from 'src/app/shared/components/modals/new-item/new-item.page';
import { AlertService } from 'src/app/shared/services/alerts/alert.service';
import { ItemService } from 'src/app/shared/services/inventory/item.service';

@Component({
  selector: 'app-function-buttons',
  templateUrl: './function-buttons.page.html',
  styleUrls: ['./function-buttons.page.scss'],
})
export class FunctionButtonsPage implements OnInit {

  constructor(
    private alertSvc: AlertService,
    private modalCtrl: ModalController,
    private itemSvc: ItemService
  ) { }

  ngOnInit() {
  }

  async addNewItem() {
    const modal = await this.modalCtrl.create({ component: NewItemPage });

    await modal.present();
  }

}
