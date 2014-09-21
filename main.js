// waitUntilExists : for synchronization when processing dynamic loaded object
$(document).ready(function(){
	$.ajaxSetup({cache: false});
	initialize();
	setEventListeners();
	setDefaultActive();
});

function initialize(){
	loadPage("main");
	getChart("all"); 
	//getAgentList();
	//getAgent("agent1");
}

function setEventListeners(){
/*
  EVENTS
    1. chart click
    2. page move
    3. agent click
*/
	$("#chartTab > li").waitUntilExists(function(){$(this).click(chartHandler)}); // chart click
	$("#Agents > li").waitUntilExists(function(){ $(this).click(agentHandler)}); // agent click
	window.onhashchange = navigateHandler; // $(window).hashchange doesn't work
}

function setDefaultActive(){

}

function chartHandler(event){
	/*
		event doesn't occur when listener attached to <a>
		so attached listener to parent, <li>
		therefore using find("a").eq(0).attr("id") to get target name
	*/
	var target = $(this).find("a").eq(0).attr("id");
	getChart(target);
}

function agentHandler(event){
/*
    <li class="list-group-item subAgent" style="background-color: #EBEBEB; height: 150px" id="sub-agent1">
      asdfasdf
    </li>
*/
	console.log($(this).attr("id"));
	if(typeof $("li.subAgent").attr("id") != "undefined"){
	    console.log($(this).attr("id"), $("li.subAgent").attr("id").substr(4))
	    if($(this).attr("id") == $("li.subAgent").attr("id").substr(4)){
			$("li.subAgent").slideUp("normal", function(){ $(this).remove(); });
			return;
		}
	}
	$("li.subAgent").slideUp("normal", function(){ $(this).remove(); });
	var agent = document.createElement("li");
	agent.className = "list-group-item subAgent";
	agent.id = "sub-" + $(this).attr("id");
	$(agent).insertAfter($(this)).hide().slideDown();
}

function navigateHandler(){
	var page = window.location.hash.substr(1);
	loadPage(page);
}

function loadPage(page){
	$.ajax("/",{
     	cache: false,
     	async: false,
      	data: {m: "pageload",
      		   page: page},
		dataType: "html",
      	method: "GET",
      	error: function(xhr, status, error){
	        $("#myChart").html(status + " " + error);
      	},
      	success: function(data, status, xhr){
      		$("#wrapper").html(data);
     	}
    });
}