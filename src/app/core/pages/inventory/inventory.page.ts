import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Item } from 'src/app/shared/models/Item';
import { ItemService } from 'src/app/shared/services/inventory/item.service';
import { map } from 'rxjs/operators'
import { AlertService } from 'src/app/shared/services/alerts/alert.service';
@Component({
	selector: 'app-inventory',
	templateUrl: './inventory.page.html',
	styleUrls: ['./inventory.page.scss'],
})
export class InventoryPage implements OnInit {

	itemDataSub: Subscription;
	private dataSource: Observable<Item[]>;
	private displayedColumns: string[] = [
		"barcode",
		"name",
		"quantity",
		"unit",
		"price",
		"discount",
		"op",
	];

	constructor(private itemSvc: ItemService, private alertService: AlertService) { }

	ngOnInit() {
		this.dataSource = this.itemSvc._allItems.pipe(map(data => { return data }))
	}

	async deleteItem(docID: string, docRev: string): Promise<void> {
		const confirm: boolean = await this.alertService.confirmAlert('Delete this item?')
		if (confirm) {
			const { result, error } = await this.itemSvc.deleteItem({ _id: docID, _rev: docRev })
		}
	}

	/* Getters */

	get _displayedColumns(): String[] {
		return this.displayedColumns;
	}

	get _dataSource(): Observable<Item[]> {
		return this.dataSource;
	}
}
