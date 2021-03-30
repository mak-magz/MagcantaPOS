import { ItemDocument } from 'src/app/shared/models/item-document';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class SalesService {

	private scannedItems$ = new BehaviorSubject([]);

	constructor() { }

	get _allScannedItems(): Observable<ItemDocument[]> {
		return this.scannedItems$.asObservable()
	}

	async addItem(item: ItemDocument) {
		const itemIndex = this.checkItem(item.barcode)

		if (itemIndex < 0) {
			// Item does not exist in the array
			// push the item
			this.scannedItems$.next([item, ...this.scannedItems$.value])
		} else {
			// Item exists
			// update the quantity
			// then update the datastore
			const scannedItems = [...this.scannedItems$.value];
			scannedItems[itemIndex]["quantity"] += item.quantity;

			this.scannedItems$.next([...scannedItems])
		}
	}

	checkItem(sku: number) {
		console.log("sku: ", sku)
		const items: ItemDocument[] = [...this.scannedItems$.value];
		const item = items.find(item => item.barcode === sku);
		if (item) {
			console.log('Item exist: ', item);
			return items.indexOf(item);
		} else {
			console.log('Item does not exist');
			return -1;
		}
	}
}
