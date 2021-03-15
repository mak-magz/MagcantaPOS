import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Item } from 'src/app/shared/models/Item';
import { ItemService } from 'src/app/shared/services/inventory/item.service';
import { map } from 'rxjs/operators'
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

	constructor(private itemSvc: ItemService) { }

	ngOnInit() {
		this.itemDataSub = this.itemSvc._allItems.subscribe((data) => {
			if (data) {
				console.log('item list: ', data);
			}
		});

		this.dataSource = this.itemSvc._allItems.pipe(map(data => { return data }))
	}

	/* Getters */

	get _displayedColumns(): String[] {
		return this.displayedColumns;
	}

	get _dataSource(): Observable<Item[]> {
		return this.dataSource;
	}
}
