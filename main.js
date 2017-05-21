	
var newPage = 0;
var chunkSize = 9;
var array = [];
var type = [];
var width=screen.width;
var height=screen.height;
var orientation;


// Listen for orientation changes
window.addEventListener("orientationchange", function() {
	// Announce the new orientation number
	// alert(window.orientation);
	orientation=window.orientation;


//Device in portait orientation
	if (orientation==0) {
		
		document.getElementById("nav-area").className = "nav-area-portrait top-zero";
		document.getElementById("display-area").className = "display-area-portrait margin-top";
	}


//Device in landscape orientation

	if (orientation==90) {

		document.getElementById("nav-area").className = "nav-area left-zero";
		document.getElementById("display-area").className = "display-area right";
	}



}, false);


// Device with height is greater than width

if (width<height) {

	document.getElementById("nav-area").className = "nav-area-portrait top-zero";
	document.getElementById("display-area").className = "display-area-portrait margin-top";
}


// Device with width is greater than height 

if (width>height) {

	document.getElementById("nav-area").className = "nav-area left-zero";
	document.getElementById("display-area").className = "display-area right";
}



// To display first 9 chunks data, show_Chunks() function is called 9 times
// Time delay is set to get chunks data in correct order

	setTimeout(show_Chunks, 0000);
	setTimeout(show_Chunks, 200);
	setTimeout(show_Chunks, 400);
	setTimeout(show_Chunks, 600);
	setTimeout(show_Chunks, 800);
	setTimeout(show_Chunks, 1000);
	setTimeout(show_Chunks, 1200);
	setTimeout(show_Chunks, 1400);
	setTimeout(show_Chunks, 1600);


function show_Chunks()
{
	var url ='http://tmaserv.scem.uws.edu.au/chapters/?n='
	var xhr = new XMLHttpRequest();
	xhr.open('GET', url + newPage++, true);
	xhr.onreadystatechange = function(){
		if(xhr.readyState == 4 && xhr.status == 200){
			obj =(xhr.responseText);
			JSON.parse(xhr.responseText);
			obj = JSON.parse(obj);
			// console.log(obj);
			array.push(obj.data);
			type.push(obj.type);

			console.log('array-length: '+array.length);
			
			if(array.length > chunkSize){
				array.shift();
				type.shift();
			}

			for (var i= 0; i < array.length; ++i){
				// var h1= document.createElement('h1');
				// var h1= document.createElement('h3');
				// var h1= document.createElement('p');
				var sec = document.getElementById("section" + i);

				if(type[i]=="bigheading"){

					// document.getElementById("section" + i).innerHTML= array[i];
					document.getElementById("section" + i).innerHTML= '<h1>'+array[i]+'<h1>';

				}

				if(type[i]=="heading"){

					// document.getElementById("section" + i).innerHTML= array[i];
					document.getElementById("section" + i).innerHTML= '<h3>'+array[i]+'<h3>';

				}

				if(type[i]=="paragraph"){

					// document.getElementById("section" + i).innerHTML= array[i];
					document.getElementById("section" + i).innerHTML= '<p>'+array[i]+'<p>';

				}

			} //for
		} //if
	}  //xhr

	xhr.send();

}	//function


// Location

 // geoLocation() function is called on document load, check body opening tag onload="getLocation();"

	function getLocation() {
    if(navigator.geolocation) {

    	//if success geoSuccess() function is called, if error occurs, geoError() function is called
		navigator.geolocation.getCurrentPosition(geoSuccess, geoError); 
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    }


// This is success function:

function geoSuccess(position) {
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;
    // alert("lat:" + lat + " lng:" + lng);
    codeLatLng(lat, lng); //this function converts lat, lng coordinates to physicall address
}



//This is error function

function geoError() {
    // alert("Geocoder failed.");
    document.getElementById('location').innerHTML='Unable to Access Location Information displayed in its place';
}


//And here's the code for that function:

var geocoder;

function initialize() {
    geocoder = new google.maps.Geocoder();
}

function codeLatLng(lat, lng) {

	// geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(lat, lng);
    geocoder.geocode({'latLng': latlng}, function(results, status) {
      if(status == google.maps.GeocoderStatus.OK) {
          console.log(results)
          if(results[1]) {
              //formatted address
              var address = results[0].formatted_address;
               document.getElementById('location').innerHTML=results[1].formatted_address;
              // alert("address = " + address);
          } else {
              alert("No results found");
          }
      } else {
          alert("Geocoder failed due to: " + status);
      }
    });
}