
//gets the list of places around me
var places = {};

$(document).on("click", ".place-btn", function(e) {
    e.preventDefault();
    var self = this;
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
            $(".placesAround").hide();
            $("#logoPic").hide();
            $("#parking").attr('src', "images/parking_icon" + places.current_place.parking + ".jpg");
            $("#entrance").attr('src', "images/entrance_icon" + places.current_place.entrance + ".jpg");
            $("#inside").attr('src', "images/inside_icon" + places.current_place.inside + ".jpg");
            $("#restroom").attr('src', "images/restroom_icon" + places.current_place.restroom + ".jpg");
        }
          // Calls the server for more information (phone and picture)
  //$.getJSON("https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=" + val.reference + "&sensor=true&key=AIzaSyArToMuYtcxnymrrBjf2D7YabV2HjpoZuU",
    //      {
      //      'phone': val.phone,
        //    'placePhoto': val.placePhoto       
   // });
    });
});

var x = document.getElementById("location");
function getLocation()
{
    if (navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}
function showPosition(position) {
    //console.log(position, position.coords.longitude);

    // call server
    $.getJSON("http://avivshay.milab.idc.ac.il/json.php?cmd=GPFL",
            {
                'lat': position.coords.latitude,
                'lng': position.coords.longitude,
                'search': getValue()
            },
   
    //creats the list of the restaurnt around me
    function(data) {
        console.log(data);
        places.data = data;
        var items = [];
        $.each(data, function(key, val) {
            places.current_place = val;
            items.push("<ul style=\"padding:0; margin:0;\">" +
                "<li style=\" height:14%; border-bottom: 1px solid gray;\"" + ">" +
                    "<div style=\"" + "float:left; width: 53%;\"" + ">" +
                     "<a href=\"" + "#\"" + "><img src=\"" + "images/leftArrow.jpg\"" + "style=\"" + "width: 4%; margin-right: 11.6%;\"" + "></a>" +
                       "$(\"#parkingList\").attr('src', \"images/parking_icon\"" + places.current_place.parking + "\".jpg\");" +
                       "$(\"#entranceList\").attr('src', \"images/entrance_icon\"" + places.current_place.entrance + "\".jpg\");" +
                       "$(\"#insideList\").attr('src', \"images/inside_icon\"" + places.current_place.inside + "\".jpg\");" +
                       "$(\"#restroomList\").attr('src', \"images/restroom_icon\"" + places.current_place.restroom + "\".jpg\");" +
                   "</div>" +
                   "<div style=\"float:right; width: 47%; text-align: right; \">" +
                   "<a data-place-id=\"" + val.google_place_id + "\" href=\"http://avivshay.milab.idc.ac.il/json.php?cmd=PLACE&place_id=" + val.google_place_id + "\" class=\" ui-btn ui-btn-icon-right ui-icon-carat-r place-btn\"><div style=\"font-size: 1.4rem; color: #2bb98b;\">" + val.name + "</div></a>" +
                   "<div style=\"font-size: 0.8rem; color: black;\">5 km from your position</div>" +
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
    //console.log(searchField.value);
    //return $("#searchField").val();

    var x = document.getElementById("searchField").value;

    // call server

    $.getJSON("http://avivshay.milab.idc.ac.il/json.php?cmd=GPPN",
            {
                'searchField': x
            },
            
     //creats the list of the restaurnt that came back from the seach
    function (data){
        console.log(data);
        places.data = data;
        var items = [];
        $.each(data, function(key, val) {
            places.current_place = val;
            items.push("<ul style=\"padding:0; margin:0;\">" +
                "<li style=\" height:14%; border-bottom: 1px solid gray;\"" + ">" +
                    "<div style=\"" + "float:left; width: 53%;\"" + ">" +
                     "<a href=\"" + "#\"" + "><img src=\"" + "images/leftArrow.jpg\"" + "style=\"" + "width: 4%; margin-right: 11.6%;\"" + "></a>" +
                       "$(\"#parkingList\").attr('src', \"images/parking_icon\"" + places.current_place.parking + "\".jpg\");" +
                       "$(\"#entranceList\").attr('src', \"images/entrance_icon\"" + places.current_place.entrance + "\".jpg\");" +
                       "$(\"#insideList\").attr('src', \"images/inside_icon\"" + places.current_place.inside + "\".jpg\");" +
                       "$(\"#restroomList\").attr('src', \"images/restroom_icon\"" + places.current_place.restroom + "\".jpg\");" +
                   "</div>" +
                   "<div style=\"float:right; width: 47%; text-align: right; \">" +
                   "<a data-place-id=\"" + val.google_place_id + "\" href=\"http://avivshay.milab.idc.ac.il/json.php?cmd=PLACE&place_id=" + val.google_place_id + "\" class=\" ui-btn ui-btn-icon-right ui-icon-carat-r place-btn\"><div style=\"font-size: 1.4rem; color: #2bb98b;\">" + val.name + "</div></a>" +
                   "<div style=\"font-size: 0.8rem; color: black;\">5 km from your position</div>" +
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



//sends true when pressing the icon 
function changeIcon()
{
    //       document.getElementById("parking_icon").style.listStyleImage = "url("../images/space_icon.jpg")";

    // call server
    $.getJSON("http://avivshay.milab.idc.ac.il/json.php",
            {
                'parking_icon': 'true'
            });
}
//Extends the map to the whole page
 //   function showMap()
   // {
     //    initialize("app");
         //$("#app").hide();
   // }
