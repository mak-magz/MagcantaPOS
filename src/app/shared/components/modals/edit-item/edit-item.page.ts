import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Item } from 'src/app/shared/models/Item';
import { FormService } from 'src/app/shared/services/forms/form.service';

@Component({
	selector: 'app-edit-item',
	templateUrl: './edit-item.page.html',
	styleUrls: ['./edit-item.page.scss'],
})
export class EditItemPage implements OnInit {

	@Input() item: Item;

	itemForm: FormGroup;

	constructor(private formSvc: FormService) { }

	ngOnInit() {
		this.itemForm = this.formSvc.itemForm(this.item);
		console.log(this.item)
	}

}
