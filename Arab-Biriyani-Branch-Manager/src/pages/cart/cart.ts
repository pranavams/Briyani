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
    cartDetails.branchID = 'BRAN2';
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
  
  createOrder(orderDetail) : void {
	  this.api.postData("api/v1/order/createOrder", orderDetail)
	  	.subscribe(data => {
          this.createdOrderDetails = data;
          this.cartItems.total = this.total;
          this.cartItems.orderId = this.createdOrderDetails.orderId;
          this.cartItems.orderDetail = orderDetail.orderDetails;
          this.navCtrl.push('PaymentPage', {items: this.cartItems});
		});
  }
}