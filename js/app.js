const App = {
    el: document.getElementById('app'),

    render: function () {
        if (!this.el) return;
        this.el.innerHTML = `
            <div class="max-w-xl mx-auto mt-20 p-10 bg-gray-900 rounded-3xl text-center text-white border border-white/10">
                <h1 class="text-3xl font-bold mb-6">¿Tus emociones te controlan?</h1>
                <button id="btn-start" class="bg-purple-600 px-8 py-4 rounded-xl font-bold">Iniciar Evaluación</button>
            </div>
        `;
        // Usamos addEventListener, es mucho más seguro que onclick
        document.getElementById('btn-start').addEventListener('click', () => {
            alert("¡El sistema está vivo! Vamos a comenzar.");
        });
    }
};

// Exponemos App globalmente para que el navegador siempre lo encuentre
window.App = App;

// Ejecutamos cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => App.render());