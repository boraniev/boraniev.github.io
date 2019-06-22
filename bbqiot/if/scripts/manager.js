$(document).ready(function(){ 	
	
	$(".getEmail").click(function(){ 
		
		self.getCoreId( $("#email").val() ).then(function(data){ self.statusCheck(getToken() )}).then(function(data){ 
			getTemp( $(".getTemp") , getToken() )	
		});
		
		
		
	});
	
	$(".getAllActive").click(function(){ 
		
		getActiveUrls();
		
	});
	
	$(".reload").click(function(){ 
		
		getTemp( $(".getTemp") , getToken() );
		
	});
	
	$(".setTemp").click(function(){ 
		
		setDestTemp( $('.setTempUpdate'), getToken() , $("#bbqTemp").val() , $("#meatTemp").val() );
		
		getTemp( $(".getTemp") , getToken() );
		
	});
	
	$('#chartUp').click(function(){ 
		var fromDate = $("#fromDate").val();
		  var fromHours = $("#fromHours").val();
			var fromMinutes = $("#fromMins").val(); 
		  var fromSeconds = $("#fromSecs").val();
		
		var toDate = $("#toDate").val(); 
		  var toHours = $("#toHours").val();
			var toMinutes = $("#toMins").val(); 
		  var toSeconds = $("#toSecs").val();
		
		var dateOne = fromDate + "T" + fromHours + ":" + fromMinutes ; 
		var dateTwo = toDate + "T" + toHours + ":" + toMinutes ; 

		console.log(dateOne + " " + dateTwo);
		
		graph(getToken() , dateOne, dateTwo );
		
	});
		
}) 


function getToken( ){ 
	return $("#coreid").val();
}

$( function() {
	$( "#fromDate" ).datepicker({ dateFormat: 'yy-mm-dd' });
	$( "#toDate" ).datepicker({ dateFormat: 'yy-mm-dd' });
	
} );

