(function () {
    console.log("Cargando sistema...");

    // Definimos el objeto directamente dentro del scope para evitar errores
    const App = {
        render: function () {
            const container = document.getElementById('app');
            if (!container) {
                console.error("El div 'app' no existe en el HTML");
                return;
            }
            container.innerHTML = `
                <div class="max-w-xl mx-auto mt-20 p-10 bg-gray-900 rounded-3xl text-center text-white border border-white/10">
                    <h1 class="text-3xl font-bold mb-6">¿Tus emociones te controlan?</h1>
                    <button id="btn-start" class="bg-purple-600 px-8 py-4 rounded-xl font-bold">Iniciar Evaluación</button>
                </div>
            `;

            document.getElementById('btn-start').addEventListener('click', function () {
                alert("¡El sistema está respondiendo!");
            });
        }
    };

    // Ejecutar cuando el DOM esté listo
    window.addEventListener('DOMContentLoaded', () => App.render());
})();