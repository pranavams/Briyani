/**
 * 
 */
function getStaffList() {
	// The baseURI variable is created by the result.base_server_base_uri 
	// which is returned when getting a token and should be used to 
	// create the url_base.
	$.ajax({
		'url' : baseURI + 'staff/listAll?access_token=' + accessToken,
		'type' : 'GET',
		'contentType' : 'x-www-form-urlencoded',
		'crossDomain' : true,
		'success' : function(result) {
			//console.log("Staff " + JSON.stringify(result));
			displayStaff(result);
			return result;
		},
		'error' : function(XMLHttpRequest, textStatus, errorThrown) {
			//Process error actions
			//console.log('getStaff - Error: ' + errorThrown);
			//console.log(XMLHttpRequest.status + ' ' + XMLHttpRequest.statusText);
			return false;
		}
	});
}

function displayStaff(data) {
	var rowIndex = 1;
    $('#contacts_list').DataTable( {
    	"lengthMenu": [[10, 25, 50, 100, -1], [10, 25, 50, 100, "All"]],
    	"data" : data['staff'],
        "columns": [
        	{ "data" : function (row, x, set) { return rowIndex ++ ;} },
        	{ "data": 'id' },
        	{ "data": function (row, x, set) { return (row.salutation + ' ' + row.firstName + ' ' + row.middleName + ' ' + row.lastName).trim()} },
        	{ "data": function (row, x, set) { return getAddress (row.address);} },
        	{ "data": 'email' },
        	{ "data": 'mobileNumber' },
        	{ "data": 'gender' },
        	{ "data": function (row, x, set) { return dateToFormattedString(row.dateOfJoin) }  },
            { "data": function (row, x, set) { return '<a href="edit_staff.html?id=' + row.id + '" class="btn btn-xs btn-default"><i class="fa fa-eye"></i>Details</a>' }}
        ],
		buttons: [
			'excelHtml5',
			'csvHtml5',
			'pdfHtml5'
		]	        
    } );
}

getToken(getStaffList);
