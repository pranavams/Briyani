/**
 * 
 */
function getJSONData() {
	jsonObject = {
		'name' : document.getElementById('branch_name').value,
		'telephone' : document.getElementById('branch_contact_no').value,
		'email' : document.getElementById('branch_email').value,
		'address' : {
			'area' : document.getElementById('branch_address').value
		},
		'contactPersonFirstName' : document.getElementById('branch_contact_person').value,
		'contactPersonNumber' : document.getElementById('branch_contact_person_no').value,
		'latitude' : document.getElementById('branch_latitude_no').value,
		'longitude' : document.getElementById('branch_longitude_no').value,
		'notes' : document.getElementById('branch_notes').value
	};

	console.log("Inside Get JSON Data " + jsonObject);
	return jsonObject;
}

function clearItem() {
	document.getElementById('branch_name').value = '';
	document.getElementById('branch_contact_no').value = '';
	document.getElementById('branch_email').value = '';
	document.getElementById('branch_address').value = '';
	document.getElementById('branch_contact_person').value = '';
	document.getElementById('branch_contact_person_no').value = '';
	document.getElementById('branch_latitude_no').value = '';
	document.getElementById('branch_longitude_no').value = '';
	document.getElementById('branch_notes').value = '';
}

function saveAndCloseBranch() {
	saveBranch(true);
}

function saveBranch(toClose) {
	var jsonObj = getJSONData();
	$.ajax({
		"url" : baseURI + 'branch/save?access_token=' + accessToken,
		'type' : 'POST',
		'contentType' : 'application/json',
		'crossDomain' : true,
		'data' : JSON.stringify(jsonObj),
		'dataType' : 'json',
		'success' : function(result) {
			imageUpload(result.id, 'image/imageUpload?access_token=' + accessToken, "Branch Save Successfully", "Branch Added Image upload Failed, use Edit Branch to save the image");
			clearItem();
			return result;
		},
		'error' : function(XMLHttpRequest, textStatus, errorThrown) {
			//Process error actions
			//console.log('getMenu - Error: ' + errorThrown + " - " + textStatus);
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