import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'cc-import-orders',
  templateUrl: './import-orders.component.html',
  styleUrls: ['./import-orders.component.scss']
})
export class ImportOrdersComponent {
  @Input() importing: boolean;
  @Output() importOldOrders = new EventEmitter();
}
