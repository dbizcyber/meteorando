import { calculCovoiturage } from "./covoiturage.js"
import { afficherMeteo } from "./meteoRando.js"
const CHATEAURENARD = [43.88808,4.84882];

let map
let marker
let routeLine

export function initCarte(){

map = L.map("map").setView(CHATEAURENARD,10)

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{
maxZoom:19
}).addTo(map)

marker = L.marker(CHATEAURENARD,{draggable:true}).addTo(map)
  
/* stockage coordonnées parking */
window.coordsParking = [
CHATEAURENARD[0],
CHATEAURENARD[1]
]

calculRoute(CHATEAURENARD)
afficherMeteo(CHATEAURENARD[0],CHATEAURENARD[1])

marker.on("dragend", () => {

const pos = marker.getLatLng()

/* stockage coordonnées */
window.coordsParking = pos.lat + "," + pos.lng

calculRoute([pos.lat,pos.lng])

afficherMeteo(pos.lat,pos.lng)
})

}

/* géocodage lieu */

export function chercherLieu(){

const texte = document.getElementById("lieuRecherche").value

fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${texte}`)

.then(r=>r.json())

.then(data=>{

document.getElementById("parkingRandoAdresse").textContent =
data[0].display_name

if(!data.length) return

const lat = parseFloat(data[0].lat)
const lon = parseFloat(data[0].lon)

marker.setLatLng([lat,lon])

map.setView([lat,lon],11)
  
/* stockage coordonnées */
window.coordsParking = lat + "," + lon
  
calculRoute([lat,lon])
afficherMeteo(lat,lon)

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

  /* mise à jour GPS affiché */

document.getElementById("latParking").textContent =
dest[0].toFixed(5)

document.getElementById("lonParking").textContent =
dest[1].toFixed(5)

/* stockage coordonnées pour le résumé */

window.coordsParking =
dest[0].toFixed(5) + "," + dest[1].toFixed(5)
/* distance réelle */

const distanceKm = route.distance / 1000

const AR = (distanceKm*2).toFixed(1)

document.getElementById("distanceAR").textContent = AR

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
