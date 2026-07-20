(function () {
    console.log("Sistema Cielo Efata: Iniciando...");

    const state = {
        pasoActual: 0,
        puntaje: 0,
        preguntas: [
            "¿Sientes que tus reacciones ante el estrés son automáticas?",
            "¿Hay desconexión entre tus valores y tus decisiones diarias?",
            "¿Te sientes atrapado en pensamientos que no te pertenecen?",
            "¿El miedo determina tu toma de decisiones?",
            "¿Tu identidad está fragmentada por el entorno digital?",
            "¿Buscas validación externa para sentirte en paz?",
            "¿Reconoces la necesidad de una restauración profunda?"
        ]
    };

    const UI = {
        render: function (html) {
            const el = document.getElementById('app');
            if (el) el.innerHTML = html;
        }
    };

    const App = {
        init: function () {
            UI.render(`
                <div class="max-w-xl mx-auto mt-20 p-10 bg-gray-900 rounded-3xl text-center border border-white/10">
                    <h1 class="text-4xl font-black mb-8">¿Tus emociones te controlan?</h1>
                    <button id="start-btn" class="bg-purple-600 px-8 py-4 rounded-xl font-bold hover:bg-purple-500 transition-all">Iniciar Evaluación</button>
                </div>
            `);

            document.getElementById('start-btn').addEventListener('click', () => this.pregunta(0));
        },

        pregunta: function (index) {
            state.pasoActual = index;
            UI.render(`
                <div class="max-w-xl mx-auto mt-20 p-10 bg-gray-900 rounded-3xl text-center border border-white/10">
                    <h2 class="text-2xl mb-8">${state.preguntas[index]}</h2>
                    <div class="flex gap-4 justify-center">
                        <button onclick="window.AppLogic.responder(true)" class="bg-white text-black px-6 py-3 rounded-lg font-bold">Sí</button>
                        <button onclick="window.AppLogic.responder(false)" class="bg-gray-700 px-6 py-3 rounded-lg font-bold">No</button>
                    </div>
                </div>
            `);
        },

        responder: function (esSi) {
            if (esSi) state.puntaje++;
            state.pasoActual++;
            if (state.pasoActual < state.preguntas.length) this.pregunta(state.pasoActual);
            else this.resultado();
        },

        resultado: function () {
            UI.render(`
                <div class="max-w-xl mx-auto mt-20 p-10 bg-gray-900 rounded-3xl text-center border border-white/10">
                    <h2 class="text-3xl font-bold mb-6">Diagnóstico preparado</h2>
                    <input type="text" id="nombre" placeholder="Nombre" class="w-full p-3 mb-2 bg-gray-800 rounded">
                    <input type="email" id="email" placeholder="Email" class="w-full p-3 mb-4 bg-gray-800 rounded">
                    <button id="enviar-btn" class="w-full bg-emerald-600 p-4 rounded-xl font-bold">Recibir mi Guía</button>
                </div>
            `);
            document.getElementById('enviar-btn').addEventListener('click', () => this.enviar());
        },

        enviar: function () {
            const nombre = document.getElementById('nombre').value;
            const email = document.getElementById('email').value;

            fetch("https://script.google.com/macros/s/AKfycbxwDLeIYywbH3eSeJgXhvX-0sBjdk9QMzi6D-mxrMPfgJAwVxNj-4j1TtVWHAzef85u/exec", {
                method: "POST", mode: "no-cors",
                body: JSON.stringify({ nombre, email, resultado: state.puntaje > 4 ? "Fractura" : "Disonancia" })
            }).then(() => { alert("¡Enviado!"); location.reload(); });
        }
    };

    // Exponemos la lógica mínima necesaria para los botones HTML
    window.AppLogic = App;
    window.addEventListener('DOMContentLoaded', () => App.init());
})();