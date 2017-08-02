import { Injectable } from '@angular/core';

import { Order } from '../../orders/models/order';

@Injectable()
export class OrderHelper {

  // validateOrder(order: Order): Order {
  //   return {
  //     ...order,
  //     flavors: Object.keys(order.flavors).reduce((acc, cur) => {
  //       const exists = order.flavors[cur];
  //       if (exists) {
  //         return [
  //           ...acc,
  //           cur
  //         ]
  //       } else {
  //         return acc;
  //       }
  //     }, [] as string[])
  //   }
  // }
}
