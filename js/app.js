document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app');
    if (!app) {
        console.error("El contenedor #app no existe en el DOM");
        return;
    }

    // Estructura inicial de tu aplicación modular
    app.innerHTML = `
        <div style="text-align: center; color: white; font-family: sans-serif; margin-top: 20vh;">
            <h1>Cielo Efata</h1>
            <p>Arquitectura modular externa activa y conectada.</p>
        </div>
    `;
});
