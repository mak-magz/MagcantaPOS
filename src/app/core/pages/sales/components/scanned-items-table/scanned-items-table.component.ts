import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SalesService } from 'src/app/core/services/sales/sales.service';
import { ItemDocument } from 'src/app/shared/models/item-document';
import { SaleItem } from 'src/app/shared/models/sale-item';
import { ItemService } from 'src/app/shared/services/inventory/item.service';

@Component({
	selector: 'app-scanned-items-table',
	templateUrl: './scanned-items-table.component.html',
	styleUrls: ['./scanned-items-table.component.scss'],
})
export class ScannedItemsTableComponent implements OnInit {
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
	dataSource: Observable<SaleItem[]>
	transaction: Observable<any>;
	constructor(
		private itemService: ItemService,
		private salesService: SalesService
	) { }

	ngOnInit() {
		this.dataSource = this.salesService._allScannedItems.pipe(map(data => {
			console.log("data", data)
			this.salesService.processTransaction(data);
			return data
		}))

		this.transaction = this.salesService._transaction;
	}

	async scanItem() {
		const id = this.randomID();
		console.log(id)
		const { result, error } = await this.itemService.searchItem(id);

		if (result.docs.length > 0) {
			const item = result.docs[0];
			this.salesService.addItem(item as ItemDocument)
		} else {
			console.log("item not found")
		}
	}

	randomID() {
		return Math.floor(Math.random() * 11);
	}

}
