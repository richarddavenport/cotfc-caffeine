import { Database } from '../../../core/services/database';
import { CcHttp } from '../../../core/services/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MdSnackBar } from '@angular/material';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';

import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'cc-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  importing: boolean;
  orders$: Observable<any>;
  importedOrders$: Observable<any>;
  hasPhoneNumber$: Observable<boolean>;
  profileForm$: Observable<FormGroup>;
  profile$: Observable<admin.auth.UserRecord>;
  avatar$: Observable<string>;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private snackBar: MdSnackBar,
    private angularFireAuth: AngularFireAuth,
    private ccHttp: CcHttp,
    private database: Database,
  ) { }

  ngOnInit() {
    this.avatar$ = this.authService.getProfile()
      .map(user => user.photoURL)
      .map(url => `url(${url})`);

    this.profile$ = this.authService.getProfile();

    this.profileForm$ = this.authService.getProfile()
      .map(profile => this.formBuilder.group({
        phone: [profile.phoneNumber, Validators.compose([
          Validators.required, Validators.pattern(/(?:\d{1}\s)?\(?(\d{3})\)?-?\s?(\d{3})-?\s?(\d{4})/g)])]
      }));

    this.hasPhoneNumber$ = this.authService.getProfile()
      .map(profile => /(?:\d{1}\s)?\(?(\d{3})\)?-?\s?(\d{3})-?\s?(\d{4})/g.test(profile.phoneNumber));

    this.orders$ = this.database.getUserOrders();
    this.importedOrders$ = this.database.getUserImportedOrders();
  }

  onUpdateForm({ phone }) {
    return this.authService.updatePhoneNumber(phone.replace(/\D/g, ''))
      .subscribe(response => this.snackBar.open('Saved!', 'Hooray!', { duration: 3000 }),
      error => this.snackBar.open('Whoops! Try again...', 'Bummer.', { duration: 3000 }))
  }

  onImportOldOrders() {
    this.importing = true;
    this.ccHttp.importOldOrders().first().subscribe(res => {
      this.importing = false;
      this.snackBar.open(`Imported ${res.num} orders!`, 'Hooray!', { duration: 3000 });
    });
  }
}
