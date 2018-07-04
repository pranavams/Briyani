/**
 * 
 */

console.log("Customer List " + getCustomerList());

function getCustomerList() {
	// The baseURI variable is created by the result.base_server_base_uri 
	// which is returned when getting a token and should be used to 
	// create the url_base.
	var url_base = baseURI;
	//accessToken = getToken();
	$.ajax({
		'url' : baseURI + 'customer/listAll',
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

function displayCustomer(CustomerResult) {
	console.log('Customer Received ' + CustomerResult);
	var Customer = CustomerResult['customer'];
	var table = document.getElementById("contacts_list");
	for (var i = 0; i < Customer.length; i++) {

		tr = table.insertRow(-1);

		var tabCell = tr.insertCell(-1);
		tabCell.innerHTML = (i + 1);

		tabCell = tr.insertCell(-1);
		tabCell.innerHTML = Customer[i]['salutation'] + ' ' + Customer[i]['firstName'] + ' ' + Customer[i]['middleName'] + ' ' + Customer[i]['lastName'];

		tabCell = tr.insertCell(-1);
		tabCell.innerHTML = Customer[i]['email'];

		tabCell = tr.insertCell(-1);
		tabCell.innerHTML = Customer[i]['mobileNumber'];

		tabCell = tr.insertCell(-1);
		tabCell.innerHTML = Customer[i]['dateOfBirth'];

		tabCell = tr.insertCell(-1);
		tabCell.innerHTML = (Customer[i]['address']['doorNumber'] + ' ' +
		Customer[i]['address']['street'] + ' ' +
		Customer[i]['address']['area'] + ' ' +
		Customer[i]['address']['city'] + ' ' +
		Customer[i]['address']['state'] + ' ' +
		Customer[i]['address']['country'] + ' ' +
		Customer[i]['address']['zipcode']).trim();

		tabCell = tr.insertCell(-1);
		tabCell.innerHTML = '<a href="#" class="btn btn-xs btn-default"><i class="fa fa-pencil"></i></a> <a href="#" class="btn btn-xs btn-danger" data-toggle="modal" data-target="#deleteDATA"><i class="fa fa-remove"></i></a> <a href="preview.html?id=' + Customer[i]['id'] + '" class="btn btn-xs btn-info"><i class="fa fa-eye"></i></a>';
	}
}

function getJSONData() {
	jsonObject = {
		'firstName' : document.getElementById('customer_fname').value,
		'middleName' : document.getElementById('customer_mname').value,
		'lastName' : document.getElementById('customer_lname').value,
		'salutation' : ' ',
		'telephoneNumber' : document.getElementById('customer_telephone_no').value,
		'mobileNumber' : document.getElementById('customer_mobile_no').value,
		'email' : document.getElementById('customer_email').value,
		'dateOfBirth' : stringToDate(document.getElementById('customer_dob').value, 'dd/mm/yyyy', '/'),
		'address' : {
			'area' : document.getElementById('cust_delivery_address').value
		}
	};

	console.log("Inside Get JSON Data " + jsonObject);
	return jsonObject;
}

function clearItem() {
	document.getElementById('customer_fname').value = '';
	document.getElementById('customer_fname').value = '';
	document.getElementById('customer_fname').value = '';
	document.getElementById('customer_telephone_no').value = '';
	document.getElementById('customer_mobile_no').value = '';
	document.getElementById('customer_email').value = '';
	document.getElementById('cust_delivery_address').value = '';
}

function saveCloseCustomer() {
	saveCustomer();
}

function saveCustomer() {
	console.log("Inside Save Customer");

	var jsonObj = getJSONData();

	var url_base = baseURI;
	//accessToken = getToken();
	$.ajax({
		'url' : baseURI + 'customer/save',
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