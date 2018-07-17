import {Component} from '@angular/core';
import {IonicPage, NavController, PopoverController} from 'ionic-angular';

import {HttpClient} from '@angular/common/http';
import {Api } from '../../providers/';


@IonicPage()
@Component({ 
  selector: 'page-vessels',
  templateUrl: 'vessels.html'
})

export class VesselsPage {
  displayType: any = 'today';

  today: any = [];
  completed: any = [];
  constructor(public navCtrl: NavController, public popoverCtrl: PopoverController, public http: HttpClient, private api: Api) {}

  ngOnInit() {
	   this.api.getData("api/v1/order/listAll", 'order')
		  .subscribe(dataFromService => {
			this.today = dataFromService;
			this.completed = dataFromService;
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
