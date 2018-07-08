/**
 * 
 */


function getStaffList() {
	// The baseURI variable is created by the result.base_server_base_uri 
	// which is returned when getting a token and should be used to 
	// create the url_base.
	var url_base = baseURI;
	//accessToken = getToken();
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
		tabCell.innerHTML = '<a href="#" class="btn btn-xs btn-default"><i class="fa fa-pencil"></i></a> <a href="#" class="btn btn-xs btn-danger" data-toggle="modal" data-target="#deleteDATA"><i class="fa fa-remove"></i></a>';
	}
}

function getJSONData() {
	jsonObject = {
		'firstName' : document.getElementById('staff_fname').value,
		'middleName' : document.getElementById('staff_mname').value,
		'lastName' : document.getElementById('staff_lname').value,
		'salutation' : ' ',
		'mobileNumber' : document.getElementById('staff_mobile').value,
		'dateOfBirth' : stringToDate(document.getElementById('staff_dob').value, 'dd/mm/yyyy', '/'),
		'dateOfJoin' : stringToDate(document.getElementById('staff_jod').value, 'dd/mm/yyyy', '/'),
		//'role' : document.getElementById('staff_role').value,
		'email' : document.getElementById('staff_email').value,
		'notes' : document.getElementById('staff_notes').value,
	};

	console.log("Inside Get JSON Data " + jsonObject);
	return jsonObject;
}

function clearItem() {
	document.getElementById('staff_fname').value = '';
	document.getElementById('staff_fname').value = '';
	document.getElementById('staff_fname').value = '';
	document.getElementById('staff_mobile').value = '';
	document.getElementById('staff_dob').value = '';
	document.getElementById('staff_jod').value = '';
	document.getElementById('staff_email').value = '';
	document.getElementById('staff_notes').value = '';
}

function saveCloseStaff() {
	saveStaff();
}

function saveStaff() {
	console.log("Inside Save Staff");

	var jsonObj = getJSONData();

	var url_base = baseURI;
	//accessToken = getToken();
	$.ajax({
		'url' : baseURI + 'staff/save',
		'type' : 'POST',
		'contentType' : 'application/json',
		'crossDomain' : true,
		'data' : JSON.stringify(jsonObj),
		'dataType' : 'json',
		'success' : function(result) {
			$.gritter.add({
				class_name : 'gritter-success',
				title : 'Success!',
				text : '<p style="font-size: 14px;">Staff Saved successfully!</p>',
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
				text : '<p style="font-size: 14px;">Staff Not Saved!</p>',
			});
			return false;
		}
	});
}

getToken(getStaffList);
