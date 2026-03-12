console.log("Recherche activée, options :", select.options.length);
export function activerRecherche(){

const input = document.getElementById("rechercheRando");
const select = document.getElementById("rando");

if(!input || !select){
console.warn("Champ recherche ou select rando introuvable");
return;
}

console.log("Nombre de randonnées :", select.options.length);


/* filtrage des randonnées */

input.addEventListener("input", function(){

const filtre = input.value.toLowerCase();

for(const option of select.options){

const texte = option.text.toLowerCase();

option.hidden = !texte.includes(filtre);

}

});


/* remplir automatiquement le nom */

select.addEventListener("change", () => {

const champNom = document.getElementById("nomRando");

if(champNom){
champNom.value = select.value;
}

});

}
