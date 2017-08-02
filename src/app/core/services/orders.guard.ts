import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { go } from '@ngrx/router-store';
import { Store } from '@ngrx/store';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';

import { AppState } from '../../app.state';

@Injectable()
export class OrdersGuard implements CanActivate {

  constructor(
    private angularFireAuth: AngularFireAuth,
    private store: Store<AppState>,
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.angularFireAuth.authState
      .map(user => {
        const loggedIn = !!user;
        if (!loggedIn) {
          this.store.dispatch(go('/login'));
        }
        return loggedIn;
      });
  }
}
