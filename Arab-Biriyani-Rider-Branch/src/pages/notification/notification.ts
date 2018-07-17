import {Component, } from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';

import {HttpClient} from '@angular/common/http';

import { Api } from '../../providers/';

@IonicPage()
@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html'
})

export class NotificationPage {
  details: any = []
  accessToken: string;

 // details: any = {}
  
  constructor(public navCtrl: NavController, public http: HttpClient, private api: Api) {}
  
   ngOnInit() {
	   this.api.getData("api/v1/order/listTodayOrders", 'order')
		  .subscribe(dataFromService => {
			this.details = dataFromService;
		  });
   }

}