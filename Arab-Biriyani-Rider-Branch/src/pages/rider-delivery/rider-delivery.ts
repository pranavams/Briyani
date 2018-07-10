import {Component} from '@angular/core';
import {IonicPage, NavController, PopoverController} from 'ionic-angular';
import {RiderPopPage} from '../rider-pop/rider-pop';

import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {map} from 'rxjs/operators';

@IonicPage()
@Component({
  selector: 'page-rider-delivery',
  templateUrl: 'rider-delivery.html',
  entryComponents: [RiderPopPage]
})

export class RiderDeliveryPage {
  displayType: any = 'today';

  serviceUrl = "http://localhost:63636/api/v1/order/listTodayOrders";
  accessToken: string;

  today: any = [];
  completed: any = [];
  constructor(public navCtrl: NavController, public popoverCtrl: PopoverController, public http: HttpClient) {}

   ngOnInit() {
    this.getData();
  }

  getData(): void {
    this.restToken()
      .subscribe(
      (tokenResponse) => {
        this.accessToken = tokenResponse.access_token;//ignore
        this.dataRetrival()
          .subscribe(
          responseData => {
            this.today = responseData.order.filter(x => x.orderStatus.toUpperCase() !== 'COMPLETED');
            this.completed = responseData.order.filter(x => x.orderStatus.toUpperCase() === 'COMPLETED');
            console.log(responseData);
          }
          )
      });
  }

  dataRetrival() {
    return this.http
      .get<any[]>(this.serviceUrl + "?access_token=" + this.accessToken)
      .pipe(map(data => data));
  }
  
  getAuthToken() {
    return "Basic " + btoa('arab-briyani-client:devglan-secret');
  }

  getAuthTokenParameters() {
    return new HttpParams()
      .set('username', 'Alex123')
      .set('password', 'password')
      .set('grant_type', 'password');
  }

  restToken() {
    return this.http
      .post<any[]>("http://localhost:63636/oauth/token",
      this.getAuthTokenParameters().toString(), {
        headers: new HttpHeaders().set('content-type', 'application/x-www-form-urlencoded')
          .set('authorization', this.getAuthToken())
          .set('cache-control', 'no-cache')
      })
      .pipe(map(token => token));
  }

  slider(item, type) {
    let index = this.today.indexOf(item);
    if (this.today[index].sliderMargin == undefined || this.today[index].sliderMargin == '-130px -16px 0') {
      this.today[index].sliderContent = true;
      this.today[index].sliderMargin = '0 -16px 0';
      this.today[index].sliderType = type;
    }
    else {
      this.today[index].sliderMargin = '-130px -16px 0';
    }
  }
  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create('RiderPopPage');
    popover.present({
      ev: myEvent
    });
  }
  openPage(page) {
    console.log("Open Page");
    this.navCtrl.push(page);
  }
  
  filterNonCompletedOrders (allOrders){
    return 
  }
  
  
 getQuantity(item) {
    let orderQuantity = item.orderDetails
      .map(x => x.quantity)
      .reduce((sum, current) => sum + current, 0);
    return orderQuantity;
  }
  
  
  
  
  
}