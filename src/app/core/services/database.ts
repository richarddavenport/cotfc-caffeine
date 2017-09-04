import { AuthService } from './auth.service';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { withLatestFrom } from 'rxjs/operator/withLatestFrom';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { Config } from '../../models/config';
import { Order } from '../../orders/models/order';

@Injectable()
export class Database {

  constructor(
    private db: AngularFireDatabase,
    private authService: AuthService,
  ) { }

  get orderConfig(): FirebaseObjectObservable<Config> {
    return this.db.object('/config');
  }

  getUserOrders() {
    return this.authService.authState
      .map(user => user.uid)
      .switchMap(uid => combineLatest(this.db.object(`users/${uid}/orders`), (this.db.object(`users/${uid}/importedOrders`))))
      .map(([orders, importedOrders]: [object, object]) => {
        const allOrders = Object.assign({}, orders, importedOrders);
        return Object.keys(allOrders).reduce((acc, key) => {
          const order = allOrders[key];
          if (order == null) {
            return acc;
          }
          acc.push({
            icon: (order.temperature === 'Hot') ? 'flaticon-coffee' : 'flaticon-iced-coffee',
            drink: (Array.isArray(order.flavors)) ?
              `${order.temperature} ${order.flavors.join(', ')} ${order.drink}` :
              `${order.temperature} ${order.drink}`
          });
          return acc;
        }, [])
      });
  }







  get ordered(): Observable<Order[]> {
    return this.db.list('/ordered')
      .map(val => val.map(order => ({ ...order, $key: order.$key })));
  }
  createOrder(order: Order): Observable<firebase.Promise<any>> {
    const ref = this.db.database.ref().push();
    return this.authService.getProfile()
      .map(profile => ({
        [`/orders/${ref.key}/${profile.uid}/order`]: order,
        [`/orders/${ref.key}/${profile.uid}/profile`]: profile,
        [`/users/${profile.uid}/orders/${ref.key}`]: order
      }))
      .switchMap(orderData => this.db.database.ref().update(orderData));
  }
  private removeOrder(order: Order): Observable<void> {
    return fromPromise(this.db.object('/ordered/' + order.key).remove());
  }

  get started(): Observable<Order[]> {
    return this.db.list('/started')
      .map(val => val.map(order => ({ ...order, $key: order.$key })));
  }

  finishOrder(order: Order): Observable<any> {
    return Observable.forkJoin(
      this.removeOrder(order),
      this.removeStarted(order),
      this.db.object('/finished/' + order.key).set(order),
      this.addSms(order.key, order.phone, `Get it while it's hot! Your coffee is ready!`));
  }
  startOrder(order: Order): Observable<any> {
    return Observable.forkJoin(
      this.removeOrder(order),
      this.db.object('/started/' + order.key).set(order));
  }
  private removeStarted(order: Order): Observable<void> {
    return fromPromise(this.db.object('/started/' + order.key).remove());
  }

  private addSms(ref: string, to: string, body: string): firebase.Promise<any> {
    return this.db.object('/sms/' + ref).set({ to, body });
  }
}
