/**
 * 
 */
function getRiderList() {
	// The baseURI variable is created by the result.base_server_base_uri 
	// which is returned when getting a token and should be used to 
	// create the url_base.
	$.ajax({
		'url' : baseURI + 'rider/get/' +$.urlParam('id') + '?access_token=' + accessToken,
		'type' : 'GET',
		'contentType' : 'x-www-form-urlencoded',
		'crossDomain' : true,
		'success' : function(result) {
			displayRiderPreview(result);
			return result;
		},
		'error' : function(XMLHttpRequest, textStatus, errorThrown) {
			//Process error actions
			console.log('getCustomer - Error: ' + errorThrown);
			console.log(XMLHttpRequest.status + ' ' +
				XMLHttpRequest.statusText);
			return false;
		}
		
	});
}

function displayRiderPreview(data){
	console.log("Data " + JSON.stringify(data));
	data = data.rider[0];
	address = data.address;
	document.getElementById('riderName').innerHTML = data.riderPersonFirstName + ' ' + data.riderPersonMiddleName + ' ' + data.riderPersonLastName
	document.getElementById('riderPhoneNumber').innerHTML = data.mobileNumber;
	document.getElementById('riderEmail').innerHTML = data.email;
	//document.getElementById('dateOfBirth').innerHTML = data.dateOfBirth;
	
	document.getElementById('address').innerHTML = address.doorNumber+',' + address.street + ', ' + address.area
	 + ',' + address.city +' ,' + address.state +' , ' + address.country + ' .';
}

function edit() {
	window.location.href = kitchenBaseURI + 'edit_rider.html?id=' + $.urlParam('id');
}

function deleteData() {
	console.log("Delete To Implement");
}


getToken(getRiderList);
