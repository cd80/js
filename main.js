function initialize(){
  getDefaultChart("all"); 
}

function setEventListeners(){
/*
  EVENTS
    1. chart click
    2. page move
    3. agent click
*/
	$("#chartTab > a").click(chartHandler);

}

function chartHandler(event){
	console.log($(this).attr("id"));
}