import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-sales',
	templateUrl: './sales.page.html',
	styleUrls: ['./sales.page.scss'],
})
export class SalesPage implements OnInit {
	displayedColumns: string[] = [
		"item",
		"quantity",
		"unit",
		"price",
		"discount",
		"total",
	];

	sales = {
		subTotal: 0,
		discount: 0,
		tax: 0,
		totalItems: 0,
		netTotal: 0,
	};

	displayedFooter: string[] = ["sub", "total"];
	dataSource: any;
	constructor() { }

	ngOnInit() {
	}

}
