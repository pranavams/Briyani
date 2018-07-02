	
	//get_offerdtls_List
	function get_offerdtls_List()
	{
		var get_express_item_id =document.getElementById( "item_id" ).value;		   
	   if(get_express_item_id)
	   {
		   $('#progress2').show();
		   $.ajax({
				   type: 'post', url: 'ajax_quickbill_option.php?for=receipt',
				   data: { ajax_express_item_id:get_express_item_id,
			   },
			   success: function (response) {
				   $('#progress2').hide();
				   $('#quickbill_offer_details').html(response);
				   $('#hidden_expressoffer_list1' ).remove();
				   $('#hidden_expressoffer_list2' ).remove();
				   $("#express_qty").focus(); 
				   if(response=="OK") {  return true;  } else { return false; }
			  }
		   });
		}
	}


	//TO SCAN / ENTER ITEM CODE	
	$(":input").keypress(function(event){
		if (event.which == '10' || event.which == '13') {
			get_offerdtls_List();
			event.preventDefault();
		}
	});
	$("#item_id").click(function () {
	   $(this).select();
	});

	
//		$('.adding_formitem #item_id').on('loaded.bs.select', function (e) {
//		  $('.bootstrap-select:last').addClass('open');
//		  $('.bs-searchbox input[type=text]').focus();
//		  //alert('working');
//		  //bs-searchbox
//		});