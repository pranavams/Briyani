/**
 * 
 */

console.log("Rider List " + getRiderList());

function getRiderList() {
	// The baseURI variable is created by the result.base_server_base_uri 
	// which is returned when getting a token and should be used to 
	// create the url_base.
	console.log("Inside Rider List");
	var url_base = baseURI;
	//accessToken = getToken();
	$.ajax({
		'url' : baseURI + 'rider/listAll',
		'type' : 'GET',
		'content-Type' : 'x-www-form-urlencoded',
		'crossDomain' : true,
		'success' : function(result) {
			console.log('getRider - Success!\r\n' + result);
			//Process success actions
			var returnResult = JSON.stringify(result);
			console.log('getRider - Success!\r\n' + returnResult);
			//document.getElementById('callResults').innerHTML = returnResult;
			displayRider(result);
			return result;
		},
		'error' : function(XMLHttpRequest, textStatus, errorThrown) {
			//Process error actions
			console.log('getRider - Error: ' + errorThrown);
			console.log(XMLHttpRequest.status + ' ' +
				XMLHttpRequest.statusText);
			return false;
		}
	});
}

function displayRider(RiderResult) {
	console.log('Rider Received ' + RiderResult);
	var Rider = RiderResult['rider'];
	var table = document.getElementById("contacts_list");
	for (var i = 0; i < Rider.length; i++) {

		tr = table.insertRow(-1);

		var tabCell = tr.insertCell(-1);
		tabCell.innerHTML = (i + 1);

		tabCell = tr.insertCell(-1);
		tabCell.innerHTML = Rider[i]['id'];

		tabCell = tr.insertCell(-1);
		tabCell.innerHTML = Rider[i]['riderPersonSalutation'] + ' ' + Rider[i]['riderPersonFirstName'] + ' ' + Rider[i]['riderPersonMiddleName'] + ' ' + Rider[i]['riderPersonLastName'];

		tabCell = tr.insertCell(-1);
		tabCell.innerHTML = Rider[i]['email'];

		tabCell = tr.insertCell(-1);
		tabCell.innerHTML = Rider[i]['mobileNumber'];

		tabCell = tr.insertCell(-1);
		tabCell.innerHTML = '';

		tabCell = tr.insertCell(-1);
		tabCell.innerHTML = Rider[i]['address']['doorNumber'] + ', ' +
		Rider[i]['address']['street'] + ', ' +
		Rider[i]['address']['area'] + ', ' +
		Rider[i]['address']['city'] + ', ' +
		Rider[i]['address']['state'] + ', ' +
		Rider[i]['address']['country'] + ', ' +
		Rider[i]['address']['zipcode'];

		tabCell = tr.insertCell(-1);

		if('Branch' === Rider[i]['departmentType']){
			tabCell.innerHTML = '<td><a class="btn btn-default btn-xs">Branch Rider</a></td>'
		} else {
			tabCell.innerHTML = '<td><a class="btn btn-primary btn-xs">End User Rider</a></td>';
		}

		tabCell = tr.insertCell(-1);
		tabCell.innerHTML = '<a href="#" class="btn btn-xs btn-default"><i class="fa fa-pencil"></i></a> <a href="#" class="btn btn-xs btn-danger" data-toggle="modal" data-target="#deleteDATA"><i class="fa fa-remove"></i></a> <a href="#" class="btn btn-xs btn-info"><i class="fa fa-eye"></i></a>';
	}
}

function getJSONData() {
	console.log("Inside Get JSON Data");
	var jsonObject = {
		"id" : "",
		"name" : "Nungambakkam Rider",
		"email" : "ajith.roy@gmail.com",
		"latitude" : "234234",
		"longitude" : "234234",
		"notes" : "Rider in omr",
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

function saveRider() {
	console.log("Inside Save Rider");

	var jsonObj = getJSONData();

	var url_base = baseURI;
	//accessToken = getToken();
	$.ajax({
		'url' : baseURI + 'rider/save',
		'type' : 'POST',
		'content-Type' : 'application/json; charset=utf-8',
		'crossDomain' : true,
		'data' : JSON.stringify(jsonObj),
		'dataType' : 'jsonp',
		'success' : function(result) {
			console.log('Save Rider - Success!\r\n' + result);
			//Process success actions
			var returnResult = JSON.stringify(result);
			console.log('Save Rider - Success!\r\n' + returnResult);
			document.getElementById('callResults').innerHTML = returnResult;
			return result;
		},
		'error' : function(XMLHttpRequest, textStatus, errorThrown) {
			//Process error actions
			console.log('getRider - Error: ' + errorThrown + " - " + textStatus);
			console.log(XMLHttpRequest.status + ' ' +
				XMLHttpRequest.statusText);
			return false;
		}
	});
}