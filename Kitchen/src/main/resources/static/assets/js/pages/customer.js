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
			//console.log('getCustomer - Error: ' + errorThrown);
			//console.log(XMLHttpRequest.status + ' ' + XMLHttpRequest.statusText);
			return false;
		}
	});
}

function displayCustomer(data){
	var rowIndex = 1;
    $('#customer_table_list').DataTable( {
    	"lengthMenu": [[10, 25, 50, 100, -1], [10, 25, 50, 100, "All"]],
    	"data" : data.customer,
        "columns": [
        	{ "data" : function (row, x, set) { return rowIndex ++ ;} },
        	{ "data": function (data, x, set) { return nvl(data.salutation) + ' ' + data.firstName + ' ' + data.middleName + ' ' + data.lastName; } },
        	{ "data": 'email' },
        	{ "data": 'mobileNumber' },
        	{ "data": function (data, x, set) { return nvl(formatDateDefault(data.dateOfBirth));} },
        	{ "data": function (row, x, set) { return getAddress (row.address);} },
            { "data": function (data, x, set) { return '<a href="customer_preview.html?id=' + data.id + '" class="btn btn-xs btn-default"><i class="fa fa-eye"></i>Details</a>';}}
        ],
		buttons: [
			'excelHtml5',
			'csvHtml5',
			'pdfHtml5'
		]	        
    } );
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
			//console.log('getMenu - Error: ' + errorThrown + " - " + textStatus);
			//console.log(XMLHttpRequest.status + ' ' + XMLHttpRequest.statusText);
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
