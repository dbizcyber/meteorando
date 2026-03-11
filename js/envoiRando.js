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
"https://https://whlxbfnmyqdflmxosfse.supabase.co/functions/v1/dynamic-handler",
{
method: "POST",
headers:{
"Content-Type":"application/json"
"apikey": "TA_SUPABASE_ANON_KEY"
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
