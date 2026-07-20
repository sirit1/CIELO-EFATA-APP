document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app');
    if (app) {
        app.innerHTML = '<h1 style="color: white; font-size: 3rem;">¡Sistema Blindado y Cargado!</h1>';
    } else {
        console.error("El contenedor #app NO EXISTE en el DOM.");
    }
});