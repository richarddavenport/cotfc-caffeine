import { AuthService } from './core/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { go } from '@ngrx/router-store';
import { Store } from '@ngrx/store';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

import { AppState } from './app.state';

@Component({
  selector: 'cc-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  user$: Observable<firebase.User>;
  isBarista$: Observable<boolean>;

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.user$ = this.authService.authState;
    this.isBarista$ = this.authService.authState
      .map(user => (user && user.uid === 'jXgIFpsBfWgJ7HIjGxq3FHvfaBX2'));
  }

  onLogout(): void {
    this.authService.logout();
  }
}
