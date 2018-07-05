/**
 * 
 */

console.log("Order List " + getOrderList());

function getOrderList() {
	// The baseURI variable is created by the result.base_server_base_uri 
	// which is returned when getting a token and should be used to 
	// create the url_base.
	var url_base = baseURI;
	//accessToken = getToken();
	$.ajax({
		'url' : baseURI + 'order/listAll',
		'type' : 'GET',
		'contentType' : 'x-www-form-urlencoded',
		'crossDomain' : true,
		'success' : function(result) {
			console.log(JSON.stringify(result));
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
	var table = document.getElementById("contacts_list");
	for (var i = 0; i < Order.length; i++) {

		tr = table.insertRow(-1);

		var tabCell = tr.insertCell(-1);
		tabCell.innerHTML = (i + 1);

		tabCell = tr.insertCell(-1);
		tabCell.innerHTML = Order[i]['orderId'];

		tabCell = tr.insertCell(-1);
		tabCell.innerHTML = Order[i]['branch']['id'];

		tabCell = tr.insertCell(-1);
		tabCell.innerHTML = Order[i]['branch']['name'];

		for (var j = 0; j < Order[i]['orderDetails'].length; j++) {
			tabCell = tr.insertCell(-1);
			tabCell.innerHTML = Order[i]['orderDetails'][j]['item']['menuName'] + " " + Order[i]['orderDetails'][j]['item']['name'];

			tabCell = tr.insertCell(-1);
			tabCell.innerHTML = Order[i]['orderDetails'][j]['quantity'];

			if (j == 0) {
				tabCell = tr.insertCell(-1);
				tabCell.innerHTML = Order[i]['branch']['contactPersonSalutation'] + ' ' + Order[i]['branch']['contactPersonFirstName'] + ' ' + Order[i]['branch']['contactPersonMiddleName'] + ' ' + Order[i]['branch']['contactPersonLastName'];

				tabCell = tr.insertCell(-1);
				tabCell.innerHTML = Order[i]['branch']['address']['doorNumber'] + ', ' +
				Order[i]['branch']['address']['street'] + ', ' +
				Order[i]['branch']['address']['area'] + ', ' +
				Order[i]['branch']['address']['city'] + ', ' +
				Order[i]['branch']['address']['state'] + ', ' +
				Order[i]['branch']['address']['country'] + ', ' +
				Order[i]['branch']['address']['zipcode'];

				tabCell = tr.insertCell(-1);
				tabCell.innerHTML = '<a href="#" class="btn btn-xs btn-default" >Not Approve</a>';
			} else {

				tabCell = tr.insertCell(-1);
				tabCell.innerHTML = '';

				tabCell = tr.insertCell(-1);
				tabCell.innerHTML = '';

				tabCell = tr.insertCell(-1);
				tabCell.innerHTML = '';
			}

			tr = table.insertRow(-1);

			tabCell = tr.insertCell(-1);
			tabCell.innerHTML = '';

			tabCell = tr.insertCell(-1);
			tabCell.innerHTML = '';

			tabCell = tr.insertCell(-1);
			tabCell.innerHTML = '';

			tabCell = tr.insertCell(-1);
			tabCell.innerHTML = '';
		}
	}
}


function createOrder() {
	var jsonObj = {
		"branchID" : "BRAN1",
		"customerID" : "CUST1",
		"deliveryAddress" : {
			"doorNumber" : "10",
			"street" : "First Cross Street",
			"area" : "Inner Circle",
			"state" : "Tamil Nadu",
			"city" : "Chennai",
			"country" : "India",
			"zipcode" : "600001"
		},
		"orderDetails" : [
			{
				"item" : {
					"id" : "CHBIR1"
				},
				"quantity" : 10
			},
			{
				"item" : {
					"id" : "CHBIR2"
				},
				"quantity" : 20
			},
			{
				"item" : {
					"id" : "CHBIR3"
				},
				"quantity" : 30
			}
		]
	};

	console.log("Order to Create " + jsonObj);

	var url_base = baseURI;
	//accessToken = getToken();
	$.ajax({
		'url' : baseURI + 'order/createOrder',
		'type' : 'POST',
		'contentType' : 'application/json',
		'crossDomain' : true,
		'data' : JSON.stringify(jsonObj),
		'dataType' : 'json',
		'success' : function(result) {
			$.gritter.add({
				class_name : 'gritter-success',
				title : 'Success!',
				text : '<p style="font-size: 14px;">Order Created successfully!</p>',
			});
		},
		'error' : function(XMLHttpRequest, textStatus, errorThrown) {
			//Process error actions
			console.log('createOrder - Error: ' + errorThrown + " - " + textStatus);
			$.gritter.add({
				class_name : 'gritter-error',
				title : 'Success!',
				text : '<p style="font-size: 14px;">Order Not Created</p>',
			});
			return false;
		}
	});

}