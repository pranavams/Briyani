import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-track-order',
  templateUrl: 'track.html'
})

export class TrackPage {

  order: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.order = this.navParams.data.items;
  }

  backButtonClick() {
    this.navCtrl.pop();
  }

  ordersPage() {
    this.navCtrl.push('OrderPage');
  }
  
}
