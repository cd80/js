var chartloaded = 0;
var chartloading = 0;

function getChart(chart){
  /*
    imported: main, statistics 
    chart : target name
  */
  var target = $("#chart").get(0).getContext("2d");
  $.ajax("/",{
      cache: false,
      data: {m: "chart",
             target: chart},
      method: "GET",
      error: function(xhr, status, error){
        $("#myChart").html(status + " " + error);
      },
      success: function(data, status, xhr){
        if(data == "DBCONFAILED"){
          console.log("error");
        }
        new Chart(target).Line( eval ( data ) );
      }
    });
}
