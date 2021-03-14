import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Item } from 'src/app/shared/models/Item';
import { AlertService } from 'src/app/shared/services/alerts/alert.service';
import { FormService } from 'src/app/shared/services/forms/form.service';
import { ItemService } from 'src/app/shared/services/inventory/item.service';

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
		private formSvc: FormService,
		private itemSvc: ItemService,
		private alertSvc: AlertService
	) { }

	ngOnInit() {
		this.itemForm = this.formSvc.itemForm();
	}

	async addItem(newItem: Item) {
		if (newItem) {
			const { result: searchRes } = await this.itemSvc.searchItem(newItem.barcode);
			if (searchRes.docs.length > 0) {
				await this.alertSvc.messageAlert({ header: 'failed!', message: 'Item already exist!' })
			} else {
				const { result, error } = await this.itemSvc.addItem({ ...newItem })
				if (result.ok) {
					console.log("Item has been added");
					await this.alertSvc.messageAlert({ header: 'success!', message: 'Item has been added!' });
					await this.modalCtrl.dismiss();
				} else {
					await this.alertSvc.messageAlert({ header: 'failed', message: 'Something went wrong!\n Please contact admin!' })
					console.error("Document creation failed: ", result);
					console.error("Error Code: ", error);
				}
			}
		}
	}

}
