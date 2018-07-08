/**
 * 
 */
function getCustomerList() {
	// The baseURI variable is created by the result.base_server_base_uri 
	// which is returned when getting a token and should be used to 
	// create the url_base.
	
	$.ajax({
		'url' : baseURI + 'customer/get/' + 'CUST1' + '?access_token=' + accessToken,
		'type' : 'GET',
		'contentType' : 'x-www-form-urlencoded',
		'crossDomain' : true,
		'success' : function(result) {
			displayCustomer(result);
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

function displayCustomer(data){
	console.log("Data " + JSON.stringify(data));
	data = data.customer[0];
	
	address = data.address;
	document.getElementById('customer_fname').value = data.firstName;
	document.getElementById('customer_mname').value = data.middleName;
	document.getElementById('customer_lname').value = data.lastName;
	document.getElementById('customer_email').value = data.email;
	if (data.telephoneNumber !=null) {
		document.getElementById('customer_telephone_no').value = data.telephoneNumber;
	}
	else {
		document.getElementById('customer_telephone_no').value = "";
	}
	document.getElementById('customer_mobile_no').value = data.mobileNumber;
	document.getElementById('customRadioInline1').checked = 'True';
	document.getElementById('customer_dob').value = new Date(data.dateOfBirth)	;
	document.getElementById('cust_delivery_address').innerHTML = address.doorNumber +',' + address.street + ', ' + address.area
	 + ',' + address.city+' ,' + address.state+' . ';
}

function edit() {
	window.location.href = kitchenBaseURI + 'edit_customer.html?id=' + 'CUST1';
}

function deleteData() {
	console.log("Delete To Implement");
}


getToken(getCustomerList);
