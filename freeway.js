
//gets the list of places around me
var places = {};
var curParking;
var curEntrance;
var curInside;
var curRestroom;

function init(){
//alert("init is working");
//document.addEventListener("deviceready", getLocation, false);
getLocation();

}



$(document).on("click", ".place-btn", function(e) {
    //alert("on click is working")
    e.preventDefault();
    var self = this;
    console.log(places.data);
    console.log($(this).attr("data-place-id"));
    $.each(places.data, function(key, val) {
        if (val.google_place_id == $(self).attr("data-place-id")) {
            places.current_place = val;
            console.log(places.current_place);
            $("#place").find(".name").text(places.current_place.name);
            $("#place").find(".address").text(places.current_place.address);
            $("#place").find(".phone").text(places.current_place.phone);
            $("#place").find(".url").text(places.current_place.url);
            $("#headerDiv").hide();
            $("#resPage").show();
            $(".my-new-list").hide();
            $(".my-new-results-list").hide();
            $("#logoPic").hide();
            $("#button1").click(changeIcons);
            $(".catTable").show();
            $("#resBack").show();
            $("#iconsDiv").show();
            $("#curPlaceTable").show();
            $("#resDetails").show();
            $("#button1").show();
            $("#thePicturesDiv").show();
            $("#pictureDiv").show();
            $("#place").show();
            $("#commentsHeader").show();
            $("#resTextComment").show();



            //puts the right icon according to the data we have about the place
            if (places.current_place.parking == undefined) {
                $("#parking").attr('src', "images/parking_icon0.png");
            } else {
                $("#parking").attr('src', "images/parking_icon" + places.current_place.parking + ".png");
            }
            if (places.current_place.entrance == undefined) {
                $("#entrance").attr('src', "images/entrance_icon0.png");
            } else {
                $("#entrance").attr('src', "images/entrance_icon" + places.current_place.entrance + ".png");
            }
            if (places.current_place.inside == undefined) {
                $("#inside").attr('src', "images/inside_icon0.png");
            } else {
                $("#inside").attr('src', "images/inside_icon" + places.current_place.inside + ".png");
            }
            if (places.current_place.restroom == undefined) {
                $("#restroom").attr('src', "images/restroom_icon0.png");
            } else {
                $("#restroom").attr('src', "images/restroom_icon" + places.current_place.restroom + ".png");
            }

            //Calls the server for more details - photo and phone number of the place 
            extraDetails(places.current_place.reference);
        }



    });
});

