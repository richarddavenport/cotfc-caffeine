import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NotFoundComponent } from './core/components/not-found/not-found.component';
import { LoginGuard } from './core/services/login.guard';
import { OrdersGuard } from './core/services/orders.guard';

const appRoutes: Routes = [
  {
    path: 'order',
    loadChildren: 'app/orders/orders.module#OrdersModule',
    canActivate: [OrdersGuard]
  }, {
    path: 'login',
    loadChildren: 'app/login/login.module#LoginModule',
    canActivate: [LoginGuard]
  }, {
    path: 'admin',
    loadChildren: 'app/admin/admin.module#AdminModule',
  }, {
    path: 'barista',
    loadChildren: 'app/barista/barista.module#BaristaModule',
  }, {
    path: '',
    redirectTo: '/order',
    pathMatch: 'full',
  }, {
    path: '**', component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {
    // enableTracing: true
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
