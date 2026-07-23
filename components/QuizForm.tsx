'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PREGUNTAS } from '@/lib/quiz-data';
import { ArrowRight, SkipForward } from 'lucide-react';

interface QuizFormProps {
  onComplete: (data: { nombre: string; email: string; whatsapp: string; respuestas: number[] }) => void;
  loading?: boolean;
}

export function QuizForm({ onComplete, loading = false }: QuizFormProps) {
  const [step, setStep] = useState<'info' | 'quiz' | 'reviewing'>('info');
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [respuestas, setRespuestas] = useState<number[]>([]);
  const [preguntaActual, setPreguntaActual] = useState(0);

  const handleStartQuiz = () => {
    if (!nombre.trim() || !email.trim() || !whatsapp.trim()) {
      alert('Por favor completa todos los campos');
      return;
    }
    setStep('quiz');
  };

  const handleRespuesta = (valor: number) => {
    const nuevasRespuestas = [...respuestas];
    nuevasRespuestas[preguntaActual] = valor;
    setRespuestas(nuevasRespuestas);

    if (preguntaActual < PREGUNTAS.length - 1) {
      setTimeout(() => {
        setPreguntaActual(preguntaActual + 1);
      }, 300);
    } else {
      setStep('reviewing');
    }
  };

  const handleSubmit = async () => {
    onComplete({ nombre, email, whatsapp, respuestas });
  };

  return (
    <AnimatePresence mode="wait">
      {step === 'info' && (
        <InfoStep
          key="info"
          nombre={nombre}
          email={email}
          whatsapp={whatsapp}
          onNombreChange={setNombre}
          onEmailChange={setEmail}
          onWhatsappChange={setWhatsapp}
          onStart={handleStartQuiz}
          loading={loading}
        />
      )}

      {step === 'quiz' && (
        <QuizStep
          key="quiz"
          pregunta={PREGUNTAS[preguntaActual]}
          preguntaNum={preguntaActual + 1}
          totalPreguntas={PREGUNTAS.length}
          respuestaActual={respuestas[preguntaActual] ?? null}
          onRespuesta={handleRespuesta}
        />
      )}

      {step === 'reviewing' && (
        <ReviewStep
          key="review"
          nombre={nombre}
          totalPreguntas={PREGUNTAS.length}
          respuestadasCount={respuestas.filter((r) => r !== undefined).length}
          onSubmit={handleSubmit}
          loading={loading}
        />
      )}
    </AnimatePresence>
  );
}

// Componente Info
function InfoStep({
  nombre,
  email,
  whatsapp,
  onNombreChange,
  onEmailChange,
  onWhatsappChange,
  onStart,
  loading,
}: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6 }}
      className="card-premium max-w-2xl mx-auto space-y-6"
    >
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-white">Comencemos tu evaluación</h2>
        <p className="text-muted">Necesitamos algunos datos para personalizarte los resultados</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-white mb-2">Nombre completo</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => onNombreChange(e.target.value)}
            placeholder="Tu nombre"
            className="input-premium"
            disabled={loading}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-white mb-2">Correo electrónico</label>
          <input
            type="email"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            placeholder="tu@email.com"
            className="input-premium"
            disabled={loading}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-white mb-2">WhatsApp</label>
          <input
            type="tel"
            value={whatsapp}
            onChange={(e) => onWhatsappChange(e.target.value)}
            placeholder="+1 234 567 8900"
            className="input-premium"
            disabled={loading}
          />
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onStart}
        disabled={loading}
        className="w-full btn-primary group disabled:opacity-50"
      >
        <span className="flex items-center justify-center gap-2">
          Iniciar Evaluación
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </span>
      </motion.button>
    </motion.div>
  );
}

// Componente Quiz
function QuizStep({ pregunta, preguntaNum, totalPreguntas, respuestaActual, onRespuesta }: any) {
  const opciones = [
    { label: 'Totalmente en desacuerdo', valor: 0 },
    { label: 'En desacuerdo', valor: 1 },
    { label: 'Neutral', valor: 2 },
    { label: 'De acuerdo', valor: 3 },
    { label: 'Totalmente de acuerdo', valor: 4 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6 }}
      className="card-premium max-w-2xl mx-auto space-y-8"
    >
      {/* Progress */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm font-semibold text-primary">Pregunta {preguntaNum}/{totalPreguntas}</span>
          <span className="text-xs text-muted">{Math.round((preguntaNum / totalPreguntas) * 100)}%</span>
        </div>
        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-primary to-secondary"
            animate={{ width: `${(preguntaNum / totalPreguntas) * 100}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
        </div>
      </div>

      {/* Pregunta */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="space-y-4"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight">{pregunta}</h2>
      </motion.div>

      {/* Opciones */}
      <div className="space-y-3">
        {opciones.map((opcion, idx) => (
          <motion.button
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + idx * 0.05, duration: 0.4 }}
            whileHover={{ x: 8 }}
            onClick={() => onRespuesta(opcion.valor)}
            className={`w-full p-4 rounded-xl border-2 transition-all text-left font-semibold ${
              respuestaActual === opcion.valor
                ? 'bg-primary/20 border-primary text-white shadow-glow'
                : 'bg-white/5 border-white/10 text-muted hover:border-primary/50 hover:bg-white/10'
            }`}
          >
            <div className="flex items-center justify-between">
              <span>{opcion.label}</span>
              {respuestaActual === opcion.valor && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-5 h-5 bg-primary rounded-full flex items-center justify-center"
                >
                  <span className="text-white text-xs">✓</span>
                </motion.div>
              )}
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}

// Componente Review
function ReviewStep({ nombre, totalPreguntas, respuestadasCount, onSubmit, loading }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6 }}
      className="card-premium max-w-2xl mx-auto space-y-6 text-center"
    >
      <div className="space-y-3">
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 0.6 }}
          className="text-5xl"
        >
          ✨
        </motion.div>
        <h2 className="text-3xl font-bold text-white">¡Casi listo, {nombre}!</h2>
        <p className="text-muted">Hemos registrado todas tus respuestas</p>
      </div>

      <div className="bg-white/5 rounded-xl p-4 space-y-2">
        <p className="text-sm text-muted">Respuestas completas</p>
        <p className="text-3xl font-bold text-gradient">{respuestadasCount}/{totalPreguntas}</p>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onSubmit}
        disabled={loading}
        className="w-full btn-primary disabled:opacity-50"
      >
        {loading ? 'Generando tu informe...' : 'Ver Mis Resultados'}
      </motion.button>
    </motion.div>
  );
}
