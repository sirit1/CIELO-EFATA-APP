'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Share2, Gift, Users, Zap } from 'lucide-react';
import { getReferralInfo } from '@/lib/gamification';

interface ReferralsDashboardProps {
  userId?: string;
}

export function ReferralsDashboard({ userId }: ReferralsDashboardProps) {
  const [referralCode, setReferralCode] = useState('');
  const [referralLink, setReferralLink] = useState('');
  const [stats, setStats] = useState({
    totalInvites: 0,
    totalRewards: 0,
  });
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;
    loadReferralInfo();
  }, [userId]);

  const loadReferralInfo = async () => {
    try {
      const info = await getReferralInfo(userId!);
      setReferralCode(info.referralCode);
      setStats({
        totalInvites: info.totalInvites,
        totalRewards: info.totalRewards,
      });
      setReferralLink(`${window.location.origin}?ref=${info.referralCode}`);
    } catch (error) {
      console.error('[v0] Error loading referral info:', error);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareOnWhatsApp = () => {
    const text = `¡Hola! Quiero invitarte a unirte a Cielo Efata para evaluar tus emociones y mejorar tu inteligencia emocional. Usa mi código: ${referralCode}. ${referralLink}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`);
  };

  const shareOnTwitter = () => {
    const text = `¡Acabo de evaluar mis emociones con Cielo Efata! ¿Quieres probar? Usa mi código: ${referralCode} ${referralLink}`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`);
  };

  if (loading) {
    return <div className="text-center py-8">Cargando...</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 border border-slate-700"
    >
      <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
        <Gift className="w-6 h-6 text-yellow-400" />
        Mi Programa de Referrals
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* Invitaciones */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-slate-700/50 rounded-xl p-4 border border-slate-600"
        >
          <div className="flex items-center gap-3 mb-2">
            <Users className="w-5 h-5 text-cyan-400" />
            <p className="text-slate-400 text-sm">Amigos Invitados</p>
          </div>
          <p className="text-3xl font-bold text-white">{stats.totalInvites}</p>
          <p className="text-xs text-slate-500 mt-2">+5 más = Badge "Friend Maker"</p>
        </motion.div>

        {/* Recompensas */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-slate-700/50 rounded-xl p-4 border border-slate-600"
        >
          <div className="flex items-center gap-3 mb-2">
            <Zap className="w-5 h-5 text-yellow-400" />
            <p className="text-slate-400 text-sm">Puntos Ganados</p>
          </div>
          <p className="text-3xl font-bold text-white">{stats.totalRewards}</p>
          <p className="text-xs text-slate-500 mt-2">100 puntos por referral</p>
        </motion.div>
      </div>

      {/* Link Referral */}
      <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-700 mb-6">
        <p className="text-slate-400 text-sm mb-3">Tu Código Referral</p>
        <div className="flex gap-2">
          <input
            type="text"
            value={referralCode}
            readOnly
            className="flex-1 bg-slate-800 border border-slate-600 rounded-lg px-4 py-2 text-white font-mono text-sm"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={copyToClipboard}
            className={`px-4 py-2 rounded-lg font-medium transition flex items-center gap-2 ${
              copied
                ? 'bg-green-500 text-white'
                : 'bg-purple-600 text-white hover:bg-purple-700'
            }`}
          >
            <Copy className="w-4 h-4" />
            {copied ? 'Copiado' : 'Copiar'}
          </motion.button>
        </div>
      </div>

      {/* Share Buttons */}
      <div className="space-y-3">
        <p className="text-slate-400 text-sm mb-3">Compartir link</p>
        <div className="grid grid-cols-3 gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={copyToClipboard}
            className="bg-slate-700 hover:bg-slate-600 text-white py-2 rounded-lg flex items-center justify-center gap-2 transition"
          >
            <Copy className="w-4 h-4" />
            <span className="hidden sm:inline">Copiar</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={shareOnWhatsApp}
            className="bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg flex items-center justify-center gap-2 transition"
          >
            <Share2 className="w-4 h-4" />
            <span className="hidden sm:inline">WhatsApp</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={shareOnTwitter}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg flex items-center justify-center gap-2 transition"
          >
            <Share2 className="w-4 h-4" />
            <span className="hidden sm:inline">Twitter</span>
          </motion.button>
        </div>
      </div>

      {/* Benefit Info */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-6 p-4 bg-indigo-500/10 border border-indigo-500/50 rounded-lg"
      >
        <p className="text-indigo-300 text-sm">
          <strong>¿Cómo funciona?</strong> Cada amigo que invites gana 100 puntos. Tú también ganas 100 puntos + desbloqueas badges especiales. A más referrals, más beneficios.
        </p>
      </motion.div>
    </motion.div>
  );
}
