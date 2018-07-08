/**
 * 
 */
function getJSONData() {
	var riderDept = document.getElementById('rider_depart');
	var vehicleType = document.getElementById('vehicle_type');
	var vehicleModel = document.getElementById('vehicle_model');
	var licenseType = document.getElementById('license_type');
	
	jsonObject = {
		'departmentType' : riderDept.options[riderDept.selectedIndex].text,
		'riderPersonFirstName' : document.getElementById('rider_fname').value,
		'riderPersonMiddleName' : document.getElementById('rider_mname').value,
		'riderPersonLastName' : document.getElementById('rider_lname').value,
		'riderPersonSalutation' : ' ',
		'mobileNumber' : document.getElementById('rider_mobile_no').value,
		'email' : document.getElementById('rider_email').value,
		'gender' : $('input[name=customRadioInline1]:checked').val(),
		'address' : {
			'area' : document.getElementById('cust_delivery_address').value
		},
		'riderIdCardNo' : document.getElementById('rider_idcard_no').value,
		'vehicleType' : vehicleType.options[vehicleType.selectedIndex].text,
		'vehicleModel' : vehicleModel.options[vehicleModel.selectedIndex].text,
		'vehicleNumber' : document.getElementById('vehicle_no').value,
		'licenseNumber' : document.getElementById('lincense_no').value,
		'licenseType' : licenseType.options[licenseType.selectedIndex].text,
		'licenseIssueDate' : stringToDate(document.getElementById('license_issue_date').value, 'dd/mm/yyyy', '/'),
		'licenseExpiryDate' : stringToDate(document.getElementById('license_exp_date').value, 'dd/mm/yyyy', '/')
	};

	console.log("Inside Get JSON Data " + jsonObject);
	return jsonObject;
}

function clearItem() {
	document.getElementById('rider_fname').value = '';
	document.getElementById('rider_mname').value = '';
	document.getElementById('rider_lname').value = '';
	document.getElementById('rider_mobile_no').value = '';
	document.getElementById('rider_email').value = '';
	document.getElementById('cust_delivery_address').value = '';
	document.getElementById('rider_idcard_no').value = '';
	document.getElementById('vehicle_no').value = '';
	document.getElementById('lincense_no').value = '';
	document.getElementById('vehicle_no').value = '';
	document.getElementById('license_issue_date').value = '';
	document.getElementById('license_exp_date').value = '';
}

function save() {
}

function saveAndCloseRider() {
	saveRider(true);
}

function saveRider() {
	var jsonObj = getJSONData();
	$.ajax({
		"url" : baseURI + 'rider/save?access_token=' + accessToken,
		'type' : 'POST',
		'contentType' : 'application/json',
		'crossDomain' : true,
		'data' : JSON.stringify(jsonObj),
		'dataType' : 'json',
		'success' : function(result) {
			$.gritter.add({
				class_name : 'gritter-success',
				title : 'Success!',
				text : '<p style="font-size: 14px;">Rider Saved successfully!</p>',
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
				text : '<p style="font-size: 14px;">Rider Not Saved!</p>',
			});
			return false;
		}
	});
}