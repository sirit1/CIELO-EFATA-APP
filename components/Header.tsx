'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export function Header() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="text-center space-y-6 py-12"
    >
      {/* Logo con animación flotante */}
      <motion.div
        className="flex justify-center"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="relative w-40 h-40">
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent rounded-3xl blur-2xl opacity-30 animate-pulse" />
          <img
            src="https://i.ibb.co/twyTZ7Kz/logo-cieloefata.jpg"
            alt="Ministerio Cielo Efata"
            className="relative w-40 h-40 rounded-3xl border-2 border-primary shadow-2xl object-cover hover:shadow-glow-lg transition-shadow"
          />
        </div>
      </motion.div>

      {/* Badge ministerial */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <span className="inline-block px-5 py-2 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 text-primary border border-primary/40 text-xs font-black tracking-widest uppercase hover:shadow-glow transition-all">
          Ministerio Cielo Efata
        </span>
      </motion.div>

      {/* Título principal */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-tight"
      >
        ¿Tus emociones
        <span className="text-gradient"> te controlan?</span>
      </motion.h1>

      {/* Subtítulo */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="text-lg md:text-xl text-muted max-w-3xl mx-auto italic font-light leading-relaxed"
      >
        La encrucijada crítica entre tu neurobiología y tu diseño divino original
      </motion.p>
    </motion.div>
  );
}
