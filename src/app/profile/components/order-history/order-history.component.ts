import { Component, Input } from '@angular/core';

import { Order } from '../../../orders/models/order';

@Component({
  selector: 'cc-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent {
  @Input() orders: any[];
  @Input() importedOrders: any;
}
