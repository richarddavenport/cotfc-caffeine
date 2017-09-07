import { Injectable } from '@angular/core';
import { Headers, Http, Request, RequestMethod } from '@angular/http';
import { AngularFireAuth } from 'angularfire2/auth';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { of } from 'rxjs/observable/of';

@Injectable()
export class CcHttp {

  constructor(
    private http: Http,
    private angularFireAuth: AngularFireAuth
  ) { }

  importOldOrders() {
    return fromPromise(this.angularFireAuth.auth.currentUser.getIdToken())
      .switchMap(token => {
        const request = new Request({
          method: RequestMethod.Post,
          url: 'https://us-central1-cotfc-caffeine-dev.cloudfunctions.net/api/importoldorders',
          // url: 'http://localhost:5000/cotfc-caffeine-dev/us-central1/api/importoldorders',
          headers: new Headers({ 'Authorization': 'Bearer ' + token })
        })
        return this.http.request(request).map(res => res.json())
          .catch(err => of(console.log(err)));
      });
  }
}
