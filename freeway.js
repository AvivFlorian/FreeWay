
//gets the list of places around me
var places = {};
var curParking;
var curEntrance;
var curInside;
var curRestroom;

function init(){
alert("init is working");
document.addEventListener("deviceready", getLocation, false);

//getLocation();

}
$(document).on("click", ".place-btn", function(e) {
    alert("on click is working")
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
            $("#app").show();
            $(".my-new-list").hide();
            $(".my-new-results-list").hide();
            $(".placesAround").hide();
            $("#logoPic").hide();
            $("#button1").click(changeIcons);


            //puts the right icon according to the data we have about the place
            if (places.current_place.parking == undefined) {
                $("#parking").attr('src', "images/parking_icon0.jpg");
            } else {
                $("#parking").attr('src', "images/parking_icon" + places.current_place.parking + ".jpg");
            }
            if (places.current_place.entrance == undefined) {
                $("#entrance").attr('src', "images/entrance_icon0.jpg");
            } else {
                $("#entrance").attr('src', "images/entrance_icon" + places.current_place.entrance + ".jpg");
            }
            if (places.current_place.inside == undefined) {
                $("#inside").attr('src', "images/inside_icon0.jpg");
            } else {
                $("#inside").attr('src', "images/inside_icon" + places.current_place.inside + ".jpg");
            }
            if (places.current_place.restroom == undefined) {
                $("#restroom").attr('src', "images/restroom_icon0.jpg");
            } else {
                $("#restroom").attr('src', "images/restroom_icon" + places.current_place.restroom + ".jpg");
            }

            //Calls the server for more details - photo and phone number of the place 
            extraDetails(places.current_place.reference);
        }



    });
});

