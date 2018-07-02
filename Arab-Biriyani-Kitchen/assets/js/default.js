$(document).ready(function() {
		
		$('#data_1').datepicker({
		autoclose: true,
		format: "dd/mm/yyyy",
		todayHighlight:true,
	});
		
		
	
//PAGE REFRESH
		$('#PageRefresh').click(function() {
			location.reload();
		});


		document.getElementById("uploadBtn").onchange = function () {
    	document.getElementById("uploadFile").value = this.value.substring(12);
		};
	

      $(".add-more").click(function(){ 
          var html = $(".copy").html();
          $(".after-add-more").after(html);
      });


      $("body").on("click",".remove2",function(){ 
	  	//alert("dsfdsf");
          $(this).parents(".form-group").remove();
      });

    });
