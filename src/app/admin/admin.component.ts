import { Component, ElementRef, Renderer, ViewChild } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'cc-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  flavors: FirebaseListObservable<any>;
  milks: FirebaseListObservable<any>;
  @ViewChild('newmilk') newmilk: ElementRef;
  @ViewChild('newflavor') newflavor: ElementRef;

  constructor(private db: AngularFireDatabase,
    private renderer: Renderer) {
    this.flavors = db.list('/flavors');
    this.milks = db.list('/milks');
  }

  addFlavor(newName: string) {
    this.renderer.setElementProperty(this.newflavor.nativeElement, 'value', null);
    this.flavors.push(newName);
  }

  updateFlavor(key: string, newText: string) {
    this.db.object('/flavors/' + key).set(newText);
  }

  deleteFlavor(key: string) {
    this.flavors.remove(key);
  }

  addMilk(newName: string) {
    this.renderer.setElementProperty(this.newmilk.nativeElement, 'value', null);
    this.milks.push(newName);
  }

  updateMilk(key: string, newText: string) {
    this.db.object('/milks/' + key).set(newText);
  }

  deleteMilk(key: string) {
    this.milks.remove(key);
  }

  flavorTrackBy(index: number, obj: any): any {
    return index;
  }

  milkTrackBy(index: number, obj: any): any {
    return index;
  }
}
