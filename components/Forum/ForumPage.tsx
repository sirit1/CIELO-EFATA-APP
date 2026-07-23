'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Plus, MessageSquare } from 'lucide-react';
import { ForumCategoryList } from './ForumCategoryList';
import { ForumThreadsList } from './ForumThreadsList';
import { CreateThreadModal } from './CreateThreadModal';

export function ForumPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('general');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [threads, setThreads] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => loadThreads(), 300);
    return () => clearTimeout(timer);
  }, [selectedCategory, searchQuery]);

  const loadThreads = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (selectedCategory) params.append('category', selectedCategory);
      if (searchQuery) params.append('q', searchQuery);
      const response = await fetch(`/api/forum/threads?${params}`);
      const data = await response.json();
      setThreads(data || []);
    } catch (error) {
      console.error('[v0] Error loading threads:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 pt-8 pb-20">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <MessageSquare className="w-8 h-8 text-indigo-400" />
            <h1 className="text-4xl font-bold text-white">Comunidad</h1>
          </div>
          <p className="text-slate-400 text-lg">Comparte experiencias, pregunta, y aprende con otros usuarios</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="flex gap-3 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-500" />
            <input
              type="text"
              placeholder="Buscar temas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-800/50 border border-slate-700 rounded-lg pl-12 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition"
          >
            <Plus className="w-5 h-5" />
            Nuevo Tema
          </button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="lg:col-span-1">
            <ForumCategoryList selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="lg:col-span-3">
            <ForumThreadsList threads={threads} loading={loading} />
          </motion.div>
        </div>
      </div>
      <CreateThreadModal isOpen={showCreateModal} onClose={() => setShowCreateModal(false)} onThreadCreated={() => { setShowCreateModal(false); loadThreads(); }} />
    </div>
  );
}
