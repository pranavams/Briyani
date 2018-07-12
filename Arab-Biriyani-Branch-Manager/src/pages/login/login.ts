import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, LoadingController, ToastController, NavParams, Events } from 'ionic-angular';

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

  loggedInUser: User = {
	userName: 'Alex123',
    password: 'password'
  };
  loading: Loading;

// Our translated text strings
  private loginErrorString: string;

  constructor(public navCtrl: NavController,
    public userService: User,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public navParams: NavParams,
    public events: Events) {
    }
  showLoading() {
	    this.loading = this.loadingCtrl.create({
	      content: 'Please wait...',
	      dismissOnPageChange: true
	    });
	    this.loading.present();
	  }
  
  doLogin() {
	  this.showLoading();
	  console.log("Loading Displayed");
	    this.userService.login(this.account).subscribe(allowed => {
	      if (allowed) {        
	          this.navCtrl.push(MainPage);
	          this.events.publish("menuObject", 'branch', 2);
	      } else {
	        this.showError("Access Denied");
	      }
	    },
	      error => {
	        this.showError(error);
	      });  
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