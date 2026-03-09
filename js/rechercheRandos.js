import { randos } from "../data/randos.js";

export function activerRecherche() {

const champ = document.getElementById("rechercheRando");
const select = document.getElementById("nomRando");

champ.addEventListener("input", () => {

const filtre = champ.value.toLowerCase();

select.innerHTML = "";

randos
.filter(r => r.toLowerCase().includes(filtre))
.forEach(r => {

const option = document.createElement("option");
option.value = r;
option.textContent = r;

select.appendChild(option);

});

});

}
