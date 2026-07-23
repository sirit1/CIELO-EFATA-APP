'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { LoginForm } from './LoginForm';
import { SignupForm } from './SignupForm';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  referralCode?: string;
}

export function AuthModal({ isOpen, onClose, referralCode }: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'signup'>('signup');

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl w-full max-w-md border border-slate-700 shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-700">
              <h2 className="text-2xl font-bold text-white">
                {mode === 'login' ? 'Iniciar Sesión' : 'Crear Cuenta'}
              </h2>
              <button
                onClick={onClose}
                className="text-slate-400 hover:text-white transition"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {mode === 'login' ? (
                <LoginForm onSuccess={onClose} />
              ) : (
                <SignupForm referralCode={referralCode} onSuccess={onClose} />
              )}

              {/* Toggle Mode */}
              <div className="mt-6 text-center text-slate-400 text-sm">
                {mode === 'login' ? (
                  <>
                    ¿No tienes cuenta?{' '}
                    <button
                      onClick={() => setMode('signup')}
                      className="text-purple-400 hover:text-purple-300 transition font-medium"
                    >
                      Registrate aquí
                    </button>
                  </>
                ) : (
                  <>
                    ¿Ya tienes cuenta?{' '}
                    <button
                      onClick={() => setMode('login')}
                      className="text-purple-400 hover:text-purple-300 transition font-medium"
                    >
                      Inicia sesión
                    </button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
