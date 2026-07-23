'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { User, Flame, Award, TrendingUp, LogOut } from 'lucide-react';
import { getUserStats, getUserStreak, getUserBadges } from '@/lib/gamification';
import { useAuthSession } from '@/lib/auth-client';

export function UserProfile() {
  const { user, session } = useAuthSession();
  const [stats, setStats] = useState<any>(null);
  const [streak, setStreak] = useState<any>(null);
  const [badgesCount, setBadgesCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    loadUserData();
  }, [user]);

  const loadUserData = async () => {
    try {
      const [statsData, streakData, badgesData] = await Promise.all([
        getUserStats(user?.id!),
        getUserStreak(user?.id!),
        getUserBadges(user?.id!),
      ]);
      setStats(statsData);
      setStreak(streakData);
      setBadgesCount(badgesData?.length || 0);
    } catch (error) {
      console.error('[v0] Error loading user data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  const masteryLevels = {
    novice: '🌱 Novato',
    intermediate: '🌿 Intermedio',
    advanced: '🌳 Avanzado',
    expert: '🦅 Experto',
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 border border-slate-700"
    >
      {/* Header con Avatar */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-400 to-indigo-600 flex items-center justify-center text-2xl shadow-lg">
          <User className="w-8 h-8 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">{user.user_metadata?.name || user.email?.split('@')[0]}</h2>
          <p className="text-slate-400 text-sm">{user.email}</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {/* Total Quizzes */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-slate-700/50 rounded-xl p-3 border border-slate-600 text-center"
        >
          <p className="text-slate-400 text-xs mb-1">Evaluaciones</p>
          <p className="text-2xl font-bold text-white">{stats?.total_quizzes || 0}</p>
        </motion.div>

        {/* Average Score */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-slate-700/50 rounded-xl p-3 border border-slate-600 text-center"
        >
          <p className="text-slate-400 text-xs mb-1">Promedio</p>
          <p className="text-2xl font-bold text-yellow-400">{stats?.average_score?.toFixed(1) || 0}</p>
        </motion.div>

        {/* Current Streak */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-slate-700/50 rounded-xl p-3 border border-slate-600 text-center"
        >
          <p className="text-slate-400 text-xs mb-1 flex items-center justify-center gap-1">
            <Flame className="w-3 h-3" /> Racha
          </p>
          <p className="text-2xl font-bold text-orange-400">{streak?.current_streak || 0}</p>
        </motion.div>

        {/* Badges */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-slate-700/50 rounded-xl p-3 border border-slate-600 text-center"
        >
          <p className="text-slate-400 text-xs mb-1 flex items-center justify-center gap-1">
            <Award className="w-3 h-3" /> Logros
          </p>
          <p className="text-2xl font-bold text-yellow-400">{badgesCount}</p>
        </motion.div>
      </div>

      {/* Mastery Level */}
      {stats && (
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-indigo-500/10 border border-indigo-500/50 rounded-xl p-4 mb-4"
        >
          <div className="flex items-center gap-3">
            <TrendingUp className="w-5 h-5 text-indigo-400" />
            <div>
              <p className="text-slate-400 text-xs">Nivel de Maestría</p>
              <p className="text-lg font-bold text-white">
                {masteryLevels[stats.mastery_level as keyof typeof masteryLevels]}
              </p>
            </div>
          </div>
          <div className="mt-3 bg-slate-800 rounded-full h-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ 
                width: `${
                  stats.mastery_level === 'expert' ? 100 :
                  stats.mastery_level === 'advanced' ? 75 :
                  stats.mastery_level === 'intermediate' ? 50 : 25
                }%` 
              }}
              className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full"
              transition={{ duration: 1 }}
            />
          </div>
        </motion.div>
      )}

      {/* Total Points */}
      {stats && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-gradient-to-r from-purple-500/10 to-indigo-500/10 border border-purple-500/50 rounded-xl p-4 text-center"
        >
          <p className="text-slate-400 text-sm mb-1">Puntos Totales</p>
          <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">
            {stats.total_points || 0}
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}
