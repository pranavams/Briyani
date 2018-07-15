import {Component, OnInit, ViewChild} from '@angular/core';
import {IonicPage, NavController, PopoverController} from 'ionic-angular';

import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {map} from 'rxjs/operators';
import { Api } from '../../providers/api/api';

@IonicPage()
@Component({
  selector: 'page-order',
  templateUrl: 'order.html'
})

export class OrderPage implements OnInit {
  order: any = 'ongoing';
  notification: any = 4;
  completedOrders: any = [];
  pendingOrders: any = [];

  constructor(public api: Api, public navCtrl: NavController, public popup: PopoverController, private http: HttpClient) {}

  ngOnInit() {
    this.getCompletedOrders();
    this.getPendingOrders();
  }

  calculateQuantity(id: string, status: string) {
    let orders;
    if (status === 'pending')
      orders = this.pendingOrders.find(x => x.orderId === id);
    else
      orders = this.completedOrders.find(x => x.orderId === id);


    let orderQuantity = orders.orderDetails
      .map(x => x.quantity)
      .reduce((sum, current) => sum + current, 0);
    return orderQuantity;
  }

  getCompletedOrders(): void {
    this.api.getData("api/v1/order/listOrders/completed", 'order')
	  .subscribe(dataFromService => {
		this.completedOrders = dataFromService;
	  });
  }

  getPendingOrders(): void {
    this.api.getData("api/v1/order/listOrdersOngoing/completed", 'order')
	  .subscribe(dataFromService => {
		this.pendingOrders = dataFromService;
	  });
  }

  backButtonClick() {
    this.navCtrl.pop();
  }
  
  trackPage(page, orderId: string) {
    
    let ordersToSend = {items: this.pendingOrders.find(x => x.orderId === orderId)};    
    console.log(ordersToSend);
    
    this.navCtrl.push(page, ordersToSend);
  }
  
  segmentChanged($event) {
    console.log(this.order)
  }
  presentPopover(event) {
    let popover = this.popup.create('OrderPopoverPage', {value: this.order});
    popover.present({
      ev: event
    });
  }
}