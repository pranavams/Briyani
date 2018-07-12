import {Component, OnInit} from '@angular/core';
import {IonicPage, NavController, PopoverController} from 'ionic-angular';

import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {map} from 'rxjs/operators';

@IonicPage()
@Component({
  selector: 'page-order',
  templateUrl: 'order.html'
})

export class OrderPage implements OnInit {
  order: any = 'ongoing';
  notification: any = 4;
  completedOrders: any = [];
  completedOrdersURL = "https://biriyani-services.cfapps.io/api/v1/order/listOrders/completed";

  pendingOrders: any = [];
  pendingOrdersURL = "https://biriyani-services.cfapps.io/api/v1/order/listOrdersOngoing/completed";
  accessToken: string;

  constructor(public navCtrl: NavController, public popup: PopoverController, private http: HttpClient) {}

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
    //this.restToken()
    //  .subscribe(
    //  (tokenResponse) => {
    //   this.accessToken = tokenResponse['access_token'];
        this.restOrdersGetCompletedOrders()
          .subscribe(
          completedOrderList => {
            console.log(completedOrderList);
            this.completedOrders = completedOrderList['order'];
          }
          );
     // }
     // );
  }

  getPendingOrders(): void {
    //this.restToken()
    //  .subscribe(
    //  (tokenResponse) => {
    //    this.accessToken = tokenResponse['access_token'];
        this.restOrdersGetPendingOrders()
          .subscribe(
          pendingOrderList => {
            console.log(pendingOrderList);
            this.pendingOrders = pendingOrderList['order'];
          }
          );
      //}
      //);
  }

  restOrdersGetCompletedOrders() {
    return this.http
      .get<any[]>(this.completedOrdersURL + "?access_token=" + this.accessToken)
      .pipe(map(data => data));
  }

  restOrdersGetPendingOrders() {
    return this.http
      .get<any[]>(this.pendingOrdersURL + "?access_token=" + this.accessToken)
      .pipe(map(data => data));
  }

  getAuthToken() {
    return "Basic " + btoa('arab-briyani-client:devglan-secret');;
  }

  getAuthTokenParameters() {
    return new HttpParams()
      .set('username', 'Alex123')
      .set('password', 'password')
      .set('grant_type', 'password');
  }

  restToken() {
    return this.http
      .post<any[]>("https://biriyani-services.cfapps.io/oauth/token",
      this.getAuthTokenParameters().toString(), {
        headers: new HttpHeaders().set('content-type', 'application/x-www-form-urlencoded')
          .set('authorization', this.getAuthToken())
          .set('cache-control', 'no-cache')
      })
      .pipe(map(token => token));
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