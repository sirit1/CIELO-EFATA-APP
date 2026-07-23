'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Lock } from 'lucide-react';
import { InsightAnalysis } from '@/lib/openai';

interface AIInsightsProps {
  emotionalLevel: string;
  puntaje: number;
  respuestas: number[];
  isPremium?: boolean;
  onUpgrade?: () => void;
}

export function AIInsights({
  emotionalLevel,
  puntaje,
  respuestas,
  isPremium = false,
  onUpgrade,
}: AIInsightsProps) {
  const [insights, setInsights] = useState<InsightAnalysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState('');

  useEffect(() => {
    if (isPremium) {
      loadInsights();
    } else {
      loadPreview();
    }
  }, [isPremium]);

  const loadPreview = async () => {
    try {
      const response = await fetch('/api/insights/preview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emotionalLevel, puntaje }),
      });
      const data = await response.json();
      setPreview(data.preview);
    } catch (error) {
      console.error('[v0] Error loading preview:', error);
    }
  };

  const loadInsights = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/insights/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emotionalLevel, puntaje, respuestas }),
      });
      const data = await response.json();
      setInsights(data);
    } catch (error) {
      console.error('[v0] Error loading insights:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isPremium) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-purple-900/20 to-indigo-900/20 rounded-2xl p-6 border border-purple-500/30"
      >
        <div className="flex items-start gap-4">
          <div className="bg-purple-500/20 rounded-full p-3">
            <Lock className="w-5 h-5 text-purple-300" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-white mb-2">AI Insights Premium</h3>
            <p className="text-slate-300 text-sm mb-4">{preview || 'Análisis profundo disponible solo para miembros Premium'}</p>
            <button
              onClick={onUpgrade}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition"
            >
              Desbloquear Premium
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  if (loading) {
    return (
      <motion.div
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700 text-center text-slate-400"
      >
        Generando análisis con IA...
      </motion.div>
    );
  }

  if (!insights) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex items-center gap-2 mb-6">
        <Sparkles className="w-5 h-5 text-yellow-400" />
        <h2 className="text-2xl font-bold text-white">Análisis IA Premium</h2>
      </div>

      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 border border-slate-700">
        <h3 className="text-xl font-bold text-white mb-2">{insights.title}</h3>
        <p className="text-slate-300 mb-4">{insights.summary}</p>

        <div className="prose prose-invert max-w-none">
          <p className="text-slate-200 leading-relaxed">{insights.analysis}</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
          <h4 className="text-sm font-bold text-indigo-300 mb-3">Recomendaciones</h4>
          <ul className="space-y-2">
            {insights.recommendations.map((rec, i) => (
              <li key={i} className="text-sm text-slate-300 flex gap-2">
                <span className="text-indigo-400">•</span>
                {rec}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
          <h4 className="text-sm font-bold text-purple-300 mb-3">Recursos</h4>
          <ul className="space-y-2">
            {insights.resources.map((res, i) => (
              <li key={i} className="text-sm text-slate-300 flex gap-2">
                <span className="text-purple-400">•</span>
                {res}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
        <h4 className="text-sm font-bold text-yellow-300 mb-3">Próximos Pasos</h4>
        <p className="text-sm text-slate-300">{insights.nextSteps}</p>
      </div>
    </motion.div>
  );
}
