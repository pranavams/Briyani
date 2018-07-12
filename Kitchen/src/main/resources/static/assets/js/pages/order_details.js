
/**
 * 
 */
function getOrderList() {
	// The baseURI variable is created by the result.base_server_base_uri 
	// which is returned when getting a token and should be used to 
	// create the url_base.
	$.ajax({
		'url' : baseURI + 'order/get/' +$.urlParam('id') + '?access_token=' + accessToken,
		'type' : 'GET',
		'contentType' : 'x-www-form-urlencoded',
		'crossDomain' : true,
		'success' : function(result) {
			displayOrder(result);
			return result;
		},
		'error' : function(XMLHttpRequest, textStatus, errorThrown) {
			//Process error actions
			//console.log('getCustomer - Error: ' + errorThrown);
			//console.log(XMLHttpRequest.status + ' ' + XMLHttpRequest.statusText);
			return false;
		}
		
	});
}

function displayOrder(data){
	data = data.order[0];
	branch = data.branch;

	address = data.address;
	document.getElementById('branchName').innerHTML = branch.name;
	document.getElementById('branchCode').innerHTML = branch.id;
	document.getElementById('orderID').innerHTML = data.orderId;
	document.getElementById('orderDate').innerHTML = dateToFormattedString(data.dateAndTime);
	document.getElementById('address').innerHTML = getAddress(branch.address);
	document.getElementById('taxAmount').innerHTML = data.taxAmount;
	document.getElementById('orderAmount').innerHTML = data.totalAmount;
	
	var dd = document.getElementById('orderStatusDropDown');
	for (var i = 0; i < dd.options.length; i++) {
	    if (dd.options[i].text.toLowerCase() === data.orderStatus.toLowerCase()) {
	        dd.selectedIndex = i;
	        break;
	    }
	}
	
	var rowIndex = 1;
    $('#orderDetailsTable').DataTable( {
    	"lengthMenu": [[10, 25, 50, 100, -1], [10, 25, 50, 100, "All"]],
    	"data" : data['orderDetails'],
        "columns": [
        	{ "data": function (row, x, set) { return rowIndex ++ ;} },
        	{ "data": function (row, x, set) { return row.item.menuName + ' ' + row.item.name } },
        	{ "data": function (row, x, set) { return row.quantity } },
        	{ "data": function (row, x, set) { return row.unitPrice * row.quantity } }
        ],
		buttons: [
			'excelHtml5',
			'csvHtml5',
			'pdfHtml5'
		]	        
    } );

	
}

function edit() {
	window.location.href = kitchenBaseURI + 'edit_branch.html?id=' + $.urlParam('id');
}

function deleteData() {
	console.log("Delete To Implement");
}

function updateOrderStatus() {
	console.log("Inside Update Order");
	var orderStatusField = document.getElementById('orderStatusDropDown');
	var orderStatus =  orderStatusField.options[orderStatusField.selectedIndex].text;


	var url_base = baseURI;
	//accessToken = getToken();
	$.ajax({
		'url' : baseURI + 'order/updateOrderStatus/' + $.urlParam('id') + '/' + orderStatus,
		'type' : 'GET',
		'contentType' : 'application/json',
		'crossDomain' : true,
		'success' : function(result) {
			$.gritter.add({
				class_name : 'gritter-success',
				title : 'Success!',
				text : '<p style="font-size: 14px;">Order Updated successfully!</p>',
			});
			return result;
		},
		'error' : function(XMLHttpRequest, textStatus, errorThrown) {
			//Process error actions
			//console.log('Error: ' + errorThrown + " - " + textStatus);
			//console.log(XMLHttpRequest.status + ' ' + XMLHttpRequest.statusText);
			$.gritter.add({
				class_name : 'gritter-error',
				title : 'Success!',
				text : '<p style="font-size: 14px;">Order Not Updated!</p>',
			});
			return false;
		}
	});
}


getToken(getOrderList);
