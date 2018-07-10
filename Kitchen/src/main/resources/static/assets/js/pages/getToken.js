/**
 * 
 */

//var kitchenBaseURI = 'https://biriyani-web-ui.cfapps.io/';
//var baseURI = 'https://biriyani-services.cfapps.io/api/v1/';
//var tokenURL = 'https://biriyani-services.cfapps.io/oauth/token';

var kitchenBaseURI = 'http://localhost:36363/'
var baseURI = 'http://localhost:18181/api/v1/';
var tokenURL = 'http://localhost:18181/oauth/token';

var accessToken = '';
function getAuthToken() {
	var auth_token = 'arab-briyani-client:devglan-secret';
	auth_token = "Basic " + window.btoa(auth_token);
	return auth_token;
}

var getToken = function(callback) {
	return callback('');
}

var getTokens = function(callback) {
	var settings = {
		"async" : true,
		"crossDomain" : true,
		"url" : tokenURL,
		"method" : "POST",
		"headers" : {
			"content-type" : "application/x-www-form-urlencoded",
			"authorization" : getAuthToken(),
			"cache-control" : "no-cache"
		},
		"data" : {
			"username" : "Alex123",
			"password" : "password",
			"grant_type" : "password"
		}
	}

	$.ajax(settings).done(function(result) {
		accessToken = result.access_token;
		console.log("Access Token "  + accessToken);
		return callback(accessToken);
	}).fail(function(error) {
		console.log("Token Not Received " + JSON.stringify(error));
	});
}