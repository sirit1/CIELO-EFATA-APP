'use client';
import { motion } from 'framer-motion';
import { MessageCircle, Eye, Heart } from 'lucide-react';
import Link from 'next/link';

interface Thread {
  id: number;
  title: string;
  user_id: string;
  replies_count: number;
  views: number;
  likes: number;
  created_at: string;
}

interface ForumThreadsListProps {
  threads: Thread[];
  loading: boolean;
}

export function ForumThreadsList({ threads, loading }: ForumThreadsListProps) {
  if (loading) {
    return (
      <div className="text-center py-12 text-slate-400">
        Cargando temas...
      </div>
    );
  }

  if (!threads || threads.length === 0) {
    return (
      <div className="text-center py-12 text-slate-400">
        No hay temas en esta categoría. ¡Sé el primero en crear uno!
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {threads.map((thread, i) => (
        <motion.div
          key={thread.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
          className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 hover:border-indigo-500/50 transition cursor-pointer"
        >
          <Link href={`/forum/thread/${thread.id}`}>
            <h3 className="text-white font-semibold mb-2 hover:text-indigo-400">{thread.title}</h3>
          </Link>
          <div className="flex items-center gap-4 text-sm text-slate-400">
            <span className="flex items-center gap-1">
              <MessageCircle className="w-4 h-4" />
              {thread.replies_count} respuestas
            </span>
            <span className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              {thread.views} vistas
            </span>
            <span className="flex items-center gap-1">
              <Heart className="w-4 h-4" />
              {thread.likes}
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
