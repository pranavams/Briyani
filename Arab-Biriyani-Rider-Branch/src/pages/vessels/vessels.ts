import {Component} from '@angular/core';
import {IonicPage, NavController, PopoverController, ToastController} from 'ionic-angular';

import {HttpClient} from '@angular/common/http';
import {Api } from '../../providers/';


@IonicPage()
@Component({ 
  selector: 'page-vessels',
  templateUrl: 'vessels.html'
})

export class VesselsPage {
  displayType: any = 'today';

  returned: any = [];
  notReturned: any = [];
  constructor(public navCtrl: NavController, public popoverCtrl: PopoverController, public http: HttpClient, private api: Api, private toastCtrl: ToastController) {}

  ngOnInit() {
     this.api.getData("api/v1/order/listOrdersByRider/" + this.api.loggedInUser['valueObject']['id'], 'order')
	  .subscribe(dataFromService => {
		this.returned = dataFromService.filter(x => x.vesselStatus.toUpperCase() === 'RETURNED');
		this.notReturned = dataFromService.filter(x => x.vesselStatus.toUpperCase() !== 'RETURNED');
	 });
  }

  slider(item, type) {
    let index = this.returned.indexOf(item);
	   this.api.get("api/v1/order/updateVesselStatus/" + item.orderId + "/RETURNED")
		  .subscribe(dataFromService => {
			  this.returned.push(item);
			  this.notReturned = this.notReturned.filter(x => x.orderId !== item.orderId);
			  this.showToast('Vessels Returned');
	  }, error => {
		  this.showToast("Vessel Status not Updated");
	  });
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
  
  showToast(message){
	let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }
}
