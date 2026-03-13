console.log("envoiRando.js chargé");

export function initEnvoi() {
  const btn = document.getElementById("btnEnvoyer");
  if (!btn) return console.warn("Bouton Envoyer introuvable !");
  btn.addEventListener("click", envoyerRando);
}

async function envoyerRando() {
  console.log("envoyerRando déclenché");

  // 1️⃣ Récupérer le résumé et l'email
  const resume = document.getElementById("resumeRando").textContent.trim();
  const emailUser = document.getElementById("emailUser").value.trim();

  if (!resume) return alert("Veuillez générer le résumé avant l'envoi");
  if (!emailUser) return alert("Veuillez saisir un email");

  // 2️⃣ Récupérer le profil altimétrique
  const canvas = document.getElementById("profilAltitude");
  if (!canvas) return alert("Profil altimétrique introuvable !");
  
  const profilPNG = canvas.toDataURL("image/png"); // Base64
  console.log("profilPNG longueur :", profilPNG.length);

  // 3️⃣ Envoyer vers Supabase
  try {
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
    );

    const data = await response.json();
    if (data.success) {
      alert("PDF créé, email envoyé et profil enregistré");
    } else {
      alert("Erreur : " + data.error);
    }
  } catch (err) {
    alert("Erreur réseau : " + err.message);
  }
}

    // ===== Envoi au serveur Supabase =====
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
          resume,
          emailUser,
          profilPNG
        })
      }
    );

    const data = await response.json();

    if (data.success) {
      alert("PDF créé, email envoyé et profil enregistré !");
    } else {
      alert("Erreur : " + data.error);
      console.error("Réponse serveur :", data);
    }

  } catch (err) {
    console.error("Erreur réseau ou JS :", err);
    alert("Erreur réseau : " + err.message);
  }
}
