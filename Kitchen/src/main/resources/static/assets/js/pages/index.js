/**
 * 
 */

function getJSONData() {
	jsonObject = {
		'userName' : document.getElementById('frmUserName').value,
		'password' : btoa(document.getElementById('frmPassword').value)
	};

	return jsonObject;
}

function navigateTo(user){
	window.sessionStorage.setItem('userName', user.userName);
	window.sessionStorage.setItem('password', btoa(document.getElementById('frmPassword').value));
	window.sessionStorage.setItem('roles', user.roles);
	window.sessionStorage.setItem('name', nvl(user.firstName) + ' ' + nvl(user.middleName) + ' ' + nvl(user.lastName));
	window.location.href='homePage.html';
}

function authenticate() {
	var jsonObj = getJSONData();
	$.ajax({
		"url" : baseURI + 'user/authenticate/',
		'type' : 'POST',
		'contentType' : 'application/json',
		'crossDomain' : true,
		'data' : JSON.stringify(jsonObj),
		'dataType' : 'json',
		'success' : function(result) {
			$.gritter.add({
				class_name : 'gritter-success',
				title : 'Login Success!',
				text : '<p style="font-size: 14px;">Welcome ' + nvl(result.firstName) + ' ' + nvl(result.middleName) + ' ' + nvl(result.lastName) + '.</p>',
			});
			navigateTo(result);
		},
		'error' : function(XMLHttpRequest, textStatus, errorThrown) {
			//Process error actions
			//console.log('getMenu - Error: ' + errorThrown + " - " + textStatus);
			//console.log(XMLHttpRequest.status + ' ' + XMLHttpRequest.statusText);
			$.gritter.add({
				class_name : 'gritter-error',
				title : 'Login Failure!',
				text : '<p style="font-size: 14px;">Invalid User details.</p>',
			});
			return false;
		}
	});
}