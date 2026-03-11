export function initEnvoi() {

  document
    .getElementById("btnEnvoyer")
    .addEventListener("click", envoyerRando)

}

async function envoyerRando() {

  try {

    const resume =
      document.getElementById("resumeRando").textContent

    const emailUser =
      document.getElementById("emailUser").value

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
          emailUser: emailUser
        })
      }
    )

    const data = await response.json()

    if (data.success) {

      alert("PDF créé et email envoyé")

    } else {

      alert("Erreur : " + data.error)

    }

  } catch (err) {

    alert("Erreur réseau : " + err.message)

  }

}
