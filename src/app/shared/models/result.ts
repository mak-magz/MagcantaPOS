import PouchDB from 'pouchdb';

export interface Result {
	result?: PouchDB.Core.Response | undefined;
	error?: any | undefined;
}
