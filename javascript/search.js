function search() {
        alert($("#search1").val());
}

function getL() {
        alert($("#search1").val());
}

$(document).ready(function() {       
    $("#search1").keyup(function(event){
    if(event.keyCode === 13){
        search();
    }
    
    $("#submit_search").click(function(){
        
            search();   
});
 
});});

