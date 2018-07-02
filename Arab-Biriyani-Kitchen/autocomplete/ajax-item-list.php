<?php
include 'include/connection.php';
include 'include/globalconfig.php';
include 'include/functions.php';
reguser_protect();

//$counter='0';
//echo "<pre>";
//check fabric request table
//echo "[";
	$list_item_code[];
	$listed_taxlist_query = mysql_query("SELECT * FROM `app_item` WHERE `au_id`='$customer_id' and `item_status` = '1'") or die(mysql_error());
	$checknew_taxlist = mysql_num_rows($listed_taxlist_query);
	while($fetched_selected_taxlist = mysql_fetch_array($listed_taxlist_query)) {
		$counter++;
		$list_item_id = $fetched_selected_taxlist['item_id'];
		//$list_item_name = $fetched_selected_taxlist['item_name'];
		$list_item_code[] = $fetched_selected_taxlist['item_code'];
		$list_item_openingstock = $fetched_selected_taxlist['item_openingstock'];
		$list_item_remaining = $fetched_selected_taxlist['item_remaining'];
			
			//getting Stock and in hand stock
			$total_stock_report = $list_item_remaining.' / '.$list_item_openingstock;
		
	   /*
	   echo "{";
	   echo '"item_id": "'.$list_item_id.'",';
	   echo '"itemcode": "'.$list_item_code.'",';
	   echo '"itemstockinhand": "'.$total_stock_report.'"';
	
		if ($counter > 0 && $counter != $checknew_taxlist) {
		   echo " },";
		} else {
		   echo " }";
		}
		*/


	}
	
	json_encode($list_item_code);
	
//echo "]";

?>