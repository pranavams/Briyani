import {Component, ViewChild} from '@angular/core';
import {IonicPage, Nav, NavController} from 'ionic-angular';

import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {map} from 'rxjs/operators';

@IonicPage()
@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html'
})

export class NotificationPage {
  details: any = []
  serviceUrl = "http://localhost:63636/api/v1/order/listTodayOrders";
  accessToken: string;

 //details: any = {}
  
  constructor(public navCtrl: NavController, public http: HttpClient) {}
  
   ngOnInit() {
    this.getData();
  }

  getData(): void {
    this.restToken()
      .subscribe(
      (tokenResponse) => {
        this.accessToken = tokenResponse['access_token'];//ignore
        this.dataRetrival()
          .subscribe(
          responseData => {
            this.details = responseData.order;//ignore
            console.log(responseData.order);
          }
          );
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

}