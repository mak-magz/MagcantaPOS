import { Injectable } from "@angular/core";

import PouchDB from "pouchdb";
import cordovaSqlitePlugin from "pouchdb-adapter-cordova-sqlite";

@Injectable({
	providedIn: "root",
})
export class DatabaseService {

	constructor() { }

	createDatabase(databaseName: string) {
		PouchDB.plugin(cordovaSqlitePlugin);
		return new PouchDB(databaseName);
	}

	replicateDB(
		{ sourceDB, destinationDB, options }:
			{
				sourceDB: PouchDB.Database;
				destinationDB: string;
				options: object;
			}) {
		return sourceDB.replicate.to(destinationDB, options);
	}

	syncDB({ sourceDB, targetDB, options }: { sourceDB: PouchDB.Database, targetDB: string, options: object }) {
		return sourceDB.sync(targetDB, options);
	}
}
