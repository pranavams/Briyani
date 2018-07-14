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
			//console.log('getCustomer - Error: ' + errorThrown);
			//console.log(XMLHttpRequest.status + ' ' + XMLHttpRequest.statusText);
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
	
	document.getElementById('branch_contact_person').value = data.contactPersonFirstName + ' ' + data.contactPersonFirstName + ' ' + data.contactPersonLastName;
	document.getElementById('branch_latitude_no').value = data.latitude;
	document.getElementById('branch_longitude_no').value = data.longitude;
	document.getElementById('branch_notes').value = data.notes;
	
	document.getElementById('branch_contact_person_no').value = data.contactPersonNumber;
	document.getElementById('branch_address').innerHTML = address.doorNumber +' ' + address.street + ' ' + address.area
	 + ' ' + address.city+' ' + address.state+' ' + address.country + ' ' + address.zipcode;
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
function getJSONUpdateData() {
	jsonObject = {
		'id' : $.urlParam('id'),
		'name' : document.getElementById('branch_name').value,
		'telephone' : document.getElementById('branch_contact_no').value,
		'email' : document.getElementById('branch_email').value,
		'notes' : document.getElementById('branch_notes').value,
		'contactPersonFirstName' : document.getElementById('branch_contact_person').value,
		'email' : document.getElementById('branch_email').value,
		'latitude' : document.getElementById('branch_latitude_no').value,
		'longitude' : document.getElementById('branch_longitude_no').value,
		'contactPersonNumber' :document.getElementById('branch_contact_person_no').value,
		'address' : {
			'area' : document.getElementById('branch_address').value
		}
	};

	console.log("Inside Get JSON Data " + jsonObject);
	return jsonObject;
}


function update() {
	console.log("Inside Update Order");

	var jsonObj = getJSONUpdateData();

	var url_base = baseURI;
	//accessToken = getToken();
	$.ajax({
		'url' : baseURI + 'branch/update',
		'type' : 'POST',
		'contentType' : 'application/json',
		'crossDomain' : true,
		'data' : JSON.stringify(jsonObj),
		'dataType' : 'json',
		'success' : function(result) {
			$.gritter.add({
				class_name : 'gritter-success',
				title : 'Success!',
				text : '<p style="font-size: 14px;">Branch Saved successfully!</p>',
			});
			//clearItem();
			return result;
		},
		'error' : function(XMLHttpRequest, textStatus, errorThrown) {
			//Process error actions
			//console.log('Branch Update  - Error: ' + errorThrown + " - " + textStatus);
			//console.log(XMLHttpRequest.status + ' ' + XMLHttpRequest.statusText);
			$.gritter.add({
				class_name : 'gritter-error',
				title : 'Success!',
				text : '<p style="font-size: 14px;">Branch Not Saved!</p>',
			});
			return false;
		}
	});

}

getToken(getBranchList);
