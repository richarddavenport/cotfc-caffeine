import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'cc-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profileForm$: Observable<FormGroup>;
  profile$: Observable<admin.auth.UserRecord>;
  avatar$: Observable<string>;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.avatar$ = this.authService.authState
      .map(user => user.photoURL)
      .map(url => `url(${url})`);
    this.profile$ = this.authService.getProfile();
    this.profileForm$ = this.authService.getProfile()
      .map(profile => this.formBuilder.group({
        phone: [profile.phoneNumber, Validators.required]
      }));
  }
}
