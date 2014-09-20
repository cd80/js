function addEventListeners(){
	/*
		Add event listeners to all needed objects
	*/	
}

function getChart(chart){
  var target = $("#chart").get(0).getContext("2d");
  $.ajax("/",{
      cache: false,
      data: {p: "chart",
             target: chart},
      method: "GET",
      error: function(xhr, status, error){
        $("#myChart").html(status + " " + error);
      },
      success: function(data, status, xhr){
        if(data == "DBCONFAILED"){
          console.log("error");
        }
        data = eval(data);
        new Chart(target).Line(data);
      }
    });
}