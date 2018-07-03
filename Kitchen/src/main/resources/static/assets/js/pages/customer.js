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
		tabCell.innerHTML = Customer[i]['address']['doorNumber'] + ', ' +
		Customer[i]['address']['street'] + ', ' +
		Customer[i]['address']['area'] + ', ' +
		Customer[i]['address']['city'] + ', ' +
		Customer[i]['address']['state'] + ', ' +
		Customer[i]['address']['country'] + ', ' +
		Customer[i]['address']['zipcode'];

		tabCell = tr.insertCell(-1);
		tabCell.innerHTML = '<a href="#" class="btn btn-xs btn-default"><i class="fa fa-pencil"></i></a> <a href="#" class="btn btn-xs btn-danger" data-toggle="modal" data-target="#deleteDATA"><i class="fa fa-remove"></i></a> <a href="preview.html?id=' + Customer[i]['id'] + '" class="btn btn-xs btn-info"><i class="fa fa-eye"></i></a>';
	}
}

function getJSONData() {
	console.log("Inside Get JSON Data");
	var jsonObject = {
		"id" : "",
		"name" : "Nungambakkam Customer",
		"email" : "ajith.roy@gmail.com",
		"latitude" : "234234",
		"longitude" : "234234",
		"notes" : "Customer in omr",
		"address" : {
			"doorNumber" : "5",
			"street" : "x Street",
			"area" : "dunton",
			"city" : "dunton",
			"state" : "GB",
			"country" : "England",
			"zipcode" : "444555"
		},
		"contactPersonFirstName" : "Ajith",
		"contactPersonLastName" : "Roy",
		"contactPersonMiddleName" : "M",
		"contactPersonSalutation" : "Mr.",
		"mobileNumber" : "123234234",
		"telephone" : "323234234",
		"contactPersonNumber" : "123455"
	};

	return jsonObject;
}

function saveCustomer() {
	console.log("Inside Save Customer");

	var jsonObj = getJSONData();

	var url_base = baseURI;
	//accessToken = getToken();
	$.ajax({
		'url' : baseURI + 'customer/save',
		'type' : 'POST',
		'content-Type' : 'application/json; charset=utf-8',
		'crossDomain' : true,
		'data' : JSON.stringify(jsonObj),
		'dataType' : 'jsonp',
		'success' : function(result) {
			console.log('Save Customer - Success!\r\n' + result);
			//Process success actions
			var returnResult = JSON.stringify(result);
			console.log('Save Customer - Success!\r\n' + returnResult);
			document.getElementById('callResults').innerHTML = returnResult;
			return result;
		},
		'error' : function(XMLHttpRequest, textStatus, errorThrown) {
			//Process error actions
			console.log('getCustomer - Error: ' + errorThrown + " - " + textStatus);
			console.log(XMLHttpRequest.status + ' ' +
				XMLHttpRequest.statusText);
			return false;
		}
	});
}