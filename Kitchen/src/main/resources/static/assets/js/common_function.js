
/// Table And Form Hide Show hide_add
$(".form_hide").hide();
$(".hide_add").hide();
$(".hide_list").show();
$("#addbranch_list").hide();
$("#addbranch").click(function() {
	//alert();
	$("#addbranch_list").show(); //Back to list button
	$("#addbranch").hide(); //Add branch Button
	$(".form_hide").show(); //Form Div
	$(".table_hide").hide();
	$(".hide_add").show(); // Add Customer Title
	$(".hide_list").hide(); // List of Customer title
});

$(".form_hide").hide();
$(".hide_add").hide();
$(".hide_list").show();
$("#addbranch_list").hide();
$("#addbranch_list").click(function() {
	//alert();
	$("#addbranch_list").hide(); // Back To list Button
	$("#addbranch").show(); // Add Branch Button
	$(".form_hide").hide(); // Form Div
	$(".table_hide").show(); // Table Div
	$(".hide_add").hide(); // Add Customer Title
	$(".hide_list").show(); // List of Customer title
	$('#additem').show();
});


$('#not_approve').show();
$('#approve').hide();
$('#not_approve').click(function() {
	//alert();
	$('#not_approve').hide();
	$('#approve').show();
});



/// Menu and Item Section Jquery



$('#reset_button').click(function() {
	//alert();
	$('.add_item_button').prop('disabled', true);
	$('.add_menu_field').prop('readonly', false);
	$('.save_menu').prop('disabled', false);
	$('#add_item_div').hide();
});

$('#add_menu_div').show();
$('#add_item_div').hide();
$('.add_item_button').prop('disabled', true);
$('.save_menu').click(function() {
	//alert();
	$('#add_item_div').hide();
	$('#add_menu_div').show();
	//$('.add_item').show();
	$('.add_item_button').prop('disabled', false);
	$('.save_menu').prop('disabled', true);
	$('.add_menu_field').prop('readonly', true);
});

$('#add_menu_div').show();
$('#add_item_div').hide();
$('.add_item_button').click(function() {
	//alert();
	$('#add_menu_div').show();
	$('#add_item_div').show();
	$('.add_menu_field').prop('readonly', true);
});




$(".form_hide").hide();
$(".hide_add").hide();
$(".hide_list").show();
$("#addbranch_list").hide();

$("#additem").click(function() {
	//alert();
	$("#addbranch_list").show(); //Back to list button
	$("#addmenu").show(); //Add branch Button
	$(".form_hide").show(); //Form Div
	$(".table_hide").hide();
	$(".hide_add").show(); // Add Customer Title
	$(".hide_list").hide(); // List of Customer title
	$('#add_menu_div').hide();
	$('#additem').hide();
	$('#add_item_div').show();

});


/// Back to List

$(".form_hide").hide();
$(".hide_add").hide();
$(".hide_list").show();
$("#addbranch_list").hide();
$("#addbranch_list").click(function() {
	//alert();
	$("#addbranch_list").hide(); // Back To list Button
	$("#addmenu").show(); // Add Branch Button
	$(".form_hide").hide(); // Form Div
	$(".table_hide").show(); // Table Div
	$(".hide_add").hide(); // Add Customer Title
	$(".hide_list").show(); // List of Customer title
	$('#additem').show();
});



$(".form_hide").hide();
$(".hide_add").hide();
$(".hide_list").show();
$("#addbranch_list").hide();
$("#addmenu").click(function() {
	//alert();
	$("#addbranch_list").show(); //Back to list button
	$("#addmenu").hide(); //Add branch Button
	$(".form_hide").show(); //Form Div
	$(".table_hide").hide();
	$(".hide_add").show(); // Add Customer Title
	$(".hide_list").hide(); // List of Customer title
	$('#add_menu_div').show();
	$('#add_item_div').hide();
});



$("select").change(function() {
	$(this).find("option:selected").each(function() {
		if ($(this).attr("value") == "S") {
			$("#rider_form").hide();
			$("#branch_rider_form").hide();
			$("#staff_form").show();


		} else if ($(this).attr("value") == "BR") {
			$("#rider_form").hide();
			$("#branch_rider_form").show();
			$("#staff_form").hide();
		} else {
			$("#rider_form").show();
			$("#branch_rider_form").hide();
			$("#staff_form").hide();

		}
	});
}).change(); // JavaScript Document


