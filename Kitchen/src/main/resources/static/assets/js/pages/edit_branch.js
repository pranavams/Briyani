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

function displayBranch(data){
	console.log("Data " + JSON.stringify(data));
	data = data.branch[0];	
	address = data.address;
	document.getElementById('branch_name').value = data.name;
	document.getElementById('branch_contact_no').value = data.telephone;
	document.getElementById('branch_email').value = data.email;
	
	document.getElementById('branch_contact_person').value = data.contactPersonFirstName +' ' + data.contactPersonLastName;
	document.getElementById('branch_latitude_no').value = data.latitude;
	document.getElementById('branch_longitude_no').value = data.longitude;
	document.getElementById('branch_notes').value = data.notes;
	
	document.getElementById('branch_contact_person_no').value = data.contactPersonNumber;
	document.getElementById('branch_address').innerHTML = address.doorNumber +',' + address.street + ', ' + address.area
	 + ',' + address.city+' ,' + address.state+' . ';
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
	window.location.href = kitchenBaseURI + 'edit_customer.html?id=' + $.urlParam('id');
}

function deleteData() {
	console.log("Delete To Implement");
}


getToken(getBranchList);
