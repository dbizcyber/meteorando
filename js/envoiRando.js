console.log("envoiRandos.js chargé")
export function initEnvoi() {

  document
    .getElementById("btnEnvoyer")
    .addEventListener("click", envoyerRando)

}

async function envoyerRando() {
   console.log("envoyerRando déclenché")

  try {

    const resume =
      document.getElementById("resumeRando").textContent.trim()

    const emailUser =
      document.getElementById("emailUser").value.trim()

    if (!resume) {
      alert("Veuillez générer le résumé avant l'envoi")
      return
    }

    if (!emailUser) {
      alert("Veuillez saisir un email")
      return
    }

    /* ===== récupération du profil altimétrique ===== */

    let profilPNG = null

    const canvas = document.getElementById("profilAltitude")

    if(canvas){
      profilPNG = canvas.toDataURL("image/png")
    }
    console.log("profilPNG longueur:", profilPNG ? profilPNG.length : "null")
    console.log("resume:", resume)
    console.log("email:", emailUser)

    const response = await fetch(
      "https://whlxbfnmyqdflmxosfse.supabase.co/functions/v1/dynamic-handler",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndobHhiZm5teXFkZmxteG9zZnNlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI3ODA5MTksImV4cCI6MjA4ODM1NjkxOX0.vf3sdnJRnnXyIx998fhPSIUPX0WS7KqDbvAwesCzOcE",
          "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndobHhiZm5teXFkZmxteG9zZnNlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI3ODA5MTksImV4cCI6MjA4ODM1NjkxOX0.vf3sdnJRnnXyIx998fhPSIUPX0WS7KqDbvAwesCzOcE"
        },
        body: JSON.stringify({
  resume: resume,
  emailUser: emailUser,
  profilPNG: profilPNG
        })
      }
    )

    const data = await response.json()

    if (data.success) {

      alert("PDF créé, email envoyé et profil enregistré")

    } else {

      alert("Erreur : " + data.error)

    }

  } catch (err) {

    alert("Erreur réseau : " + err.message)

  }

}

