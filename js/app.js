import { remplirMenu } from "./menuRandos.js";
console.log("Options rando :", document.getElementById("rando").options.length);
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

/* randonnées */

remplirMenu();
activerRecherche();
initHoraires();

/* animateurs */

remplirMenuAnimateurs();
activerRechercheAnimateur();
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
});
