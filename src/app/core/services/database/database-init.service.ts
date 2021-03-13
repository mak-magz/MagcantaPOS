import { Injectable } from '@angular/core';
import { ItemService } from 'src/app/shared/services/inventory/item.service';

@Injectable({
  providedIn: 'root',
})
export class DatabaseInitService {
  constructor(private itemService: ItemService) {}
}
