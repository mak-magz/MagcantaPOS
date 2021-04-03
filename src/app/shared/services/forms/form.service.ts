import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Item } from '../../models/Item.interface';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor(
    private formBuilder: FormBuilder
  ) { }

  itemForm(item?: Item): FormGroup {
    return this.formBuilder.group({
      barcode: new FormControl(item ? item.barcode : "", Validators.compose([Validators.required])),
      name: new FormControl(item ? item.name : "", Validators.compose([Validators.required])),
      price: new FormControl(item ? item.price : "", Validators.compose([Validators.required])),
      quantity: new FormControl(item ? item.quantity : "", Validators.compose([Validators.required])),
      unit: new FormControl(item ? item.unit : "", Validators.compose([Validators.required])),
      discount: new FormControl(item ? item.discount : "", Validators.compose([Validators.required])),
    });
  }
}
