let mymap;
let tempMarker = {};
let lastMark;

// https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png

function setMark(e){
  lastMark = this;
}

function addMemory(json_latlng){
console.log("cool");
}

function delCoord(latlng){
  const	url = location.href + "delete-coordinate";

  fetch(url, {
    method: 'POST',
    redirect: "follow",
    body: JSON.stringify({latlng:JSON.stringify(latlng)}),
    headers:{
      'Content-Type': 'application/json'
    }
  }).then(response => console.log('Success'))
  .catch(error => console.error('Error:', error));
  mymap.removeLayer(lastMark);
}

function getEntry(latlng, entry_id){

  console.log("nice!")
}

function setCoordWithLatLng(latlng){
  const ll = JSON.stringify(latlng);
  const icon = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
   iconSize:     [25, 41], // size of the icon
   shadowSize:   [41, 41], // size of the shadow
    iconAnchor:   [12, 41], // point of the icon which will correspond to marker's location
    popupAnchor:  [1, -34] // point from which the popup should open relative to the iconAnchor
});
// <button onClick="javascript:window.location.href='/secure/edit.aspx?id=671'">Edit</button>
  const newCord = L.marker(latlng, {icon}).bindPopup(`<button onclick="javascript:window.location.href='/add-memory/${encodeURI(ll)}'">Add Memory</button><button onclick='delCoord(${ll})'>Delete Location</button>`).on("click", setMark).addTo(mymap);
}
function setCoordWithCoord(coord){
  const ll = coord.latlng;
  const icon = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
   iconSize:     [25, 41], // size of the icon
   shadowSize:   [41, 41], // size of the shadow
    iconAnchor:   [12, 41], // point of the icon which will correspond to marker's location
    popupAnchor:  [1, -34] // point from which the popup should open relative to the iconAnchor
});
// <button onClick="javascript:window.location.href='/secure/edit.aspx?id=671'">Edit</button>
let popup = `<button onclick="javascript:window.location.href='/add-memory/${encodeURI(ll)}'">Add Memory</button><button onclick='delCoord(${ll})'>Delete Location</button><br>`
coord.memories.forEach((mem)=>{
  popup += `<p>${mem.date} <b>${mem.title}</b> <button onclick='getEntry(${ll}, ${mem._id})'>view</button></p><br>`;
});
  const newCord = L.marker(JSON.parse(ll), {icon}).bindPopup(popup).on("click", setMark).addTo(mymap);

}

function setCoordinate(){
  setCoordWithLatLng(tempMarker.cords);
  mymap.removeLayer(tempMarker.marker);


    const	url = location.href + "add-coordinate";
    const data = {latlng: JSON.stringify(tempMarker.cords)};
    console.log("url: ", url);
console.log("data: ", data);
fetch(url, {
  method: 'POST',
  redirect: "follow",
  body: JSON.stringify(data),
  headers:{
    'Content-Type': 'application/json'
  }
}).then(response => console.log('Success'))
.catch(error => console.error('Error:', error));

  tempMarker = {};
}



function addNewPoint(){
const marker = new L.marker(mymap.getCenter(),{
  draggable: true,
  autoPan: true
}).bindPopup("<button onclick='setCoordinate()'>Add</button>").on("dragend", (c) => {tempMarker.cords = c.target._latlng;});
tempMarker = {marker, cords:mymap.getCenter()};
marker.on("click", setMark);
marker.addTo(mymap);
}

function loadStoredUserCoordinates(){
	const	url = location.href + "user-coordinates";
  fetch(url).then(function(response) {
    return response.json();
  }).then(function(myJson) {
    myJson.forEach((coord) => {
      console.log(coord);
      // setCoordWithLatLng(JSON.parse(coord.latlng));
      setCoordWithCoord(coord);
    });
  });
}

function addStoredUserCoordinates(coords){
  coords.forEach((coord) => {
    setCoordWithLatLng(JSON.parse(coord.latlng));
  });

}





function start(){
if(location.origin+"/" === location.href){ //only load map on main page
  mymap = L.map('mymap').setView([40.726609, -73.998935], 25);
  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoiYm9hdHNoYW1hbiIsImEiOiJjanVkODVnbXEwZjQxNDlyeWd1eGc3cml1In0.Oc4VqV4xIckH6tt0XZ0iHg'
}).addTo(mymap);



document.getElementById("add-btn").onclick = addNewPoint
loadStoredUserCoordinates();
}

}








document.addEventListener("DOMContentLoaded", start);
