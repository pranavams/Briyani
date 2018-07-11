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
	data = data.rider[0];
	document.getElementById('riderName').innerHTML = nvl(data.riderPersonFirstName) + ' ' + nvl(data.riderPersonMiddleName) + ' ' + nvl(data.riderPersonLastName);
	document.getElementById('riderPhoneNumber').innerHTML = data.mobileNumber;
	document.getElementById('riderEmail').innerHTML = data.email;
	document.getElementById('riderDob').innerHTML = dateToFormattedString(data.dateOfBirth);  
	//document.getElementById('riderDob').innerHTML =dateToFormattedStringWithFormat(data.dateOfBirth, "DD/MM/YYYY");
	document.getElementById('address').innerHTML = getAddress(data.address);
}

function edit() {
	window.location.href = kitchenBaseURI + 'edit_rider.html?id=' + $.urlParam('id');
}

function deleteData() {
	console.log("Delete To Implement");
}


getToken(getRiderList);
