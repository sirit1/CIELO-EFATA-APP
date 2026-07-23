'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { Users, Zap, TrendingUp } from 'lucide-react';

interface Stats {
  totalEvaluaciones: number;
  promedioGlobal: number;
  equilibrados: number;
}

export function StatsWidget() {
  const [stats, setStats] = useState<Stats>({
    totalEvaluaciones: 0,
    promedioGlobal: 0,
    equilibrados: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data, error } = await supabase
          .from('evaluaciones')
          .select('puntaje');

        if (data && !error) {
          const total = data.length;
          const promedio = total > 0 ? Math.round(data.reduce((a, b) => a + b.puntaje, 0) / total) : 0;
          const equilibrados = data.filter((d) => d.puntaje >= 8 && d.puntaje <= 12).length;

          setStats({
            totalEvaluaciones: total,
            promedioGlobal: promedio,
            equilibrados: equilibrados,
          });
        }
      } catch (err) {
        console.error('Error fetching stats:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();

    // Real-time subscription
    const subscription = supabase
      .channel('evaluaciones')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'evaluaciones' }, () => {
        fetchStats();
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const statItems = [
    { icon: Users, label: 'Participantes', value: stats.totalEvaluaciones },
    { icon: TrendingUp, label: 'Promedio Global', value: `${stats.promedioGlobal}/28` },
    { icon: Zap, label: 'Equilibrados', value: stats.equilibrados },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="grid md:grid-cols-3 gap-4"
    >
      {statItems.map((item, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: idx * 0.1, duration: 0.5 }}
          viewport={{ once: true }}
          className="card-premium text-center group hover:shadow-glow transition-all"
        >
          <motion.div
            className="text-4xl mb-3 group-hover:scale-110 transition-transform"
            whileHover={{ rotate: 15 }}
          >
            <item.icon className="w-10 h-10 text-primary mx-auto" />
          </motion.div>
          <p className="text-sm text-muted font-semibold uppercase tracking-wider mb-2">
            {item.label}
          </p>
          <motion.p
            className="text-4xl font-black text-gradient"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: idx * 0.1 + 0.2 }}
          >
            {loading ? '...' : item.value}
          </motion.p>
        </motion.div>
      ))}
    </motion.div>
  );
}
