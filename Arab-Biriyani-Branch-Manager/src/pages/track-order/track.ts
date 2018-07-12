import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-track-order',
  templateUrl: 'track.html'
})

export class TrackPage {

  order: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.order = this.navParams.get('items')
    console.log(this.order);
  }

  backButtonClick() {
    this.navCtrl.pop();
  }

  ordersPage() {
    this.navCtrl.push('OrderPage');
  }
}
