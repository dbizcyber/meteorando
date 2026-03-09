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
