const App = {
    el: document.getElementById('app'),
    pasoActual: 0,
    puntaje: 0,

    // Delegación de eventos: El contenedor escucha todo
    init: function () {
        if (!this.el) return;
        this.render();
        this.el.addEventListener('click', (e) => {
            if (e.target.id === 'start-btn') this.iniciarEvaluacion();
            if (e.target.id === 'btn-final') this.renderFinal();
            if (e.target.id === 'btn-enviar') this.procesarEnvio();
        });
    },

    render: function () {
        this.el.innerHTML = `
            <div class="max-w-4xl mx-auto p-10 bg-gray-900 rounded-3xl text-center text-white">
                <h1 class="text-4xl font-bold mb-8">¿Tus emociones te controlan?</h1>
                <button id="start-btn" class="bg-purple-600 px-8 py-4 rounded-xl font-bold">Iniciar Evaluación</button>
            </div>
        `;
    },

    iniciarEvaluacion: function () {
        this.pasoActual = 0;
        this.puntaje = 0;
        this.renderPregunta();
    },

    renderPregunta: function () {
        this.el.innerHTML = `
            <div class="max-w-4xl mx-auto p-10 bg-gray-900 rounded-3xl text-center text-white">
                <h2 class="text-2xl mb-6">Pregunta ${this.pasoActual + 1}</h2>
                <div class="flex gap-4 justify-center">
                    <button onclick="App.responder(true)" class="bg-white text-black px-6 py-2 rounded">Sí</button>
                    <button onclick="App.responder(false)" class="bg-gray-700 px-6 py-2 rounded">No</button>
                </div>
            </div>
        `;
    },

    responder: function (esSi) {
        if (esSi) this.puntaje++;
        this.pasoActual++;
        if (this.pasoActual < 7) this.renderPregunta();
        else this.renderCaptura();
    },

    renderCaptura: function () {
        this.el.innerHTML = `
            <div class="max-w-4xl mx-auto p-10 bg-gray-900 rounded-3xl text-center text-white">
                <input type="text" id="nombre-usuario" placeholder="Nombre" class="w-full p-3 mb-2 bg-gray-800 text-white rounded">
                <input type="email" id="email-usuario" placeholder="Email" class="w-full p-3 mb-4 bg-gray-800 text-white rounded">
                <button id="btn-final" class="w-full bg-purple-600 p-4 rounded text-white font-bold">Recibir diagnóstico</button>
            </div>
        `;
    },

    renderFinal: function () {
        this.el.innerHTML = `
            <div class="max-w-4xl mx-auto p-10 bg-gray-900 rounded-3xl text-center text-white">
                <h2 class="text-3xl font-bold mb-6">Diagnóstico listo</h2>
                <button id="btn-enviar" class="w-full bg-emerald-600 p-4 rounded text-white font-bold">Sí, quiero mi Guía</button>
            </div>
        `;
    },

    procesarEnvio: function () {
        const nombre = document.getElementById('nombre-usuario').value;
        const email = document.getElementById('email-usuario').value;
        fetch("https://script.google.com/macros/s/AKfycbxwDLeIYywbH3eSeJgXhvX-0sBjdk9QMzi6D-mxrMPfgJAwVxNj-4j1TtVWHAzef85u/exec", {
            method: "POST", mode: "no-cors",
            body: JSON.stringify({ nombre, email, resultado: "Evaluación completada" })
        }).then(() => { alert("¡Enviado!"); location.reload(); });
    }
};

window.addEventListener('DOMContentLoaded', () => App.init());