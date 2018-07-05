/**
 * 
 */

getMenuList();

function getMenuList() {
	// The baseURI variable is created by the result.base_server_base_uri 
	// which is returned when getting a token and should be used to 
	// create the url_base.
	console.log("Inside Menu List");
	var url_base = baseURI;
	//accessToken = getToken();
	$.ajax({
		'url' : baseURI + 'item/listAll',
		'type' : 'GET',
		'contentType' : 'x-www-form-urlencoded',
		'crossDomain' : true,
		'success' : function(result) {
			displayMenu(result);
			return result;
		},
		'error' : function(XMLHttpRequest, textStatus, errorThrown) {
			//Process error actions
			console.log('getMenu - Error: ' + errorThrown);
			console.log(XMLHttpRequest.status + ' ' +
				XMLHttpRequest.statusText);
			return false;
		}
	});
}

function displayMenu(MenuResult) {
	console.log('Menu Received ' + MenuResult);
	var Menu = MenuResult['items'];
	var table = document.getElementById("contacts_list");
	for (var i = 0; i < Menu.length; i++) {

		tr = table.insertRow(-1);

		var tabCell = tr.insertCell(-1);
		tabCell.innerHTML = (i + 1);

		tabCell = tr.insertCell(-1);
		tabCell.innerHTML = Menu[i]['menuId'];

		tabCell = tr.insertCell(-1);
		tabCell.innerHTML = Menu[i]['id'];

		tabCell = tr.insertCell(-1);
		tabCell.innerHTML = Menu[i]['menuName'];

		tabCell = tr.insertCell(-1);
		tabCell.innerHTML = Menu[i]['name'];

		tabCell = tr.insertCell(-1);
		tabCell.innerHTML = '$' + Menu[i]['price'];

		tabCell = tr.insertCell(-1);
		tabCell.innerHTML = '<a href="#" class="btn btn-xs btn-default"><i class="fa fa-pencil"></i></a> <a href="#" class="btn btn-xs btn-danger" data-toggle="modal" data-target="#deleteDATA"><i class="fa fa-remove"></i></a> <a href="#" class="btn btn-xs btn-info" data-toggle="modal" data-target="#exampleModalCenter"><i class="fa fa-eye"></i></a>';
	}
}

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
				class_name: 'gritter-success',
				title: 'Success!',
				text: '<p style="font-size: 14px;">Menu Saved successfully!</p>',
			});	
			return result;
		},
		'error' : function(XMLHttpRequest, textStatus, errorThrown) {
			//Process error actions
			console.log('getMenu - Error: ' + errorThrown + " - " + textStatus);
			console.log(XMLHttpRequest.status + ' ' +
				XMLHttpRequest.statusText);
			$.gritter.add({
				class_name: 'gritter-error',
				title: 'Success!',
				text: '<p style="font-size: 14px;">Menu Not Saved!</p>',
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

function clearItem(){
	document.getElementById('item_name').value = '';
	document.getElementById('item_descri').value = '';
	document.getElementById('item_price').value = '';
}

function saveItem(){
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
				class_name: 'gritter-success',
				title: 'Success!',
				text: '<p style="font-size: 14px;">Item Saved successfully!</p>',
			});
			clearItem();
			return result;
		},
		'error' : function(XMLHttpRequest, textStatus, errorThrown) {
			//Process error actions
			console.log('getMenu - Error: ' + errorThrown + " - " + textStatus);
			console.log(XMLHttpRequest.status + ' ' +
				XMLHttpRequest.statusText);
			$.gritter.add({
				class_name: 'gritter-error',
				title: 'Success!',
				text: '<p style="font-size: 14px;">Item Not Saved!</p>',
			});	
			return false;
		}
	});
	
}