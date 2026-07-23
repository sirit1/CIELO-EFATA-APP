'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';
import { getUserBadges } from '@/lib/gamification';

interface BadgesDisplayProps {
  userId?: string;
  showAll?: boolean;
}

export function BadgesDisplay({ userId, showAll = false }: BadgesDisplayProps) {
  const [badges, setBadges] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;
    loadBadges();
  }, [userId]);

  const loadBadges = async () => {
    try {
      const data = await getUserBadges(userId!);
      setBadges(data);
    } catch (error) {
      console.error('[v0] Error loading badges:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Cargando badges...</div>;
  }

  const badgesList = showAll ? badges : badges.slice(0, 5);
  const unlockedCount = badges.length;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-4"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-white">Mis Logros</h3>
        <span className="text-sm text-slate-400">{unlockedCount} desbloqueados</span>
      </div>

      <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
        {badgesList.map((badge: any, index) => (
          <motion.div
            key={badge.id}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.1 }}
            className="relative group cursor-pointer"
          >
            {/* Badge */}
            <motion.div
              className="w-full aspect-square rounded-lg bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center text-3xl shadow-lg border-2 border-yellow-300"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              {badge.badges?.icon}
            </motion.div>

            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition pointer-events-none">
              <div className="bg-slate-900 text-white text-xs rounded px-2 py-1 whitespace-nowrap border border-slate-700 shadow-lg">
                {badge.badges?.name}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {!showAll && badges.length > 5 && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="w-full py-2 bg-purple-600/20 hover:bg-purple-600/40 border border-purple-600/50 rounded-lg text-purple-300 text-sm transition"
        >
          Ver todos los {badges.length} badges
        </motion.button>
      )}

      {badges.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-8 text-slate-400"
        >
          <Lock className="w-8 h-8 mx-auto mb-2 opacity-50" />
          <p>Completa evaluaciones para desbloquear badges</p>
        </motion.div>
      )}
    </motion.div>
  );
}
