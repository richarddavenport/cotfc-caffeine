import { Component, ElementRef, OnInit, Renderer, ViewChild } from '@angular/core';
import { FirebaseObjectObservable } from 'angularfire2/database';

import { Database } from '../core/services/database';
import { Config } from '../models/config';

@Component({
  selector: 'cc-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  baristas$: FirebaseObjectObservable<any>;
  users$: FirebaseObjectObservable<any>;
  config$: FirebaseObjectObservable<Config>;
  @ViewChild('newdrink') newdrink: ElementRef;
  @ViewChild('newflavor') newflavor: ElementRef;
  @ViewChild('newlocation') newlocation: ElementRef;

  constructor(
    private database: Database,
    private renderer: Renderer
  ) { }

  ngOnInit() {
    this.config$ = this.database.config;
    this.baristas$ = this.database.baristas;
    this.users$ = this.database.users;
  }

  addFlavor(name: string) {
    this.renderer.setElementProperty(this.newflavor.nativeElement, 'value', null);
    this.database.addFlavor(name);
  }
  updateFlavor(key: string, name: string) {
    this.database.updateFlavor(key, name);
  }
  removeFlavor(key: string) {
    this.database.removeFlavor(key);
  }

  addDrink(name: string) {
    this.renderer.setElementProperty(this.newdrink.nativeElement, 'value', null);
    this.database.addDrink(name);
  }
  updateDrink(key: string, name: string) {
    this.database.updateDrink(key, name);
  }
  removeDrink(key: string) {
    this.database.removeDrink(key);
  }

  addLocation(name: string) {
    this.renderer.setElementProperty(this.newlocation.nativeElement, 'value', null);
    this.database.addLocation(name);
  }
  updateLocation(key: string, name: string) {
    this.database.updateLocation(key, name);
  }
  removeLocation(key: string) {
    this.database.removeLocation(key);
  }

  onChangeBarista(user) {
    this.database.addBarista(user.value.split('|'));
  }
  removeBarista(key: string) {
    this.database.removeBarista(key);
  }
}
