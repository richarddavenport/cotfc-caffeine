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
  isBarista: boolean;

  constructor(
    private authservice: AuthService,
  ) { }

  ngOnInit() {
    this.isBarista = false;
    this.user$ = this.authservice.authState
      .map(user => {
        if (user && user.email === 'barista@cotfc.com') {
          this.isBarista = true;
        }
        return user;
      });
  }

  onLogout(): void {
    this.authservice.logout();
  }
}
