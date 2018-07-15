import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, AlertController} from 'ionic-angular';

import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {map} from 'rxjs/operators';
import { Api } from '../../providers/api/api';

@IonicPage()
@Component({
  selector: 'page-my-account',
  templateUrl: 'account.html'
})

export class AccountPage {
  notification: any = 4;

  details: any = {};

  constructor(public api: Api, public navCtrl: NavController, public alertCtrl: AlertController, public http: HttpClient) {}

  ngOnInit() {
    this.getData("BRAN2");
  }

  getData(data: string): void {
    this.api.getData("api/v1/branch/get/" + data, 'branch')
	  .subscribe(dataFromService => {
		this.details = dataFromService[0];
	  });
  }

  getDisplayableAddress(address: any){
	  return ''; //(address); 
  }
  
  backButtonClick() {
    this.navCtrl.pop();
  }

  showPrompt() {
    let prompt = this.alertCtrl.create({
      title: 'Change Password',
      message: "Enter your New Password",
      inputs: [
        {
          name: 'password',
          type: 'password',
          placeholder: 'New Password'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            console.log('Saved clicked');
          }
        }
      ]
    });
    prompt.present();
  }

  editAddress() {
    let prompt = this.alertCtrl.create({
      title: 'Change Details',
      message: "Enter your Details",
      inputs: [
        {
          name: 'username',
          type: 'text',
          placeholder: 'User Name'
        },
        {
          name: 'phone',
          type: 'text',
          placeholder: 'Mobile Number'
        },
        {
          name: 'location',
          type: 'text',
          placeholder: 'Location'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            this.details.name = data.username;
            this.details.phone = data.phone;
            this.details.location = data.location;
            console.log(data)
          }
        }
      ]
    });
    prompt.present();
  }


}