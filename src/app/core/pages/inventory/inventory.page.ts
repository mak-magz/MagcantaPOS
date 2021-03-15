import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Item } from 'src/app/shared/models/Item';
import { ItemService } from 'src/app/shared/services/inventory/item.service';
import { map } from 'rxjs/operators'
import { AlertService } from 'src/app/shared/services/alerts/alert.service';
import { ModalController } from '@ionic/angular';
import { EditItemPage } from 'src/app/shared/components/modals/edit-item/edit-item.page';
import { ItemDocument } from 'src/app/shared/models/item-document';
@Component({
	selector: 'app-inventory',
	templateUrl: './inventory.page.html',
	styleUrls: ['./inventory.page.scss'],
})
export class InventoryPage implements OnInit {

	itemDataSub: Subscription;
	private dataSource: Observable<ItemDocument[]>;
	private displayedColumns: string[] = [
		"barcode",
		"name",
		"quantity",
		"unit",
		"price",
		"discount",
		"op",
	];

	constructor(private itemSvc: ItemService, private alertService: AlertService, private modalCtrl: ModalController) { }

	ngOnInit() {
		this.dataSource = this.itemSvc._allItems.pipe(map(data => { return data }))
	}

	async deleteItem(docID: string, docRev: string): Promise<void> {
		const confirm: boolean = await this.alertService.confirmAlert('Delete this item?')
		if (confirm) {
			const { result, error } = await this.itemSvc.deleteItem({ _id: docID, _rev: docRev })

			if (!error) {
				await this.alertService.messageAlert({ header: 'success!', message: 'Item has been deleted!' })
			} else {
				await this.alertService.messageAlert({ header: 'failed!', message: 'An error occured while trying to delete the item.' })
			}
		}
	}

	async editItem(item: Item) {
		const editModal = await this.modalCtrl.create({ component: EditItemPage, componentProps: { item: item } })

		await editModal.present();
	}

	/* Getters */

	get _displayedColumns(): String[] {
		return this.displayedColumns;
	}

	get _dataSource(): Observable<Item[]> {
		return this.dataSource;
	}
}
