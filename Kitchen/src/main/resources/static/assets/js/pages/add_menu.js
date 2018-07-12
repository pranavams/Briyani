/**
 * 
 */
function getJSONData() {
	jsonObject = {
		'name' : document.getElementById('item_name').value,
		'menuName' : document.getElementById('menu_name').value,
		'description' : document.getElementById('item_descri').value,
		'price' : document.getElementById('item_price').value
	};

	console.log("Inside Get JSON Data " + jsonObject);
	return jsonObject;
}

function clearItem() {
	document.getElementById('item_name').value = '';
	document.getElementById('menu_name').value = '';
	document.getElementById('item_descri').value = '';
	document.getElementById('item_price').value = '';
}

function saveAndCloseMenu() {
	saveMenu(true);
}

function saveMenu(toClose) {
	var jsonObj = getJSONData();
	$.ajax({
		"url" : baseURI + 'item/save?access_token=' + accessToken,
		'type' : 'POST',
		'contentType' : 'application/json',
		'crossDomain' : true,
		'data' : JSON.stringify(jsonObj),
		'dataType' : 'json',
		'success' : function(result) {
			console.log(JSON.stringify(result));
			imageUpload(result.id, 'image/imageUpload?access_token=' + accessToken, "Menu Save Successfully", "Menu Added Image upload Failed, use edit menu to save the image");
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
				text : '<p style="font-size: 14px;">Menu Not Saved!</p>',
			});
			return false;
		}
	});
}