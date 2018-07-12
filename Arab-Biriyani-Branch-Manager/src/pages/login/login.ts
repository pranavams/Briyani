import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, LoadingController, Loading, ToastController, NavParams, Events } from 'ionic-angular';

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
  account: any = {
	userName: 'Alex123',
    password: 'password'
  };

  loggedInUser: any = {
	userName: 'Alex123',
    password: 'password'
  };
  loading: Loading;

// Our translated text strings
  private loginErrorString: string;

  constructor(public navCtrl: NavController,
    public userService: User,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    public navParams: NavParams,
    public events: Events) {
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
  
  showError(text) {
	  this.loading.present().then(() => {
		  this.loading.dismiss();
		});

	  let toast = this.toastCtrl.create({
          message: text,
          duration: 3000,
          position: 'top'
        });
        toast.present();
	  }
  
  showLoading() {
	    this.loading = this.loadingCtrl.create({
	      content: 'Please wait...',
	      dismissOnPageChange: true
	    });
	    this.loading.present();
	  }
}