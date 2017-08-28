import { ProfileGuard } from './core/guards/profile.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NotFoundComponent } from './core/components/not-found/not-found.component';
import { LoginGuard } from './core/guards/login.guard';
import { OrdersGuard } from './core/guards/orders.guard';

const appRoutes: Routes = [
  {
    path: 'order',
    loadChildren: 'app/orders/orders.module#OrdersModule',
    canActivate: [OrdersGuard, ProfileGuard]
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
    path: 'profile',
    loadChildren: 'app/profile/profile.module#ProfileModule',
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
