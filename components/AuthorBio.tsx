'use client';

import { motion } from 'framer-motion';
import { Award, Zap, Target } from 'lucide-react';

export function AuthorBio() {
  const credentials = [
    { icon: Award, text: "Doctor Honoris Causa (Centro UNESCO)" },
    { icon: Zap, text: "IBM Data Scientist & Analytics Certified" },
    { icon: Target, text: "30+ años transformando empresas y vidas" }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="card-premium md:grid md:grid-cols-3 md:gap-8 md:items-center"
    >
      {/* Foto */}
      <motion.div
        className="flex justify-center md:col-span-1"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
      >
        <div className="relative w-48 h-48">
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent rounded-2xl blur-lg opacity-20" />
          <img
            src="https://i.ibb.co/jZxqnpGQ/foto-mia-de-lujo.jpg"
            alt="Dr. Alejandro Sirit"
            className="relative w-48 h-48 rounded-2xl border-2 border-primary shadow-2xl object-cover"
          />
        </div>
      </motion.div>

      {/* Contenido */}
      <div className="md:col-span-2 space-y-5 text-left mt-6 md:mt-0">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl md:text-4xl font-black text-white">Dr. Alejandro Sirit</h3>
          <p className="text-xs text-accent font-bold uppercase tracking-widest mt-2">Neurocientífico & Especialista en Inteligencia Artificial</p>
        </motion.div>

        {/* Credenciales */}
        <motion.div className="space-y-2">
          {credentials.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + idx * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 text-sm text-muted"
            >
              <item.icon className="w-5 h-5 text-primary flex-shrink-0" />
              <span>{item.text}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Descripción */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          viewport={{ once: true }}
          className="text-gray-300 leading-relaxed text-base pt-4 border-t border-white/10"
        >
          Pionero en la intersección disruptiva entre neurociencia aplicada, exégesis bíblica y gobernanza ética de IA. Su misión es rescatar la arquitectura mental del ser humano del colapso digital, devolviéndole dominio propio, paz interior y diseño original bajo la majestad de YHWH.
        </motion.p>
      </div>
    </motion.div>
  );
}
