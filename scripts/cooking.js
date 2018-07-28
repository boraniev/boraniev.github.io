
	var startingDate = formatDate(new Date());
	console.log(startingDate);
	setInterval(
		function(){ 
			start( startingDate );
		}
		, 30000);
	
	

function start( startingDate ){ 
	console.log("asdf");
	getTemp( $(".getTemp") , getToken() );
	graph(getToken(), startingDate , formatDate( new Date() )  ) 				
}


function formatDate (date){ 

  var year = "20"+
		date.getYear().toString().substr(
			date.getYear().toString().length - 2, 
			date.getYear().toString().length - 1
		)
	
	var month = date.getMonth(); 
	var day = date.getDate();
	
	
	if( date.getMonth() < 10 ){ 
		month = "0"+date.getMonth();
	}
	if( date.getDate() < 10 ){ 
		day = "0"+date.getDate();
	}
	
	var fullDate = year+"-"+month+"-"+day;
	
	var dateString = fullDate + "T" + date.getHours() + ":" + date.getMinutes() ; 
	
	console.log( dateString );
	
	return dateString

}