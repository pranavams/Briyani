import {Component} from '@angular/core';
import {IonicPage, NavController, PopoverController, Popover} from 'ionic-angular';

import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {map} from 'rxjs/operators';

@IonicPage()
@Component({
  selector: 'page-vessels',
  templateUrl: 'vessels.html'
})

export class VesselsPage {
  displayType: any = 'today';

  serviceUrl = "http://localhost:63636/api/v1/order/listOrdersByVesselStatus/";
  accessToken: string;

  today: any = [];
  completed: any = []
  constructor(public navCtrl: NavController, public popoverCtrl: PopoverController, public http: HttpClient) {}

  ngOnInit() {
    this.getData("RETURNED");
  }

  getData(data: string): void {
    this.restToken()
      .subscribe(
      (tokenResponse) => {
        this.accessToken = tokenResponse.access_token;//ignore
        this.dataRetrival(data)
          .subscribe(
          responseData => {
            this.today = responseData.order.filter(x => x.vesselStatus.toUpperCase() !== 'RETURNED');
            this.completed = responseData.order.filter(x => x.vesselStatus.toUpperCase() === 'RETURNED');
            console.log(responseData);
          }
          )
      });
  }

  dataRetrival(data: string) {
    return this.http
      .get<any[]>(this.serviceUrl + data + "?access_token=" + this.accessToken)
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

  getQuantity(item) {
    let orderQuantity = item.orderDetails
      .map(x => x.quantity)
      .reduce((sum, current) => sum + current, 0);
    return orderQuantity;
  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create('RiderPopPage');
    popover.present({
      ev: myEvent
    });
  }
}
