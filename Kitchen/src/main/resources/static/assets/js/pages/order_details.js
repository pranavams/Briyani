
/**
 * 
 */
function getOrderList() {
	// The baseURI variable is created by the result.base_server_base_uri 
	// which is returned when getting a token and should be used to 
	// create the url_base.
	$.ajax({
		'url' : baseURI + 'order/get/' +$.urlParam('id') + '?access_token=' + accessToken,
		'type' : 'GET',
		'contentType' : 'x-www-form-urlencoded',
		'crossDomain' : true,
		'success' : function(result) {
			displayOrder(result);
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

function displayOrder(data){
	console.log("Data " + JSON.stringify(data));
	data = data.order[0];
	console.log("Order Date " + dateToString(new Date(data.dateAndTime), "DDD MMM DD, YYYY"));

	address = data.address;
	document.getElementById('branchName').innerHTML = data.name;
	document.getElementById('branch_phoneNo').innerHTML = data.telephone;
	document.getElementById('branch_contactPerson').innerHTML = data.contactPersonFirstName;
	document.getElementById('branch_contactPersonMob').innerHTML = data.mobileNumber;
	
	document.getElementById('branch_address').innerHTML = address.doorNumber+' ' + address.street + ' ' + address.area
	 + ' ' + address.city +' ' + address.state + ' ' + address.country + ' ' + address.zipcode;
}

function edit() {
	window.location.href = kitchenBaseURI + 'edit_branch.html?id=' + $.urlParam('id');
}

function deleteData() {
	console.log("Delete To Implement");
}

function updateOrderStatus() {
	console.log("Inside Update Order");
	var orderStatusField = document.getElementById('orderStatusDropDown');
	var orderStatus =  orderStatusField.options[orderStatusField.selectedIndex].text;


	var url_base = baseURI;
	//accessToken = getToken();
	$.ajax({
		'url' : baseURI + 'order/updateOrderStatus/' + $.urlParam('id') + '/' + orderStatus,
		'type' : 'GET',
		'contentType' : 'application/json',
		'crossDomain' : true,
		'success' : function(result) {
			$.gritter.add({
				class_name : 'gritter-success',
				title : 'Success!',
				text : '<p style="font-size: 14px;">Order Updated successfully!</p>',
			});
			return result;
		},
		'error' : function(XMLHttpRequest, textStatus, errorThrown) {
			//Process error actions
			console.log('Error: ' + errorThrown + " - " + textStatus);
			console.log(XMLHttpRequest.status + ' ' +
				XMLHttpRequest.statusText);
			$.gritter.add({
				class_name : 'gritter-error',
				title : 'Success!',
				text : '<p style="font-size: 14px;">Order Not Updated!</p>',
			});
			return false;
		}
	});
}


getToken(getOrderList);
