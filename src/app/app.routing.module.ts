import { LogoutComponent } from './core/components/logout/logout.component';
import { LoggedInGuard } from './core/guards/logged-in.guard';
import { ProfileGuard } from './core/guards/profile.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NotFoundComponent } from './core/components/not-found/not-found.component';
import { LoginGuard } from './core/guards/login.guard';

const appRoutes: Routes = [
  {
    path: 'order',
    loadChildren: 'app/orders/orders.module#OrdersModule',
    canActivate: [LoggedInGuard, ProfileGuard]
  }, {
    path: 'login',
    loadChildren: 'app/login/login.module#LoginModule',
    canActivate: [LoginGuard]
  }, {
    path: 'admin',
    loadChildren: 'app/admin/admin.module#AdminModule',
    canActivate: [LoggedInGuard]
  }, {
    path: 'barista',
    loadChildren: 'app/barista/barista.module#BaristaModule',
    canActivate: [LoggedInGuard]
  }, {
    path: 'profile',
    loadChildren: 'app/profile/profile.module#ProfileModule',
    canActivate: [LoggedInGuard]
  }, {
    path: 'logout', component: LogoutComponent
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
