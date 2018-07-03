/**
 * 
 */

//Get inContact Token
var accessToken = '';
var baseURI = 'http://localhost:63636/api/v1/';

function getToken() {
	var url_base = 'http://localhost:63636/oauth/token';

	// The auth_token is the base64 encoded string for the API 
	// application.
	var auth_token = 'AppName@VendorName:BusinessUnit';
	auth_token = window.btoa(auth_token);
	var requestPayload = {
		// Enter your inContact credentials for the 'username' and 
		// 'password' fields.
		'grant_type' : 'authorization_code',
		'username' : 'arab-briyani-client',
		'password' : 'devglan-secret',
		'scope' : ''
	}
	$.ajax({
		'url' : url_base,
		'type' : 'POST',
		'contentType' : 'x-www-form-urlencoded',
		'dataType' : 'json',
		"crossDomain" : true,
		'headers' : {
			// Use access_token previously retrieved from inContact token 
			// service.
			'Authorization' : 'basic ' + auth_token
		},
		'data' : requestPayload,
		'success' : function(result) {
			//Process success actions
			accessToken = result.access_token;
			baseURI = result.resource_server_base_uri;
			console.log('getToken - Success!\r\nAccess Token:\r' + accessToken +
				'\r\nBase URI:\r' + baseURI)
			document.getElementById('pageDiv').innerHTML = result.access_token;
			return result;
		},
		'error' : function(XMLHttpRequest, textStatus, errorThrown) {
			//Process error actions
			console.log('getToken - Error: ' + errorThrown);
			console.log(XMLHttpRequest.status + ' ' +
				XMLHttpRequest.statusText);
			return false;
		}
	});
}

// PUT CALL BELOW HERE!!!

// BU Branch List

function setHeader(xhr) {
	//xhr.setRequestHeader('Authorization', 'token');

	//'headers' : {
	//	// Use access_token previously retrieved from inContact token 
	//	// service.
	//	'Authorization' : 'bearer ' + accessToken
	//},

}

//END CALL ABOVE HERE