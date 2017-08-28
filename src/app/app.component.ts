import { go } from '@ngrx/router-store';
import { Component, OnInit } from '@angular/core';
import { MdSnackBar } from '@angular/material';
import { Store } from '@ngrx/store';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

import { AppState } from './app.state';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'cc-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  user$: Observable<firebase.User>;
  barista$: Observable<boolean>;
  admin$: Observable<boolean>;

  constructor(
    private authService: AuthService,
    private store: Store<AppState>,
    private snackBar: MdSnackBar,
  ) { }

  ngOnInit() {
    this.user$ = this.authService.authState;
    this.barista$ = this.authService.getRoles()
      .map(roles => roles.includes('barista'));
    this.admin$ = this.authService.getRoles()
      .map(roles => roles.includes('admin'));
  }

  onLogout(): void {
    this.authService.logout();
  }
}
