import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ItemService } from 'src/app/shared/services/inventory/item.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.page.html',
  styleUrls: ['./inventory.page.scss'],
})
export class InventoryPage implements OnInit {

  itemDataSub: Subscription;
  constructor(private itemSvc: ItemService) { }

  ngOnInit() {
    this.itemDataSub = this.itemSvc._allItems.subscribe((data) => {
      if (data) {
        console.log('item list: ', data);
      }
    });
  }
}
