import { Result } from './../../models/result';
import { Item } from './../../models/Item';
import { Injectable } from '@angular/core';

import PouchDB from 'pouchdb';
import findPlugin from "pouchdb-find";
PouchDB.plugin(findPlugin);

import { BehaviorSubject } from 'rxjs';
import { DatabaseService } from 'src/app/core/services/database/database.service';

@Injectable({
	providedIn: 'root',
})
export class ItemService {
	private readonly dbName: string = 'inventory';
	private readonly remote: string =
		'http://couchadmin:couchadmin@127.0.0.1:5984/' + this.dbName;

	public itemDB: PouchDB.Database;

	private readonly replicationOptions = {
		live: true,
		retry: true,
	};

	private items$ = new BehaviorSubject(null);

	constructor(private databaseSvc: DatabaseService) {
		this.itemDB = databaseSvc.createDatabase(this.dbName);
		this.replicateDB();
		this.fetchItems();
		this.listenToChanges();
	}

	replicateDB() {
		var rep = this.databaseSvc.syncDB({
			sourceDB: this.itemDB,
			targetDB: this.remote,
			options: this.replicationOptions,
		});

		rep
			.on('error', (error) => {
				console.error("Replication error! :", error);
			});
	}

	async fetchItems() {
		try {
			const result = await this.itemDB.allDocs({
				include_docs: true,
				startkey: '_design',
				descending: true,
			})

			const items = result.rows.map((doc) => doc.doc);
			this.items$.next([...items])

		} catch (error) {
			console.error(error)
		}
	}

	listenToChanges() {
		this.itemDB.changes({ since: "now", live: true }).on("change", (data) => {
			console.log("changed data: ", data);
			this.fetchItems();
		});
	}

	async addItem(itemData: Item): Promise<Result> {
		const timesStamp = new Date().getTime();
		const id = `${timesStamp}-${Math.floor(Math.random() * 10000)}-${Math.floor(
			Math.random() * 1000000000
		)}`;

		try {
			return {
				result: await this.itemDB.put({
					_id: id,
					...itemData,
				}),
			};
		} catch (error) {
			return {
				error: error,
			};
		}
	}

	async searchItem(barcode: number) {
		await this.itemDB.createIndex({
			index: { fields: ["barcode"] },
		});

		try {
			return {
				result: await this.itemDB.find({
					selector: { barcode: barcode },
				}),
			};
		} catch (error) {
			return {
				error: error,
			};
		}
	}

	async deleteItem({ _id, _rev }: { _id: string, _rev: string }): Promise<Result> {
		try {
			return {
				result: await this.itemDB.remove({ _id, _rev })
			}
		} catch (error) {
			return {
				error
			}
		}
	}

	async updateItem({ item }: { item: Item }): Promise<Result> {
		const timeStamp: number = new Date().getTime();

		try {
			return {
				result: await this.itemDB.put({ ...item, lastUpdatedOn: timeStamp })
			}
		} catch (err) {
			return {
				error: err
			}
		}
	}

	/* Getter functions */

	get _allItems() {
		return this.items$.asObservable();
	}
}
