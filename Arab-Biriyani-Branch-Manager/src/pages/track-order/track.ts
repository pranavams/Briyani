import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Api} from '../../providers/api/api';

@IonicPage()
@Component({
  selector: 'page-track-order',
  templateUrl: 'track.html'
})

export class TrackPage {

  trackOrderUrl = this.api.url + "/api/v1/order/get/";
  accessToken: string;
  order: any;
  orderStatus: any = [];
  tempArr: any = this.orderStatus;

  constructor(public api: Api, public navCtrl: NavController, public navParams: NavParams, private http: HttpClient) {
    this.order = this.navParams.data.items;
  }
  
  ngOnInit() {
    this.getData(this.order.orderId);
  }


  backButtonClick() {
    this.navCtrl.pop();
  }

  ordersPage() {
    this.navCtrl.push('OrderPage');
  }
  
  getData(paymentStatus: string): void {
    //this.restToken()
    //  .subscribe(
    //  (tokenResponse) => {
    //    this.accessToken = tokenResponse.access_token; 
       this.retrieveStatus(this.order.orderId)
          .subscribe(
          orderStatus => {
            this.orderStatus = orderStatus['order'];
            this.tempArr = orderStatus['order'];
            console.log("order status: " + this.orderStatus[0].orderStatus);
          }
          );
    //  });
  }

  retrieveStatus(orderId: number) {
    return this.http
      .get<any[]>(this.trackOrderUrl + orderId +"?access_token=" + this.accessToken)
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
      .post<any[]>("/oauth/token",
      this.getAuthTokenParameters().toString(), {
        headers: new HttpHeaders().set('content-type', 'application/x-www-form-urlencoded')
          .set('authorization', this.getAuthToken())
          .set('cache-control', 'no-cache')
      })
      .pipe(map(token => token));
  }

}
