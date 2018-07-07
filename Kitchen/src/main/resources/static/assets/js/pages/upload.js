
getToken();

$(document).ready(function() {

	$("#btnSubmit").click(function(event) {

		//stop submit the form, we will post it manually.
		event.preventDefault();

		fire_ajax_submit();

	});

});

function fire_ajax_submit() {

	// Get form
	var form = $('#fileUploadForm')[0];

	var data = new FormData(form);

	console.log("Data to upload " + data);

	$("#btnSubmit").prop("disabled", true);

	$.ajax({
		type : "POST",
		enctype : 'multipart/form-data',
		url : baseURI + "image/imageUpload",
		data : data,
		processData : false,
		contentType : false,
		cache : false,
		timeout : 600000,
		success : function(data) {
			$("#result").text(data);
			console.log("SUCCESS : ", data);
			$("#btnSubmit").prop("disabled", false);

		},
		error : function(e) {
			$("#result").text(e.responseText);
			console.log("ERROR : ", e);
			$("#btnSubmit").prop("disabled", false);

		}
	});

}

var img = document.createElement('img');
img.onload = function(e) {
	ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
	var url = canvas.toDataURL(); // Read succeeds, canvas won't be dirty.
};
img.crossOrigin = '';
img.src = 'http://localhost:63636/api/v1/menu/imageDownload?fileName=1';

function download() {
	// Get form
	$.ajax({
		type : "GET",
		url : baseURI + "menu/imageDownload",
		cache : false,
		timeout : 600000,
		success : function(data) {
			console.log("SUCCESS : ", data);
		},
		error : function(e) {
			$("#result").text(e.responseText);
			console.log("ERROR : ", e);
			$("#btnSubmit").prop("disabled", false);
		}
	});
}

function getJSONData() {
	console.log("Inside Get JSON Data");
	jsonObject = {};
	jsonObject['firstName'] = 'Alex';
	jsonObject['middleName'] = 'J';
	jsonObject['lastName'] = 'John';
	jsonObject['userName'] = 'Alex123';
	jsonObject['password'] = '$2a$04$I9Q2sDc4QGGg5WNTLmsz0.fvGv3OjoZyj81PrSFyGOqMphqfS2qKu';
	jsonObject['roles'] = '';

	return jsonObject;
}


function createUser() {
	console.log("Inside Save u Before calling JSONData");

	var jsonObj = getJSONData();
	console.log("Received JSON Object ");

	console.log("JSON DATA for Save " + JSON.stringify(jsonObj));

	var url_base = baseURI;
	//accessToken = getToken();
	$.ajax({
		'url' : baseURI + 'user/save',
		'type' : 'POST',
		'contentType' : 'application/json',
		'crossDomain' : true,
		'data' : JSON.stringify(jsonObj),
		'dataType' : 'json',
		'success' : function(result) {
			console.log("USer Saved " + JSON.stringify(result));
			return result;
		},
		'error' : function(XMLHttpRequest, textStatus, errorThrown) {
			//Process error actions
			console.log('getMenu - Error: ' + errorThrown + " - " + textStatus);
			console.log(XMLHttpRequest.status + ' ' +
				XMLHttpRequest.statusText);
			return false;
		}
	});
}