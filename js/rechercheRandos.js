import { randos } from "../data/randos.js";

export function activerRecherche(){

const champ = document.getElementById("rechercheRando");
const select = document.getElementById("rando");

champ.addEventListener("input", () => {

const texte = champ.value.toLowerCase();

select.innerHTML = "";

randos
.filter(r => r.nom.toLowerCase().includes(texte))
.forEach(r => {

const option = document.createElement("option");

option.value = r.nom;
option.textContent = r.nom;

select.appendChild(option);

});

});

}
