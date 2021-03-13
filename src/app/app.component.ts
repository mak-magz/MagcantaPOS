import { Component } from '@angular/core';
import { DatabaseInitService } from './core/services/database/database-init.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Dashboard', url: '/dashboard', icon: 'bar-chart' },
    { title: 'Sales', url: '/sales', icon: 'receipt' },
    { title: 'Inventory', url: '/inventory', icon: 'receipt' },
  ];
  constructor(private dbInitSvc: DatabaseInitService) {}
}
