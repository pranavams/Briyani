import {Component, ViewChild} from '@angular/core';
import {IonicPage, Nav, NavController} from 'ionic-angular';

import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {map} from 'rxjs/operators';

export interface CountdownTimer {
  seconds: number;
  secondsRemaining: number;
  runTimer: boolean;
  hasStarted: boolean;
  hasFinished: boolean;
  displayTime: string;
}

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html'
})
export class MenuPage implements OnInit {
  timer: CountdownTimer;
  counter: any = '00:00:00';
  seconds: number;
  minutes: number;
  hours: number;
  cart: any = 0;
  notification: any = 4;
  menuItemsUrl = "http://localhost:63636/api/v1/item/listAll";
  menuItems: any = [];
  data: any = {
  };
  accessToken: string;

  ngOnInit() {
    this.getMenuItems();
  }

  getMenuItems(): void {
    this.restToken()
      .subscribe(
      (tokenResponse) => {
        this.accessToken = tokenResponse.access_token;
        this.restItemsServiceGetMenuItems()
          .subscribe(
          menuItems => {
            this.menuItems = menuItems.items;
            console.log(menuItems);
          }
          )
      }
      );
  }
  
  // Rest Items Service: Read all MENU Items
  restItemsServiceGetMenuItems() {
    return this.http
      .get<any[]>(this.menuItemsUrl + "?access_token=" + this.accessToken)
      .pipe(map(data => data));
  }

  getAuthToken() {
    return "Basic " + btoa('arab-briyani-client:devglan-secret');;
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

  constructor(public navCtrl: NavController, private http: HttpClient) {

  }

  ionViewDidLoad() {
    this.initTimer();
    this.cartCount();
  }

  hasFinished() {
    return this.timer.hasFinished;
  }

  initTimer() {

    this.timer = <CountdownTimer>{
      seconds: 10800,
      runTimer: false,
      hasStarted: false,
      hasFinished: false,
      secondsRemaining: 10800,
      displayTime: '00:00:00'
    };

    this.timer.displayTime = this.getSecondsAsDigitalClock(this.timer.secondsRemaining);
    this.startTimer();
  }

  startTimer() {
    this.timer.hasStarted = true;
    this.timer.runTimer = true;
    this.timerTick();
  }

  timerTick() {
    setTimeout(() => {
      if (!this.timer.runTimer) {return;}
      this.timer.secondsRemaining--;
      this.timer.displayTime = this.getSecondsAsDigitalClock(this.timer.secondsRemaining);
      if (this.timer.secondsRemaining > 0) {
        this.timerTick();
      } else {
        this.timer.hasFinished = true;
      }
      this.counter = this.timer.displayTime;
    }, 1000);
  }

  getSecondsAsDigitalClock(inputSeconds: number) {
    const secNum = parseInt(inputSeconds.toString(), 10); // don't forget the second param
    const hours = Math.floor(secNum / 3600);
    const minutes = Math.floor((secNum - (hours * 3600)) / 60);
    const seconds = secNum - (hours * 3600) - (minutes * 60);
    let hoursString = '';
    let minutesString = '';
    let secondsString = '';
    hoursString = (hours < 10) ? '0' + hours : hours.toString();
    minutesString = (minutes < 10) ? '0' + minutes : minutes.toString();
    secondsString = (seconds < 10) ? '0' + seconds : seconds.toString();
    return hoursString + ':' + minutesString + ':' + secondsString;
  }

  add(itemIndex) {
    this.menuItems[itemIndex].quantity++;
    this.cartCount();
  }

  remove(itemIndex) {
    if (this.menuItems[itemIndex].quantity > 0) {
      this.menuItems[itemIndex].quantity--;
    }
    this.cartCount();
  }

  cartCount() {
    this.cart = 0;
    this.menuItems.forEach(element => {
      this.cart = element.quantity + this.cart;
    });
    if (this.cart > 99)
      this.cart = '99+';
  }

  placeOrder(menu) {
    this.navCtrl.push('CartPage', {items: this.menuItems});
  }
}
