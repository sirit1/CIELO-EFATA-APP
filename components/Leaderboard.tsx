'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { Trophy, Flame, Target } from 'lucide-react';

interface LeaderboardEntry {
  nombre: string;
  puntaje: number;
  created_at: string;
  rank: number;
}

export function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const { data } = await supabase
          .from('evaluaciones')
          .select('nombre, puntaje, created_at')
          .order('puntaje', { ascending: false })
          .limit(10);

        if (data) {
          const withRanks = data.map((item, idx) => ({
            ...item,
            rank: idx + 1,
          }));
          setLeaderboard(withRanks);
        }
      } catch (err) {
        console.error('Error fetching leaderboard:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();

    // Subscribe to real-time updates
    const subscription = supabase
      .channel('evaluaciones')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'evaluaciones' },
        (payload) => {
          fetchLeaderboard();
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const getMedalIcon = (rank: number) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return `${rank}`;
  };

  const getMedalColor = (rank: number) => {
    if (rank === 1) return 'from-yellow-500 to-amber-600';
    if (rank === 2) return 'from-gray-400 to-gray-600';
    if (rank === 3) return 'from-orange-400 to-red-600';
    return 'from-primary to-secondary';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="card-premium space-y-6"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-white flex items-center gap-2">
          <Trophy className="w-8 h-8 text-accent" />
          Top 10 Evaluaciones
        </h2>
        <span className="text-sm text-muted">En vivo</span>
      </div>

      {loading ? (
        <div className="text-center py-8 text-muted">Cargando leaderboard...</div>
      ) : leaderboard.length === 0 ? (
        <div className="text-center py-8 text-muted">
          Sé el primero en completar la evaluación
        </div>
      ) : (
        <div className="space-y-3">
          {leaderboard.map((entry, idx) => (
            <motion.div
              key={`${entry.nombre}-${entry.created_at}`}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05, duration: 0.4 }}
              viewport={{ once: true }}
              whileHover={{ x: 8 }}
              className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:border-primary/50 hover:bg-white/10 transition-all group"
            >
              <div className="flex items-center gap-4 flex-1">
                <motion.div
                  className={`w-12 h-12 rounded-full bg-gradient-to-br ${getMedalColor(entry.rank)} flex items-center justify-center font-black text-lg text-white shadow-lg`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  {getMedalIcon(entry.rank)}
                </motion.div>

                <div className="flex-1">
                  <p className="font-bold text-white group-hover:text-primary transition-colors">
                    {entry.nombre}
                  </p>
                  <p className="text-xs text-muted">
                    {new Date(entry.created_at).toLocaleDateString('es-ES')}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {entry.puntaje <= 7 && (
                  <div className="flex items-center gap-1">
                    <Flame className="w-4 h-4 text-orange-500" />
                    <span className="text-xs font-semibold text-orange-500">Ley</span>
                  </div>
                )}
                <div className="text-right">
                  <p className="text-2xl font-black text-gradient">{entry.puntaje}</p>
                  <p className="text-xs text-muted">/28</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
