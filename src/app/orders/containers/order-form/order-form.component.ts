import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MdSnackBar } from '@angular/material';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

import { Database } from '../../../core/services/database';
import { Config } from '../../../models/config';
import { Order } from '../../models/order';

@Component({
  selector: 'cc-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss']
})
export class OrderFormComponent implements OnInit {
  order: FormGroup;
  config$: Observable<Config>;
  flavors: { [key: string]: boolean };

  constructor(
    private formBuilder: FormBuilder,
    private database: Database,
    private auth: AngularFireAuth,
    private snackBar: MdSnackBar,
  ) { }

  ngOnInit() {
    this.config$ = this.database.config.map((config: Config) => {
      this.flavors = Object.keys(config.flavors).reduce((acc, cur) => ({
        ...acc,
        [config.flavors[cur]]: false,
      }), {});
      this.order = this.formBuilder.group({
        flavors: this.formBuilder.group(this.flavors),
        drink: '',
        notes: '',
        temperature: '',
        location: '',
      });
      return config;
    });
  }

  onChangeLocation({ value }) {
    this.order.controls['location'].setValue(value);
  }

  submit() {
    const order: Order = {
      createdAt: firebase.database.ServerValue.TIMESTAMP,
      ...this.order.value,
      flavors: Object.keys(this.order.value.flavors).reduce((acc, cur) => {
        if (this.order.value.flavors[cur]) {
          return [
            ...acc,
            cur
          ]
        } else {
          return acc;
        }
      }, [] as string[])
    };
    this.database.createOrder(order).subscribe(foo => {
      this.snackBar.open('Order Received!', 'Hooray!', { duration: 3000 });
      this.order.reset();
    }, error => {
      this.snackBar.open('Oh Snap!', 'Error!', { duration: 3000 })
    })
  }
}
