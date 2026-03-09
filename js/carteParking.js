const CHATEAURENARD = [43.8833,4.8544]

let map
let marker
let routeLine

export function initCarte(){

map = L.map("map").setView(CHATEAURENARD,10)

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{
maxZoom:19
}).addTo(map)

marker = L.marker(CHATEAURENARD,{draggable:true}).addTo(map)

calculRoute(CHATEAURENARD)

marker.on("dragend", () => {

const pos = marker.getLatLng()

calculRoute([pos.lat,pos.lng])

})

}

/* géocodage lieu */

export function chercherLieu(){

const texte = document.getElementById("lieuRecherche").value

fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${texte}`)

.then(r=>r.json())

.then(data=>{

if(!data.length) return

const lat = parseFloat(data[0].lat)
const lon = parseFloat(data[0].lon)

marker.setLatLng([lat,lon])

map.setView([lat,lon],11)

calculRoute([lat,lon])

})

}

/* calcul itinéraire routier */

function calculRoute(dest){

const url =
`https://router.project-osrm.org/route/v1/driving/` +
`${CHATEAURENARD[1]},${CHATEAURENARD[0]};` +
`${dest[1]},${dest[0]}?overview=full&geometries=geojson`

fetch(url)

.then(r=>r.json())

.then(data=>{

const route = data.routes[0]

/* distance réelle */

const distanceKm = route.distance / 1000

const AR = (distanceKm*2).toFixed(1)

document.getElementById("distanceAR").textContent = AR
import { calculCovoiturage } from "./covoiturage.js"

calculCovoiturage()

/* tracé */

if(routeLine) map.removeLayer(routeLine)

routeLine = L.geoJSON(route.geometry,{
style:{
color:"#007bff",
weight:4
}
}).addTo(map)

map.fitBounds(routeLine.getBounds())

})

}
