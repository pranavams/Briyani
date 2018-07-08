/**
 * 
 */
function getRiderList() {
	// The baseURI variable is created by the result.base_server_base_uri 
	// which is returned when getting a token and should be used to 
	// create the url_base.
	$.ajax({
		'url' : baseURI + 'rider/listAll?access_token=' + accessToken,
		'type' : 'GET',
		'contentType' : 'x-www-form-urlencoded',
		'crossDomain' : true,
		'success' : function(result) {
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

		if ('Branch' === Rider[i]['departmentType']) {
			tabCell.innerHTML = '<td><a class="btn btn-default btn-xs">Branch Rider</a></td>'
		} else {
			tabCell.innerHTML = '<td><a class="btn btn-primary btn-xs">End User Rider</a></td>';
		}

		tabCell = tr.insertCell(-1);
		tabCell.innerHTML = '<a href="rider_preview.html?id=' + Rider[i]['id'] + '" class="btn btn-xs btn-default"><i class="fa fa-eye"></i>Details</a>';
	}
}

function getJSONData() {
	console.log("Inside Get JSON Data");
	var riderDepartment = document.getElementById('rider_depart');
	
	var jsonObject = {
		"departmentType" : riderDepartment.options[riderDepartment.selectedIndex].text,
		"address" : {
			"doorNumber" : " ",
			"street" : " ",
			"area" : document.getElementById("cust_delivery_address").value,
			"city" : " ",
			"state" : " ",
			"country" : " ",
			"zipcode" : " "
		},
		"riderPersonSalutation" : " ",
		"riderPersonFirstName" : document.getElementById('rider_fname').value,
		"riderPersonMiddleName" : document.getElementById("rider_mname").value,
		"riderPersonLastName" : document.getElementById("rider_lname").value,
		"mobileNumber" : document.getElementById("rider_mobile_no").value,
		"riderPersonNumber" : " ",
		//"dateOfBirth" : "",
		"email" : document.getElementById("rider_email").value,
		"gender" : $('input[name=customRadioInline1]:checked').val(),
		"zone" : " ",
		"riderIdCardNo" : document.getElementById("rider_idcard_no").value
	};
	console.log("JSON " + JSON.stringify(jsonObject));
	return jsonObject;
}

function saveRider() {
	var xhr = new XMLHttpRequest();
	xhr.withCredentials = true;

	xhr.addEventListener("readystatechange", function () {
	  if (this.readyState === 4) {
	    console.log(this.responseText);
	  }
	});

	xhr.open("POST", baseURI + "rider/save");
	xhr.setRequestHeader("content-type", "application/json");
	xhr.setRequestHeader("cache-control", "no-cache");
	xhr.setRequestHeader("access-token", accessToken);
	xhr.send(getJSONData());
}

function saveRider2() {
	var settings = {
		"async" : true,
		"crossDomain" : true,
		"url" : baseURI + 'rider/save?access_token=' + accessToken,
		"method" : "POST",
		"headers" : {
			"content-type" : "application/json",
			"cache-control" : "no-cache"
		},
		"processData" : false,
		"data" : getJSONData()
	}

	$.ajax(settings).done(function(response) {
		console.log(response);
	});
}

function saveRiders() {
	console.log("Inside Save Rider");

	var jsonObj = getJSONData();
	$.ajax({
		'url' : baseURI + 'rider/save',
		'type' : 'POST',
		'content-Type' : 'application/json; charset=utf-8',
		'crossDomain' : true,
		'data' : JSON.stringify(jsonObj),
		'dataType' : 'json',
		'headers' : {
			"Content-Type" : "application/json",
			"Accept" : "application/json",
			"Authorization" : "OAuth oauth_token=" + accessToken
		},
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

getToken(getRiderList);