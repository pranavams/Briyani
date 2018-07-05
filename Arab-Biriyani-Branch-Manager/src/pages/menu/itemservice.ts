export class Item {
  constructor(
	public id: string, 
	public name: string,
	public description: string,
	public price: number,
	public menuName: string,
	public menuId: string
	) { }
} 
 
@Injectable()
export class ItemService {
  constructor(
    private _router: Router, private _http: Http){}
  
  obtainAccessToken(loginData){
    let params = new URLSearchParams();
    params.append('username',loginData.username);
    params.append('password',loginData.password);    
    params.append('grant_type','authorization_code');
    let headers = new Headers({'Content-type': 'application/x-www-form-urlencoded; charset=utf-8', 'Authorization': 'Basic '+btoa("arab-briyani-client:devglan-secret")});
    let options = new RequestOptions({ headers: headers });
     
    this._http.post('http://localhost:63636/oauth/token', params.toString(), options)
      .map(res => res.json()) //Token Is Mapped here
      .subscribe(
        data => this.saveToken(data),
        err => alert('Invalid Credentials')); 
  }
 
  saveToken(token){
    var expireDate = new Date().getTime() + (1000 * token.expires_in);
    Cookie.set("access_token", token.access_token, expireDate);
    this._router.navigate(['/']);  //Navigate to Next Page: Pranav
  }
 
  getResource(resourceUrl, loginData) : Observable<Item>{
	this.obtainAccessToken(this.loginData);

    var headers = new Headers({'Content-type': 'application/x-www-form-urlencoded; charset=utf-8', 'Authorization': 'Bearer ' + Cookie.get('access_token')});
    var options = new RequestOptions({ headers: headers });
    return this._http.get(resourceUrl, options)
                   .map((res:Response) => res.json())
                   .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }
 
  checkCredentials(){
    if (!Cookie.check('access_token')){
        this._router.navigate(['/login']);  // Navigate To the Next Page: Pranav
    }
  } 
 
  logout() {
    Cookie.delete('access_token');
    this._router.navigate(['/login']); // Navigate to Login Page: Pranav
  }
}