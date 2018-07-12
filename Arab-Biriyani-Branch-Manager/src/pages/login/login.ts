import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, ToastController, NavParams, Events } from 'ionic-angular';

import { User } from '../../providers';
import { MainPage } from '../';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  account: User = {
	userName: 'Alex123',
    password: 'password'
  };

  // Our translated text strings
  private loginErrorString: string;

  constructor(public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    public navParams: NavParams,
    public events: Events) {
    }

  doLogin() {
	this.user.login(this.account);
	this.navCtrl.push(MainPage);
    this.events.publish("menuObject", 'branch', 2);
  }
  
  // Attempt to login in through our User service
  doLoginLocal() {
    this.user.login(this.account).subscribe((resp) => {
      if(this.account.userName[this.account.userName.length-1] == '1'){
        this.navCtrl.push(MainPage);
        this.events.publish("menuObject", 'branch', 2);
      }
      else if(this.account.userName[this.account.userName.length-1] == '2')
        this.navCtrl.push('rider-delivery')
      else if(this.account.userName[this.account.userName.length-1] == '3')
        this.navCtrl.push('rider-user')
    }, (err) => {
      if(this.account.userName[this.account.userName.length-1] == '1')
        this.navCtrl.push(MainPage);
      else if(this.account.userName[this.account.userName.length-1] == '2')
        this.navCtrl.push('rider-delivery')
      else if(this.account.userName[this.account.userName.length-1] == '3')
        this.navCtrl.push('rider-user')
      // Unable to log in
      let toast = this.toastCtrl.create({
        message: this.loginErrorString,
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });
  }
}