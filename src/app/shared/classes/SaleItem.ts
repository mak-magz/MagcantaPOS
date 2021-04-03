import { ISoldItemDetails } from 'src/app/shared/models/sold-item-detail.interface';
import { IItemDocument } from '../models/item-document.interface';
import { ISoldItem } from '../models/sold-item.interface';
export class SaleItem implements ISoldItem {

	soldItem = {} as ISoldItemDetails;

	constructor(item: IItemDocument, quantitySold: number) {
		this.init({ item, quantitySold })
	}

	private init({ item, quantitySold }: { item: IItemDocument; quantitySold: number; }) {
		this.soldItem.quantitySold = quantitySold;

		const { quantity, lastUpdatedOn, ...newItem } = item;

		this.soldItem = this.calculateSale(item)
	}

	private calculateSale(newItem: { _id: string; _rev: string; barcode: number; name: string; price: number; unit: string; discount: number; }): ISoldItemDetails {
		this.soldItem.discount = newItem.discount;
		this.soldItem.quantitySold = this.soldItem.quantitySold;
		this.soldItem.subTotal = newItem.price * this.soldItem.quantitySold;
		this.soldItem.salesTotal = this.soldItem.subTotal - (this.soldItem.discount * this.soldItem.quantitySold);
		console.log("sale total: ", this.soldItem.salesTotal)

		return { ...this.soldItem, ...newItem }
	}

	updateSale({ quantity, subTotal, salesTotal }: { quantity: number, subTotal: number, salesTotal: number }): void {
		this.soldItem.quantitySold += quantity;
		this.soldItem.subTotal += subTotal;
		this.soldItem.salesTotal += salesTotal;
	}
}
