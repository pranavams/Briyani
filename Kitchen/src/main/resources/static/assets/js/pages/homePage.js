/**
 * 
 */

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
	var rowIndex = 1;
	$(document).ready(function() {
	    $('#recent_staff_list').DataTable( {
	    	"lengthMenu": [[2, 10, 25, 50, 100, -1], [2, 10, 25, 50, 100, "All"]],
	    	"data" : StaffResult['staff'],
	        "columns": [
	        	{ "data" : function (row, x, set) { return rowIndex ++ ;} },
	        	{ "data": 'id' },
	        	{ "data": function (row, x, set) { return (row.salutation + ' ' + row.firstName + ' ' + row.middleName + ' ' + row.lastName).trim()} },
	        	{ "data": function (row, x, set) { return getAddress (row.address);} },
	        	{ "data": 'email' },
	        	{ "data": 'mobileNumber' },
	        	{ "data": 'gender' },
	            { "data": function (row, x, set) { return dateToFormattedStringWithFormat(row.dateOfJoin) } },
	            { "data": function (row, x, set) { return '<a href="#" class="btn btn-xs btn-default"><i class="fa fa-pencil"></i></a> <a href="#" class="btn btn-xs btn-danger" data-toggle="modal" data-target="#deleteDATA"><i class="fa fa-remove"></i></a>'}}
	        ],
			buttons: [
				'excelHtml5',
				'csvHtml5',
				'pdfHtml5'
			]	        
	    } );
	} );
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
	var rowIndex = 1;
	$(document).ready(function() {
	    $('#recent_rider_list').DataTable( {
	    	"lengthMenu": [[2, 10, 25, 50, 100, -1], [2, 10, 25, 50, 100, "All"]],
	    	"data" : riderResult['rider'],
	        "columns": [
	        	{ "data" : function (row, x, set) { return rowIndex ++ ;} },
	        	{ "data": 'id' },
	        	{ "data": function (row, x, set) { return (row.riderPersonSalutation + ' ' + row.riderPersonFirstName + ' ' + row.riderPersonMiddleName + ' ' + row.riderPersonLastName).trim()} },
	        	{ "data": function (row, x, set) { return getAddress (row.address);} },
	        	{ "data": 'mobileNumber' },
	        	{ "data": 'gender' },
	            { "data": function (row, x, set) { return '' } },
	            { "data": function (row, x, set) { return '<a href="#" class="btn btn-xs btn-default"><i class="fa fa-pencil"></i></a> <a href="#" class="btn btn-xs btn-danger" data-toggle="modal" data-target="#deleteDATA"><i class="fa fa-remove"></i></a> <a href="#" class="btn btn-xs btn-info"><i	class="fa fa-eye"></i></a>'}}
	        ],
			buttons: [
				'excelHtml5',
				'csvHtml5',
				'pdfHtml5'
			]	        
	    } );
	} );
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
	var rowIndex = 1;
	$(document).ready(function() {
	    $('#items_recent_list').DataTable( {
	    	"lengthMenu": [[2, 10, 25, 50, 100, -1], [2, 10, 25, 50, 100, "All"]],
	    	"data" : MenuResult['items'],
	        "columns": [
	        	{ "data" : function (row, x, set) { return rowIndex ++ ;} },
	        	{ "data": 'menuId' },
	        	{ "data": 'id' },
	        	{ "data": 'menuName' },
	        	{ "data": 'name' },
	            { "data": function (row, x, set) { return '$' + row.price } },
	            { "data": function (row, x, set) { return '<a href="#" class="btn btn-xs btn-default"><i class="fa fa-pencil"></i></a> <a href="#" class="btn btn-xs btn-danger" data-toggle="modal" data-target="#deleteDATA"><i class="fa fa-remove"></i></a> <a href="#" class="btn btn-xs btn-info"><i class="fa fa-eye"></i></a>'}}
	        ],
			buttons: [
				'excelHtml5',
				'csvHtml5',
				'pdfHtml5'
			]	        
	    } );
	} );
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

function displayOrder(orders){
	$(document).ready(function() {
	    $('#today_orders').DataTable( {
	    	"lengthMenu": [[2, 10, 25, 50, 100, -1], [2, 10, 25, 50, 100, "All"]],
	    	"data" : orders['order'],
	        "columns": [
	            { "data": function (row, x, set) { return dateToFormattedString(row.dateAndTime)} },
	            { "data": 'orderId' },
	            { "data": function (row, x, set) { return ''} },
	            { "data": 'branch.name' },
	            { "data": 'branch.id' },
	            { "data": 'orderStatus' }
	        ],
			buttons: [
				'excelHtml5',
				'csvHtml5',
				'pdfHtml5'
			]	        
	    } );
	} );
}

getToken(getStaffList);
getToken(getRiderList);
getToken(getMenuList);
getToken(getStatistics);
getToken(getOrderList);

