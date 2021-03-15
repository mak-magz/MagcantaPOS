import { Item } from "./Item";

export interface ItemDocument extends Item {
	_id: string;
	_rev: string;
	lastUpdatedOn?: number;
}
