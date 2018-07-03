
$.gritter.add({
				class_name: 'gritter-success',
				title: 'Success!',
				text: '<p style="font-size: 14px;">Your contact has been submitted successfully!</p>',
			});	
			
			/// Table And Form Hide Show hide_add
			$(".form_hide").hide();
			$(".hide_add").hide();
			$(".hide_list").show();
			$("#addbranch_list").hide(); 
			$("#addbranch").click(function() {
				//alert();
				$("#addbranch_list").show(); //Back to list button
				$("#addbranch").hide(); //Add branch Button
				$(".form_hide").show(); //Form Div
				$(".table_hide").hide();
				$(".hide_add").show();// Add Customer Title
				$(".hide_list").hide();// List of Customer title
			});
			
			$(".form_hide").hide();
			$(".hide_add").hide();
			$(".hide_list").show();
			$("#addbranch_list").hide(); 
			$("#addbranch_list").click(function() {
				//alert();
				$("#addbranch_list").hide();  // Back To list Button
				$("#addbranch").show(); // Add Branch Button
				$(".form_hide").hide(); // Form Div
				$(".table_hide").show(); // Table Div
				$(".hide_add").hide();// Add Customer Title
				$(".hide_list").show();// List of Customer title
				$('#additem').show();
			});
			
			
				$('#not_approve').show();
				$('#approve').hide();
			$('#not_approve').click(function() {
				//alert();
				$('#not_approve').hide();
				$('#approve').show();
			});
		
		

/// Menu and Item Section Jquery

			
			
			$('#reset_button').click(function() {
				//alert();
				$('.add_item_button').prop('disabled', true);
				$('.add_menu_field').prop('readonly', false);
				$('.save_menu').prop('disabled', false);
				$('#add_item_div').hide();
			});
			
			$('#add_menu_div').show();
			$('#add_item_div').hide();
			$('.add_item_button').prop('disabled', true);
			$('.save_menu').click(function() {
				//alert();
				$('#add_item_div').hide();
				$('#add_menu_div').show();
				//$('.add_item').show();
				$('.add_item_button').prop('disabled', false);
				$('.save_menu').prop('disabled', true);
				$('.add_menu_field').prop('readonly', true);
			});

			$('#add_menu_div').show();
			$('#add_item_div').hide();
			$('.add_item_button').click(function() {
				//alert();
				$('#add_menu_div').show();
				$('#add_item_div').show();
				$('.add_menu_field').prop('readonly', true);
			});
			
			
			

			$(".form_hide").hide();
			$(".hide_add").hide();
			$(".hide_list").show();
			$("#addbranch_list").hide(); 
			
			$("#additem").click(function() {
				//alert();
				$("#addbranch_list").show(); //Back to list button
				$("#addmenu").show(); //Add branch Button
				$(".form_hide").show(); //Form Div
				$(".table_hide").hide();
				$(".hide_add").show();// Add Customer Title
				$(".hide_list").hide();// List of Customer title
				$('#add_menu_div').hide();
				$('#additem').hide();
				$('#add_item_div').show();
				
			});
			
			
			/// Back to List
			
			$(".form_hide").hide();
			$(".hide_add").hide();
			$(".hide_list").show();
			$("#addbranch_list").hide(); 
			$("#addbranch_list").click(function() {
				//alert();
				$("#addbranch_list").hide();  // Back To list Button
				$("#addmenu").show(); // Add Branch Button
				$(".form_hide").hide(); // Form Div
				$(".table_hide").show(); // Table Div
				$(".hide_add").hide();// Add Customer Title
				$(".hide_list").show();// List of Customer title
				$('#additem').show();
			});
			
			
			
			$(".form_hide").hide();
			$(".hide_add").hide();
			$(".hide_list").show();
			$("#addbranch_list").hide(); 
			$("#addmenu").click(function() {
				//alert();
				$("#addbranch_list").show(); //Back to list button
				$("#addmenu").hide(); //Add branch Button
				$(".form_hide").show(); //Form Div
				$(".table_hide").hide();
				$(".hide_add").show();// Add Customer Title
				$(".hide_list").hide();// List of Customer title
				$('#add_menu_div').show();
				$('#add_item_div').hide();
			});



$("select").change(function(){
        $(this).find("option:selected").each(function(){
            if($(this).attr("value")=="S"){
                $("#rider_form").hide();
                $("#branch_rider_form").hide();
				$("#staff_form").show();
        		
   
            }
            else if($(this).attr("value")=="BR"){
                $("#rider_form").hide();
                $("#branch_rider_form").show();
				$("#staff_form").hide();
            }
            else{
                $("#rider_form").show();
                $("#branch_rider_form").hide();
				$("#staff_form").hide();
				
            }
        });
    }).change();// JavaScript Document

