export function activerRecherche(){

const input = document.getElementById("rechercheRando")
const select = document.getElementById("rando")

if(!input || !select) return

input.addEventListener("input", () => {

const filtre = input.value.toLowerCase()

const options = select.options

for(let i=0;i<options.length;i++){

const texte = options[i].text.toLowerCase()

options[i].hidden = !texte.includes(filtre)

}

})

/* remplir automatiquement le nom de la rando */

select.addEventListener("change", () => {

document.getElementById("nomRando").value = select.value

})

}
