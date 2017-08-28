import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { go } from '@ngrx/router-store';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { AppState } from '../../app.state';
import { AuthService } from '../services/auth.service';

@Injectable()
export class ProfileGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private store: Store<AppState>,
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.authService.authState
      .filter(user => !!user)
      .switchMap(user => this.authService.getNeedToUpdateProfile(user.uid))
      .map(updateProfile => {
        if (updateProfile.$value) {
          this.store.dispatch(go('/profile'));
          return false;
        } else {
          return true
        }
      })
  }
}
