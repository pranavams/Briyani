import {Component, OnInit, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-payment-details',
  templateUrl: 'payment.html'
})

export class PaymentPage implements OnInit {

  cartItems: any = [];

  ngOnInit() {

  }

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.cartItems = navParams.data.items;
  }
  
  nextPage() {
     this.navCtrl.push('CompletePage', {items: this.cartItems});
  }

  backButtonClick() {
    this.navCtrl.pop();
  }
}