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

let randos = []

async function chargerRandos(){

const url="https://whlxbfnmyqdflmxosfse.supabase.co/rest/v1/randos_lst?select=resume"

const key="TON_ANON_KEY"

const res = await fetch(url,{
headers:{apikey:key}
})

const data = await res.json()

randos = data.map(r=>{

const premiereLigne = r.resume.split("\n")[0]

return {
nom: premiereLigne,
resume: r.resume
}

})

}

chargerRandos()
const inputRando = document.getElementById("rechercheRando")
const suggestions = document.getElementById("suggestions")
const nomRando = document.getElementById("nomRando")

inputRando.addEventListener("input", () => {

const texte = inputRando.value.toLowerCase()

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

nomRando.value=r.nom
inputRando.value=r.nom
suggestions.innerHTML=""

}

suggestions.appendChild(div)

})

})
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


document.addEventListener("DOMContentLoaded", () => {

/* randos */

remplirMenu();
activerRecherche();
  console.log("recherche activée");
initHoraires();

/* animateurs */

remplirMenuAnimateurs();

gestionAutreAnimateur();

/* parkings covoiturage */
gestionAutreParking();

/* carte parking rando */

initCarte();

document
.getElementById("btnGeocoder")
.addEventListener("click", chercherLieu);

/* météo */

/* cout covoiturage */

document
.getElementById("autoroute")
.addEventListener("input", calculCovoiturage);

/* gpx */

initGPX();
initProfilGPX();

/* résumé + envoi */

initResume();
initEnvoi();

});
