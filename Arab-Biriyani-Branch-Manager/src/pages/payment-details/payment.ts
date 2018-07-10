import { Component, ViewChild, OnInit } from '@angular/core';
import { IonicPage, Nav, NavController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-payment-details',
  templateUrl: 'payment.html'
})

export class PaymentPage implements OnInit {
  
    ngOnInit(){
      
    }
  
    constructor(public navCtrl: NavController){}

    nextPage(){
        this.navCtrl.push('CompletePage');
    }

    backButtonClick(){
        this.navCtrl.pop();
    }
}