import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, AlertController} from 'ionic-angular';

import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {map} from 'rxjs/operators';

@IonicPage()
@Component({
  selector: 'page-my-account',
  templateUrl: 'account.html'
})

export class AccountPage {
  notification: any = 4;
  serviceUrl = "http://localhost:63636/api/v1/branch/get/";
  accessToken: string;

  details: any = {}

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public http: HttpClient) {}

  ngOnInit() {
    this.getData("BRAN1");
  }

  getData(data: string): void {
    this.restToken()
      .subscribe(
      (tokenResponse) => {
        this.accessToken = tokenResponse.access_token;//ignore
        this.dataRetrival(data)
          .subscribe(
          responseData => {
            this.details = responseData.branch[0];//ignore
            console.log(responseData);
          }
          )
      });
  }

  dataRetrival(data: string) {
    return this.http
      .get<any[]>(this.serviceUrl + data + "?access_token=" + this.accessToken)
      .pipe(map(data => data));
  }

  getAuthToken() {
    return "Basic " + btoa('arab-briyani-client:devglan-secret');
  }

  getAuthTokenParameters() {
    return new HttpParams()
      .set('username', 'Alex123')
      .set('password', 'password')
      .set('grant_type', 'password');
  }

  restToken() {
    return this.http
      .post<any[]>("http://localhost:63636/oauth/token",
      this.getAuthTokenParameters().toString(), {
        headers: new HttpHeaders().set('content-type', 'application/x-www-form-urlencoded')
          .set('authorization', this.getAuthToken())
          .set('cache-control', 'no-cache')
      })
      .pipe(map(token => token));
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