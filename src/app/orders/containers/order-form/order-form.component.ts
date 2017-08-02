import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';

import { Database } from '../../../core/services/database';
import { OrderHelper } from '../../../core/services/order-helper';
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
  milks: string[];
  temperatures: string[];

  constructor(
    private formBuilder: FormBuilder,
    private database: Database,
    private orderHelper: OrderHelper,
    private auth: AngularFireAuth
  ) { }

  ngOnInit() {
    this.config$ = this.database.orderConfig.map((config: Config) => {
      this.flavors = Object.keys(config.flavors).reduce((acc, cur) => ({
        ...acc,
        [config.flavors[cur]]: false,
      }), {});
      this.milks = Object.keys(config.milks).map(milk => config.milks[milk]);
      this.temperatures = Object.keys(config.temperatures).map(temp => config.temperatures[temp]);
      this.order = this.formBuilder.group({
        flavors: this.formBuilder.group(this.flavors),
        milk: '',
        notes: '',
        temperature: '',
      });
      return config;
    });
  }

  submit() {
    const order: Order = {
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
    this.auth.authState.first().subscribe(user => this.database.createOrder(user.uid, order));
    this.order.reset();
  }
}
