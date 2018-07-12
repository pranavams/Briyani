/**
 * 
 */
function getCustomerList() {
	// The baseURI variable is created by the result.base_server_base_uri 
	// which is returned when getting a token and should be used to 
	// create the url_base.

	$.ajax({
		'url' : baseURI + 'customer/get/' + $.urlParam('id') + '?access_token=' + accessToken,
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

function displayCustomer(data) {
	console.log("Data " + JSON.stringify(data));
	data = data.customer[0];
	address = data.address;
	document.getElementById('customer_fname').value = nvl(data.firstName);
	document.getElementById('customer_mname').value = nvl(data.middleName);
	document.getElementById('customer_lname').value = nvl(data.lastName);
	document.getElementById('customer_email').value = nvl(data.email);
	document.getElementById('customer_telephone_no').value = nvl(data.telephoneNumber);
	setTheGenderValue(data.gender);
	document.getElementById('customer_mobile_no').value = nvl(data.mobileNumber);
	document.getElementById('customer_dob').value = formatDateDefault(data.dateOfBirth, 'DD/MM/YYY')	;
	document.getElementById('cust_delivery_address').innerHTML = address.doorNumber + ' ' + address.street + ' ' + address.area
	+ ' ' + address.city + ' ' + address.state + ' ' + address.country + ' ' + address.zipcode;
}

function setTheGenderValue(gender) {
	if (gender != null && gender != '') {
		if (gender == 'Female') {
			document.getElementById('customRadioInline2').checked = 'True';

		} else if (gender == 'Male') {
			document.getElementById('customRadioInline1').checked = 'True';
		} else {
			document.getElementById('customRadioInline3').checked = 'True';
		}
	}
}


function edit() {
	window.location.href = kitchenBaseURI + 'edit_customer.html?id=' + $.urlParam('id');
}

function deleteData() {
	console.log("Delete To Implement");
}

function clearItem() {
	document.getElementById('customer_fname').value = '';
	document.getElementById('customer_mname').value = '';
	document.getElementById('customer_lname').value = '';
	document.getElementById('customer_email').value = '';
	document.getElementById('customer_telephone_no').value = '';
	document.getElementById('customer_mobile_no').value = '';
	document.getElementById('customer_dob').value = '';
	document.getElementById('cust_delivery_address').value = '';
}

function getJSONUpdateData() {
	jsonObject = {
		'id' : $.urlParam('id'),
		'firstName' : document.getElementById('customer_fname').value,
		'middleName' : document.getElementById('customer_mname').value,
		'lastName' : document.getElementById('customer_lname').value,
		'telephoneNumber' : document.getElementById('customer_telephone_no').value,
		'mobileNumber' : document.getElementById('customer_mobile_no').value,
		'email' : document.getElementById('customer_email').value,
		'gender' : $('input[name=customRadioInline1]:checked').val(),
		'dateOfBirth' : stringToDate(document.getElementById('customer_dob').value, 'dd/mm/yyyy', '/'),
		'address' : {
			'area' : document.getElementById('cust_delivery_address').value
		}
	};

	console.log("Inside Get JSON Data " + jsonObject);
	return jsonObject;
}

function update() {
	console.log("Inside Update Customer");

	var jsonObj = getJSONUpdateData();

	var url_base = baseURI;
	//accessToken = getToken();
	$.ajax({
		'url' : baseURI + 'customer/update',
		'type' : 'POST',
		'contentType' : 'application/json',
		'crossDomain' : true,
		'data' : JSON.stringify(jsonObj),
		'dataType' : 'json',
		'success' : function(result) {
			$.gritter.add({
				class_name : 'gritter-success',
				title : 'Success!',
				text : '<p style="font-size: 14px;">Customer Saved successfully!</p>',
			});
			clearItem();
			return result;
		},
		'error' : function(XMLHttpRequest, textStatus, errorThrown) {
			//Process error actions
			console.log('getMenu - Error: ' + errorThrown + " - " + textStatus);
			console.log(XMLHttpRequest.status + ' ' +
				XMLHttpRequest.statusText);
			$.gritter.add({
				class_name : 'gritter-error',
				title : 'Success!',
				text : '<p style="font-size: 14px;">Customer Not Saved!</p>',
			});
			return false;
		}
	});

}

getToken(getCustomerList);