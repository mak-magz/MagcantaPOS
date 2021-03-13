import { Injectable } from '@angular/core';

import PouchDB from 'pouchdb';
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

  constructor(private databaseSvc: DatabaseService) {
    this.itemDB = databaseSvc.createDatabase(this.dbName);
    this.replicateDB();
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
      })
      .on('error', (error) => {
        console.error(error);
      });
  }
}
