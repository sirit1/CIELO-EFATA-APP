'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Sparkles, Zap } from 'lucide-react';

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpgrade: () => void;
}

const PREMIUM_FEATURES = [
  'Análisis IA profundos con GPT-4',
  'Recomendaciones personalizadas',
  'Recursos exclusivos',
  'Sin publicidad',
  'Exportar resultados en PDF',
  'Acceso prioritario a nuevas features',
];

export function UpgradeModal({ isOpen, onClose, onUpgrade }: UpgradeModalProps) {
  const [loading, setLoading] = useState(false);

  const handleUpgrade = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: 'current-user-id', // Reemplazar con usuario real
          email: 'user@example.com',
        }),
      });

      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error('[v0] Upgrade error:', error);
      alert('Error al procesar el pago');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-slate-900 rounded-2xl p-8 max-w-md w-full mx-4 border border-slate-700"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full p-3">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white">Premium</h2>
              </div>
              <button
                onClick={onClose}
                className="hover:bg-slate-800 rounded-full p-2 transition"
              >
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <p className="text-slate-300 mb-6">
              Desbloquea análisis profundos con IA y mucho más
            </p>

            <ul className="space-y-3 mb-8">
              {PREMIUM_FEATURES.map((feature, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-3 text-sm text-slate-300"
                >
                  <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                  {feature}
                </motion.li>
              ))}
            </ul>

            <div className="bg-slate-800/50 rounded-lg p-4 mb-6 text-center">
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-4xl font-bold text-white">$9.99</span>
                <span className="text-slate-400">/mes</span>
              </div>
              <p className="text-xs text-slate-400 mt-2">Cancela en cualquier momento</p>
            </div>

            <button
              onClick={handleUpgrade}
              disabled={loading}
              className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 disabled:opacity-50 text-white font-bold py-3 rounded-lg transition flex items-center justify-center gap-2"
            >
              {loading ? 'Procesando...' : (
                <>
                  <Zap className="w-5 h-5" />
                  Actualizar a Premium
                </>
              )}
            </button>

            <button
              onClick={onClose}
              className="w-full mt-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold py-2 rounded-lg transition"
            >
              Seguir explorando
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
