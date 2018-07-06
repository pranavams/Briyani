/**
 * 
 */

console.log("Staff List " + getStaffList());

function getStaffList() {
	// The baseURI variable is created by the result.base_server_base_uri 
	// which is returned when getting a token and should be used to 
	// create the url_base.
	var url_base = baseURI;
	//accessToken = getToken();
	$.ajax({
		'url' : baseURI + 'staff/listRecent',
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
	var table = document.getElementById("recent_staff_list");
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

console.log("Rider List " + getRiderList());
function getRiderList() {
	// The baseURI variable is created by the result.base_server_base_uri 
	// which is returned when getting a token and should be used to 
	// create the url_base.
	var url_base = baseURI;
	//accessToken = getToken();
	$.ajax({
		'url' : baseURI + 'rider/listRecent',
		'type' : 'GET',
		'contentType' : 'x-www-form-urlencoded',
		'crossDomain' : true,
		'success' : function(result) {
			console.log("Rider " + JSON.stringify(result));
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

function displayRider(riderResult) {
	console.log('Rider Received ' + riderResult);
	var rider = riderResult['rider'];
	var table = document.getElementById("recent_rider_list");
	for (var i = 0; i < rider.length; i++) {

		tr = table.insertRow(-1);

		var tabCell = tr.insertCell(-1);
		tabCell.innerHTML = (i + 1);

		var tabCell = tr.insertCell(-1);
		tabCell.innerHTML = rider[i]['id'];

		tabCell = tr.insertCell(-1);
		tabCell.innerHTML = (rider[i]['riderPersonSalutation'] + ' ' + rider[i]['riderPersonFirstName'] + ' ' + rider[i]['riderPersonMiddleName'] + ' ' + rider[i]['riderPersonLastName']).trim();

		tabCell = tr.insertCell(-1);
		tabCell.innerHTML = ' ';
		(rider[i]['address']['doorNumber'] + ' ' +
				rider[i]['address']['street'] + ' ' +
				rider[i]['address']['area'] + ' ' +
				rider[i]['address']['city'] + ' ' +
				rider[i]['address']['state'] + ' ' +
				rider[i]['address']['country'] + ' ' +
				rider[i]['address']['zipcode']).trim();

		tabCell = tr.insertCell(-1);
		tabCell.innerHTML = rider[i]['mobileNumber'];

		tabCell = tr.insertCell(-1);
		tabCell.innerHTML = rider[i]['gender'];

		tabCell = tr.insertCell(-1);
		tabCell.innerHTML = ' ';

		tabCell = tr.insertCell(-1);
		tabCell.innerHTML = '<a href="#" class="btn btn-xs btn-default"><i class="fa fa-pencil"></i></a> <a href="#" class="btn btn-xs btn-danger" data-toggle="modal" data-target="#deleteDATA"><i class="fa fa-remove"></i></a> <a href="#" class="btn btn-xs btn-info"><i	class="fa fa-eye"></i></a>';
	}
}


getMenuList();

function getMenuList() {
	// The baseURI variable is created by the result.base_server_base_uri 
	// which is returned when getting a token and should be used to 
	// create the url_base.
	console.log("Inside Menu List");
	var url_base = baseURI;
	//accessToken = getToken();
	$.ajax({
		'url' : baseURI + 'item/listRecent',
		'type' : 'GET',
		'contentType' : 'x-www-form-urlencoded',
		'crossDomain' : true,
		'success' : function(result) {
			displayMenu(result);
			return result;
		},
		'error' : function(XMLHttpRequest, textStatus, errorThrown) {
			//Process error actions
			console.log('getMenu - Error: ' + errorThrown);
			console.log(XMLHttpRequest.status + ' ' +
				XMLHttpRequest.statusText);
			return false;
		}
	});
}

function displayMenu(MenuResult) {
	console.log('Menu Received ' + MenuResult);
	var Menu = MenuResult['items'];
	var table = document.getElementById("items_recent_list");
	for (var i = 0; i < Menu.length; i++) {

		tr = table.insertRow(-1);

		var tabCell = tr.insertCell(-1);
		tabCell.innerHTML = (i + 1);

		tabCell = tr.insertCell(-1);
		tabCell.innerHTML = Menu[i]['menuId'];

		tabCell = tr.insertCell(-1);
		tabCell.innerHTML = Menu[i]['id'];

		tabCell = tr.insertCell(-1);
		tabCell.innerHTML = Menu[i]['menuName'];

		tabCell = tr.insertCell(-1);
		tabCell.innerHTML = Menu[i]['name'];

		tabCell = tr.insertCell(-1);
		tabCell.innerHTML = '$' + Menu[i]['price'];

		tabCell = tr.insertCell(-1);
		tabCell.innerHTML = '<a href="#" class="btn btn-xs btn-default"><i class="fa fa-pencil"></i></a> <a href="#" class="btn btn-xs btn-danger" data-toggle="modal" data-target="#deleteDATA"><i class="fa fa-remove"></i></a> <a href="#" class="btn btn-xs btn-info"><i class="fa fa-eye"></i></a>';
	}
}
