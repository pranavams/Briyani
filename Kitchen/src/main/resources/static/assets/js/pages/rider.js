/**
 * 
 */
function getRiderList() {
	// The baseURI variable is created by the result.base_server_base_uri 
	// which is returned when getting a token and should be used to 
	// create the url_base.
	$.ajax({
		'url' : baseURI + 'rider/listAll?access_token=' + accessToken,
		'type' : 'GET',
		'contentType' : 'x-www-form-urlencoded',
		'crossDomain' : true,
		'success' : function(result) {
			displayRider(result);
			return result;
		},
		'error' : function(XMLHttpRequest, textStatus, errorThrown) {
			//Process error actions
			//console.log('getRider - Error: ' + errorThrown);
			//console.log(XMLHttpRequest.status + ' ' + XMLHttpRequest.statusText);
			return false;
		}
	});
}

function displayRider(data) {
	var rowIndex = 1;
    $('#contacts_list').DataTable( {
    	"lengthMenu": [[10, 25, 50, 100, -1], [10, 25, 50, 100, "All"]],
    	"data" : data['rider'],
        "columns": [
        	{ "data" : function (row, x, set) { return rowIndex ++ ;} },
        	{ "data": 'id' },
        	{ "data": function (row, x, set) { return (row.riderPersonSalutation + ' ' + row.riderPersonFirstName + ' ' + row.riderPersonMiddleName + ' ' + row.riderPersonLastName).trim()} },
        	{ "data": 'email' },
        	{ "data": 'mobileNumber' },
        	{ "data": function (row, x, set) { return dateToFormattedString(row.dateOfBirth) }  },
        	{ "data": function (row, x, set) { return getAddress (row.address);} },
        	{ "data": function (row, x, set) { if(row.departmentType  === "End User" || row.departmentType  === "Branch") return row.departmentType; else return '';} },
            { "data": function (row, x, set) { return '<a href="rider_preview.html?id=' + row.id + '" class="btn btn-xs btn-default"><i class="fa fa-eye"></i>Details</a>'}}
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
	var riderDepartment = document.getElementById('rider_depart');
	
	var jsonObject = {
		"departmentType" : riderDepartment.options[riderDepartment.selectedIndex].text,
		"address" : {
			"doorNumber" : " ",
			"street" : " ",
			"area" : document.getElementById("cust_delivery_address").value,
			"city" : " ",
			"state" : " ",
			"country" : " ",
			"zipcode" : " "
		},
		"riderPersonSalutation" : " ",
		"riderPersonFirstName" : document.getElementById('rider_fname').value,
		"riderPersonMiddleName" : document.getElementById("rider_mname").value,
		"riderPersonLastName" : document.getElementById("rider_lname").value,
		"mobileNumber" : document.getElementById("rider_mobile_no").value,
		"riderPersonNumber" : " ",
		//"dateOfBirth" : "",
		"email" : document.getElementById("rider_email").value,
		"gender" : $('input[name=customRadioInline1]:checked').val(),
		"zone" : " ",
		"riderIdCardNo" : document.getElementById("rider_idcard_no").value
	};
	console.log("JSON " + JSON.stringify(jsonObject));
	return jsonObject;
}

function saveRider() {
	var xhr = new XMLHttpRequest();
	xhr.withCredentials = true;

	xhr.addEventListener("readystatechange", function () {
	  if (this.readyState === 4) {
	    console.log(this.responseText);
	  }
	});

	xhr.open("POST", baseURI + "rider/save");
	xhr.setRequestHeader("content-type", "application/json");
	xhr.setRequestHeader("cache-control", "no-cache");
	xhr.setRequestHeader("access-token", accessToken);
	xhr.send(getJSONData());
}

function saveRider2() {
	var settings = {
		"async" : true,
		"crossDomain" : true,
		"url" : baseURI + 'rider/save?access_token=' + accessToken,
		"method" : "POST",
		"headers" : {
			"content-type" : "application/json",
			"cache-control" : "no-cache"
		},
		"processData" : false,
		"data" : getJSONData()
	}

	$.ajax(settings).done(function(response) {
		console.log(response);
	});
}

function saveRiders() {
	console.log("Inside Save Rider");

	var jsonObj = getJSONData();
	$.ajax({
		'url' : baseURI + 'rider/save',
		'type' : 'POST',
		'content-Type' : 'application/json; charset=utf-8',
		'crossDomain' : true,
		'data' : JSON.stringify(jsonObj),
		'dataType' : 'json',
		'headers' : {
			"Content-Type" : "application/json",
			"Accept" : "application/json",
			"Authorization" : "OAuth oauth_token=" + accessToken
		},
		'success' : function(result) {
			console.log('Save Rider - Success!\r\n' + result);
			//Process success actions
			var returnResult = JSON.stringify(result);
			console.log('Save Rider - Success!\r\n' + returnResult);
			document.getElementById('callResults').innerHTML = returnResult;
			return result;
		},
		'error' : function(XMLHttpRequest, textStatus, errorThrown) {
			//Process error actions
			//console.log('getRider - Error: ' + errorThrown + " - " + textStatus);
			//console.log(XMLHttpRequest.status + ' ' + XMLHttpRequest.statusText);
			return false;
		}
	});
}

getToken(getRiderList);