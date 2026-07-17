/**
 * ARQUITECTURA CIELO EFATA - CÓDIGO TOTALMENTE INTEGRADO Y UNIFICADO
 */

const App = {
    el: document.getElementById('app'),
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
    ],

    getInforme: function () {
        return this.puntaje > 4 ? {
            titulo: "Estado: Fractura Sistémica",
            texto: "La fractura sistémica que has confirmado no es un evento casual; es el resultado de años de transigir con lo que sabes que no te pertenece. Tu vida está siendo dirigida por mecanismos de supervivencia que el entorno te impuso. Te has convertido en un extraño dentro de tu propia casa mental, operando desde la reacción y no desde la intención. Este no es el final, pero es un punto de quiebre absoluto. Tu estructura actual no ha colapsado por debilidad, sino porque el diseño original de tu propósito busca desesperadamente salir a la luz. Es momento de silenciar el ruido y aceptar la restauración."
        } : {
            titulo: "Estado: Disonancia Cognitiva",
            texto: "Vives en una fachada de aparente orden, pero por dentro, la disonancia cognitiva te está drenando la esencia. Sientes que el miedo y las expectativas ajenas dictan tus pasos, mientras tu verdadero 'yo' observa en silencio. Estás en un terreno donde la grieta es pequeña pero profunda; corre el riesgo de convertirse en un abismo si sigues ignorando la llamada de tu propósito. La paz que buscas no vendrá de los resultados externos, sino de reconciliar la verdad que te susurra el alma con tus decisiones diarias."
        };
    },

    render: function () {
        this.el.innerHTML = `
            <section class="max-w-6xl mx-auto p-8 space-y-16 animate-fade-in">
                <div class="flex justify-center py-10">
                    <img src="https://i.ibb.co/k6SP1ChF/logo-cielo-efata-full.jpg" class="w-64 h-64 object-cover rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10">
                </div>

                <div id="evaluacion-container" class="bg-gradient-to-br from-gray-900 to-black p-12 rounded-[3rem] border border-white/10 shadow-2xl text-center">
                    <div id="evaluacion-content">
                        <h1 class="text-7xl font-black text-white uppercase tracking-tighter">¿Tus emociones te controlan?</h1>
                        <button id="start-btn" class="mt-12 bg-purple-600 hover:bg-purple-500 text-white px-12 py-5 rounded-2xl font-black uppercase tracking-widest transition-all">Iniciar Evaluación GRATUITA</button>
                    </div>
                </div>

                <div class="flex flex-col md:flex-row items-start gap-12 bg-gradient-to-br from-gray-900 to-black p-12 rounded-[3rem] border border-white/10 shadow-2xl">
                    <img src="https://i.ibb.co/pjHmKLjM/foto-mia-de-lujo.jpg" class="w-64 h-64 rounded-3xl border-4 border-purple-500 shadow-2xl object-cover">
                    <div class="space-y-6">
                        <p class="text-4xl text-purple-400 font-bold italic">Dr. Alejandro Sirit</p>
                        <p class="text-gray-300 text-lg leading-relaxed">
                            Doctor Honoris Causa en la Humanización de la Tecnología. Investigador con más de 30 años de trayectoria integrando la neurociencia, la exégesis y la gobernanza ética de la Inteligencia Artificial. LinkedIn Top Voice con alcance global. Fiel creyente en la majestad de YHWH.
                        </p>
                    </div>
                </div>

                <div class="grid grid-cols-2 md:grid-cols-5 gap-6">${this.renderObras()}</div>
            </section>
        `;
        document.getElementById('start-btn').addEventListener('click', () => this.iniciarEvaluacion());
    },

    iniciarEvaluacion: function () { this.pasoActual = 0; this.puntaje = 0; this.renderPregunta(); },

    renderPregunta: function () {
        document.getElementById('evaluacion-content').innerHTML = `
            <h2 class="text-3xl font-bold text-white mt-4">${this.preguntas[this.pasoActual]}</h2>
            <div class="flex gap-4 justify-center mt-8">
                <button onclick="App.responder(true)" class="bg-white text-black px-10 py-4 rounded-xl font-black uppercase">Sí</button>
                <button onclick="App.responder(false)" class="bg-gray-800 text-white px-10 py-4 rounded-xl font-black uppercase">No</button>
            </div>
        `;
    },

    responder: function (esSi) {
        if (esSi) this.puntaje++;
        this.pasoActual++;
        if (this.pasoActual < this.preguntas.length) this.renderPregunta();
        else this.renderCaptura();
    },

    renderCaptura: function () {
        document.getElementById('evaluacion-content').innerHTML = `
            <h2 class="text-3xl font-black text-white uppercase">Casi terminado</h2>
            <input type="text" id="nombre-usuario" placeholder="Nombre completo" class="w-full p-4 mt-4 rounded-xl bg-gray-800 border border-white/10 text-white">
            <input type="email" id="email-usuario" placeholder="Correo electrónico" class="w-full p-4 mt-2 rounded-xl bg-gray-800 border border-white/10 text-white">
            <button onclick="App.renderFinal()" class="w-full mt-4 bg-purple-600 p-4 rounded-xl font-black uppercase text-white">Recibir mi diagnóstico</button>
        `;
    },

    renderFinal: function () {
        const diag = this.getInforme();
        document.getElementById('evaluacion-content').innerHTML = `
            <div class="space-y-8 animate-fade-in">
                <h2 class="text-4xl font-black text-white uppercase">${diag.titulo}</h2>
                <p class="mt-8 text-2xl text-gray-200 leading-loose italic border-l-4 border-purple-500 pl-8 text-left font-serif">${diag.texto}</p>
                <div class="bg-purple-900/30 p-8 rounded-2xl border border-purple-500/30">
                    <h3 class="text-white font-bold text-xl uppercase mb-4">¿Deseas restaurar tu diseño original?</h3>
                    <p class="text-gray-300 mb-6">Recibe la Guía de Restauración completa en tu correo.</p>
                    <button onclick="App.procesarEnvio()" class="w-full bg-emerald-600 py-6 rounded-2xl font-black uppercase text-white text-lg transition-all">Sí, quiero recibir mi Guía</button>
                </div>
            </div>
        `;
    },

    procesarEnvio: function () {
        const nombre = document.getElementById('nombre-usuario').value;
        const email = document.getElementById('email-usuario').value;
        const diag = this.getInforme();

        fetch("https://script.google.com/macros/s/AKfycbwa8UMlGeC5JBsijOU0KubifkerKi1gWK9EH8_jFE9iKrlFlvnHCTdzOVKO_5Fedns7BA/exec", {
            method: "POST",
            mode: "no-cors",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nombre: nombre, email: email, resultado: diag.titulo })
        });

        alert("¡Excelente decisión! Tu Guía de Restauración ha sido enviada.");
        location.reload();
    },

    renderObras: function () {
        const obras = [
            { t: "Callar", img: "https://i.ibb.co/Jj0CP5dQ/libro-callar.png" },
            { t: "Espejo", img: "https://i.ibb.co/JjyLG14c/libro-espejo.png" },
            { t: "La Fe", img: "https://i.ibb.co/KpWRYNKw/libro-fe.png" },
            { t: "Cielo", img: "https://i.ibb.co/qhWRX9T/cuando-el-cielo-se-cae.png" },
            { t: "Gólgota", img: "https://i.ibb.co/hRKc8Qn0/libro-golgota.png" }
        ];
        return obras.map(o => `<div class="aspect-[2/3] overflow-hidden rounded-2xl border border-white/10 shadow-xl"><img src="${o.img}" class="w-full h-full object-cover"></div>`).join('');
    }
};

window.onload = () => App.render();