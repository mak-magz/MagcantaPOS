import { IItemDocument } from 'src/app/shared/models/item-document.interface';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ISoldItemDetails } from 'src/app/shared/models/sold-item.interface';

@Injectable({
	providedIn: 'root'
})
export class SalesService {

	private scannedItems$ = new BehaviorSubject([]);
	private transaction$ = new BehaviorSubject({});
	constructor() { }

	get _allScannedItems(): Observable<ISoldItemDetails[]> {
		return this.scannedItems$.asObservable()
	}

	get _transaction(): Observable<any> {
		return this.transaction$.asObservable();
	}

	addItem(item: IItemDocument, quantitySold = 1) {
		const itemIndex = this.checkItem(item.barcode)
		const { quantity, lastUpdatedOn, ...newItem } = item;

		const saleItem: ISoldItemDetails = this.newSaleItem({ newItem, quantity: quantitySold });

		this.updateScannedItem(itemIndex, saleItem);
	}

	private updateScannedItem(itemIndex: number, saleItem: ISoldItemDetails) {
		if (itemIndex < 0) {
			// Item does not exist in the array
			// push the item
			this.scannedItems$.next([{ ...saleItem }, ...this.scannedItems$.value]);
		} else {
			// Item exists
			// update the quantity
			// then update the datastore
			const scannedItems: ISoldItemDetails[] = [...this.scannedItems$.value];
			scannedItems[itemIndex].quantitySold += saleItem.quantitySold;
			scannedItems[itemIndex].subTotal += saleItem.subTotal;
			scannedItems[itemIndex].salesTotal += saleItem.salesTotal;

			this.scannedItems$.next([...scannedItems])
		}
	}

	private newSaleItem({ newItem, quantity }: { newItem: { _id: string; _rev: string; barcode: number; name: string; price: number; unit: string; discount: number; }; quantity: number; }): ISoldItemDetails {
		let saleItem = {} as ISoldItemDetails;

		saleItem.discount = newItem.discount;
		saleItem.quantitySold = quantity;
		saleItem.subTotal = newItem.price * saleItem.quantitySold;
		saleItem.salesTotal = saleItem.subTotal - (saleItem.discount * saleItem.quantitySold);
		console.log("sale total: ", saleItem.salesTotal)

		return { ...saleItem, ...newItem }
	}

	checkItem(sku: number) {
		console.log("sku: ", sku)
		const items: IItemDocument[] = [...this.scannedItems$.value];
		const item = items.find(item => item.barcode === sku);
		if (item) {
			console.log('Item exist: ', item);
			return items.indexOf(item);
		} else {
			console.log('Item does not exist');
			return -1;
		}
	}

	processTransaction(items: ISoldItemDetails[]) {
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
			transaction.subtotal += item.subTotal;
			transaction.totalDiscount += item.discount * item.quantitySold;
			transaction.totalItems += item.quantitySold;
			transaction.totalAmount += item.salesTotal;
		})

		this.transaction$.next(transaction)
		console.log(transaction)
	}
}
