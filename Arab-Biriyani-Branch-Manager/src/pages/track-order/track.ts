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
  order: any;
  orderStatus: any = [];
  tempArr: any = this.orderStatus;

  constructor(public api: Api, public navCtrl: NavController, public navParams: NavParams, private http: HttpClient) {
    this.order = this.navParams.data.items;
  }
  
  ngOnInit() {
    this.getData(this.order['orderId']);
  }


  backButtonClick() {
    this.navCtrl.pop();
  }

  ordersPage() {
    this.navCtrl.push('OrderPage');
  }
  
  getData(orderId: string): void {
    this.api.getData("api/v1/order/get/" + orderId, 'order')
	  .subscribe(dataFromService => {
		this.orderStatus = dataFromService;
		this.tempArr = dataFromService;
    });
  }

}
