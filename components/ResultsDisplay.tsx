'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { INTERPRETACIONES, BADGES } from '@/lib/quiz-data';
import { Share2, Download, Award, TrendingUp, Sparkles } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis } from 'recharts';
import { AIInsights } from './AIInsights';
import { UpgradeModal } from './UpgradeModal';

interface ResultsDisplayProps {
  nombre: string;
  puntaje: number;
  respuestas: number[];
  isPremium?: boolean;
}

export function ResultsDisplay({ nombre, puntaje, respuestas, isPremium = false }: ResultsDisplayProps) {
  const [showUpgrade, setShowUpgrade] = useState(false);
  const interpretacion = INTERPRETACIONES[Math.min(puntaje as keyof typeof INTERPRETACIONES, 4)];
  const promedio = Math.round(respuestas.reduce((a, b) => a + b, 0) / respuestas.length);

  const chartData = [
    { name: 'En desacuerdo', value: respuestas.filter((r) => r <= 1).length },
    { name: 'Neutral', value: respuestas.filter((r) => r === 2).length },
    { name: 'De acuerdo', value: respuestas.filter((r) => r >= 3).length },
  ];

  const COLORS = ['#ef4444', '#eab308', '#22c55e'];

  const badgesDesbloqueados = BADGES.filter((badge) => {
    if (badge.id === 1) return true;
    if (badge.id === 2 && respuestas.filter((r) => r >= 3).length >= 3) return true;
    if (badge.id === 3 && puntaje <= 10) return true;
    if (badge.id === 4 && puntaje === 0) return true;
    return false;
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full space-y-8"
    >
      {/* Celebración visual */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className={`card-premium bg-gradient-to-br ${interpretacion.color} relative overflow-hidden`}
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 text-center space-y-4 py-12">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            className="text-7xl"
          >
            {interpretacion.icono}
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-black text-white">{interpretacion.nivel}</h2>
          <p className="text-xl text-white/90 font-semibold">{interpretacion.descripcion}</p>

          {/* Score Visual */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4, type: 'spring' }}
            className="flex justify-center gap-8 py-4"
          >
            <div className="bg-white/20 rounded-xl px-6 py-3 backdrop-blur">
              <p className="text-xs text-white/80 uppercase">Puntuación</p>
              <p className="text-3xl font-black text-white">{puntaje}/28</p>
            </div>
            <div className="bg-white/20 rounded-xl px-6 py-3 backdrop-blur">
              <p className="text-xs text-white/80 uppercase">Promedio</p>
              <p className="text-3xl font-black text-white">{promedio}/4</p>
            </div>
          </motion.div>

          <p className="text-white/80 italic text-lg max-w-2xl mx-auto pt-4">{interpretacion.recomendacion}</p>
        </div>
      </motion.div>

      {/* Grid de Análisis */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Distribución */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="card-premium"
        >
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            Distribución de Respuestas
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
              >
                {COLORS.map((color, index) => (
                  <Cell key={`cell-${index}`} fill={color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-6 mt-4 flex-wrap">
            {chartData.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[idx] }} />
                <span className="text-sm text-muted">{item.name}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Tendencia */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          viewport={{ once: true }}
          className="card-premium"
        >
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Award className="w-5 h-5 text-primary" />
            Análisis por Pregunta
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={respuestas.map((r, i) => ({ name: `P${i + 1}`, value: r }))}>
              <XAxis dataKey="name" stroke="#6b7280" />
              <YAxis stroke="#6b7280" domain={[0, 4]} />
              <Bar dataKey="value" fill="url(#colorGradient)" radius={[8, 8, 0, 0]} />
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#a855f7" />
                  <stop offset="100%" stopColor="#4f46e5" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Badges Desbloqueados */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="space-y-4"
      >
        <h3 className="text-2xl font-bold text-white flex items-center gap-2">
          <Award className="w-6 h-6 text-accent" />
          Logros Desbloqueados
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {badgesDesbloqueados.map((badge, idx) => (
            <motion.div
              key={badge.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="card-premium text-center space-y-2 hover:shadow-glow transition-all group"
            >
              <div className="text-4xl group-hover:scale-110 transition-transform">{badge.icono}</div>
              <p className="font-bold text-white text-sm">{badge.nombre}</p>
              <p className="text-xs text-muted">{badge.descripcion}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* CTAs de Acción */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="grid md:grid-cols-2 gap-4"
      >
        <button className="btn-primary group flex items-center justify-center gap-2">
          <Share2 className="w-5 h-5" />
          <span>Compartir Resultados</span>
        </button>
        <button className="btn-secondary group flex items-center justify-center gap-2">
          <Download className="w-5 h-5" />
          <span>Descargar Informe</span>
        </button>
      </motion.div>

      {/* AI Insights Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="space-y-4"
      >
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-6 h-6 text-yellow-400" />
          <h3 className="text-2xl font-bold text-white">Análisis Inteligente</h3>
        </div>
        <AIInsights
          emotionalLevel={interpretacion.nivel}
          puntaje={puntaje}
          respuestas={respuestas}
          isPremium={isPremium}
          onUpgrade={() => setShowUpgrade(true)}
        />
      </motion.div>

      {/* CTA Premium */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="card-premium text-center space-y-4 bg-gradient-to-r from-primary/10 to-secondary/10 border-2 border-primary/50"
      >
        <h3 className="text-2xl font-bold text-white">Siguiente Paso: Consulta Profesional</h3>
        <p className="text-muted">Agenda una sesión 1-a-1 con el Dr. Alejandro Sirit para un análisis profundo</p>
        <button className="btn-primary">Agendar Consulta Ahora</button>
      </motion.div>

      {/* Upgrade Modal */}
      <UpgradeModal
        isOpen={showUpgrade}
        onClose={() => setShowUpgrade(false)}
        onUpgrade={() => setShowUpgrade(false)}
      />
    </motion.div>
  );
}
