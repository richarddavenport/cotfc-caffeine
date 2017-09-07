import { Database } from '../core/services/database';
import { Order } from '../orders/models/order';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'cc-barista',
  templateUrl: './barista.component.html',
  styleUrls: ['./barista.component.scss']
})
export class BaristaComponent implements OnInit {
  orders$: Observable<Order[]>;
  started$: Observable<Order[]>;

  constructor(
    private db: Database,
  ) { }

  ngOnInit() {
    this.orders$ = this.db.orders;
    this.started$ = this.db.started;
  }

  onStarted(order: Order) {
    this.db.startOrder(order);
  }
  onFinished(order: Order) {
    this.db.finishOrder(order);
  }
}
