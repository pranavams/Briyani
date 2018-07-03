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
			nte_addnew_firstname: {
                validators: {
                    notEmpty: {
                        message: 'Enter the customer Name'
                    },
                }
            },
			
			nte_addnew_phone: {
                validators: {
                    notEmpty: {
                        message: 'Enter the Mobile Number'
                    },
					digits: {
						message: 'Mobile Number Miss Match'	
					},
                }
            },
			
			
			nte_addnew_fax: {
                validators: {
                    notEmpty: {
                        message: 'Enter the Mobile Number'
                    },
					regexp:{
						regexp:/^[0-9+\s]*$/,
						message:'Fax Number Missmatch'
					},
                }
            },
			
			
			nte_addnew_homephone: {
                validators: {
                    digits: {
						message: 'Mobile Number Miss Match'	
					},
                }
            },
			
			nte_addnew_workphone: {
                validators: {
                    digits: {
						message: 'Mobile Number Miss Match'	
					},
                }
            }
			
			
			
           // phone: {
            //    selector: '.onefieldreq',
//                validators: {
//                    callback: {
//                        message: 'You must enter at least one phone number',
//                        callback: function(value, validator, $field) {
//                            var isEmpty = true,
//                                $fields = validator.getFieldElements('phone');
//                            for (var i = 0; i < $fields.length; i++) {
//                                if ($fields.eq(i).val() !== '') {
//                                    isEmpty = false;
//                                    break;
//                                }
//                            }
//
//                            if (!isEmpty) {
//                                validator.updateStatus('phone', validator.STATUS_VALID, 'callback');
//                                return true;
//                            }
//
//                            return false;
//                        }
//                    },
//                  
//                }
//            },
			
			   //phone_mail: {
//                selector: '.onefieldreq_add',
//                validators: {
//                    callback: {
//                        message: 'You must enter at least one email address',
//                        callback: function(value, validator, $field) {
//                            var isEmpty = true,
//                                // Get the list of fields
//                                $fields = validator.getFieldElements('phone_mail');
//                            for (var i = 0; i < $fields.length; i++) {
//                                if ($fields.eq(i).val() !== '') {
//                                    isEmpty = false;
//                                    break;
//                                }
//                            }
//
//                            if (!isEmpty) {
//                                // Update the status of callback validator for all fields
//                                validator.updateStatus('phone_mail', validator.STATUS_VALID, 'callback');
//                                return true;
//                            }
//
//                            return false;
//                        }
//                    },
//                   
//                }
//            }
			
			},
	});
	
		$('#create').click(function() {
			$('#mainform').bootstrapValidator();
	  });
		
						   });
	  

	
