export function activerRecherche(){

const input = document.getElementById("rechercheRando")
const select = document.getElementById("rando")

if(!input || !select) return

const options = Array.from(select.options)

input.addEventListener("input", () => {

const filtre = input.value.toLowerCase()

select.innerHTML = ""

options.forEach(opt => {

if(opt.text.toLowerCase().includes(filtre)){

select.appendChild(opt.cloneNode(true))

}

})

})

/* remplir automatiquement Nom rando */

select.addEventListener("change", () => {

document.getElementById("nomRando").value = select.value

})

}
