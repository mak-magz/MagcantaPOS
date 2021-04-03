import { Item } from "./Item.interface";

export interface ItemDocument extends Item {
	_id: string;
	_rev: string;
	lastUpdatedOn?: number;
}
