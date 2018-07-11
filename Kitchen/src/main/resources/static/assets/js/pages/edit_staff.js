/**
 * 
 */
function getStaffList() {
	// The baseURI variable is created by the result.base_server_base_uri 
	// which is returned when getting a token and should be used to 
	// create the url_base.
	
	$.ajax({
		'url' : baseURI + 'staff/get/' + $.urlParam('id') + '?access_token=' + accessToken,
		'type' : 'GET',
		'contentType' : 'x-www-form-urlencoded',
		'crossDomain' : true,
		'success' : function(result) {
			displayStaff(result);
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

function displayStaff(data){
	console.log("Data " + JSON.stringify(data));
	data = data.staff[0];	
	address = data.address;
	document.getElementById('staff_fname').value = data.firstName;
	document.getElementById('staff_mname').value = data.middleName;
	document.getElementById('staff_lname').value = data.lastName;
	setTheGenderValue(data.gender);
	document.getElementById('staff_mobile').value = data.mobileNumber;
	document.getElementById('staff_dob').value = dateToString(data.dateOfBirth,'DD/MM/YYYY');
	document.getElementById('staff_jod').value = dateToString(data.dateOfJoin,'DD/MM/YYYY');
	document.getElementById('staff_role').value = data.role;
	document.getElementById('staff_email').value = data.email;
	document.getElementById('staff_notes').value = data.notes;

}

function setTheGenderValue(gender) {
	if (gender!=null && gender!='') {
		if (gender=='Female'){
			document.getElementById('customRadioInline2').checked = 'True';
		
		}
		else if (gender=='Male') {
			document.getElementById('customRadioInline1').checked = 'True';
		}
		else {
			document.getElementById('customRadioInline3').checked = 'True';
		}
	}
}


function edit() {
	window.location.href = kitchenBaseURI + 'edit_staff.html?id=' + $.urlParam('id');
}

function deleteData() {
	console.log("Delete To Implement");
}


getToken(getStaffList);
