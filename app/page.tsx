'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Header } from '@/components/Header';
import { AuthorBio } from '@/components/AuthorBio';
import { QuizForm } from '@/components/QuizForm';
import { ResultsDisplay } from '@/components/ResultsDisplay';
import { Leaderboard } from '@/components/Leaderboard';
import { StatsWidget } from '@/components/StatsWidget';
import { Footer } from '@/components/Footer';
import { Celebration } from '@/components/Celebration';
import { supabase, EvaluationResult } from '@/lib/supabase';
import { Loader } from 'lucide-react';

type AppState = 'welcome' | 'quiz' | 'results';

export default function Home() {
  const [state, setState] = useState<AppState>('welcome');
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState<EvaluationResult | null>(null);

  const calcularPuntaje = (respuestas: number[]): number => {
    return respuestas.reduce((sum, r) => sum + r, 0);
  };

  const handleQuizComplete = async (data: {
    nombre: string;
    email: string;
    whatsapp: string;
    respuestas: number[];
  }) => {
    setLoading(true);
    try {
      const puntaje = calcularPuntaje(data.respuestas);

      // Guardar en Supabase
      const { data: savedData, error } = await supabase
        .from('evaluaciones')
        .insert([
          {
            nombre: data.nombre,
            email: data.email,
            whatsapp: data.whatsapp,
            puntaje: puntaje,
            respuestas: data.respuestas,
            created_at: new Date().toISOString(),
          },
        ])
        .select()
        .single();

      if (error) {
        console.error('Error saving to Supabase:', error);
        // Continuar sin guardar en BD
      }

      setResultData({
        nombre: data.nombre,
        email: data.email,
        whatsapp: data.whatsapp,
        puntaje: puntaje,
        respuestas: data.respuestas,
      });

      setState('results');
    } catch (err) {
      console.error('Error:', err);
      alert('Hubo un error. Por favor intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setState('welcome');
    setResultData(null);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-dark to-background overflow-x-hidden">
      {/* Fondo animado */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse-slow animation-delay-2000" />
      </div>

      <div className="relative z-10 py-8 px-4">
        <div className="max-w-6xl mx-auto space-y-16">
          {/* Loading Overlay */}
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
            >
              <div className="text-center space-y-4">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                >
                  <Loader className="w-12 h-12 text-primary mx-auto" />
                </motion.div>
                <p className="text-white font-semibold">Generando tu informe...</p>
              </div>
            </motion.div>
          )}

          {/* Welcome State */}
          {state === 'welcome' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-16"
            >
              <Header />

              {/* CTA Principal */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="card-premium max-w-2xl mx-auto"
              >
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h2 className="text-3xl font-black text-white">Descubre tu Patrón Emocional</h2>
                    <p className="text-muted">Una evaluación profunda de 7 preguntas basada en neurociencia</p>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setState('quiz')}
                    className="w-full btn-primary text-lg py-4 group"
                  >
                    <span className="flex items-center justify-center gap-2">
                      Comenzar Evaluación
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </span>
                  </motion.button>

                  <p className="text-xs text-muted text-center">Toma aproximadamente 3-5 minutos</p>
                </div>
              </motion.div>

              {/* Stats en vivo */}
              <StatsWidget />

              {/* Leaderboard */}
              <Leaderboard />

              {/* Author Bio */}
              <AuthorBio />
            </motion.div>
          )}

          {/* Quiz State */}
          {state === 'quiz' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <QuizForm onComplete={handleQuizComplete} loading={loading} />
            </motion.div>
          )}

          {/* Results State */}
          {state === 'results' && resultData && (
            <>
              <Celebration />
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-8"
              >
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-black text-white">Tu Informe Personalizado</h1>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleReset}
                  className="btn-secondary px-6 py-3"
                >
                  Nueva Evaluación
                </motion.button>
              </div>

              <ResultsDisplay
                nombre={resultData.nombre}
                puntaje={resultData.puntaje}
                respuestas={resultData.respuestas!}
              />
              </motion.div>
            </>
          )}
        </div>
        
        {/* Footer */}
        <Footer />
      </div>
    </main>
  );
}
