/**
 * 
 */

//Get inContact Token
var accessToken = '';
//var kitchenBaseURI = 'https://briyani-web-ui.cfapps.io/';
//var baseURI = 'https://briyani-services.cfapps.io/api/v1/';
//var tokenURL = 'https://briyani-services.cfapps.io/oauth/token';

var kitchenBaseURI = 'http://localhost:36363/'
var baseURI = 'http://localhost:63636/api/v1/';
var tokenURL = 'http://localhost:63636/oauth/token/';

var postData = {
	grant_type : 'client_credentials',
	client_id : 'arab-briyani-client',
	client_secret : 'devglan-secret'
};

function getAuthToken() {
	var auth_token = 'arab-briyani-client:devglan-secret';
	auth_token = window.btoa(auth_token);
	return auth_token;
}

function getToken() {
	return $.post(tokenURL, postData, null, 'json')
		.done(function(data) {
			appAuthToken = data.access_token;
		})
		.fail(function(jqXHR, status, error) {
			console.log('Token Failure ' + error);
		});
}

function getTokens() {

	// The auth_token is the base64 encoded string for the API 
	// application.
	var auth_token = 'arab-briyani-client:devglan-secret';
	auth_token = window.btoa(auth_token);
	console.log("GetToken -AuthToken " + auth_token);

	$.ajax({
		'url' : tokenURL,
		'method' : 'POST',
		"contentType" : "application/x-www-form-urlencoded",
		"crossDomain" : true,
		"headers" : {
			"content-type" : "application/x-www-form-urlencoded",
			"authorization" : "Basic YXJhYi1icml5YW5pLWNsaWVudDpkZXZnbGFuLXNlY3JldA==",
			"cache-control" : "no-cache",
			"postman-token" : "1e2d2395-5567-d8f9-9f59-be919dc956b4"
		},
		"data" : {
			"username" : "Alex123",
			"password" : "$2a$04$I9Q2sDc4QGGg5WNTLmsz0.fvGv3OjoZyj81PrSFyGOqMphqfS2qKu",
			"grant_type" : "password"
		},
		'success' : function(result) {
			//Process success actions
			accessToken = result.access_token;
			baseURI = result.resource_server_base_uri;
			console.log('getToken - Success!\r\nAccess Token:\r' + accessToken +
				'\r\nBase URI:\r' + baseURI)
			return result;
		},
		'error' : function(XMLHttpRequest, textStatus, errorThrown) {
			//Process error actions
			console.log('getToken - Error: ' + errorThrown + ", " + JSON.stringify(XMLHttpRequest) + ", " + textStatus);
			console.log(XMLHttpRequest.status + ' ' +
				XMLHttpRequest.statusText);
			return false;
		}
	});
}