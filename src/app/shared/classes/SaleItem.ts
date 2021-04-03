import { IItem } from 'src/app/shared/models/Item.interface';
import { ISaleItem } from 'src/app/shared/models/sale-item.interface';
export class SaleItem implements ISaleItem {

	constructor(item: IItem, quantitySold: number) {

	}

	init(item: IItem)
}
