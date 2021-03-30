import { ItemDocument } from 'src/app/shared/models/item-document';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class SalesService {

	private scannedItems$ = new BehaviorSubject([]);

	constructor() { }

	get _allScannedItems(): Observable<ItemDocument[]> {
		return this.scannedItems$.asObservable()
	}

	addItem(item: any) {
		this.scannedItems$.next([item, ...this.scannedItems$.value])
		console.log(this.scannedItems$.value)
	}
}
