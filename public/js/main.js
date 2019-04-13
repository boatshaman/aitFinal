let mymap;
let tempMarker = {};

// https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png

function setCoordinate(){
  console.log(tempMarker);
  const icon = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    // shadowUrl: 'leaf-shadow.png',
    //
   iconSize:     [38, 95], // size of the icon
    shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [1, -34] // point from which the popup should open relative to the iconAnchor
});

  const newCord = L.marker(tempMarker.cords).bindPopup("Heyoooo").addTo(mymap);
  // console.log(currCords);
  mymap.removeLayer(tempMarker.marker);

  tempMarker = {};
}


function start(){



  mymap = L.map('mymap').setView([40.726609, -73.998935], 25);
  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoiYm9hdHNoYW1hbiIsImEiOiJjanVkODVnbXEwZjQxNDlyeWd1eGc3cml1In0.Oc4VqV4xIckH6tt0XZ0iHg'
}).addTo(mymap);

function addNewPoint(){
const marker = new L.marker(mymap.getCenter(),{
  draggable: true,
  autoPan: true
}).bindPopup("<button onclick='setCoordinate()'>Add</button>").on("dragend", (c) => {tempMarker.cords = c.target._latlng;});
tempMarker = {marker, cords:mymap.getCenter()};
marker.addTo(mymap);
}

document.getElementById("add-btn").onclick = addNewPoint


}








document.addEventListener("DOMContentLoaded", start);
