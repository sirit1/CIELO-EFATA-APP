const app = {
    procesarEnvio: function () {
        console.log("Iniciando envío...");
        const nombre = document.getElementById('nombre-usuario').value;
        const email = document.getElementById('email-usuario').value;

        if (!nombre || !email) {
            alert("Por favor, completa tus datos.");
            return;
        }

        const diag = this.getInforme();

        fetch("https://script.google.com/macros/s/AKfycbxwDLeIYywbH3eSeJgXhvX-0sBjdk9QMzi6D-mxrMPfgJAwVxNj-4j1TtVWHAzef85u/exec", {
            method: "POST",
            mode: "no-cors",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nombre: nombre, email: email, resultado: diag.titulo })
        })
            .then(() => {
                console.log("Envío completado exitosamente");
                alert("¡Excelente decisión! Tu Guía de Restauración ha sido enviada.");
                location.reload();
            })
            .catch(error => {
                console.error("Error detectado:", error);
                alert("Hubo un pequeño error. Por favor intenta de nuevo.");
            });
    }
};