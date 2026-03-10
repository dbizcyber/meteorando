import { randos } from "../data/randos.js";

export function activerRecherche(){

const input = document.getElementById("rechercheRando")
const select = document.getElementById("rando")

if(!input || !select) return

input.addEventListener("input", () => {

const filtre = input.value.toLowerCase()
const options = select.options

for(let i=0;i<options.length;i++){

const texte = options[i].text.toLowerCase()

options[i].style.display =
texte.includes(filtre) ? "" : "none"

}

})

}
