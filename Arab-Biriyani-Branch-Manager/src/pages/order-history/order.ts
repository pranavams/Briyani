import { Component, ViewChild } from '@angular/core';
import { IonicPage, Nav, NavController, PopoverController } from 'ionic-angular';

import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@IonicPage()
@Component({
    selector: 'page-order',
    templateUrl: 'order.html'
})

export class OrderPage {
    order: any = 'ongoing';
    notification: any = 4;
    completedOrders: any= []
    completedOrdersURL = "http://localhost:63636/api/v1/order/listOrders/completed";
    constructor(public navCtrl: NavController, public popup: PopoverController, private http: HttpClient) { }
    
    ngOnInit(){
  		this.getCompletedOrders();
  	}
  	
  	getCompletedOrders(): void{
  	this.restOrdersGetCompletedOrders()
  	.subscribe(
        completedOrderList => {
         console.log(completedOrderList);
          this.completedOrders = completedOrderList.order;
        }
      )
  	}
  	
  	restOrdersGetCompletedOrders(){
  	return this.http
  	.get<any[]>(this.completedOrdersURL)
      .pipe(map(data => data));
  	}
    
    backButtonClick() {
        this.navCtrl.pop();
    }
    trackPage(page) {
        this.navCtrl.push(page, {items: [{
            title: "Chicken Biriyani",
            price: "10.99",
            quantity: 50,
            imgSrc: "/assets/imgs/chicken-biryani.jpg"
          }]
        });
    }
    segmentChanged($event) {
        console.log(this.order)
    }
    presentPopover(event) {
        let popover = this.popup.create('OrderPopoverPage', {value: this.order});
        popover.present({
            ev: event
        });
      }
}