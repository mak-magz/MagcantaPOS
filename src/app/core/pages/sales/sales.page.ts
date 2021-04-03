import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ItemService } from 'src/app/shared/services/inventory/item.service';
import { ItemDocument } from 'src/app/shared/models/item-document.interface';
import { SalesService } from '../../services/sales/sales.service';

@Component({
	selector: 'app-sales',
	templateUrl: './sales.page.html',
	styleUrls: ['./sales.page.scss'],
})
export class SalesPage implements OnInit {
	constructor(
	) { }

	ngOnInit() {
	}



}
