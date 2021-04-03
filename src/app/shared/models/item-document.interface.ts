import { IItem } from "./Item.interface";

export interface IItemDocument extends IItem {
	_id: string;
	_rev: string;
	lastUpdatedOn?: number;
}
