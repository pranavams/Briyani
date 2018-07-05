/**
 * 
 */

console.log("Statistics List " + getStatisticsList());

function getStatisticsList() {
	// The baseURI variable is created by the result.base_server_base_uri 
	// which is returned when getting a token and should be used to 
	// create the url_base.
	var url_base = baseURI;
	//accessToken = getToken();
	$.ajax({
		'url' : baseURI + 'staff/get',
		'type' : 'GET',
		'contentType' : 'x-www-form-urlencoded',
		'crossDomain' : true,
		'success' : function(result) {
			console.log(JSON.stringify(result));
			//displayStatistics(result);
			return result;
		},
		'error' : function(XMLHttpRequest, textStatus, errorThrown) {
			//Process error actions
			console.log('getStatistics - Error: ' + errorThrown);
			console.log(XMLHttpRequest.status + ' ' +
				XMLHttpRequest.statusText);
			return false;
		}
	});
}

function displayStatistics(StatisticsResult) {
	console.log('Statistics Received ' + StatisticsResult);
	var Statistics = StatisticsResult['order'];
	var table = document.getElementById("contacts_list");
	for (var i = 0; i < Statistics.length; i++) {

		tr = table.insertRow(-1);

		var tabCell = tr.insertCell(-1);
		tabCell.innerHTML = (i + 1);

		tabCell = tr.insertCell(-1);
		tabCell.innerHTML = Statistics[i]['orderId'];

		tabCell = tr.insertCell(-1);
		tabCell.innerHTML = Statistics[i]['branch']['id'];

		tabCell = tr.insertCell(-1);
		tabCell.innerHTML = Statistics[i]['branch']['name'];

		for (var j = 0; j < Statistics[i]['orderDetails'].length; j++) {
			tabCell = tr.insertCell(-1);
			tabCell.innerHTML = Statistics[i]['orderDetails'][j]['item']['menuName'] + " " + Statistics[i]['orderDetails'][j]['item']['name'];

			var tabCell = tr.insertCell(-1);
			tabCell.innerHTML = Statistics[i]['orderDetails'][j]['quantity'];

			if (j == 0) {
				tabCell = tr.insertCell(-1);
				tabCell.innerHTML = Statistics[i]['branch']['contactPersonSalutation'] + ' ' + Statistics[i]['branch']['contactPersonFirstName'] + ' ' + Statistics[i]['branch']['contactPersonMiddleName'] + ' ' + Statistics[i]['branch']['contactPersonLastName'];

				tabCell = tr.insertCell(-1);
				tabCell.innerHTML = Statistics[i]['branch']['address']['doorNumber'] + ', ' +
				Statistics[i]['branch']['address']['street'] + ', ' +
				Statistics[i]['branch']['address']['area'] + ', ' +
				Statistics[i]['branch']['address']['city'] + ', ' +
				Statistics[i]['branch']['address']['state'] + ', ' +
				Statistics[i]['branch']['address']['country'] + ', ' +
				Statistics[i]['branch']['address']['zipcode'];
			}

			tr = table.insertRow(-1);

			var tabCell = tr.insertCell(-1);
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


