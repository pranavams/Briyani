import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs/Observable';

/**
 * Api is a generic REST Api handler. Set your API url first.
 */
@Injectable()

export class Api {  
  
  //
	
  url: string = 'https://biriyani-services.cfapps.io';
  loggedInUser : any;
  accessToken: string;
  
  constructor(public http: HttpClient) {
  }

	getAuthToken() {
		return "Basic " + btoa('arab-briyani-client:devglan-secret');;
	}
	
	getAuthTokenParameters() {
	  return new HttpParams()
	    .set('username', this.loggedInUser['userName'])
	    .set('password', atob(this.loggedInUser['password']))
	    .set('grant_type', 'password');
	}
	
	restToken() {
	  return this.http.post<any[]>(this.url + "/" + "oauth/token",
	    this.getAuthTokenParameters().toString(), {
	      headers: new HttpHeaders().set('content-type', 'application/x-www-form-urlencoded')
	        .set('authorization', this.getAuthToken())
	        .set('cache-control', 'no-cache')
	    })
	    .pipe(map(token => token));
	}
	
    // Rest Items Service: Read all MENU Items
    getDataFromRest(dataUrl: string) {
      return this.http
        .get<any[]>(this.url + "/" + dataUrl + "?access_token=" + this.accessToken)
        .pipe(map(data => data));
    }

    restPostData(dataUrl : string, payLoad: any, accessToken: string) {
    	const postHeaders = new HttpHeaders().set('Content-Type', 'application/json')
        return this.http
          .post<any[]>(this.url + "/" + dataUrl + "?access_token=" + this.accessToken,
    		  JSON.stringify(payLoad),  {
    	  		headers: postHeaders
    		  }
          ).pipe(map(data => data));
    }
    
    postData(dataUrl: string, payLoad: any){
		return Observable.create(observer => {
		  this.restToken()
		  .subscribe(
		    (tokenResponse) => {
		      this.restPostData(dataUrl, payLoad, tokenResponse['access_token'])
		          .subscribe(
		          data => {
		 		    observer.next(data);
		 		    observer.complete();
		          });
		     });
		});
	}
	
	getData(dataUrl: string, dataName: string){
		return Observable.create(observer => {
		    this.restToken()
		      .subscribe(
		      (tokenResponse) => {
		        this.accessToken = tokenResponse['access_token'];
		        this.getDataFromRest(dataUrl)
		          .subscribe(
		          dataSet => {
			        observer.next(dataSet[dataName]);
			        observer.complete();
		          });
		      });
		});
	}
  
  get(endpoint: string){
	return this.http.get(this.url + '/' + endpoint);	  
  }
  
  getWithParam(endpoint: string, params?: any, reqOpts?: any) {
    if (!reqOpts) {
      reqOpts = {
        params: new HttpParams()
      };
    }

    // Support easy query params for GET requests
    if (params) {
      reqOpts.params = new HttpParams();
      for (let k in params) {
        reqOpts.params = reqOpts.params.set(k, params[k]);
      }
    }

    return this.http.get(this.url + '/' + endpoint, reqOpts);
  }

  post(endpoint: string, body: any, reqOpts?: any) {
    return this.http.post(this.url + '/' + endpoint, body, reqOpts);
  }

  put(endpoint: string, body: any, reqOpts?: any) {
    return this.http.put(this.url + '/' + endpoint, body, reqOpts);
  }

  delete(endpoint: string, reqOpts?: any) {
    return this.http.delete(this.url + '/' + endpoint, reqOpts);
  }

  patch(endpoint: string, body: any, reqOpts?: any) {
    return this.http.patch(this.url + '/' + endpoint, body, reqOpts);
  }
}
