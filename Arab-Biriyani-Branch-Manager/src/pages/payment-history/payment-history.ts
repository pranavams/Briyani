import {Component, OnInit, ViewChild} from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';

import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {map} from 'rxjs/operators';
import { Api } from '../../providers/api/api';

@IonicPage()
@Component({
  selector: 'page-payment-history',
  templateUrl: 'payment-history.html'
})

export class PaymentHistoryPage implements OnInit {
  category: any = 'all';
  notification: any = 4;
  paymentHistory: any = [];
  tempArr: any = this.paymentHistory;

constructor(public api: Api, public navCtrl: NavController, private http: HttpClient) {}

  ngOnInit() {
    this.getData("completed");
  }

  getData(paymentStatus: string): void {
	 this.api.getData("api/v1/order/listForBranch/" + this.api.loggedInUser['valueObject']['id'], 'order')
	  .subscribe(dataFromService => {
            this.paymentHistory = dataFromService;
            this.tempArr = dataFromService;
	  });
  }

  segmentChanged($event) {
    this.tempArr = [];
    if (this.category == 'all')
      this.tempArr = this.paymentHistory;
    else {
      this.tempArr = this.paymentHistory.filter(element => element.paymentStatus.toUpperCase() === this.category.toUpperCase());
    }
  }

}