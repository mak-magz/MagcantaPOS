import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NewItemPage } from 'src/app/shared/components/modals/new-item/new-item.page';
import { ItemService } from 'src/app/shared/services/inventory/item.service';

@Component({
  selector: 'app-function-buttons',
  templateUrl: './function-buttons.page.html',
  styleUrls: ['./function-buttons.page.scss'],
})
export class FunctionButtonsPage implements OnInit {

  constructor(
    private modalCtrl: ModalController,
    private itemSvc: ItemService
  ) { }

  ngOnInit() {
  }

  async addNewItem() {
    const modal = await this.modalCtrl.create({ component: NewItemPage });

    await modal.present();

    const { data: newItem } = await modal.onDidDismiss();

    if (newItem) {
      const { result: searchRes } = await this.itemSvc.searchItem(newItem.barcode);
      if (searchRes.docs.length > 0) {
        console.error("Item already exists! :", searchRes.docs)
      } else {
        const { result, error } = await this.itemSvc.addItem({ ...newItem })
        if (result.ok) {
          console.log("Item has been added");
        } else {
          console.error("Document creation failed: ", result);
          console.error("Error Code: ", error);
        }
      }
    }
  }

}
