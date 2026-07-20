// Esperamos a que todo cargue
window.addEventListener('DOMContentLoaded', () => {
    const contenedor = document.getElementById('app');

    if (!contenedor) {
        console.error("ERROR CRÍTICO: No existe el div con id='app'");
        return;
    }

    // Inyectamos el diseño directamente
    contenedor.innerHTML = `
        <div class="max-w-xl mx-auto mt-20 p-10 bg-gray-900 rounded-3xl text-center border border-white/10">
            <h1 class="text-4xl font-black mb-8 text-white">¡Cielo Efata está en línea!</h1>
            <button id="btn-prueba" class="bg-purple-600 px-8 py-4 rounded-xl font-bold">Probar Conexión</button>
        </div>
    `;

    document.getElementById('btn-prueba').addEventListener('click', () => {
        alert("El sistema funciona correctamente.");
    });
});