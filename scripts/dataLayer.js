
self.getCoreId = function(emailInput){ 

	return $.post(
		"https://efrhgzmgy8.execute-api.us-west-2.amazonaws.com/prod/getbbquser",
		JSON.stringify({
			email: emailInput
		}), 
		function(data){ 
			console.log(data);
			
			$("#coreid").val(data.records[0].coreid);
			$(".green").html("Core Id: " + data.records[0].coreid);
			
			//return $.Deferred().resolve(false);
		}	
	)
	
}

self.statusCheck = function(id){ 
  
	return $.post("https://efrhgzmgy8.execute-api.us-west-2.amazonaws.com/prod/isitactive", JSON.stringify( { 
	  coreid: id
	}), function(data){ 
		console.log( data );
		data = JSON.parse(data);
		$(".status").css("display", "none");
		if(data.active == "yes"){ 
			$(".active").css("display", "block");
		}
		else if(data.active == "no"){ 
			$(".notActive").css("display", "block");
		}
	});
	
}

var getActiveUrls = function(){ 
	
	$.post( "https://efrhgzmgy8.execute-api.us-west-2.amazonaws.com/prod/activedevices" , {} , function(data){ 
		
		console.log(JSON.parse(data));
		data = JSON.parse( data );
		
		var records = data.records;
		
		$("#allDevices").empty();
		$("#allDevices").append("<hr>");
		for( var x = 0; x < records.length ;x++ ){ 
			var coreId = JSON.parse(records[x]).coreid ; 
			var active = JSON.parse(records[x]).active ;
			
			//console.log( JSON.parse( records[x] ).coreid );
			
			$("#allDevices").append( " <div class='row'> <div class='col-md-2'></div> <div class='col-md-4'>Core Id :  "+ coreId +" </div> <div class='col-md-4'>Active Status " + active + " </div>  </div> <hr> " );
			
		}
		
	} );
	
}

var gData = [ ["datetime" , "BBQ Temperature" , "Meat Temperature"] ];
function graph(token, fromDate, toDate){ 
	
	gData = [ ["datetime" , "BBQ Temperature" , "Meat Temperature"] ];
	
	$.post(
		"https://efrhgzmgy8.execute-api.us-west-2.amazonaws.com/prod/listbbq/", 
		JSON.stringify({ 
			coreid: token, 
			fromdate: fromDate, 
			todate: toDate
		}),
		function(data){ 
			
			console.log( data );
			
			var records = data.records; 
			
			for( var x = 0; x < records.length; x++ ){ 
				try{
					var time = records[x].datetime;
					var bbqTemp = records[x].payload.reported.temperatureBBQ;
					var meatTemp = records[x].payload.reported.temperatureMeat;
					
					gData.push( [time , bbqTemp , meatTemp] );
										
					console.log("Time : " + time + "  bbq : " + bbqTemp );
				}catch(err) {}
			}
		
			google.charts.load('current', {'packages':['corechart']});
			google.charts.setOnLoadCallback(drawChart);	
			//drawChart(gData);
			
		});
}


function setDestTemp ( element , token , bbqTemp , meatTemp ){ 
	
	$.post(
		"https://efrhgzmgy8.execute-api.us-west-2.amazonaws.com/prod/bbqservices",
		JSON.stringify({ 
			action: "setdestemp", 
			coreid: token, 
			temperatureBBQ: bbqTemp, 
			temperatureMeat: meatTemp 
		}), 
		function(data){ 
			element.css("display", "block");
		}	
	);
	
	
}


function getTemp ( element , token){ 
	
	$.post( 
		"https://efrhgzmgy8.execute-api.us-west-2.amazonaws.com/prod/bbqservices",
		JSON.stringify({ 
			action: "gettemp",
			coreid: token
		}),
		function(data){ 
			element.html("Desired Temp : " + data.desiredTemepratureBBQ + " <br> currentTemperatureBBQ : " + data.currentTemperatureBBQ + " <br> desiredTemepratureMeat :" + data.desiredTemepratureMeat + " <br> currentTemperatureMeat : " + data.currentTemperatureMeat + " <br> currentfanSpeed : " + data.currentfanSpeed);
		}
	);	
	
}

	
	
	
	
	function drawChart() {
		  console.log( gData );
		
        var data = google.visualization.arrayToDataTable( gData );

        var options = {
          title: 'BBQ Temperature',
          curveType: 'function',
          legend: { position: 'bottom' }
        };

        var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));

        chart.draw(data, options);
			
		}
	
	