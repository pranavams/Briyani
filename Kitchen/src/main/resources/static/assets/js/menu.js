/**
 * 
 */

console.log("Menu List " + getMenuList());

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
		'content-Type' : 'x-www-form-urlencoded',
		'crossDomain' : true,
		'dataType' : 'jsonp',
		'success' : function(result) {
			console.log('getMenu - Success!\r\n' + result);
			//Process success actions
			var returnResult = JSON.stringify(result);
			console.log('getMenu - Success!\r\n' + returnResult);
			//document.getElementById('callResults').innerHTML = returnResult;
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
	var jsonObject = {
		"id" : "",
		"name" : "Nungambakkam Menu",
		"email" : "ajith.roy@gmail.com",
		"latitude" : "234234",
		"longitude" : "234234",
		"notes" : "Menu in omr",
		"address" : {
			"doorNumber" : "5",
			"street" : "x Street",
			"area" : "dunton",
			"city" : "dunton",
			"state" : "GB",
			"country" : "England",
			"zipcode" : "444555"
		},
		"contactPersonFirstName" : "Ajith",
		"contactPersonLastName" : "Roy",
		"contactPersonMiddleName" : "M",
		"contactPersonSalutation" : "Mr.",
		"mobileNumber" : "123234234",
		"telephone" : "323234234",
		"contactPersonNumber" : "123455"
	};

	return jsonObject;
}

function saveMenu() {
	console.log("Inside Save Menu");

	var jsonObj = getJSONData();

	var url_base = baseURI;
	//accessToken = getToken();
	$.ajax({
		'url' : baseURI + 'Menu/save',
		'type' : 'POST',
		'content-Type' : 'application/json; charset=utf-8',
		'crossDomain' : true,
		'data' : JSON.stringify(jsonObj),
		'dataType' : 'jsonp',
		'success' : function(result) {
			console.log('Save Menu - Success!\r\n' + result);
			//Process success actions
			var returnResult = JSON.stringify(result);
			console.log('Save Menu - Success!\r\n' + returnResult);
			document.getElementById('callResults').innerHTML = returnResult;
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

