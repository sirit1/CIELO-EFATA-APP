document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app');
    if (!app) {
        console.error("El contenedor #app no existe");
        return;
    }
    app.innerHTML = `<h1 class="text-white text-3xl">¡Sistema Blindado y Cargado!</h1>`;
});