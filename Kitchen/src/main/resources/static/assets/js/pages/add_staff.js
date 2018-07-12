/**
 * 
 */
function getJSONData() {
	var staffRole = document.getElementById('staff_role');

	jsonObject = {
		'firstName' : document.getElementById('staff_fname').value,
		'middleName' : document.getElementById('staff_mname').value,
		'lastName' : document.getElementById('staff_lname').value,
		'salutation' : ' ',
		'gender' : $('input[name=customRadioInline1]:checked').val(),
		'mobileNumber' : document.getElementById('staff_mobile').value,
		'dateOfBirth' : stringToDate(document.getElementById('staff_dob').value, 'dd/mm/yyyy', '/'),
		'dateOfJoin' : stringToDate(document.getElementById('staff_jod').value, 'dd/mm/yyyy', '/'),
		'role' : staffRole.options[staffRole.selectedIndex].text,
		'email' : document.getElementById('staff_email').value,
		'notes' : document.getElementById('staff_notes').value,
	};

	return jsonObject;
}

function clearItem() {
	document.getElementById('staff_fname').value = '';
	document.getElementById('staff_mname').value = '';
	document.getElementById('staff_lname').value = '';
	document.getElementById('staff_mobile').value = '';
	document.getElementById('staff_dob').value = '';
	document.getElementById('staff_jod').value = '';
	document.getElementById('staff_email').value = '';
	document.getElementById('staff_notes').value = '';
}

function save() {
}

function saveAndCloseStaff() {
	saveStaff(true);
}

function saveStaff(toClose) {
	console.log("To Close " + toClose);
	var jsonObj = getJSONData();
	$.ajax({
		"url" : baseURI + 'staff/save?access_token=' + accessToken,
		'type' : 'POST',
		'contentType' : 'application/json',
		'crossDomain' : true,
		'data' : JSON.stringify(jsonObj),
		'dataType' : 'json',
		'success' : function(result) {
			imageUpload(result.id, 'image/imageUpload?access_token=' + accessToken, "Staff Saved Successfully", "Staff Added. Image upload Failed, use Edit Staff to save the image");
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