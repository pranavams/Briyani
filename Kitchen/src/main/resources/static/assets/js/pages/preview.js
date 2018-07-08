/**
 * 
 */

$.urlParam = function (name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)')
                      .exec(window.location.search);

    return (results !== null) ? results[1] || 0 : false;
}

function getOrderList() {
	// The baseURI variable is created by the result.base_server_base_uri 
	// which is returned when getting a token and should be used to 
	// create the url_base.
	var url_base = baseURI;
	//accessToken = getToken();
	$.ajax({
		'url' : baseURI + 'order/listForCustomer/' + $.urlParam('id') + '?access_token=' + accessToken,
		'type' : 'GET',
		'content-Type' : 'x-www-form-urlencoded',
		'crossDomain' : true,
		'success' : function(result) {
			displayOrder(result);
			return result;
		},
		'error' : function(XMLHttpRequest, textStatus, errorThrown) {
			//Process error actions
			console.log('getOrder - Error: ' + errorThrown);
			console.log(XMLHttpRequest.status + ' ' +
				XMLHttpRequest.statusText);
			return false;
		}
	});
}

function displayOrder(OrderResult) {
	console.log('Order Received ' + OrderResult);
	var Order = OrderResult['order'];
	var table = document.getElementById("contacts_list_preview");
	for (var i = 0; i < Order.length; i++) {

		tr = table.insertRow(-1);

		var tabCell = tr.insertCell(-1);
		tabCell.innerHTML = (i + 1);

		var tabCell = tr.insertCell(-1);
		tabCell.innerHTML = Order[i]['orderId'];

		for (var j = 0; j < Order[i]['orderDetails'].length; j++) {
			tabCell = tr.insertCell(-1);
			tabCell.innerHTML = Order[i]['orderDetails'][j]['item']['menuName'] + " " + Order[i]['orderDetails'][j]['item']['name'];

			tabCell = tr.insertCell(-1);
			tabCell.innerHTML = '';

			tabCell = tr.insertCell(-1);
			tabCell.innerHTML = Order[i]['orderDetails'][j]['quantity'];

			tabCell = tr.insertCell(-1);
			tabCell.innerHTML = '$' + Order[i]['orderDetails'][j]['quantity'] * Order[i]['orderDetails'][j]['unitPrice'];

			tr = table.insertRow(-1);
			tabCell = tr.insertCell(-1);
			tabCell.innerHTML = '';
		
			tabCell = tr.insertCell(-1);
			tabCell.innerHTML = '';
		}
	}
}

function getJSONData() {
	console.log("Inside Get JSON Data");
	var jsonObject = {
		"id" : "",
		"name" : "Nungambakkam Order",
		"email" : "ajith.roy@gmail.com",
		"latitude" : "234234",
		"longitude" : "234234",
		"notes" : "Order in omr",
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

function saveOrder() {
	console.log("Inside Save Order");

	var jsonObj = getJSONData();

	var url_base = baseURI;
	//accessToken = getToken();
	$.ajax({
		'url' : baseURI + 'order/save',
		'type' : 'POST',
		'content-Type' : 'application/json; charset=utf-8',
		'crossDomain' : true,
		'data' : JSON.stringify(jsonObj),
		'dataType' : 'jsonp',
		'success' : function(result) {
			console.log('Save Order - Success!\r\n' + result);
			//Process success actions
			var returnResult = JSON.stringify(result);
			console.log('Save Order - Success!\r\n' + returnResult);
			document.getElementById('callResults').innerHTML = returnResult;
			return result;
		},
		'error' : function(XMLHttpRequest, textStatus, errorThrown) {
			//Process error actions
			console.log('getOrder - Error: ' + errorThrown + " - " + textStatus);
			console.log(XMLHttpRequest.status + ' ' +
				XMLHttpRequest.statusText);
			return false;
		}
	});
}

getToken(getOrderList);
