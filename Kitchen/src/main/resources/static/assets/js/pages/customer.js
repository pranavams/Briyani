/**
 * 
 */
function getCustomerList() {
	// The baseURI variable is created by the result.base_server_base_uri 
	// which is returned when getting a token and should be used to 
	// create the url_base.
	$.ajax({
		'url' : baseURI + 'customer/listAll?access_token=' + accessToken,
		'type' : 'GET',
		'contentType' : 'x-www-form-urlencoded',
		'crossDomain' : true,
		'success' : function(result) {
			displayCustomer(result);
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

function displayCustomer(data){
	console.log("Data " + JSON.stringify(data));
	$.each(data.customer, function(i, data) {
        var body = "<tr>";
        body    += "<td>" + (i + 1) + "</td>";
        body    += "<td>" + data.salutation + ' ' + data.firstName + ' ' + data.middleName + ' ' + data.lastName + "</td>";
        body    += "<td>" + data.email + "</td>";
        body    += "<td>" + data.mobileNumber + "</td>";
        body    += "<td>" + data.dateOfBirth + "</td>";
        body    += "<td>" + data.address.doorNumber + ' ' + data.address.street + ' ' + data.address.area + ' ' + data.address.city + ' ' + data.address.state + ' ' + data.address.country + ' ' + data.address.zipcode + "</td>";
        body    += '<td><a href="preview.html" class="btn btn-xs btn-default"><i class="fa fa-eye"></i>Details</a></td>';
        body    += "</tr>";
        $( "#contacts_list tbody" ).append(body);
    });
    /*DataTables instantiation.*/
    $( "#contacts_list" ).DataTable();
}

function getJSONData() {
	jsonObject = {
		'firstName' : document.getElementById('customer_fname').value,
		'middleName' : document.getElementById('customer_mname').value,
		'lastName' : document.getElementById('customer_lname').value,
		'salutation' : ' ',
		'telephoneNumber' : document.getElementById('customer_telephone_no').value,
		'mobileNumber' : document.getElementById('customer_mobile_no').value,
		'email' : document.getElementById('customer_email').value,
		'dateOfBirth' : stringToDate(document.getElementById('customer_dob').value, 'dd/mm/yyyy', '/'),
		'address' : {
			'area' : document.getElementById('cust_delivery_address').value
		}
	};

	console.log("Inside Get JSON Data " + jsonObject);
	return jsonObject;
}

function clearItem() {
	document.getElementById('customer_fname').value = '';
	document.getElementById('customer_fname').value = '';
	document.getElementById('customer_fname').value = '';
	document.getElementById('customer_telephone_no').value = '';
	document.getElementById('customer_mobile_no').value = '';
	document.getElementById('customer_email').value = '';
	document.getElementById('cust_delivery_address').value = '';
}

function saveCloseCustomer() {
	saveCustomer();
}

function saveCustomer() {
	console.log("Inside Save Customer");

	var jsonObj = getJSONData();

	var url_base = baseURI;
	//accessToken = getToken();
	$.ajax({
		'url' : baseURI + 'customer/save',
		'type' : 'POST',
		'contentType' : 'application/json',
		'crossDomain' : true,
		'data' : JSON.stringify(jsonObj),
		'dataType' : 'json',
		'success' : function(result) {
			$.gritter.add({
				class_name : 'gritter-success',
				title : 'Success!',
				text : '<p style="font-size: 14px;">Customer Saved successfully!</p>',
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
				text : '<p style="font-size: 14px;">Customer Not Saved!</p>',
			});
			return false;
		}
	});
}

getToken(getCustomerList);
