import { IItemDocument } from './item-document.interface';
import { ISoldItemDetails } from "./sold-item-detail.interface";

export interface ISoldItem {
	soldItem: ISoldItemDetails;
	updateSale({ quantity, subTotal, salesTotal }: { quantity: number, subTotal: number, salesTotal: number }): void;
}
