/**
 * 
 */
function getCustomerList() {
	// The baseURI variable is created by the result.base_server_base_uri 
	// which is returned when getting a token and should be used to 
	// create the url_base.
	$.ajax({
		'url' : baseURI + 'customer/get/' +$.urlParam('id') + '?access_token=' + accessToken,
		'type' : 'GET',
		'contentType' : 'x-www-form-urlencoded',
		'crossDomain' : true,
		'success' : function(result) {
			displayCustomer(result);
			return result;
		},
		'error' : function(XMLHttpRequest, textStatus, errorThrown) {
			//Process error actions
			//console.log('getCustomer - Error: ' + errorThrown);
			//console.log(XMLHttpRequest.status + ' ' + XMLHttpRequest.statusText);
			return false;
		}
		
	});
}

function displayCustomer(data){
	console.log("Data " + JSON.stringify(data));
	data = data.customer[0];
	address = data.address;
	document.getElementById('displayName').innerHTML = data.firstName + ' ' + nvl(data.middleName) + ' ' + data.lastName
	document.getElementById('mobileNo').innerHTML = nvl(data.mobileNumber);
	document.getElementById('emailId').innerHTML = nvl(data.email);
	document.getElementById('dateOfBirth').innerHTML = nvl(formatDateDefault(data.dateOfBirth));
	
	document.getElementById('gender').innerHTML = nvl(data.gender);
	document.getElementById('address').innerHTML = getAddress(data.address);
}

function edit() {
	window.location.href = kitchenBaseURI + 'edit_customer.html?id=' + $.urlParam('id');
}

function deleteData() {
	console.log("Delete To Implement");
}


getToken(getCustomerList);
