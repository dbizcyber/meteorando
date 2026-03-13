import { remplirMenu } from "./menuRandos.js";
import { activerRecherche } from "./rechercheRandos.js";
import { initHoraires } from "./horairesRando.js";
import { remplirMenuAnimateurs } from "./menuAnimateurs.js";
import { remplirMenuParkings } from "./menuParkings.js";
import { initCarte, chercherLieu } from "./carteParking.js";
import { calculCovoiturage } from "./covoiturage.js";
import { initGPX } from "./gpxAnalyse.js";
import { initProfilGPX } from "./profilAltitude.js";
import { afficherMeteo } from "./meteoRando.js";
import { initResume } from "./resumeRando.js";
import { initEnvoi } from "./envoiRando.js";


/* gestion du champ "autre animateur" */

function gestionAutreAnimateur() {

const select = document.getElementById("animateur");
const champ = document.getElementById("nouvelAnimateur");

if(!select || !champ) return;

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


/* gestion du champ "autre parking" */

function gestionAutreParking(){

const select = document.getElementById("parkingCovoiturage");
const champ = document.getElementById("nouveauParking");

if(!select || !champ) return;

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


/* INITIALISATION APPLICATION */

document.addEventListener("DOMContentLoaded", () => {

console.log("Application MeteoRando initialisée");

/* date automatique */

const dateInput = document.getElementById("dateRando");

if(dateInput && !dateInput.value){
dateInput.value = new Date().toISOString().split("T")[0];
}

/* randonnées */

remplirMenu();
activerRecherche();
initHoraires();

/* animateurs */

remplirMenuAnimateurs();
gestionAutreAnimateur();

/* parkings covoiturage */

remplirMenuParkings();
gestionAutreParking();

/* carte parking rando */

initCarte();

const btnGeocoder = document.getElementById("btnGeocoder");

if(btnGeocoder){
btnGeocoder.addEventListener("click", chercherLieu);
}

/* coût covoiturage */

const autoroute = document.getElementById("autoroute");

if(autoroute){
autoroute.addEventListener("input", calculCovoiturage);
}

/* gpx */

initGPX();
initProfilGPX();

/* résumé + envoi */

initResume();
initEnvoi();

/* météo mise à jour si date change */

if(dateInput){

dateInput.addEventListener("change", () => {

const lat = document.getElementById("latParking").textContent;
const lon = document.getElementById("lonParking").textContent;

if(lat && lon){
afficherMeteo(lat, lon);
}

});

}

});