function formatDateDefault(dateString) {
	return formatDate(dateString, "DDD MMM DD, YYYY");
}

function formatDate(dateString, format) {
	dateObj = stringToDate(dateString.substring(0, 10), 'YYYY-MM-DD', '-');
	return dateToString(dateObj, format);
}

function stringToDate(_date, _format, _delimiter) {
	var formatLowerCase = _format.toLowerCase();
	var formatItems = formatLowerCase.split(_delimiter);
	var dateItems = _date.split(_delimiter);
	var monthIndex = formatItems.indexOf("mm");
	var dayIndex = formatItems.indexOf("dd");
	var yearIndex = formatItems.indexOf("yyyy");
	var month = parseInt(dateItems[monthIndex]);
	month -= 1;
	var formattedDate = new Date(dateItems[yearIndex], month, dateItems[dayIndex]);
	return formattedDate;
}

function dateToString(dateobj, format) {
	var year = dateobj.getFullYear();
	var month = ("0" + (dateobj.getMonth() + 1)).slice(-2);
	var date = ("0" + dateobj.getDate()).slice(-2);
	var hours = ("0" + dateobj.getHours()).slice(-2);
	var minutes = ("0" + dateobj.getMinutes()).slice(-2);
	var seconds = ("0" + dateobj.getSeconds()).slice(-2);
	var day = dateobj.getDay();
	var months = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
	var dates = [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ];
	var converted_date = "";

	switch (format) {
	case "YYYY-MM-DD":
		converted_date = year + "-" + month + "-" + date;
		break;
	case "YYYY-MMM-DD DDD":
		converted_date = year + "-" + months[parseInt(month) - 1] + "-" + date + " " + dates[parseInt(day)];
		break;
	case "DDD MMM DD, YYYY":
		converted_date = dates[parseInt(day)] + " " + months[parseInt(month) - 1] + " " + date + ", " + year;
		break;
	case "DD/MM/YYYY":
		converted_date = date + "/" + month + "/" + year;
		break;
	case "MM/DD/YYYY":
		converted_date = month + "/" + date + "/" + year;
		break;
	case "YYYY/MM/DD":
		converted_date = year + "/" + month + "/" + date;
		break;
	}

	return converted_date;
}

$.urlParam = function(name) {
	var results = new RegExp('[\?&]' + name + '=([^&#]*)')
		.exec(window.location.search);

	return (results !== null) ? results[1] || 0 : false;
}

function imageUpload(id, url, successMessage, failureMessage) {
	// Get form
	document.getElementById('entityId').value = id;
	var data = new FormData(document.getElementById('mainform'));

	$.ajax({
		type : "POST",
		enctype : 'multipart/form-data',
		url : baseURI + url,
		data : data,
		processData : false,
		contentType : false,
		cache : false,
		timeout : 600000,
		success : function(data) {
			$.gritter.add({
				class_name : 'gritter-success',
				title : 'Success!',
				text : '<p style="font-size: 14px;">' + successMessage + '!</p>',
			});
		},
		error : function(e) {
			console.log('Image Upload - Error: ' + e);
			$.gritter.add({
				class_name : 'gritter-error',
				title : 'Success!',
				text : '<p style="font-size: 14px;">' + failureMessage + '</p>',
			});
		}
	});
}

function getAddress(address){
	if(address == null || address == 'undefined')
		return '';
	else 
		return	address['doorNumber'] + ' ' +
			address['street'] + ' ' +
			address['area'] + ' ' +
			address['city'] + ' ' +
			address['state'] + ' ' +
			address['country'] + ' ' +
			address['zipcode'];
}

function dateToFormattedStringWithFormat(dateString, format) {
	if(dateString == null || dateString == 'undefined')
		return '';

	return formatDate(dateString, format);
}

function dateToFormattedString(dateString) {
	if(dateString == null || dateString == 'undefined')
		return '';
	return formatDate(dateString, "DDD MMM DD, YYYY");
}

function nvl(val){
	if(val == null || val == 'undefined' || val === "null")
		return '';
	return val;

}