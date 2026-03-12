console.log("app.js chargé automatiquement");
// récupération des éléments

const rechercheInput = document.getElementById("rechercheRando");
const suggestionsDiv = document.getElementById("suggestions");
const nomRando = document.getElementById("nomRando");


// exemple de données randonnées
// à remplacer plus tard par ton API

const randos = [

{nom:"Mont Ventoux"},
{nom:"Mont Aigoual"},
{nom:"Sainte Victoire"},
{nom:"Calanques de Cassis"},
{nom:"Pic Saint Loup"},
{nom:"Dentelles de Montmirail"}

];


// afficher les suggestions

function afficherSuggestions(resultats){

suggestionsDiv.innerHTML="";

resultats.forEach(rando=>{

const div=document.createElement("div");

div.className="suggestion";

div.textContent=rando.nom;


// clic sur une suggestion

div.addEventListener("click",()=>{

nomRando.value=rando.nom;

rechercheInput.value=rando.nom;

suggestionsDiv.innerHTML="";

});

suggestionsDiv.appendChild(div);

});

}


// recherche dynamique

rechercheInput.addEventListener("input",()=>{

const texte=rechercheInput.value.toLowerCase();

if(texte.length<2){

suggestionsDiv.innerHTML="";

return;

}

const resultats=randos.filter(r=> 
r.nom.toLowerCase().includes(texte)
);

afficherSuggestions(resultats);

});


// fermer suggestions si clic ailleurs

document.addEventListener("click",(e)=>{

if(!e.target.closest(".search-rando")){

suggestionsDiv.innerHTML="";

}

});
