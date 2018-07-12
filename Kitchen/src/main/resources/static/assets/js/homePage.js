// JavaScript Document

$(document).ready(function() {
						   
		 $('#mainform').bootstrapValidator({
	//        live: 'disabled',
        message: 'This value is not valid',
        feedbackIcons: {
            //valid: 'glyphicon glyphicon-ok',
            //invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
					
	quicknotes_title: {
						validators: {
							notEmpty: {
								message: 'Description / Service cannot be blank'
								}
								
						}
					},
				}
	})				   
						   
						   
						   });