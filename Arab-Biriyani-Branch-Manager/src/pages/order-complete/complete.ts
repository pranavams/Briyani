import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-completed',
  templateUrl: 'complete.html'
})

export class CompletePage {

  cartItems: any = [];
  order: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.cartItems = navParams.data.items;
    console.log("order Quantity: " + this.cartItems.orderDetail[0].quantity);
    console.log("Menu Name: " + this.cartItems.orderDetail[0].item.menuName);
  }
  
  buildOrder(){
    this.order.orderId = this.cartItems.orderId;
    this.order.orderDetails = this.cartItems.orderDetail;
    this.order.totalAmount = this.cartItems.total;
  }
 
  backButtonClick() {
    this.navCtrl.pop();
  }
  
  nextPage() {
    this.buildOrder();
    this.navCtrl.push('TrackPage', {items: this.order});
  }
  
  ordersPage() {
    this.navCtrl.push('OrderPage');
  }
  
}