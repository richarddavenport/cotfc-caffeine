import { of } from 'rxjs/observable/of';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { go } from '@ngrx/router-store';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

import { AppState } from '../../app.state';
import { AuthService } from '../services/auth.service';

@Injectable()
export class LoggedInGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private store: Store<AppState>,
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.authService.authState
      .map(user => {
        const loggedIn = !!user;
        if (!loggedIn) {
          this.store.dispatch(go('/login'))
        }
        return loggedIn;
      })
  }
}
