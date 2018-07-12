/**
 * 
 */
function getMenuList() {
	// The baseURI variable is created by the result.base_server_base_uri 
	// which is returned when getting a token and should be used to 
	// create the url_base.
	$.ajax({
		'url' : baseURI + 'item/listAll?access_token=' + accessToken,
		'type' : 'GET',
		'contentType' : 'x-www-form-urlencoded',
		'crossDomain' : true,
		'success' : function(result) {
			displayMenu(result);
			return result;
		},
		'error' : function(XMLHttpRequest, textStatus, errorThrown) {
			//Process error actions
			//console.log('getMenu - Error: ' + errorThrown);
			//console.log(XMLHttpRequest.status + ' '  + XMLHttpRequest.statusText);
			return false;
		}
	});
}

function displayMenu(data) {
	var rowIndex = 1;
    $('#contacts_list').DataTable( {
    	"lengthMenu": [[10, 25, 50, 100, -1], [10, 25, 50, 100, "All"]],
    	"data" : data['items'],
        "columns": [
        	{ "data" : function (row, x, set) { return rowIndex ++ ;} },
        	{ "data": 'id' },
        	{ "data": function (row, x, set) { return nvl(row.menuName) + ' ' + nvl(row.name); } },
            { "data": function (row, x, set) { return '<a href="edit_menu_item.html?id=' + row.id + '" class="btn btn-xs btn-info"><i class="fa fa-pencil"></i>Edit</a> <a href="menu_preview.html" class="btn btn-xs btn-danger"><i class="fa fa-remove"></i>Delete</a>' }}
        ],
		buttons: [
			'excelHtml5',
			'csvHtml5',
			'pdfHtml5'
		]	        
    } );
}

$(document).on("click", ".btn", function() {
	var myBookId = $(this).data('id');
	$(".modal-body #bookId").val(myBookId);
// As pointed out in comments, 
// it is superfluous to have to manually call the modal.
// $('#addBookDialog').modal('show');
});

function getJSONData() {
	console.log("Inside Get JSON Data");
	jsonObject = {};
	jsonObject['name'] = document.getElementById('menu_name').value;

	return jsonObject;
}

function saveMenu() {
	console.log("Inside Save Menu Before calling JSONData");

	var jsonObj = getJSONData();
	console.log("Received JSON Object ");

	console.log("JSON DATA for Save " + JSON.stringify(jsonObj));

	var url_base = baseURI;
	//accessToken = getToken();
	$.ajax({
		'url' : baseURI + 'menu/save',
		'type' : 'POST',
		'contentType' : 'application/json',
		'crossDomain' : true,
		'data' : JSON.stringify(jsonObj),
		'dataType' : 'json',
		'success' : function(result) {
			$.gritter.add({
				class_name : 'gritter-success',
				title : 'Success!',
				text : '<p style="font-size: 14px;">Menu Saved successfully!</p>',
			});
			return result;
		},
		'error' : function(XMLHttpRequest, textStatus, errorThrown) {
			//Process error actions
			//console.log('getMenu - Error: ' + errorThrown + " - " + textStatus);
			//console.log(XMLHttpRequest.status + ' ' + XMLHttpRequest.statusText);
			$.gritter.add({
				class_name : 'gritter-error',
				title : 'Success!',
				text : '<p style="font-size: 14px;">Menu Not Saved!</p>',
			});
			return false;
		}
	});
}

function getItemData() {
	jsonObject = {};
	jsonObject['menuName'] = document.getElementById('menu_name').value;
	jsonObject['name'] = document.getElementById('item_name').value;
	jsonObject['description'] = document.getElementById('item_descri').value;
	jsonObject['price'] = document.getElementById('item_price').value;

	return jsonObject;
}

function clearItem() {
	document.getElementById('item_name').value = '';
	document.getElementById('item_descri').value = '';
	document.getElementById('item_price').value = '';
}

function saveItem() {
	var jsonObj = getItemData();
	console.log("JSON ITEM Object " + JSON.stringify(jsonObj));
	var url_base = baseURI;
	//accessToken = getToken();
	$.ajax({
		'url' : baseURI + 'item/save',
		'type' : 'POST',
		'contentType' : 'application/json',
		'crossDomain' : true,
		'data' : JSON.stringify(jsonObj),
		'dataType' : 'json',
		'success' : function(result) {
			$.gritter.add({
				class_name : 'gritter-success',
				title : 'Success!',
				text : '<p style="font-size: 14px;">Item Saved successfully!</p>',
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
				text : '<p style="font-size: 14px;">Item Not Saved!</p>',
			});
			return false;
		}
	});

}

getToken(getMenuList);