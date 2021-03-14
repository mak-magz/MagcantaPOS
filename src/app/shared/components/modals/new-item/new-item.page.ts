import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Item } from 'src/app/shared/models/Item';
import { FormService } from 'src/app/shared/services/forms/form.service';

@Component({
  selector: 'app-new-item',
  templateUrl: './new-item.page.html',
  styleUrls: ['./new-item.page.scss'],
})
export class NewItemPage implements OnInit {

  itemForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private modalCtrl: ModalController,
    private formSvc: FormService
  ) { }

  ngOnInit() {
    this.itemForm = this.formSvc.itemForm();
  }

  async addItem(itemData: Item) {
    await this.modalCtrl.dismiss({
      ...itemData,
    });
  }

}
