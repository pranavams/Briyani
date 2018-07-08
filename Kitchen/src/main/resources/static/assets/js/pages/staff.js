/**
 * 
 */
function getStaffList() {
	// The baseURI variable is created by the result.base_server_base_uri 
	// which is returned when getting a token and should be used to 
	// create the url_base.
	$.ajax({
		'url' : baseURI + 'staff/listAll?access_token=' + accessToken,
		'type' : 'GET',
		'contentType' : 'x-www-form-urlencoded',
		'crossDomain' : true,
		'success' : function(result) {
			console.log("Staff " + JSON.stringify(result));
			displayStaff(result);
			return result;
		},
		'error' : function(XMLHttpRequest, textStatus, errorThrown) {
			//Process error actions
			console.log('getStaff - Error: ' + errorThrown);
			console.log(XMLHttpRequest.status + ' ' +
				XMLHttpRequest.statusText);
			return false;
		}
	});
}

function displayStaff(StaffResult) {
	console.log('Staff Received ' + StaffResult);
	var Staff = StaffResult['staff'];
	var table = document.getElementById("contacts_list");
	for (var i = 0; i < Staff.length; i++) {

		tr = table.insertRow(-1);

		var tabCell = tr.insertCell(-1);
		tabCell.innerHTML = (i + 1);

		var tabCell = tr.insertCell(-1);
		tabCell.innerHTML = Staff[i]['id'];

		tabCell = tr.insertCell(-1);
		tabCell.innerHTML = (Staff[i]['salutation'] + ' ' + Staff[i]['firstName'] + ' ' + Staff[i]['middleName'] + ' ' + Staff[i]['lastName']).trim();

		tabCell = tr.insertCell(-1);
		tabCell.innerHTML = ' ';
//		(Staff[i]['address']['doorNumber'] + ' ' +
//		Staff[i]['address']['street'] + ' ' +
//		Staff[i]['address']['area'] + ' ' +
//		Staff[i]['address']['city'] + ' ' +
//		Staff[i]['address']['state'] + ' ' +
//		Staff[i]['address']['country'] + ' ' +
//		Staff[i]['address']['zipcode']).trim();

		tabCell = tr.insertCell(-1);
		tabCell.innerHTML = Staff[i]['email'];

		tabCell = tr.insertCell(-1);
		tabCell.innerHTML = Staff[i]['mobileNumber'];

		tabCell = tr.insertCell(-1);
		tabCell.innerHTML = Staff[i]['gender'];

		tabCell = tr.insertCell(-1);
		tabCell.innerHTML = Staff[i]['dateOfJoin'];

		tabCell = tr.insertCell(-1);
		tabCell.innerHTML = '<a href="staff_preview.html?id=' + Staff[i]['id'] + '" class="btn btn-xs btn-default"><i class="fa fa-eye"></i>Details</a>';
	}
}

getToken(getStaffList);
