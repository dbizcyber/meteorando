export function activerRecherche(){

const input = document.getElementById("rechercheRando")
const select = document.getElementById("rando")

if(!input || !select) return

/* sauvegarde liste complète */

const toutesRandos = [...select.options].map(o => o.value)

input.addEventListener("input", () => {

const filtre = input.value.toLowerCase()

/* vider menu */

select.innerHTML = ""

/* reconstruire */

toutesRandos.forEach(rando => {

if(rando.toLowerCase().includes(filtre)){

const option = document.createElement("option")
option.value = rando
option.textContent = rando

select.appendChild(option)

}

})

})

/* remplir Nom rando automatiquement */

select.addEventListener("change", () => {

document.getElementById("nomRando").value = select.value

})

}
