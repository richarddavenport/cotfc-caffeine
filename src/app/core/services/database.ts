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
import * as moment from 'moment';

import { Config } from '../../models/config';
import { Order } from '../../orders/models/order';

@Injectable()
export class Database {

  constructor(
    private db: AngularFireDatabase,
    private authService: AuthService,
  ) { }

  get config(): FirebaseObjectObservable<Config> {
    return this.db.object('/config');
  }

  get baristas(): FirebaseObjectObservable<any> {
    return this.db.object('/roles/barista');
  }

  get users(): FirebaseObjectObservable<any> {
    return this.db.object('/roles/user');
  }

  getUserOrders() {
    return this.authService.authState
      .map(user => user.uid)
      .switchMap(uid => this.db.object(`users/${uid}/orders`))
      .map((orders: Order[]) => {
        return Object.keys(orders).reduce((acc, key) => {
          const order: Order = orders[key];
          if (order == null) {
            return acc;
          }
          acc.push({
            createdAt: moment(order.createdAt).format('ll'),
            icon: (order.temperature === 'Hot') ? 'flaticon-coffee' : 'flaticon-iced-coffee',
            drink: (Array.isArray(order.flavors)) ?
              `${order.temperature} ${order.flavors.join(', ')} ${order.drink}` :
              `${order.temperature} ${order.drink}`
          });
          return acc;
        }, [])
      });
  }

  getUserImportedOrders() {
    return this.authService.authState
      .map(user => user.uid)
      .switchMap(uid => this.db.object(`users/${uid}/importedOrders`))
      .map(orders => {
        return Object.keys(orders).reduce((acc, key) => {
          const order = orders[key];
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

  createOrder(orderForm: Order): Observable<firebase.Promise<any>> {
    const ref = this.db.database.ref().push();
    return this.authService.getProfile()
      .map(profile => Object.assign({}, orderForm, {
        displayName: profile.displayName,
        photoURL: profile.photoURL,
        phoneNumber: profile.phoneNumber,
        uid: profile.uid,
        status: 'ordered',
        key: ref.key,
      }))
      .map(order => ({
        [`/orders/${order.key}`]: order,
        [`/users/${order.uid}/orders/${order.key}`]: order
      }))
      .switchMap(orderData => this.db.database.ref().update(orderData));
  }

  addFlavor(flavor: string) {
    return this.db.database.ref('/config/flavors').push(flavor);
  }
  removeFlavor(key: string) {
    return this.db.database.ref(`/config/flavors/${key}`).remove()
  }
  updateFlavor(key: string, name: string) {
    return this.db.database.ref(`/config/flavors`).update({ [key]: name })
  }

  addDrink(flavor: string) {
    return this.db.database.ref('/config/drinks').push(flavor);
  }
  removeDrink(key: string) {
    return this.db.database.ref(`/config/drinks/${key}`).remove()
  }
  updateDrink(key: string, name: string) {
    return this.db.database.ref(`/config/drinks`).update({ [key]: name })
  }

  addLocation(flavor: string) {
    return this.db.database.ref('/config/locations').push(flavor);
  }
  removeLocation(key: string) {
    return this.db.database.ref(`/config/locations/${key}`).remove()
  }
  updateLocation(key: string, name: string) {
    return this.db.database.ref(`/config/locations`).update({ [key]: name })
  }

  addBarista([key, displayName, photoURL]) {
    return this.db.database.ref('/roles/barista').update({ [key]: { displayName, photoURL } })
  }
  removeBarista(key: string) {
    return this.db.database.ref(`/roles/barista/${key}`).remove()
  }
  get orders(): Observable<Order[]> {
    return this.db.list('/orders', {
      query: {
        orderByChild: 'status',
        equalTo: 'ordered',
      }
    })
  }
  get started(): Observable<Order[]> {
    return this.db.list('/orders', {
      query: {
        orderByChild: 'status',
        equalTo: 'started',
      }
    })
  }
  startOrder({ key, uid, ...order }) {
    return this.db.database.ref().update({
      [`/orders/${key}/status`]: 'started',
      [`/users/${uid}/orders/${key}/status`]: 'started'
    });
  }
  finishOrder({ key, uid, ...order }) {
    return this.db.database.ref().update({
      [`/orders/${key}/status`]: 'finished',
      [`/users/${uid}/orders/${key}/status`]: 'finished'
    });
  }
}
