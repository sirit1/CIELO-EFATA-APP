'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface CreateThreadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onThreadCreated: () => void;
}

export function CreateThreadModal({ isOpen, onClose, onThreadCreated }: CreateThreadModalProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('general');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('/api/forum/threads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content, category }),
      });
      if (response.ok) {
        setTitle('');
        setContent('');
        onThreadCreated();
      }
    } catch (error) {
      console.error('[v0] Error creating thread:', error);
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
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-slate-900 rounded-xl p-6 max-w-2xl w-full border border-slate-700"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-white">Crear Nuevo Tema</h2>
              <button onClick={onClose} className="hover:bg-slate-800 rounded-lg p-2">
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Categoría</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  <option value="general">General</option>
                  <option value="tips-tricks">Tips & Tricks</option>
                  <option value="recursos">Recursos</option>
                  <option value="logros">Logros</option>
                  <option value="soporte">Soporte</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Título</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="¿Cuál es tu pregunta o tema?" className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Contenido</label>
                <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Describe tu tema..." rows={6} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
              </div>

              <div className="flex gap-3">
                <button type="submit" disabled={loading} className="flex-1 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-semibold py-2 rounded-lg transition">
                  {loading ? 'Creando...' : 'Crear Tema'}
                </button>
                <button type="button" onClick={onClose} className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold py-2 rounded-lg transition">
                  Cancelar
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
