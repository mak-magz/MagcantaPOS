import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { ItemDocument } from 'src/app/shared/models/item-document';
import { AlertService } from 'src/app/shared/services/alerts/alert.service';
import { FormService } from 'src/app/shared/services/forms/form.service';
import { ItemService } from 'src/app/shared/services/inventory/item.service';

@Component({
	selector: 'app-edit-item',
	templateUrl: './edit-item.page.html',
	styleUrls: ['./edit-item.page.scss'],
})
export class EditItemPage implements OnInit {

	@Input() item: ItemDocument;

	itemForm: FormGroup;

	constructor(
		private formSvc: FormService,
		private alertService: AlertService,
		private itemService: ItemService,
		private modalCtrl: ModalController) { }

	ngOnInit() {
		this.itemForm = this.formSvc.itemForm(this.item);
		console.log(this.item)
	}

	async saveEdit(updatedItem: ItemDocument) {
		const alert = await this.alertService.confirmAlert("Update document?");
		updatedItem._id = this.item._id;
		updatedItem._rev = this.item._rev;

		if (alert) {
			const { result, error } = await this.itemService.updateItem({ item: updatedItem });

			if (!error) {
				await this.alertService.messageAlert({ header: 'success!', message: 'Item has been updated!' })
				await this.modalCtrl.dismiss();
			} else {
				await this.alertService.messageAlert({ header: 'failed!', message: 'Failed to update item!' })
			}
		}
	}

}
