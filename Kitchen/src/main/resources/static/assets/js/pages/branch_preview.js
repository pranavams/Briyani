
/**
 * 
 */
function getBranchList() {
	// The baseURI variable is created by the result.base_server_base_uri 
	// which is returned when getting a token and should be used to 
	// create the url_base.
	$.ajax({
		'url' : baseURI + 'branch/get/' + $.urlParam('id') + '?access_token=' + accessToken,
		'type' : 'GET',
		'contentType' : 'x-www-form-urlencoded',
		'crossDomain' : true,
		'success' : function(result) {
			displayBranch(result);
			return result;
		},
		'error' : function(XMLHttpRequest, textStatus, errorThrown) {
			//Process error actions
			console.log('getCustomer - Error: ' + errorThrown);
			console.log(XMLHttpRequest.status + ' ' +
				XMLHttpRequest.statusText);
			return false;
		}
	});
}

function displayBranch(data) {
	console.log("Data " + JSON.stringify(data));
	data = data.branch[0];
	address = data.address;
	document.getElementById('branchName').innerHTML = data.name;
	document.getElementById('branch_phoneNo').innerHTML = data.telephone;
	document.getElementById('branch_contactPerson').innerHTML = data.contactPersonFirstName;
	document.getElementById('branch_contactPersonMob').innerHTML = data.mobileNumber;

	document.getElementById('branch_address').innerHTML = address.doorNumber + ' ' + address.street + ' ' + address.area
	+ ' ' + address.city + ' ' + address.state + ' ' + address.country + ' ' + address.zipcode;
}

function getBranchOrdersList() {
	// The baseURI variable is created by the result.base_server_base_uri 
	// which is returned when getting a token and should be used to 
	// create the url_base.
	$.ajax({
		'url' : baseURI + 'statistics/dateWiseConsolidatedListForBranch/' + $.urlParam('id') + '?access_token=' + accessToken,
		'type' : 'GET',
		'contentType' : 'x-www-form-urlencoded',
		'crossDomain' : true,
		'success' : function(result) {
			displayBranchOrders(result);
			return result;
		},
		'error' : function(XMLHttpRequest, textStatus, errorThrown) {
			//Process error actions
			console.log('getCustomer - Error: ' + errorThrown);
			console.log(XMLHttpRequest.status + ' ' +
				XMLHttpRequest.statusText);
			return false;
		}
	});
}

function displayBranchOrders(data) {
	console.log("Data " + JSON.stringify(data));
	$.each(data.order, function(i, data) {
		var body = "<tr>";
		body += "<td>" + (i + 1) + "</td>";
		body += "<td>" + data.salutation + ' ' + data.firstName + ' ' + data.middleName + ' ' + data.lastName + "</td>";
		body += "<td>" + data.email + "</td>";
		body += "<td>" + data.mobileNumber + "</td>";
		body += "<td>" + data.dateOfBirth + "</td>";
		body += "<td>" + data.address.doorNumber + ' ' + data.address.street + ' ' + data.address.area + ' ' + data.address.city + ' ' + data.address.state + ' ' + data.address.country + ' ' + data.address.zipcode + "</td>";
		body += '<td><a href="customer_preview.html?id=' + data.id + '" class="btn btn-xs btn-default"><i class="fa fa-eye"></i>Details</a></td>';
		body += "</tr>";
		$("#contacts_list tbody").append(body);
	});
	/*DataTables instantiation.*/
	$("#contacts_list").DataTable();
}

function edit() {
	window.location.href = kitchenBaseURI + 'edit_branch.html?id=' + $.urlParam('id');
}

function deleteData() {
	console.log("Delete To Implement");
}


getToken(getBranchList);
getToken(getBranchOrdersList);