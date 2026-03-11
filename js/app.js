console.log("APP JS DEMARRE");

import { remplirMenu } from "./menuRandos.js";
import { activerRecherche } from "./rechercheRandos.js";
import { initHoraires } from "./horairesRando.js";
import { remplirMenuAnimateurs } from "./menuAnimateurs.js";
import { activerRechercheAnimateur } from "./rechercheAnimateur.js";
import { remplirMenuParkings } from "./menuParkings.js";
import { initCarte, chercherLieu } from "./carteParking.js";
import { calculCovoiturage } from "./covoiturage.js";
import { initGPX } from "./gpxAnalyse.js";
import { initProfilGPX } from "./profilAltitude.js";
import { afficherMeteo } from "./meteoRando.js";
import { initResume } from "./resumeRando.js";
import { initEnvoi } from "./envoiRando.js";

/* -----------------------------
   AUTOCOMPLETION RANDOS
--------------------------------*/

let randos = []

async function chargerRandos(){

const url="https://whlxbfnmyqdflmxosfse.supabase.co/rest/v1/randos_lst?select=resume"

const key="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndobHhiZm5teXFkZmxteG9zZnNlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI3ODA5MTksImV4cCI6MjA4ODM1NjkxOX0.vf3sdnJRnnXyIx998fhPSIUPX0WS7KqDbvAwesCzOcE"

try{

const res = await fetch(url,{headers:{apikey:key}})
const data = await res.json()

randos = data.map(r=>{
const premiereLigne = r.resume.split("\n")[0]
return { nom: premiereLigne }
})

}catch(e){
console.error("Erreur chargement randos",e)
}

}

function activerAutocompleteRandos(){

const input = document.getElementById("rechercheRando")
const suggestions = document.getElementById("suggestions")
const champNom = document.getElementById("nomRando")

if(!input || !suggestions || !champNom) return

input.addEventListener("input", ()=>{

const texte = input.value.toLowerCase()

suggestions.innerHTML=""

if(texte.length < 2) return

const filtres = randos.filter(r =>
r.nom.toLowerCase().includes(texte)
)

filtres.slice(0,10).forEach(r=>{

const div=document.createElement("div")
div.className="suggestion"
div.textContent=r.nom

div.onclick=()=>{
champNom.value=r.nom
input.value=r.nom
suggestions.innerHTML=""
}

suggestions.appendChild(div)

})

})

}

/* -----------------------------
   AUTRE ANIMATEUR
--------------------------------*/

function gestionAutreAnimateur(){

const select = document.getElementById("animateur");
const champ = document.getElementById("nouvelAnimateur");

select.addEventListener("change", () => {

if(select.value.startsWith("Autre")){
champ.style.display = "block";
champ.focus();
}else{
champ.style.display = "none";
champ.value = "";
}

});

}

/* -----------------------------
   AUTRE PARKING
--------------------------------*/

function gestionAutreParking(){

const select = document.getElementById("parkingCovoiturage");
const champ = document.getElementById("nouveauParking");

select.addEventListener("change", () => {

if(select.value.startsWith("Autre")){
champ.style.display = "block";
champ.focus();
}else{
champ.style.display = "none";
champ.value = "";
}

});

}

/* -----------------------------
   INITIALISATION
--------------------------------*/

document.addEventListener("DOMContentLoaded", async () => {

/* charger randos autocomplete */

await chargerRandos()
activerAutocompleteRandos()

/* randos existantes */

remplirMenu()
activerRecherche()
initHoraires()

/* animateurs */

remplirMenuAnimateurs()
gestionAutreAnimateur()

/* parkings */

gestionAutreParking()

/* carte */

initCarte()

document
.getElementById("btnGeocoder")
.addEventListener("click", chercherLieu)

/* covoiturage */

document
.getElementById("autoroute")
.addEventListener("input", calculCovoiturage)

/* gpx */

initGPX()
initProfilGPX()

/* résumé */

initResume()

/* envoi */

initEnvoi()

})
