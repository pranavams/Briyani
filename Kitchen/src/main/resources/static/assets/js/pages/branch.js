/**
 * 
 */

function getBranchList() {
	// The baseURI variable is created by the result.base_server_base_uri 
	// which is returned when getting a token and should be used to 
	// create the url_base.
	var url_base = baseURI;
	$.ajax({
		'url' : baseURI + 'branch/listAll?access_token=' + accessToken,
		'type' : 'GET',
		'contentType' : 'x-www-form-urlencoded',
		'crossDomain' : true,
		'success' : function(result) {
			var returnResult = JSON.stringify(result);
			displayBranch(result);
			return result;
		},
		'error' : function(XMLHttpRequest, textStatus, errorThrown) {
			//Process error actions
			//console.log('getBranch - Error: ' + errorThrown);
			//console.log(XMLHttpRequest.status + ' ' + XMLHttpRequest.statusText);
			return false;
		}
	});
}

function displayBranch(branchResult) {
	var rowIndex = 1;
    $('#contacts_list').DataTable( {
    	"lengthMenu": [[10, 25, 50, 100, -1], [10, 25, 50, 100, "All"]],
    	"data" : branchResult['branch'],
        "columns": [
        	{ "data" : function (row, x, set) { return rowIndex ++ ;} },
        	{ "data": 'id' },
        	{ "data": 'name' },
        	{ "data": 'telephone' },
        	{ "data": function (row, x, set) { return getAddress (row.address);} },
        	{ "data": function (row, x, set) { return (row.contactPersonSalutation + ' ' + row.contactPersonFirstName + ' ' + row.contactPersonMiddleName + ' ' + row.contactPersonLastName).trim()} },
        	{ "data": 'contactPersonNumber' },
            { "data": function (row, x, set) { return '<a href="branch_preview.html?id=' + row.id + '" class="btn btn-xs btn-default"><i class="fa fa-eye"></i>Details</a>' ;}}
        ],
		buttons: [
			'excelHtml5',
			'csvHtml5',
			'pdfHtml5'
		]	        
    } );
}

function getJSONData() {
	console.log("Inside Get JSON Data");
	
	jsonObject = {			
		'name' : document.getElementById('branch_name').value,
		'email' : document.getElementById('branch_email').value,
		'latitude' : document.getElementById('branch_latitude_no').value,
		'longitude' : document.getElementById('branch_longitude_no').value,
		'notes' : document.getElementById('branch_notes').value,
		'contactPersonFirstName' : document.getElementById('branch_contact_person').value,
		'contactPersonLastName' : ' ',
		'contactPersonMiddleName' : ' ',
		'contactPersonSalutation' : ' ',
		'mobileNumber' : ' ',
		'telephone' : document.getElementById('branch_contact_no').value,
		'contactPersonNumber' : document.getElementById('branch_contact_person_no').value,
		'address' : {
			'area' : document.getElementById('branch_address').value	
		}
	};

	return jsonObject;
}

function clearItem(){
	document.getElementById('branch_name').value = '';
	document.getElementById('branch_email').value = '';
	document.getElementById('branch_latitude_no').value = '';
	document.getElementById('branch_longitude_no').value = '';
	document.getElementById('branch_notes').value = '';
	document.getElementById('branch_contact_person').value = '';
	document.getElementById('branch_contact_no').value = '';
	document.getElementById('branch_address').value = '';
	document.getElementById('branch_contact_person_no').value = '';
}

function saveCloseBranch() {
	saveBranch();
	window.location.href = kitchenBaseURI + "branch.html";
}

function saveBranch() {
	console.log("Inside Save Branch");
	
	var jsonObj = getJSONData();
	
	var url_base = baseURI;
	//accessToken = getToken();
	$.ajax({
		'url' : baseURI + 'branch/save',
		'type' : 'POST',
		'crossDomain' : true,
		'data' : JSON.stringify(jsonObj),
		'dataType' : 'json',
		'success' : function(result) {
			$.gritter.add({
				class_name: 'gritter-success',
				title: 'Success!',
				text: '<p style="font-size: 14px;">Branch Saved successfully!</p>',
			});
			clearItem();
			return result;
		},
		'error' : function(XMLHttpRequest, textStatus, errorThrown) {
			//Process error actions
			//console.log('getMenu - Error: ' + errorThrown + " - " + textStatus);
			//console.log(XMLHttpRequest.status + ' ' + XMLHttpRequest.statusText);
			$.gritter.add({
				class_name: 'gritter-error',
				title: 'Success!',
				text: '<p style="font-size: 14px;">Branch Not Saved!</p>',
			});	
			return false;
		}
	});
}

getToken(getBranchList);
