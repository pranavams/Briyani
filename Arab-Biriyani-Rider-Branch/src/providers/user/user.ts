import 'rxjs/add/operator/toPromise';

import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';

import { Api } from '../api/api';

/**
 * Most apps have the concept of a User. This is a simple provider
 * with stubs for login/signup/etc.
 *
 * This User provider makes calls to our API at the `login` and `signup` endpoints.
 *
 * By default, it expects `login` and `signup` to return a JSON object of the shape:
 *
 * ```json
 * {
 *   status: 'success',
 *   user: {
 *     // User fields your app needs, like "id", "name", "email", etc.
 *   }
 * }Ã˜
 * ```
 *
 * If the `status` field is not `success`, then an error is detected and returned.
 */
@Injectable()
export class User {
  _user: any;

  constructor(public api: Api) { }

  /**
   * Send a POST request to our login endpoint with the data
   * the user entered on the form.
   */
  login(accountInfo: any) {
	  return Observable.create(observer => {
		  	let headers = new Headers({'Content-Type': 'application/json'});
		    let seq = this.api.post('api/v1/user/authenticate/', accountInfo, headers).share();
		    seq.subscribe((res: any) => {
		        // If the API returned a successful response, mark the user as
				// logged in
		    	
		        observer.next(true);
		        observer.complete();
		        this._loggedIn(res);
		      }, err => {
		    	observer.next(false);
		      });

	      });
  }

  /**
   * Send a POST request to our signup endpoint with the data
   * the user entered on the form.
   */
  signup(accountInfo: any) {
    let seq = this.api.post('signup', accountInfo).share();

    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
      if (res.status == 'success') {
        this._loggedIn(res);
      }
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
  }

  /**
   * Log the user out, which forgets the session
   */
  logout() {
    this._user = null;
  }

  /**
   * Process a login/signup response to store user data
   */
  _loggedIn(resp) {
	    this._user = resp;
	    this.api.loggedInUser = resp;
	    //this.api.loggedInUser['branchId'] = 'BRAN2';
	    console.log("User Set " + JSON.stringify(this.api.loggedInUser));
  }
}
