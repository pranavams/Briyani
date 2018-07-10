/**
 * 
 */
function getRiderList() {
	// The baseURI variable is created by the result.base_server_base_uri 
	// which is returned when getting a token and should be used to 
	// create the url_base.
	
	$.ajax({
		'url' : baseURI + 'rider/get/' + $.urlParam('id') + '?access_token=' + accessToken,
		'type' : 'GET',
		'contentType' : 'x-www-form-urlencoded',
		'crossDomain' : true,
		'success' : function(result) {
			displayRider(result);
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

function displayRider(data){
	console.log("Data " + JSON.stringify(data));
	data = data.rider[0];	
	address = data.address;
	document.getElementById('rider_fname').value = data.riderPersonFirstName;
	document.getElementById('rider_mname').value = data.riderPersonMiddleName;
	document.getElementById('rider_lname').value = data.riderPersonLastName;
	document.getElementById('rider_mobile_no').value = data.mobileNumber;
	document.getElementById('rider_email').value = data.email;
	document.getElementById('rider_idcard_no').value = data.riderIdCardNo;
	document.getElementById('vehicle_no').value = data.vehicleNumber;
	document.getElementById('lincense_no').value = data.licenseNumber;
	document.getElementById('license_issue_date').value = data.licenseIssueDate;
	document.getElementById('license_exp_date').value = data.licenseExpiryDate;
	document.getElementById('vehicle_type').value = data.vehicleType;
	document.getElementById('vehicle_model').value = data.vehicleModel;

	setTheGenderValue(data.gender);
	document.getElementById('rider_address').innerHTML = address.doorNumber +' ' + address.street + ' ' + address.area
	 + ' ' + address.city+' ' + address.state+'  ' + address.country + ' ' + address.zipcode;
}

function setTheGenderValue(gender) {
	if (gender!=null && gender!='') {
		if (gender=='Female'){
			document.getElementById('customRadioInline2').checked = 'True';
		
		}
		else if (gender=='Male') {
			document.getElementById('customRadioInline1').checked = 'True';
		}
		else {
			document.getElementById('customRadioInline3').checked = 'True';
		}
	}
}


function edit() {
	window.location.href = kitchenBaseURI + 'edit_rider.html?id=' + $.urlParam('id');
}

function deleteData() {
	console.log("Delete To Implement");
}


getToken(getRiderList);
