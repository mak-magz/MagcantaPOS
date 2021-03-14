import { Injectable } from '@angular/core';

import PouchDB from 'pouchdb';
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
  }

  replicateDB() {
    var rep = this.databaseSvc.replicateDB({
      sourceDB: this.itemDB,
      destinationDB: this.remote,
      options: this.replicationOptions,
    });

    rep
      .on('change', (info) => {
        console.log('changed: ', info);
        this.fetchItems();
      })
      .on('error', (error) => {
        console.error(error);
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

  /* Getter functions */
  get _allItems() {
    return this.items$.asObservable();
  }
}
