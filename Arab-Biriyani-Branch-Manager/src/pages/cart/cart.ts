import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {map} from 'rxjs/operators';
import { Api } from '../../providers/api/api';

@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html'
})

export class CartPage {
  cartDetails: any =[];
  cartItems: any = [];
  args: any = 0;
  coupon: any;
  cart: any = 0;
  tax: any = 0;
  total: any = 0;
  discountVal: any = 0;
  user: any = 'Alex123';
  branchId: any = 'BRAN2';
  orderDetails: any = [];
  order: any = [];
  counter: number = 0;
  accessToken: string;
  createdOrderDetails : any;
  
  Address: any = {doorNumber : 'No 1',
                  street: 'Peters Street',
                  area: 'Little India',
                  city: 'singapore city',
                  state: 'singapore',
                  country: 'Singapore',
                  zipcode: '656435'};

  constructor(public api: Api, public navParams: NavParams, public navCtrl: NavController, private http: HttpClient) {
    this.cartItems = navParams.data.items;
    this.accessToken = navParams.data.accessToken;
    this.cartItems.forEach((element, index) => {
      console.log(this.cartItems[index]);
    })
    if (this.cartItems.length > 0)
      this.cartCount();
  }

  ionViewDidLoad() {

  }

  parse(a) {
    let c = String(a);
    return parseFloat(c).toFixed(2);
  }

  backButtonClick() {
    this.navCtrl.pop();
  }

  add(item) {
    console.log("item :" + item);
    this.cartItems.forEach((element, index) => {
      if (item === element.menuName) {
        this.cartItems[index].quantity++;
      }
    });
    this.cartItems.forEach((element, index) => {
      console.log(this.cartItems[index]);
    })
    this.cartCount();
  }

  remove(item) {
    console.log("item :" + item);
    this.cartItems.forEach((element, index) => {
      if (item === element.menuName && element.quantity > 0) {
        this.cartItems[index].quantity--;
      }
    });
    this.cartCount();
  }

  buildOrderDetails() {
	let orderDetails: any = [];
    let counter = 0;
    this.cartItems.forEach((element, index) => {
      if (element.quantity > 0) {
    	let orderDetail : any = {
    		'quantity' : element.quantity,
    		'unitPrice' : element.price,
    		'item' : {
	    		'id' : element.id,
	            'description' : element.description,
	            'menuId' : element.menuId,
	            'menuName' : element.menuName,
	            'name' : element.name,
	            'price' : element.price
    		}
    	};
        orderDetails[counter] = orderDetail;
        counter += 1;
      }
    });
    return orderDetails;
  }
  
  buildCartDetails(){
	let cartDetails : any = {};
    cartDetails.couponCode = '10percent';
    cartDetails.userName = this.user;
    cartDetails.branchID = 'BRAN1';
    cartDetails.customerID = '';
    cartDetails.deliveryAddress = this.Address;
    cartDetails.orderDetails = this.buildOrderDetails();
    return cartDetails;
  }

  cartCount() {
    this.cart = 0;
    this.total = 0;
    this.cartItems.forEach(element => {
      this.cart = element.quantity + this.cart;
      this.total = this.total + (element.quantity * element.price);
    });
    this.tax = this.total * 7 / 100;
    this.total = this.tax + this.total;
  }
  
  nextPage() {
	let cartDetail = this.buildCartDetails();
	this.createOrder(cartDetail);
    this.cartItems.total = this.total;
    this.navCtrl.push('PaymentPage', {items: this.cartItems});
  }

  discount() {
    this.cartCount();
    if (this.coupon == '10percent') {
      this.discountVal = this.total / 10;
      this.total = this.total - (this.total / 10);
    }
    else {
      this.discountVal = 0;
      this.cartCount();
    }
  }
  
  createOrder(orderDetail): void {
	  console.log("Order Detail");
	  console.log(orderDetail);
	    // this.restToken()
	    // .subscribe(
	    // (tokenResponse) => {
	    // this.accessToken = tokenResponse['access_token'];
	        this.restCreateOrder(orderDetail)
	          .subscribe(
	          data => {
	            this.createdOrderDetails = data;
	            console.log(data);
	          }
	          );
	    // }
	    // );
	  }
	  
  	  restCreateOrder(orderDetail) {
  		const createOrderHeaders = new HttpHeaders().set('Content-Type', 'application/json')
	    return this.http
	      .post<any[]>(this.api.url + "/api/v1/order/createOrder?access_token=" + this.accessToken,
	    		  JSON.stringify(orderDetail),  {
	    	  		headers: createOrderHeaders
	    		  }
	      ).pipe(map(data => data));
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
	      .post<any[]>("/oauth/token",
	      this.getAuthTokenParameters().toString(), {
	        headers: new HttpHeaders().set('content-type', 'application/x-www-form-urlencoded')
	          .set('authorization', this.getAuthToken())
	          .set('cache-control', 'no-cache')
	      })
	      .pipe(map(token => token));
	  }

  
}