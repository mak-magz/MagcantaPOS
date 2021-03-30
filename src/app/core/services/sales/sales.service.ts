import { ItemDocument } from 'src/app/shared/models/item-document';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class SalesService {

	private scannedItems$ = new BehaviorSubject([]);
	private transaction$ = new BehaviorSubject({});
	constructor() { }

	get _allScannedItems(): Observable<ItemDocument[]> {
		return this.scannedItems$.asObservable()
	}

	get _transaction(): Observable<any> {
		return this.transaction$.asObservable();
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

	processTransaction(items: ItemDocument[]) {
		let transaction = {
			date: '',
			subtotal: 0,
			totalDiscount: 0,
			totalTax: 0,
			totalItems: 0,
			totalAmount: 0,
			items: []
		}

		items.map(item => {
			transaction.subtotal += item.price * item.quantity;
			transaction.totalDiscount += item.discount;
			transaction.totalItems += item.quantity;
			transaction.totalAmount = transaction.subtotal - transaction.totalTax;
		})

		this.transaction$.next(transaction)
		console.log(transaction)
	}
}
