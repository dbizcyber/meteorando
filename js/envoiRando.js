export function initEnvoi(){

document
.getElementById("btnEnvoyer")
.addEventListener("click", envoyerRando)

}

async function envoyerRando(){

const resume =
document.getElementById("resumeRando").textContent

const emailUser =
document.getElementById("emailUser").value

const response = await fetch(
"https://TON-PROJET.supabase.co/functions/v1/envoi-rando",
{
method: "POST",
headers:{
"Content-Type":"application/json"
},
body: JSON.stringify({

resume: resume,
emailUser: emailUser

})
}
)

const data = await response.json()

if(data.success){

alert("PDF créé et email envoyé")

}else{

alert("Erreur : " + data.error)

}

}
