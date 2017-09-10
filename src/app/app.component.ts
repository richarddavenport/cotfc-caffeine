import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

import { AppState } from './app.state';
import { AuthService } from './core/services/auth.service';
import { UserProfile } from './models/user';

@Component({
  selector: 'cc-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  loggedIn$: Observable<boolean>;
  userProfile$: Observable<UserProfile>;
  barista$: Observable<boolean>;
  admin$: Observable<boolean>;

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.loggedIn$ = this.authService.authState.map(user => !!user);
    this.userProfile$ = this.authService.getProfile();

    this.barista$ = this.authService.getRoles()
      .filter(roles => Array.isArray(roles))
      .map(roles => roles.includes('barista'));
  }
}
