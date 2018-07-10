import {Component, ViewChild, OnInit} from '@angular/core';
import {IonicPage, Nav, NavController} from 'ionic-angular';

import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {map} from 'rxjs/operators';

@IonicPage()
@Component({
  selector: 'page-payment-history',
  templateUrl: 'payment-history.html'
})

export class PaymentHistoryPage implements OnInit {
  category: any = 'all';
  notification: any = 4;

  paymentHistoryUrl = "https://biriyani-services.cfapps.io/api/v1/order/listAll/";
  paymentHistory: any = [];
  tempArr: any = this.paymentHistory;
  data: any = {};
  accessToken: string;

  constructor(public navCtrl: NavController, private http: HttpClient) {}

  ngOnInit() {
    this.getData("completed");
  }

  getData(paymentStatus: string): void {
    //this.restToken()
    //  .subscribe(
    //  (tokenResponse) => {
    //    this.accessToken = tokenResponse.access_token; 
        this.paymentHistoryRetrival(paymentStatus)
          .subscribe(
          paymentHistory => {
            this.paymentHistory = paymentHistory['order'];
            this.tempArr = paymentHistory['order'];
            console.log(paymentHistory);
          }
          );
    //  });
  }

  paymentHistoryRetrival(paymentStatus: string) {
    return this.http
      .get<any[]>(this.paymentHistoryUrl + "?access_token=" + this.accessToken)
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
      .post<any[]>("https://biriyani-services.cfapps.io/oauth/token",
      this.getAuthTokenParameters().toString(), {
        headers: new HttpHeaders().set('content-type', 'application/x-www-form-urlencoded')
          .set('authorization', this.getAuthToken())
          .set('cache-control', 'no-cache')
      })
      .pipe(map(token => token));
  }


  segmentChanged($event) {
    this.tempArr = [];
    console.log("Category " + this.category);
    console.log("Temp " + this.tempArr);
    if (this.category == 'all')
      this.tempArr = this.paymentHistory;
    else {
      this.tempArr = this.paymentHistory.filter(element => element.paymentStatus === this.category.toUpperCase());
      console.log(this.tempArr);
    }
  }

}