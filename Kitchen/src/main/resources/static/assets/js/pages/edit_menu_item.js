/**
 * 
 */
function getMenuItemList() {
	// The baseURI variable is created by the result.base_server_base_uri 
	// which is returned when getting a token and should be used to 
	// create the url_base.
	
	$.ajax({
		'url' : baseURI + 'item/get/' + $.urlParam('id') + '?access_token=' + accessToken,
		'type' : 'GET',
		'contentType' : 'x-www-form-urlencoded',
		'crossDomain' : true,
		'success' : function(result) {
			displayMenuItem(result);
			return result;
		},
		'error' : function(XMLHttpRequest, textStatus, errorThrown) {
			//Process error actions
			console.log('getCustomer - Error: ' + errorThrown);
			console.log(XMLHttpRequest.status + ' ' +
				XMLHttpRequest.statusText);
			return false;
		}
	});
}

function displayMenuItem(data){
	console.log("Data menu " + JSON.stringify(data));
		
	document.getElementById('menu_name').value = nvl(data.menuName);
	document.getElementById('item_name').value = nvl(data.name);
	document.getElementById('item_descri').value = nvl(data.description);
	document.getElementById('item_price').value	 = nvl(data.price);
}




function edit() {
	window.location.href = kitchenBaseURI + 'edit_customer.html?id=' + $.urlParam('id');
}

function deleteData() {
	console.log("Delete To Implement");
}


getToken(getMenuItemList);
