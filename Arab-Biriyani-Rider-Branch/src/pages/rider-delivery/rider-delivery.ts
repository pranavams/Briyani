import {Component} from '@angular/core';
import {IonicPage, NavController, PopoverController} from 'ionic-angular';
import {RiderPopPage} from '../rider-pop/rider-pop';

import {HttpClient} from '@angular/common/http';

import { Api } from '../../providers/';

@IonicPage()
@Component({
  selector: 'page-rider-delivery',
  templateUrl: 'rider-delivery.html',
  entryComponents: [RiderPopPage]
})

export class RiderDeliveryPage {
  displayType: any = 'today';
  today: any = [];
  completed: any = [];
  constructor(public navCtrl: NavController, public popoverCtrl: PopoverController, public http: HttpClient, private api: Api) {}

   ngOnInit() {
	 this.api.getData("api/v1/order/listOrdersByRider/ENDRI2", 'order')
	   .subscribe(dataFromService => {
            this.today = dataFromService.filter(x => x.orderStatus.toUpperCase() !== 'DELIVERED');
            this.completed = dataFromService.filter(x => x.orderStatus.toUpperCase() === 'DELIVERED');
	  });
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
  openPage(page, index: number) {
    console.log("Open Page " + index);
    console.log(this.today[index]);
    this.navCtrl.push(page, {order: this.today[index]});
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

 deliverTheOrder(item, index){
	let orderUpdate : any = {
		id: item.orderId,
		orderStatus: 'DELIVERED',
		riderId: this.api.loggedInUser['valueObject']['id']
	};	 
	this.api.postData("api/v1/order/updateOrderStatus/", orderUpdate)
	  	.subscribe(data => {
	  		this.today = this.today
	  			.filter(x => x.orderId !== item.orderId);
	});
 }
 
}