/**
 * 
 */

console.log("Branch List " + getBranchList());

function getBranchList() {
	// The baseURI variable is created by the result.base_server_base_uri 
	// which is returned when getting a token and should be used to 
	// create the url_base.
	var url_base = baseURI;
	//accessToken = getToken();
	$.ajax({
		'url' : baseURI + 'branch/listAll',
		'type' : 'GET',
		'contentType' : 'x-www-form-urlencoded',
		'crossDomain' : true,
		'success' : function(result) {
			var returnResult = JSON.stringify(result);
			displayBranch(result);
			return result;
		},
		'error' : function(XMLHttpRequest, textStatus, errorThrown) {
			//Process error actions
			console.log('getBranch - Error: ' + errorThrown);
			console.log(XMLHttpRequest.status + ' ' +
				XMLHttpRequest.statusText);
			return false;
		}
	});
}

function displayBranch(branchResult) {
	console.log('Branch Received ' + branchResult);
	var branch = branchResult['branch'];
	var table = document.getElementById("contacts_list");
	for (var i = 0; i < branch.length; i++) {

		tr = table.insertRow(-1);

		var tabCell = tr.insertCell(-1);
		tabCell.innerHTML = (i + 1);

		tabCell = tr.insertCell(-1);
		tabCell.innerHTML = branch[i]['id'];

		tabCell = tr.insertCell(-1);
		tabCell.innerHTML = branch[i]['name'];

		tabCell = tr.insertCell(-1);
		tabCell.innerHTML = branch[i]['telephone'];

		tabCell = tr.insertCell(-1);
		tabCell.innerHTML = branch[i]['address']['doorNumber'] + ', ' +
		branch[i]['address']['street'] + ', ' +
		branch[i]['address']['area'] + ', ' +
		branch[i]['address']['city'] + ', ' +
		branch[i]['address']['state'] + ', ' +
		branch[i]['address']['country'] + ', ' +
		branch[i]['address']['zipcode'];

		tabCell = tr.insertCell(-1);
		tabCell.innerHTML = branch[i]['contactPersonSalutation'] + ' ' + branch[i]['contactPersonFirstName'] + ' ' + branch[i]['contactPersonMiddleName'] + ' ' + branch[i]['contactPersonLastName'];

		tabCell = tr.insertCell(-1);
		tabCell.innerHTML = branch[i]['contactPersonNumber'];
		
		tabCell = tr.insertCell(-1);
		tabCell.innerHTML = '<a href="#" class="btn btn-xs btn-default"><i class="fa fa-pencil"></i></a> <a href="#" class="btn btn-xs btn-danger" data-toggle="modal" data-target="#deleteDATA"><i class="fa fa-remove"></i></a> <a	href="branch_preview.html" class="btn btn-xs btn-info"><i		class="fa fa-eye"></i></a>';
	}
}

function getJSONData() {
	console.log("Inside Get JSON Data");
	var jsonObject = {"id": "", "name":"Nungambakkam Branch","email":"ajith.roy@gmail.com","latitude":"234234","longitude":"234234","notes":"Branch in omr","address":{"doorNumber":"5","street":"x Street","area":"dunton","city":"dunton","state":"GB","country":"England","zipcode":"444555"},"contactPersonFirstName":"Ajith","contactPersonLastName":"Roy","contactPersonMiddleName":"M","contactPersonSalutation":"Mr.","mobileNumber":"123234234","telephone":"323234234","contactPersonNumber":"123455"};
	
	return jsonObject;
}

function saveBranch() {
	console.log("Inside Save Branch");
	
	var jsonObj = getJSONData();
	
	var url_base = baseURI;
	//accessToken = getToken();
	$.ajax({
		'url' : baseURI + 'branch/save',
		'type' : 'POST',
		'crossDomain' : true,
		'data' : JSON.stringify(jsonObj),
		'dataType' : 'json',
		'success' : function(result) {
			console.log('Save Branch - Success!\r\n' + result);
			//Process success actions
			var returnResult = JSON.stringify(result);
			console.log('Save Branch - Success!\r\n' + returnResult);
			document.getElementById('callResults').innerHTML = returnResult;
			return result;
		},
		'error' : function(XMLHttpRequest, textStatus, errorThrown) {
			//Process error actions
			console.log('getBranch - Error: ' + errorThrown + " - " + textStatus);
			console.log(XMLHttpRequest.status + ' ' +
				XMLHttpRequest.statusText);
			return false;
		}
	});
}
