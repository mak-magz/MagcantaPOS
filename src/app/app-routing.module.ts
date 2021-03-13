import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./core/pages/dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'sales',
    loadChildren: () => import('./core/pages/sales/sales.module').then( m => m.SalesPageModule)
  },
  {
    path: 'inventory',
    loadChildren: () => import('./core/pages/inventory/inventory.module').then( m => m.InventoryPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