var x = document.getElementById("location");
function getLocation()
{
    //alert("get location is working");

    if (navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}
function showPosition(position) {
    //alert("show position is working");
    //console.log(position, position.coords.longitude);

    // call server
    $.getJSON("http://avivshay.milab.idc.ac.il/json.php?cmd=GPFL",
            {
                'lat': position.coords.latitude,
                'lng': position.coords.longitude,
               
            },
    //creats the list of the restaurnt around me
    function(data) {
        //alert("creating the list  of the restaurnt around me is working");
        console.log(data);
        places.data = data;
        var items = [];

        // these arguments will be the correct icon to show (if there is no detail about this criterion)
        var p_icon, e_icon, i_icon, r_icon;
        
        //the categories header of the list
        items.push('<div class="catTable" style="background-color: #ddddd1">'+
                    '<table style="text-align: center; margin-left: 8%; width: 90%;">' +
                        '<tr>' +
                            '<td style="width: 9%; height: 50px;"> '+
                                '<h3> חנייה</h3> '+
                            '</td> '+
                            '<td style="width: 7%; height: 50px;">'+
                                '<h3>  כניסה</h3>' +
                            '</td>' +
                            '<td style="width: 2%; height: 50px;;">' +
                                '<h3> מרחב במקום</h3>' + 
                            '</td>' + 
                            '<td style="width: 8%; height: 50px;">' + 
                                '<h3> שירותים </h3>' +
                            '</td>' + 
                             '<td style="width: 15%; height: 50px;">' + 
                             '</td>' + 
                             '<td style="width: 15%; height: 50px;">' + 
                                '<h2>מסעדות בקרבתי</h2>' +
                            '</td>' + 
                        '</tr>' +
                    '</table>'+
                    '</div>');
        
        //this loop shows all the restaurants around me
        $.each(data, function(key, val) {
            places.current_place = val;

            //puts the right icon according to the data we have about the place
            if (places.current_place.parking == undefined) {
                p_icon = 0;
            } else {
                p_icon = places.current_place.parking;
            }
            if (places.current_place.entrance == undefined) {
                e_icon = 0;
            } else {
                e_icon = places.current_place.entrance;
            }
            if (places.current_place.inside == undefined) {
                i_icon = 0;
            } else {
                i_icon = places.current_place.inside;
            }
            if (places.current_place.restroom == undefined) {
                r_icon = 0;
            } else {
                r_icon = places.current_place.restroom;
            }

            items.push("<ul style=\"padding:0; margin:0;\">"+
                    "<li style=\" height:14%; border-bottom: 1px solid gray;\"" + ">" +
                    "<div style=\"" + "float:left; width: 53%;\"" + ">" +
                    "<a href=\"" + "#\"" + "><img src=\"" + "images/leftArrow.png\"" + "style=\"" + "width: 4%; margin-right: 11.6%;\"" +
                    "data-place-id=\"" + val.google_place_id + "\" href=\"http://avivshay.milab.idc.ac.il/json.php?cmd=PLACE&place_id=" + val.google_place_id + "\" class=\" ui-btn ui-btn-icon-right ui-icon-carat-r place-btn\">" + "</a>" +
                    //shows the correct icons of the specific place
                    "<a href=\"#\"><img src=\"images/parking_icon" + p_icon + ".png\" id=\"parkingList\" style=\"width: 18%; margin-right: 3.6%;\" /></a>" +
                    "<a href=\"#\"><img src=\"images/entrance_icon" + e_icon + ".png\" id=\"entranceList\" style=\"width: 18%; margin-right: 3.6%;\" /></a>" +
                    "<a href=\"#\"><img src=\"images/inside_icon" + i_icon + ".png\" id=\"insideList\" style=\"width: 18%; margin-right: 3.6%;;\" /></a>" +
                    "<a href=\"#\"><img src=\"images/restroom_icon" + r_icon + ".png\" id=\"restroomList\" style=\"width: 18%;\" /></a>" +
                    "</div>" +
                    "<div style=\"float:right; width: 47%; text-align: right; \">" +
                    "<a data-place-id=\"" + val.google_place_id + "\" href=\"http://avivshay.milab.idc.ac.il/json.php?cmd=PLACE&place_id=" + val.google_place_id + "\" class=\" ui-btn ui-btn-icon-right ui-icon-carat-r place-btn\"><div style=\"font-size: 1.4rem; color: #2bb98b;\">" + val.name + "</div></a>" +
                    //<"div style=\"font-size: 0.8rem; color: black;\">5 km from your position</div>" +
                    "</div>" +
                    "</li>" +
                    "</ul>");
            //   items.push("<li id='" + key + "'>" +
            //         "<a data-place-id=\"" + val.google_place_id + "\" href=\"http://avivshay.milab.idc.ac.il/json.php?cmd=PLACE&place_id=" + val.google_place_id + "\" class=\" ui-btn ui-btn-icon-right ui-icon-carat-r place-btn\">" + val.name + "</a></li>");
        });

        $("<ul/>", {
            "class": "my-new-list",
            html: items.join("")
        }).appendTo("body");
    });
}

// sends the typed text from the search box to the server
function getValue()
{  
   
   $(".my-new-results-list").hide();
   $(".my-new-list").hide();
   $(".catTable").hide();
   
    var x = document.getElementById("searchField").value;
    
    // call server
    $.getJSON("http://avivshay.milab.idc.ac.il/json.php?cmd=GPPN",
            {
                'searchField': x
            },
    
    //creats the list of the restaurnt that came back from the search
    function(data) {  
        console.log(data);
        if (data.length == 0){
            $(".searchNotFound").show();
            setTimeout(function() { $(".searchNotFound").hide(); }, 4000);
            
           $(".catTable").hide();
            setTimeout(function() { $(".catTable").show(); }, 4000);

            $(".my-new-list").hide();
            setTimeout(function() { $(".my-new-list").show(); }, 4000);
        }
        places.data = data;
        var items = [];
        $(".my-new-list").hide();
        
        
        //the categories header for the list of the search result
        items.push('<div class="catTable" style="background-color: #ddddd1">'+
                    '<table id="resTable" style="text-align: center; margin-left: 8%; width: 90%;">' +
                        '<tr>' +
                            '<td style="width: 9%; height: 50px;"> '+
                                '<h3> חנייה</h3> '+
                            '</td> '+
                            '<td style="width: 7%; height: 50px;">'+
                                '<h3>  כניסה</h3>' +
                            '</td>' +
                            '<td style="width: 2%; height: 50px;;">' +
                                '<h3> מרחב במקום</h3>' + 
                            '</td>' + 
                            '<td style="width: 8%; height: 50px;">' + 
                                '<h3> שירותים </h3>' +
                            '</td>' + 
                             '<td style="width: 15%; height: 50px;">' + 
                             '</td>' + 
                             '<td style="width: 15%; height: 50px;">' + 
                                '<h2>שם המסעדה</h2>' +
                            '</td>' + 
                        '</tr>' +
                    '</table>'+
                    '</div>');
        
        //shows all the results of the search
        $.each(data, function(key, val) {
            places.current_place = val;
           
            //puts the right icon according to the data we have about the place
            if (places.current_place.parking == undefined) {
                p_icon = 0;
            } else {
                p_icon = places.current_place.parking;
            }
            if (places.current_place.entrance == undefined) {
                e_icon = 0;
            } else {
                e_icon = places.current_place.entrance;
            }
            if (places.current_place.inside == undefined) {
                i_icon = 0;
            } else {
                i_icon = places.current_place.inside;
            }
            if (places.current_place.restroom == undefined) {
                r_icon = 0;
            } else {
                r_icon = places.current_place.restroom;
            }
            items.push("<ul style=\"padding:0; margin:0;\">" +
                    "<li style=\" height:14%; border-bottom: 1px solid gray;wisth:375px\"" + ">" +
                    "<div style=\"" + "float:left; width: 53%;\"" + ">" +
                    "<a href=\"" + "#\"" + "><img src=\"" + "images/leftArrow.png\"" + "style=\"" + "width: 4%; margin-right: 11.6%;\"" +
                    "data-place-id=\"" + val.google_place_id + "\" href=\"http://avivshay.milab.idc.ac.il/json.php?cmd=PLACE&place_id=" + val.google_place_id + "\" class=\" ui-btn ui-btn-icon-right ui-icon-carat-r place-btn\">" + "</a>" +
                    //shows the correct icons of the specific place
                    "<a href=\"#\"><img src=\"images/parking_icon" + p_icon + ".png\" id=\"parkingList\" style=\"width: 18%; margin-right: 3.6%;\" /></a>" +
                    "<a href=\"#\"><img src=\"images/entrance_icon" + e_icon + ".png\" id=\"entranceList\" style=\"width: 18%; margin-right: 3.6%;\" /></a>" +
                    "<a href=\"#\"><img src=\"images/inside_icon" + i_icon + ".png\" id=\"insideList\" style=\"width: 18%; margin-right: 3.6%;;\" /></a>" +
                    "<a href=\"#\"><img src=\"images/restroom_icon" + r_icon + ".png\" id=\"restroomList\" style=\"width: 18%;\" /></a>" +
                    "</div>" +
                    "<div style=\"float:right; width: 47%; text-align: right; \">" +
                    "<a data-place-id=\"" + val.google_place_id + "\" href=\"http://avivshay.milab.idc.ac.il/json.php?cmd=PLACE&place_id=" + val.google_place_id + "\" class=\" ui-btn ui-btn-icon-right ui-icon-carat-r place-btn\"><div style=\"font-family: Alef Hebrew; font-size: 1.4rem; color: #2bb98b;\">" + val.name + "</div></a>" +
                    //<"div style=\"font-size: 0.8rem; color: black;\">5 km from your position</div>" +
                    "</div>" +
                    "</li>" +
                    "</ul>");
            //   items.push("<li id='" + key + "'>" +
            //         "<a data-place-id=\"" + val.google_place_id + "\" href=\"http://avivshay.milab.idc.ac.il/json.php?cmd=PLACE&place_id=" + val.google_place_id + "\" class=\" ui-btn ui-btn-icon-right ui-icon-carat-r place-btn\">" + val.name + "</a></li>");
        });

        $("<ul/>", {
            "class": "my-new-results-list",
            html: items.join("")
        }).appendTo("body");
    });
     
   
}

// sends the typed text from the search box in a restaurant page to the server
function getValue2()
{  
   //hides everything that is not needed
   $(".my-new-results-list").hide();
   $(".my-new-list").hide();
   $(".catTable").hide();
   $("#resBack").hide();
   $("#iconsDiv").hide();
   $("#curPlaceTable").hide();
   $("#resDetails").hide();
   $("#button1").hide();
   $("#button2").hide();
   $("#thePicturesDiv").hide();
   $("#theCommentsHeaderDiv").hide();
   $("#showCommentsDiv").hide();
   $(".addTextComment").hide();
   $("#pictureDiv").hide();
   $("#place").hide();
   $("#commentsHeader").hide();
   $("#resTextComment").hide();
   
   
    var x = document.getElementById("searchField2").value;
    
    // call server
    $.getJSON("http://avivshay.milab.idc.ac.il/json.php?cmd=GPPN",
            {
                'searchField': x
            },
    
    //creats the list of the restaurnt that came back from the search
    function(data) {  
        console.log(data);
        if (data.length == 0){
            $(".searchNotFound1").show();
            setTimeout(function() { $(".searchNotFound1").hide(); }, 4000);
            
           $(".catTable").hide();
            setTimeout(function() { $(".catTable").show(); }, 4000);

            $(".my-new-list").hide();
            setTimeout(function() { $(".my-new-list").show(); }, 4000);
        }
        places.data = data;
        var items = [];
        $(".my-new-list").hide();
        
        
        //the categories header for the list of the search result
        items.push('<div class="catTable" style="background-color: #ddddd1">'+
                    '<table style="font-family: Alef Hebrew; text-align: center; margin-left: 8%; width: 90%;">' +
                        '<tr>' +
                            '<td style="width: 9%; height: 50px;"> '+
                                '<h3> חנייה</h3> '+
                            '</td> '+
                            '<td style="width: 7%; height: 50px;">'+
                                '<h3>  כניסה</h3>' +
                            '</td>' +
                            '<td style="width: 2%; height: 50px;;">' +
                                '<h3> מרחב במקום</h3>' + 
                            '</td>' + 
                            '<td style="width: 8%; height: 50px;">' + 
                                '<h3> שירותים </h3>' +
                            '</td>' + 
                             '<td style="width: 15%; height: 50px;">' + 
                             '</td>' + 
                              '<td style="width: 15%; height: 50px;">' + 
                                '<h2>שם המסעדה</h2>' +
                            '</td>' + 
                        '</tr>' +
                    '</table>'+
                    '</div>');
        
        //shows all the results of the search
        $.each(data, function(key, val) {
            places.current_place = val;
           
            //puts the right icon according to the data we have about the place
            if (places.current_place.parking == undefined) {
                p_icon = 0;
            } else {
                p_icon = places.current_place.parking;
            }
            if (places.current_place.entrance == undefined) {
                e_icon = 0;
            } else {
                e_icon = places.current_place.entrance;
            }
            if (places.current_place.inside == undefined) {
                i_icon = 0;
            } else {
                i_icon = places.current_place.inside;
            }
            if (places.current_place.restroom == undefined) {
                r_icon = 0;
            } else {
                r_icon = places.current_place.restroom;
            }
            items.push("<ul style=\"padding:0; margin:0;\">" +
                    "<li style=\" height:14%; border-bottom: 1px solid gray;\"" + ">" +
                    "<div style=\"" + "float:left; width: 53%;\"" + ">" +
                    "<a href=\"" + "#\"" + "><img src=\"" + "images/leftArrow.png\"" + "style=\"" + "width: 4%; margin-right: 11.6%;\"" +
                    "data-place-id=\"" + val.google_place_id + "\" href=\"http://avivshay.milab.idc.ac.il/json.php?cmd=PLACE&place_id=" + val.google_place_id + "\" class=\" ui-btn ui-btn-icon-right ui-icon-carat-r place-btn\">" + "</a>" +
                    //shows the correct icons of the specific place
                    "<a href=\"#\"><img src=\"images/parking_icon" + p_icon + ".png\" id=\"parkingList\" style=\"width: 18%; margin-right: 3.6%;\" /></a>" +
                    "<a href=\"#\"><img src=\"images/entrance_icon" + e_icon + ".png\" id=\"entranceList\" style=\"width: 18%; margin-right: 3.6%;\" /></a>" +
                    "<a href=\"#\"><img src=\"images/inside_icon" + i_icon + ".png\" id=\"insideList\" style=\"width: 18%; margin-right: 3.6%;;\" /></a>" +
                    "<a href=\"#\"><img src=\"images/restroom_icon" + r_icon + ".png\" id=\"restroomList\" style=\"width: 18%;\" /></a>" +
                    "</div>" +
                    "<div style=\"float:right; width: 47%; text-align: right; \">" +
                    "<a data-place-id=\"" + val.google_place_id + "\" href=\"http://avivshay.milab.idc.ac.il/json.php?cmd=PLACE&place_id=" + val.google_place_id + "\" class=\" ui-btn ui-btn-icon-right ui-icon-carat-r place-btn\"><div style=\"font-size: 1.4rem; color: #2bb98b;\">" + val.name + "</div></a>" +
                    //<"div style=\"font-size: 0.8rem; color: black;\">5 km from your position</div>" +
                    "</div>" +
                    "</li>" +
                    "</ul>");
            //   items.push("<li id='" + key + "'>" +
            //         "<a data-place-id=\"" + val.google_place_id + "\" href=\"http://avivshay.milab.idc.ac.il/json.php?cmd=PLACE&place_id=" + val.google_place_id + "\" class=\" ui-btn ui-btn-icon-right ui-icon-carat-r place-btn\">" + val.name + "</a></li>");
        });

        $("<ul/>", {
            "class": "my-new-results-list",
            html: items.join("")
        }).appendTo("body");
    });
     
   
}


//This method is allowing when a user presses on the ADKEN NEGISHUT button to 
//press on the icons and send update about the deferen criterions
function changeIcons()
{
   
  
    $("#button1").hide();
    $("#button2").show();
    
    //chsnges all the icons to gray
    $("#parking").attr('src', "images/parking_icon0.png");
    $("#entrance").attr('src', "images/entrance_icon0.png");
    $("#inside").attr('src', "images/inside_icon0.png");
    $("#restroom").attr('src', "images/restroom_icon0.png");
    

    //changes the icons color to either green red or gray
    curParking = places.current_place.parking;
    curEntrance = places.current_place.entrance;
    curInside = places.current_place.inside;
    curRestroom = places.current_place.restroom;
    $("#parking").click(pickColorP);
    $("#entrance").click(pickColorE);
    $("#inside").click(pickColorI);
    $("#restroom").click(pickColorR);
    
    //sends the new icon statements
    $("#button2").click(sendNewData);
   
}
//Picks the color of the icon
function pickColorP() {
    if (curParking == 0) {
        $("#parking").attr('src', "images/parking_icon1.png");
        curParking = 1;
    } else if (curParking == 1) {
        $("#parking").attr('src', "images/parking_icon-1.png");
        curParking = -1;
    } else {
        $("#parking").attr('src', "images/parking_icon0.png");
        curParking = 0;
    }
}
function pickColorE() {
     if (curEntrance == 0) {
        $("#entrance").attr('src', "images/entrance_icon1.png");
        curEntrance = 1;
    } else if (curEntrance == 1) {
        $("#entrance").attr('src', "images/entrance_icon-1.png");
        curEntrance = -1;
    } else {
        $("#entrance").attr('src', "images/entrance_icon0.png");
        curEntrance = 0;
    }
}
function pickColorI() {
    if (curInside == 0) {
        $("#inside").attr('src', "images/inside_icon1.png");
        curInside = 1;
    } else if (curInside == 1) {
        $("#inside").attr('src', "images/inside_icon-1.png");
        curInside = -1;
    } else {
        $("#inside").attr('src', "images/inside_icon0.png");
        curInside = 0;
    }
}
function pickColorR() {
     if (curRestroom == 0) {
        $("#restroom").attr('src', "images/restroom_icon1.png");
        curRestroom = 1;
    } else if (curRestroom == 1) {
        $("#restroom").attr('src', "images/restroom_icon-1.png");
        curRestroom = -1;
    } else {
        $("#restroom").attr('src', "images/restroom_icon0.png");
        curRestroom = 0;
    }
}


//this method sends the new data that the user added about the place
function sendNewData() {
    $("#button2").hide();
   
   //shows the thank you message for 4 seconds
    $(".thankYouMessage").show();
        setTimeout(function() { $(".thankYouMessage").hide(); }, 4000);
  
    //hides the icons for 4 seconds
    $("#iconsDiv").hide();
    setTimeout(function() { $("#iconsDiv").show(); }, 4000);
   
    //shows button1 after 4 seconds
    setTimeout(function() { $("#button1").show(); }, 4000);
  
    //hides the categories table for 4 seconds
    $("#curPlaceTable").hide();
    setTimeout(function() { $("#curPlaceTable").show(); }, 4000);
 
    $.getJSON("http://avivshay.milab.idc.ac.il/json.php?cmd=UPPL",
    {
           'googlePlacesId': places.current_place.google_place_id,
           'name': places.current_place.name,
           'parking': curParking,
           'entrance':curEntrance,
           'inside': curInside,
           'restroom': curRestroom
     });
     
    //puts the right icon according to the data we have about the place
    if (places.current_place.parking == undefined) {
        $("#parking").attr('src', "images/parking_icon0.png");
    } else {
        $("#parking").attr('src', "images/parking_icon" + places.current_place.parking + ".png");
    }
    if (places.current_place.entrance == undefined) {
        $("#entrance").attr('src', "images/entrance_icon0.png");
    } else {
        $("#entrance").attr('src', "images/entrance_icon" + places.current_place.entrance + ".png");
    }
    if (places.current_place.inside == undefined) {
        $("#inside").attr('src', "images/inside_icon0.png");
    } else {
        $("#inside").attr('src', "images/inside_icon" + places.current_place.inside + ".png");
    }
    if (places.current_place.restroom == undefined) {
        $("#restroom").attr('src', "images/restroom_icon0.png");
    } else {
        $("#restroom").attr('src', "images/restroom_icon" + places.current_place.restroom + ".png");
    }

}







//Extends the map to the whole page
//   function showMap()
// {
//    initialize("app");
//$("#resPage").hide();
// }

function extraDetails(ref)
{
    $.getJSON("http://avivshay.milab.idc.ac.il/json.php?cmd=GPED&reference=" + ref,
            {},
            function(data) {
                if (data.placePhotos == null) {
                    $('#place').css('background-image', 'url(images/search_background.png)');
                    $('#place').css('background-size', 'cover');
                    $('#place').css('no-repeat', "true");
                   
                } else {
                    var imageUrl = 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=' + data.placePhotos + '&sensor=true&key=AIzaSyDEckGBe4hGIWs8PSRpBtWBM_zoiT0Flck';
                    console.log(imageUrl);
                    $('#place').css('background-image', 'url(' + imageUrl + ')');
                    // $('#place').css('background-size',"cover");
                }


                if (data.phone != null) {
                    $("#place").find(".phone").text(data.phone);
                } else {
                    $("#place").find(".phone").text("אין מספר טלפון");
                }

                if (data.formatted_address != null) {
                    $("#place").find(".address").text(data.formatted_address);
                } else {
                    $("#place").find(".address").text("אין כתובת במערכת");
                }

            }
    );
 }
//this function shows all the comments about the current place
function showComments(){
   $(".comments-list").hide();
   $(".addTextComment").hide();
   $("#comments1").hide();
   $("#comments2").show();
   var comments = [];
   if( places.current_place.comments.length == 0){
        
        //hides the comment picture for 4 sec
        $("#comments").hide();
        setTimeout(function() { $("#comments").show(); }, 4000);
        
        //shows the noCommentMessage for 4 sec
        $(".noCommentsMessage").show();
        setTimeout(function() { $(".noCommentsMessage").hide(); }, 4000);
   } else {
  //console.log(places.current_place.comments[0].reviewerName);
  //console.log( places.current_place.comments.length);
  for (var i = 0; i < places.current_place.comments.length; i++) {
      comments.push('<table id="showCommentsDiv" style="margin-bottom: -20px; margin-left: -25px; width: 100%; color: #d3d3d3">'+
                        '<tr>' +
                           ' <td style="width: 25%; height: 50px; text-align: left;">' +
                           '    <h4>'+ places.current_place.comments[i].date +'</h4>' +
                           ' </td>' +
                           ' <td style="width: 50%; height: 50px;">' +
                           ' </td>' +
                           ' <td style="width: 25%; height: 50px; text-align: right;">' +
                           '    <h4>'+places.current_place.comments[i].reviewerName+'</h4>' +
                           ' </td>'+
	 	        '</tr>' +
	            '</table>'+
                    '<div id="resTextComment" style="border-bottom: 1px solid gray; width:90%; text-align: right; margin-right: 10%;">' +
                        '<h3>'+ places.current_place.comments[i].commentText+'</h3>'+
                    '</div>');	
      
 // comments.push("<ul style=\"padding:0; margin:0;\">"+
       //             "<li style=\" height:14%; border-bottom: 1px solid gray;\"" + ">" +
         //           "<div style=\"" + "float:left; width: 53%;\"" + ">" +
           //             '<div>'+places.current_place.comments[i].reviewerName +'</div>'+
            //        "</div>" +
              //      "</li>" +
                //    "</ul>");
           
        $("<ul/>", {
            "class": "comments-list",
            html: comments.join("")
        }).appendTo("body");
    }
   }
}

//this function hides all the comments about the current place
function hideComments(){
   $(".comments-list").hide();
   $("#comments2").hide();
   $("#comments1").show();
 }
   
   
//this function lets the user add a comment to a restaurant
function addTextComment(){
    $(".comments-list").hide()
    $(".addTextComment").show();
    $("#add_comment1").hide();
    $("#add_comment2").show();
}

//this function lets the user hide the comment form
function hideTextComment(){
    $(".addTextComment").hide();
    $("#add_comment1").show();
    $("#add_comment2").hide();
}

//this function sends the new comment to the server
function sendComment(){
    $(".addTextComment").hide();
    $("#add_comment1").show();
    $("#add_comment2").hide();
    
    // call server
    $.getJSON("http://avivshay.milab.idc.ac.il/json.php?cmd=ADRE",
          {
            'googlePlacesId': places.current_place.google_place_id,
            'comment': document.getElementById("commentTextBox").value,
            'reviewerName': document.getElementById("nameTextBox").value,    
            'placeName': places.current_place.name
            
            
      });
   
    //shows the thank you message for 4 seconds
    $(".thankYouTextMessage").show();
    setTimeout(function() { $(".thankYouTextMessage").hide(); }, 4000);
       
}

//this function let you add pictures to the current place
//function addPictures(){
    
//}

/*! Reloads page on every visit */
function Reload() {
try {
alert("reload is working");
var headElement = document.getElementsByTagName("head")[0];
if (headElement && headElement.innerHTML)
headElement.innerHTML += "<meta http-equiv=\"refresh\" content=\"1\">";
}
catch (e) {}
}

//deals with the delete button inside the search box
$("#searchclear").click(function(){
    $("#searchinput").val('');
});