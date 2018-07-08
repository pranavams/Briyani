/**
 * 
 */
function getJSONData() {
	jsonObject = {
		'firstName' : document.getElementById('customer_fname').value,
		'middleName' : document.getElementById('customer_mname').value,
		'lastName' : document.getElementById('customer_lname').value,
		'salutation' : ' ',
		'email' : document.getElementById('customer_email').value,
		'telephoneNumber' : document.getElementById('customer_telephone_no').value,
		'mobileNumber' : document.getElementById('customer_mobile_no').value,
		'gender' : $('input[name=customRadioInline1]:checked').val(),
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
	document.getElementById('customer_mname').value = '';
	document.getElementById('customer_lname').value = '';
	document.getElementById('customer_email').value = '';
	document.getElementById('customer_telephone_no').value = '';
	document.getElementById('customer_mobile_no').value = '';
	document.getElementById('customer_dob').value = '';
	document.getElementById('cust_delivery_address').value = '';
}

function save() {
}

function saveAndCloseCustomer() {
	saveCustomer(true);
}

function saveCustomer(toClose) {
	var jsonObj = getJSONData();
	$.ajax({
		"url" : baseURI + 'customer/save?access_token=' + accessToken,
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