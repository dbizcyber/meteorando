console.log("envoiRando.js chargé");

export function initEnvoi() {
  const btn = document.getElementById("btnEnvoyer");

  if (!btn) {
    console.warn("Bouton btnEnvoyer introuvable dans le DOM");
    return;
  }

  btn.addEventListener("click", envoyerRando);
  console.log("initEnvoi attaché au bouton");
}

async function envoyerRando() {
  console.log("envoyerRando déclenché");

  try {
    const resume = document.getElementById("resumeRando")?.textContent.trim();
    const emailUser = document.getElementById("emailUser")?.value.trim();

    if (!resume) {
      alert("Veuillez générer le résumé avant l'envoi");
      return;
    }
    if (!emailUser) {
      alert("Veuillez saisir un email");
      return;
    }

    /* récupération du profil altimétrique */
    let profilPNG = null;
    const canvas = document.getElementById("profilAltitude");
    if (canvas) {
      profilPNG = canvas.toDataURL("image/png");
      console.log("profilPNG longueur:", profilPNG.length);
    } else {
      console.warn("Canvas profilAltitude introuvable");
    }

    console.log("resume:", resume);
    console.log("email:", emailUser);

    /* envoi vers Supabase / fonction serverless */
    const response = await fetch(
      "https://whlxbfnmyqdflmxosfse.supabase.co/functions/v1/dynamic-handler",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "apikey": "VOTRE_API_KEY",
          "Authorization": "Bearer VOTRE_API_KEY"
        },
        body: JSON.stringify({
          resume: resume,
          emailUser: emailUser,
          profilPNG: profilPNG
        })
      }
    );

    const data = await response.json();

    if (data.success) {
      alert("PDF créé, email envoyé et profil enregistré");
    } else {
      alert("Erreur : " + (data.error || "inconnue"));
      console.error("Erreur renvoyée :", data);
    }

  } catch (err) {
    console.error(err);
    alert("Erreur réseau : " + err.message);
  }
}
