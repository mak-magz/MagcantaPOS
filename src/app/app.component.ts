import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'dashboard', url: '/dashboard', icon: 'bar-chart' },
    { title: 'sales', url: '/sales', icon: 'receipt' },
  ];
  constructor() {}
}
