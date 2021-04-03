import { IItem } from 'src/app/shared/models/Item.interface';
import { ISoldItemDetails } from 'src/app/shared/models/sale-item.interface';
export class SaleItem implements ISoldItemDetails {

	salesDetail = {} as ISoldItemDetails;
	// barcode = 0;
	// name = '';
	// price = 0;
	// quantitySold = 1;
	// unit = '';
	// discount = 0;
	// subTotal = 0;
	// salesTotal = 0;

	constructor(item: IItem, quantitySold: number) {

	}

	init({ item, quantitySold }: { item: IItem; quantitySold: number; }) {
		this.price = item.price;
	}
}