var x = document.getElementById("location");
function getLocation()
{
    alert("get location is working");

    if (navigator.geolocation)
    {
       alert("get location is working - if");
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}
function showPosition(position) {
    alert("show position is working");
    console.log(position, position.coords.longitude);

    // call server
    $.getJSON("http://avivshay.milab.idc.ac.il/json.php?cmd=GPFL",
            {
                'lat': position.coords.latitude,
                'lng': position.coords.longitude,
                'search': getValue()
            },
    //creats the list of the restaurnt around me
    function(data) {
        //alert("creating the list  of the restaurnt around me is working");
        console.log(data);
        places.data = data;
        var items = [];

        // these arguments will be the correct icon to show (if there is no detail about this criterion)
        var p_icon, e_icon, i_icon, r_icon;
        //console.log(place.data);
        //  items.push('<table align="left" style="alignment-adjust: central; text-align: center; margin-left:203px; font-family: fantasy; font-size: large">' +
        //       '<tr align="left">' +
        //     '<td style="width: 125px ">חניה </td>' +
        //   '<td style="width: 95px ">כניסה</td>' +
        // '<td style="width: 150px ">מרחב במקום</td>' +
        //'<td style="width: 130px; text-align: center; ">שירותים</td>' +
        //  '</table></br></br></br>');
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
                    "<a href=\"" + "#\"" + "><img src=\"" + "images/leftArrow.jpg\"" + "style=\"" + "width: 4%; margin-right: 11.6%;\"" +
                    "data-place-id=\"" + val.google_place_id + "\" href=\"http://avivshay.milab.idc.ac.il/json.php?cmd=PLACE&place_id=" + val.google_place_id + "\" class=\" ui-btn ui-btn-icon-right ui-icon-carat-r place-btn\">" + "</a>" +
                    //shows the correct icons of the specific place
                    "<a href=\"#\"><img src=\"images/parking_icon" + p_icon + ".jpg\" id=\"parkingList\" style=\"width: 16%; margin-right: 5.6%;\" /></a>" +
                    "<a href=\"#\"><img src=\"images/entrance_icon" + e_icon + ".jpg\" id=\"entranceList\" style=\"width: 16%; margin-right: 5.6%;\" /></a>" +
                    "<a href=\"#\"><img src=\"images/inside_icon" + i_icon + ".jpg\" id=\"insideList\" style=\"width: 16%; margin-right: 5.6%;;\" /></a>" +
                    "<a href=\"#\"><img src=\"images/restroom_icon" + r_icon + ".jpg\" id=\"restroomList\" style=\"width: 16%;\" /></a>" +
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
    //alert("get value from the typed text in the search box is working");
    //console.log(searchField.value);
    //return $("#searchField").val();

    var x = document.getElementById("searchField").value;

    // call server
    $.getJSON("http://avivshay.milab.idc.ac.il/json.php?cmd=GPPN",
            {
                'searchField': x
            },
    //creats the list of the restaurnt that came back from the search
    function(data) {
        // alert("creats the list of the restaurnt that came back from the search")
        console.log(data);
        places.data = data;
        var items = [];
        $(".my-new-list").hide();
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
                    "<a href=\"" + "#\"" + "><img src=\"" + "images/leftArrow.jpg\"" + "style=\"" + "width: 4%; margin-right: 11.6%;\"" +
                    "data-place-id=\"" + val.google_place_id + "\" href=\"http://avivshay.milab.idc.ac.il/json.php?cmd=PLACE&place_id=" + val.google_place_id + "\" class=\" ui-btn ui-btn-icon-right ui-icon-carat-r place-btn\">" + "</a>" +
                    //shows the correct icons of the specific place
                    "<a href=\"#\"><img src=\"images/parking_icon" + p_icon + ".jpg\" id=\"parkingList\" style=\"width: 16%; margin-right: 5.6%;\" /></a>" +
                    "<a href=\"#\"><img src=\"images/entrance_icon" + e_icon + ".jpg\" id=\"entranceList\" style=\"width: 16%; margin-right: 5.6%;\" /></a>" +
                    "<a href=\"#\"><img src=\"images/inside_icon" + i_icon + ".jpg\" id=\"insideList\" style=\"width: 16%; margin-right: 5.6%;;\" /></a>" +
                    "<a href=\"#\"><img src=\"images/restroom_icon" + r_icon + ".jpg\" id=\"restroomList\" style=\"width: 16%;\" /></a>" +
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
    //alert("change icons is working");
    //chsnges all the icons to gray
    $("#button1").hide();
    $("#button2").show();
    $("#parking").attr('src', "images/parking_icon0.jpg");
    $("#entrance").attr('src', "images/entrance_icon0.jpg");
    $("#inside").attr('src', "images/inside_icon0.jpg");
    $("#restroom").attr('src', "images/restroom_icon0.jpg");

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
        $("#parking").attr('src', "images/parking_icon1.jpg");
        curParking = 1;
    } else if (curParking == 1) {
        $("#parking").attr('src', "images/parking_icon-1.jpg");
        curParking = -1;
    } else {
        $("#parking").attr('src', "images/parking_icon0.jpg");
        curParking = 0;
    }
}
function pickColorE() {
     if (curEntrance == 0) {
        $("#entrance").attr('src', "images/entrance_icon1.jpg");
        curEntrance = 1;
    } else if (curEntrance == 1) {
        $("#entrance").attr('src', "images/entrance_icon-1.jpg");
        curEntrance = -1;
    } else {
        $("#entrance").attr('src', "images/entrance_icon0.jpg");
        curEntrance = 0;
    }
}
function pickColorI() {
    if (curInside == 0) {
        $("#inside").attr('src', "images/inside_icon1.jpg");
        curInside = 1;
    } else if (curInside == 1) {
        $("#inside").attr('src', "images/inside_icon-1.jpg");
        curInside = -1;
    } else {
        $("#inside").attr('src', "images/inside_icon0.jpg");
        curInside = 0;
    }
}
function pickColorR() {
     if (curRestroom == 0) {
        $("#restroom").attr('src', "images/restroom_icon1.jpg");
        curRestroom = 1;
    } else if (curRestroom == 1) {
        $("#restroom").attr('src', "images/restroom_icon-1.jpg");
        curRestroom = -1;
    } else {
        $("#restroom").attr('src', "images/restroom_icon0.jpg");
        curRestroom = 0;
    }
}


//this method sends the new data that the user added about the place
function sendNewData() {
    $("#button2").hide();
    $("#button1").show();
   
    $.getJSON("http://avivshay.milab.idc.ac.il/json.php?cmd=UPPL&googlePlacesId=5415c168a7f5d192404ba21d903590f7fed1a17e&parking=1&entrance=1&inside=1&restroom=1",
    {
           'googlePlaceId' : places.current_place.google_place_id,
           'parking': curParking,
           'entrance':curEntrance,
           'inside': curInside,
           'restroom': curRestroom
     });
     
    //puts the right icon according to the data we have about the place
    if (places.current_place.parking == undefined) {
        $("#parking").attr('src', "images/parking_icon0.jpg");
    } else {
        $("#parking").attr('src', "images/parking_icon" + places.current_place.parking + ".jpg");
    }
    if (places.current_place.entrance == undefined) {
        $("#entrance").attr('src', "images/entrance_icon0.jpg");
    } else {
        $("#entrance").attr('src', "images/entrance_icon" + places.current_place.entrance + ".jpg");
    }
    if (places.current_place.inside == undefined) {
        $("#inside").attr('src', "images/inside_icon0.jpg");
    } else {
        $("#inside").attr('src', "images/inside_icon" + places.current_place.inside + ".jpg");
    }
    if (places.current_place.restroom == undefined) {
        $("#restroom").attr('src', "images/restroom_icon0.jpg");
    } else {
        $("#restroom").attr('src', "images/restroom_icon" + places.current_place.restroom + ".jpg");
    }

}







//Extends the map to the whole page
//   function showMap()
// {
//    initialize("app");
//$("#app").hide();
// }

function extraDetails(ref)
{
    //alert("get extra details is working");
    $.getJSON("http://avivshay.milab.idc.ac.il/json.php?cmd=GPED&reference=" + ref,
            {},
            function(data) {
                if (data.placePhotos == null) {
                    $('#place').css('background-image', 'url(images/restaurant.jpg)');
                    $('#place').css('no-repeat', "true");
                } else {
                    var imageUrl = 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=' + data.placePhotos + '&sensor=true&key=AIzaSyArToMuYtcxnymrrBjf2D7YabV2HjpoZuU';
                    console.log(imageUrl);
                    $('#place').css('background-image', 'url(' + imageUrl + ')');
                }


                if (data.phone != null) {
                    $("#place").find(".phone").text(data.phone);
                } else {
                    $("#place").find(".phone").text("אין מספר טלפון");
                }



            }
    );
}


