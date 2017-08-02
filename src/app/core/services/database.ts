import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { Config } from '../../models/config';
import { Order } from '../../orders/models/order';
import { OrderHelper } from './order-helper';

@Injectable()
export class Database {

  constructor(
    private db: AngularFireDatabase,
    private auth: AngularFireAuth,
    private oh: OrderHelper
  ) { }

  get orderConfig(): FirebaseObjectObservable<Config> {
    return this.db.object('/config');
  }

  get temps() {
    return this.db.list('/temps');
  }
  addTemp(value: any) {
    this.db.list('/temps').push(value);
  }

  get milks() {
    return this.db.list('/milks');
  }
  addMilk(value: any) {
    this.db.list('/milks').push(value);
  }

  get flavors() {
    return this.db.list('/flavors');
  }
  addFlavor(value: any) {
    this.db.list('/flavors').push(value);
  }

  get ordered(): Observable<Order[]> {
    return this.db.list('/ordered')
      .map(val => val.map(order => ({ ...order, $key: order.$key })));
  }
  createOrder(uid: string, order: Order): Observable<firebase.Promise<any>> {
    const ref = this.db.database.ref().push();
    const newOrderData = {
      [`/orders/${uid}/${ref.key}`]: order,
      [`/users/${uid}/orders/${ref.key}`]: order
    };
    return of(this.db.database.ref().update(newOrderData));
  }
  removeOrder(order: Order): Observable<any> {
    // TODO: forkJoin should be fromPromise, but TS aint happy right now. this is a hack
    return Observable.forkJoin(this.db.object('/ordered/' + order.key).remove());
  }

  get started(): Observable<Order[]> {
    return this.db.list('/started')
      .map(val => val.map(order => ({ ...order, $key: order.$key })));
  }
  startOrder(order: Order): Observable<any> {
    return Observable.forkJoin(
      this.removeOrder(order),
      this.db.object('/started/' + order.key).set(order));
  }
  removeStarted(order: Order): Observable<any> {
    // TODO: forkJoin should be fromPromise, but TS aint happy right now. this is a hack
    return Observable.forkJoin(this.db.object('/started/' + order.key).remove());
  }

  finishOrder(order: Order): Observable<any> {
    return Observable.forkJoin(
      this.removeOrder(order),
      this.removeStarted(order),
      this.db.object('/finished/' + order.key).set(order),
      this.addSms(order.key, order.phone, `Get it while it's hot! Your coffee is ready!`));
  }

  private addSms(ref: string, to: string, body: string): firebase.Promise<any> {
    return this.db.object('/sms/' + ref).set({ to, body });
  }
}

export type listType = 'flavors' | 'milks' | 'temps';
