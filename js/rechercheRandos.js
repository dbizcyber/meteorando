export function activerRecherche(){

const input = document.getElementById("rechercheRando")
const select = document.getElementById("rando")

if(!input || !select) return

input.addEventListener("input", function(){

const filtre = input.value.toLowerCase()

for(const option of select.options){

const texte = option.text.toLowerCase()

option.hidden = !texte.includes(filtre)

}

})

/* remplir automatiquement le nom */

select.addEventListener("change", () => {

document.getElementById("nomRando").value = select.value

})

}
