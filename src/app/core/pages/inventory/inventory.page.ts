import { Component, OnInit } from '@angular/core';
import { ItemService } from 'src/app/shared/services/inventory/item.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.page.html',
  styleUrls: ['./inventory.page.scss'],
})
export class InventoryPage implements OnInit {
  constructor(private itemSvc: ItemService) {}

  ngOnInit() {}
}
