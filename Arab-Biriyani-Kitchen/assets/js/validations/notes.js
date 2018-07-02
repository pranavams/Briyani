// JavaScript Document

$(document).ready(function() {
    // Generate a simple captcha
        $('#mainform').bootstrapValidator({
	//        live: 'disabled',
        message: 'This value is not valid',
        feedbackIcons: {
              valid: 'glyphicon glyphicon-ok',
        
            validating: 'glyphicon glyphicon-refresh'
        },
		
        fields: {
			nte_addnotes_ntetitle: {
                validators: {
                    notEmpty: {
                        message: 'Title cannot be blank'
                    },
                }
            },
			
			nte_addnotes_reminder: {
                validators: {
                    notEmpty: {
                        message: 'Reminder Date cannot be blank'
                    },
                }
            },
			
			nte_addnotes_addtag: {
                validators: {
                    notEmpty: {
                        message: 'Tag cannot be blank'
                    },
                }
            },
			
			
	nte_addnotes_ntemsg: {
                validators: {
                    notEmpty: {
                        message: 'Message cannot be blank'
                    },
                }
            },
				category_id: {
                validators: {
                    notEmpty: {
                        message: 'Choose the catrgory, it cannot be blank'
                    },
                }
            },
nte_addnew_id: {
                validators: {
                    notEmpty: {
                        message: 'Select the customer Name'
                    },
                }
            },
			},
	});
	
		$('#create').click(function() {
			$('#mainform').bootstrapValidator();
	  });
		
						   });
	  

	
// JavaScript Document