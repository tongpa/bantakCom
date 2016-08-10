

var map ;
var mgr ; 

function initialize() {
	      if (GBrowserIsCompatible()) {
	        	map = new GMap2(document.getElementById("map_canvas"));
	       // map.setMapType(G_SATELLITE_MAP);
	       //	map.setMapType(G_HYBRID_MAP);
			//  map.addControl(new GLargeMapControl());
	         // map.addControl(new GOverviewMapControl());
			  	map.setCenter(new GLatLng(17.085932, 99.063094), 12);
			//  map.enableDoubleClickZoom();
			  	mgr = new MarkerManager(map, {trackMarkers:true});
		 		map.setUIToDefault();
				//rotation
				map.enableRotation();
				
	        	var markers = loaddata(map,1);
	        	 disableIconAll(1);
				mgr.addMarkers(markers,0,17 );
				mgr.refresh(); 
	      }
	     
	    }

function showData(value){
	//alert(value);
	disableIconAll(value); 
	clearMarkers(value);
	loaddataOnclick(value);
}
function mounseovers(){
	document.body.style.cursor='pointer';
}
function mouseouts(){
	document.body.style.cursor='auto';
}

 function clearMarkers() {
      mgr.clearMarkers();
     
   } 
   
function loaddataOnclick(value){
	
	var markers = loaddata(map,value);
	mgr.addMarkers(markers,0,17 );
	mgr.refresh(); 
}
   
function loaddata(map,value){

//	debugger;
	var shadowIcon = new GIcon(G_DEFAULT_ICON);
    shadowIcon.shadow = "/images/marker/shadow50.png";
    shadowIcon.iconSize = new GSize(20, 34);
    shadowIcon.shadowSize = new GSize(37, 34);
    shadowIcon.iconAnchor = new GPoint(9, 34);
    shadowIcon.infoWindowAnchor = new GPoint(9, 2);
    
	var makers = new Array();
	if(value == 1){
		makers = markerChild(map, shadowIcon , value);	
	}
	if(value == 2){
		makers = markerChild(map, shadowIcon , value);	
	}
	
	if(value == 3){
		makers = markerschool(map, shadowIcon , value);	
	}
	if(value == 4){
		makers = markerschool(map, shadowIcon , value);	
	}
	if(value == 5){
		makers = markerschool(map, shadowIcon , value);	
	}
	if(value == 6){
		makers = markerschool(map, shadowIcon , value);	
	}
	
	
	if(value == 7){
		makers = markersenior(map, shadowIcon , value);	
	}
	if(value == 8){
		makers = markersenior(map, shadowIcon , value);	
	}
	if(value == 9){
		makers = markersenior(map, shadowIcon , value);	
	}
	return makers;
	
	
}

function markersenior(map , shadowIcon , value){
	var length = data_senior.length; 
	var makers = new Array();
	//console.log(length);
	var i=0;
	for ( i =0; i < length ; i++){
		//console.log(i);
		var data = data_senior[i];
		//debugger;
		var marker;
		if(value ==7){
			marker = markpoint(map , shadowIcon , data.kpi1 , data.title , data.myHtml_kpi1 , data.lat , data.lng);
		}
		if(value == 8) {
			marker = markpoint(map , shadowIcon , data.kpi2 , data.title , data.myHtml_kpi2 , data.lat , data.lng);
		}
		if(value == 9) {
			marker = markpoint(map , shadowIcon , data.kpi3 , data.title , data.myHtml_kpi3 , data.lat , data.lng);
		}
		 
		makers.push(marker);
		//console.log(data.lng+0.00658);
		//markpoint(map , shadowIcon , data.kpi2 , data.title , data.myHtml_kpi2 , data.lat , data.lng+0.00658);
	} 
	return makers;
} 

function markerschool(map , shadowIcon , value){
	var length = data_school.length; 
	var makers = new Array();
	//console.log(length);
	var i=0;
	for ( i =0; i < length ; i++){
		//console.log(i);
		var data = data_school[i];
		//debugger;
		var marker;
		if(value ==3){
			marker = markpoint(map , shadowIcon , data.kpi1 , data.title , data.myHtml_kpi1 , data.lat , data.lng);
		}
		if(value == 4) {
			marker = markpoint(map , shadowIcon , data.kpi2 , data.title , data.myHtml_kpi2 , data.lat , data.lng);
		}
		if(value == 5) {
			marker = markpoint(map , shadowIcon , data.kpi3 , data.title , data.myHtml_kpi3 , data.lat , data.lng);
		}
		if(value == 6) {
			marker = markpoint(map , shadowIcon , data.kpi4 , data.title , data.myHtml_kpi4 , data.lat , data.lng);
		}
		makers.push(marker);
		//console.log(data.lng+0.00658);
		//markpoint(map , shadowIcon , data.kpi2 , data.title , data.myHtml_kpi2 , data.lat , data.lng+0.00658);
	} 
	return makers;
} 


function markerChild(map , shadowIcon , value){
	var length = data_child.length; 
	var makers = new Array();
	//console.log(length);
	var i=0;
	for ( i =0; i < length ; i++){
		//console.log(i);
		var data = data_child[i];
		//debugger;
		var marker;
		if(value ==1){
			marker = markpoint(map , shadowIcon , data.kpi1 , data.title , data.myHtml_kpi1 , data.lat , data.lng);
		}
		if(value == 2) {
			marker = markpoint(map , shadowIcon , data.kpi2 , data.title , data.myHtml_kpi2 , data.lat , data.lng);
		}
		
		makers.push(marker);
		//console.log(data.lng+0.00658);
		//markpoint(map , shadowIcon , data.kpi2 , data.title , data.myHtml_kpi2 , data.lat , data.lng+0.00658);
	} 
	return makers;
} 



function markpoint(map, shadowIcon, imagePath, title, myHtml, Lat, Lng) {
    var point = new GLatLng(Lat, Lng);

    var blueIcon = new GIcon(shadowIcon);
    blueIcon.image = imagePath;
    var markerOptions = {
        icon: blueIcon,
		title: title
    };


    var marker = new GMarker(point, markerOptions);
    //marker.title = title;
    //marker.info_window_html = 'hello';
    marker.clickable = true;
    GEvent.addListener(marker, "click", function() {
        //var myHtml = '<img src="/images/rates/01.png" height="18" width="96"/> ';
        map.openInfoWindowHtml(point, '<span style="font-size:7px">' + title +  '</span><br/>' + myHtml);
    });
    
    map.addOverlay(marker);
    return marker;
}


function disableIconAll(value){
	 var pointers = document.getElementsByName('pointer');
	 var length = pointers.length;
	 var i =0;
	 
	 for (i = 0 ; i < length ; i++){
	 		 pointers[i].style.visibility = 'hidden'; 
	 		 if( value == ( i+1 )){
	 		// console.log('visible');
	 		 	pointers[i].style.visibility = 'visible';
	 		 }
	 		 
	 }
}