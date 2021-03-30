import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ItemService } from 'src/app/shared/services/inventory/item.service';
import { ItemDocument } from 'src/app/shared/models/item-document';
import { SalesService } from '../../services/sales/sales.service';

@Component({
	selector: 'app-sales',
	templateUrl: './sales.page.html',
	styleUrls: ['./sales.page.scss'],
})
export class SalesPage implements OnInit {
	displayedColumns: string[] = [
		"item",
		"quantity",
		"unit",
		"price",
		"discount",
		"total",
	];

	sales = {
		subTotal: 0,
		discount: 0,
		tax: 0,
		totalItems: 0,
		netTotal: 0,
	};

	displayedFooter: string[] = ["sub", "total"];
	dataSource: Observable<ItemDocument[]>
	constructor(
		private itemService: ItemService,
		private salesService: SalesService
	) { }

	ngOnInit() {
		this.dataSource = this.salesService._allScannedItems.pipe(map(data => { return data }))
	}

	async scanItem() {
		const id = this.randomID();
		console.log(id)
		const { result, error } = await this.itemService.searchItem(id);

		if (result.docs.length > 0) {
			const item = result.docs[0];
			this.salesService.addItem(item)
		} else {
			console.log("item not found")
		}
	}

	randomID() {
		return Math.floor(Math.random() * 11);
	}

}
