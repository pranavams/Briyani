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
		'content-Type' : 'x-www-form-urlencoded',
		'crossDomain' : true,
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
	jsonObject = {};
	jsonObject['id'] = '';
	jsonObject['name'] = 'Tandoori';
	
	return jsonObject;
}

function saveMenu() {
	console.log("Inside Save Menu Before calling JSONData");

	var jsonObj = getJSONData();
	console.log("Received JSON Object ");
	
	console.log("JSON DATA for Save " + jsonObj);

	var url_base = baseURI;
	//accessToken = getToken();
	$.ajax({
		'url' : baseURI + 'menu/save',
		'type' : 'POST',
		'content-Type' : 'application/json',
		'crossDomain' : true,
		'data' : JSON.stringify(jsonObj),
		'dataType' : 'json',
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

