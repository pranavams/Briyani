import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ToastController } from 'ionic-angular';
import { Api } from '../../providers/api/api';

@IonicPage()
@Component({
    selector: 'page-rider-order-summary',
    templateUrl: 'rider-order-summary.html'
})

export class RiderOrderSummaryPage {
    item: any = {};
	slider(type){
	    if(this.item.sliderMargin == undefined || this.item.sliderMargin == '-130px -16px 0'){
	        this.item.sliderContent = true;
	        this.item.sliderMargin = '0 -16px 0';
	        this.item.sliderType = type;
	    }
	    else{
	        this.item.sliderMargin = '-130px -16px 0';
	    }
	}


    constructor(public navCtrl: NavController, public toast: ToastController, public navParams: NavParams, private api: Api){
    	this.item = navParams.data.order;
    }
    
    getQuantity() {
        return this.item.orderDetails
        .map(x => x.quantity)
        .reduce((sum, current) => sum + current, 0);
    }
    
    markAsDelivered () {
  	  this.api.get("api/v1/order/updateVesselStatus/" + this.item.orderId + "/DELIVERED")
	  	.subscribe(data => {
	  		let orderUpdate : any = {
	  			id: this.item.orderId,
	  			orderStatus: 'DELIVERED',
	  			riderId: 'ENDRI2'
	  		};
	  		this.api.postData("api/v1/order/updateOrderStatus/", orderUpdate)
	  	  		.subscribe(data => {
	  	  			this.navCtrl.push('RiderDeliveryPage');
			});
		});
    }
}