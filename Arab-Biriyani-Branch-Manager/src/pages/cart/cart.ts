import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';

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
  user: any = 'user1';
  branchId: any = 'BRAN1';
  orderDetails: any = [];
  order: any = [];
  counter: number = 0;
  Address: any = [{doorNumber : 'No 1',
                  street: 'Peters Street',
                  area: 'Little India',
                  city: 'singapore city',
                  state: 'singapore',
                  country: 'Singapore',
                  zipcode: '656435'}];

  constructor(public navParams: NavParams, public navCtrl: NavController) {
    this.cartItems = navParams.data.items;
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
    this.cartItems.forEach((element, index) => {
      if (element.quantity > 0) {
        this.orderDetails[this.counter].item = element.id;
        this.orderDetails[this.counter].quantity = element.quantity;
        this.orderDetails[this.counter].unitPrice = element.price;
        this.order[this.counter] = this.orderDetails[this.counter];
        this.counter += 1;
      }
    });
  }
  
  buildCartDetails(){
    this.cartDetails.couponCode = '10percent';
    this.cartDetails.userName = this.user;
    this.cartDetails.branchID = this.branchId;
    this.cartDetails.customerID = '';
    this.cartDetails.deliveryAddress = this.Address;
    this.cartDetails.orderDetails = this.order;
    return this.cartDetails;
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
}