/**
 * 
 */


document.getElementById("greetName").innerHTML = 'Hello ' + window.sessionStorage.getItem("name") + " !!!";

function getStaffList() {
	// The baseURI variable is created by the result.base_server_base_uri 
	// which is returned when getting a token and should be used to 
	// create the url_base.
	$.ajax({
		'url' : baseURI + 'staff/listRecent?access_token=' + accessToken,
		'type' : 'GET',
		'contentType' : 'x-www-form-urlencoded',
		'crossDomain' : true,
		'success' : function(result) {
			displayStaff(result);
			return result;
		},
		'error' : function(XMLHttpRequest, textStatus, errorThrown) {
			//Process error actions
			//console.log('getStaff - Error: ' + errorThrown);
			//console.log(XMLHttpRequest.status + ' ' + XMLHttpRequest.statusText);
			return false;
		}
	});
}

function displayStaff(StaffResult) {
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
		tabCell.innerHTML = dateToFormattedStringWithFormat(Staff[i]['dateOfJoin']);

		tabCell = tr.insertCell(-1);
		tabCell.innerHTML = '<a href="#" class="btn btn-xs btn-default"><i class="fa fa-pencil"></i></a> <a href="#" class="btn btn-xs btn-danger" data-toggle="modal" data-target="#deleteDATA"><i class="fa fa-remove"></i></a>';
	}
}

function getRiderList() {
	// The baseURI variable is created by the result.base_server_base_uri 
	// which is returned when getting a token and should be used to 
	// create the url_base.
	$.ajax({
		'url' : baseURI + 'rider/listRecent?access_token=' + accessToken,
		'type' : 'GET',
		'contentType' : 'x-www-form-urlencoded',
		'crossDomain' : true,
		'success' : function(result) {
			displayRider(result);
			return result;
		},
		'error' : function(XMLHttpRequest, textStatus, errorThrown) {
			//Process error actions
			//console.log('getRider - Error: ' + errorThrown);
			//console.log(XMLHttpRequest.status + ' ' + XMLHttpRequest.statusText);
			return false;
		}
	});
}

function displayRider(riderResult) {
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
		tabCell.innerHTML = getAddress((rider[i]['address']));

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

function getMenuList() {
	// The baseURI variable is created by the result.base_server_base_uri 
	// which is returned when getting a token and should be used to 
	// create the url_base.
	$.ajax({
		'url' : baseURI + 'item/listRecent?access_token=' + accessToken,
		'type' : 'GET',
		'contentType' : 'x-www-form-urlencoded',
		'crossDomain' : true,
		'success' : function(result) {
			displayMenu(result);
			return result;
		},
		'error' : function(XMLHttpRequest, textStatus, errorThrown) {
			//Process error actions
			//console.log('getMenu - Error: ' + errorThrown);
			//console.log(XMLHttpRequest.status + ' ' + XMLHttpRequest.statusText);
			return false;
		}
	});
}

function displayMenu(MenuResult) {
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

function getStatistics() {
	// The baseURI variable is created by the result.base_server_base_uri 
	// which is returned when getting a token and should be used to 
	// create the url_base.
	$.ajax({
		'url' : baseURI + 'statistics/get?access_token=' + accessToken,
		'type' : 'GET',
		'contentType' : 'x-www-form-urlencoded',
		'crossDomain' : true,
		'success' : function(result) {
			displayStatistics(result);
			return result;
		},
		'error' : function(XMLHttpRequest, textStatus, errorThrown) {
			//Process error actions
			//console.log('getMenu - Error: ' + errorThrown);
			//console.log(XMLHttpRequest.status + ' ' + XMLHttpRequest.statusText);
			return false;
		}
	});
}

function displayStatistics(result){
	document.getElementById("todayOrders").innerHTML = '<strong>' + result['todayOrders'] + '</strong>';
	document.getElementById("todaySales").innerHTML = '<strong>' + result['todaySales'] + '</strong>';
	document.getElementById("todayPaid").innerHTML = '<strong>' + result['todayPaid'] + '</strong>';
	document.getElementById("todayDue").innerHTML = '<strong>' + result['todayDue'] + '</strong>';
	document.getElementById("todayOrderRequest").innerHTML = '<strong>' + result['todayNumberOfOrders'] + '</strong>';
	document.getElementById("todayPurchaseRequest").innerHTML = '<strong>' + result['todayNumberOfPurchaseRequest'] + '</strong>';
	
	document.getElementById("totalOrders").innerHTML = '<strong>' + result['overallOrders'] + '</strong>';
	document.getElementById("totalSales").innerHTML = '<strong>' + result['overallSales'] + '</strong>';
	document.getElementById("totalPaid").innerHTML = '<strong>' + result['overallPaid'] + '</strong>';
	document.getElementById("totalDue").innerHTML = '<strong>' + result['overallDue'] + '</strong>';
	document.getElementById("totalNumberOfOrders").innerHTML = '<strong>' + result['overallNumberOfOrders'] + '</strong>';
	document.getElementById("totalNumberOfPurchaseRequest").innerHTML = '<strong>' + result['overallNumberOfPurchaseRequest'] + '</strong>';
}

function getOrderList() {
	// The baseURI variable is created by the result.base_server_base_uri 
	// which is returned when getting a token and should be used to 
	// create the url_base.
	$.ajax({
		'url' : baseURI + 'order/listTodayOrders?access_token=' + accessToken,
		'type' : 'GET',
		'contentType' : 'x-www-form-urlencoded',
		'crossDomain' : true,
		'success' : function(result) {
			displayOrder(result);
			return result;
		},
		'error' : function(XMLHttpRequest, textStatus, errorThrown) {
			//Process error actions
			//console.log('getOrder - Error: ' + errorThrown);
			//console.log(XMLHttpRequest.status + ' ' + XMLHttpRequest.statusText);
			return false;
		}
	});
}

function displayOrder(OrderResult) {
	var Order = OrderResult['order'];
	var table = document.getElementById("today_orders");
	for (var i = 0; i < Order.length; i++) {

		tr = table.insertRow(-1);

		tabCell = tr.insertCell(-1);
		tabCell.innerHTML = Order[i]['dateAndTime'];

		tabCell = tr.insertCell(-1);
		tabCell.innerHTML = Order[i]['orderId'];

		tabCell = tr.insertCell(-1);
		tabCell.innerHTML = ' ';

		tabCell = tr.insertCell(-1);
		tabCell.innerHTML = Order[i]['branch']['id'];

		tabCell = tr.insertCell(-1);
		tabCell.innerHTML = Order[i]['branch']['name'];

		tabCell = tr.insertCell(-1);
		tabCell.innerHTML = Order[i]['paymentStatus'];

	}
}

getToken(getStaffList);
getToken(getRiderList);
getToken(getMenuList);
getToken(getStatistics);
getToken(getOrderList);
