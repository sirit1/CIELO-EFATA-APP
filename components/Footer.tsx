'use client';

import { motion } from 'framer-motion';
import { Mail, MessageCircle, Linkedin } from 'lucide-react';

export function Footer() {
  const socialLinks = [
    { icon: Mail, href: '#', label: 'Email' },
    { icon: MessageCircle, href: '#', label: 'WhatsApp' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
  ];

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="border-t border-white/10 mt-20 pt-12 pb-8"
    >
      <div className="max-w-6xl mx-auto px-4 space-y-12">
        {/* CTA Final */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center space-y-6"
        >
          <div className="space-y-3">
            <h3 className="text-3xl font-bold text-white">¿Listo para tu transformación?</h3>
            <p className="text-muted text-lg max-w-2xl mx-auto">
              Únete a cientos de personas que ya han descubierto cómo recuperar el control de sus emociones
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-primary px-8">Agendar Consulta</button>
            <button className="btn-secondary px-8">Aprender Más</button>
          </div>
        </motion.div>

        {/* Links y Social */}
        <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
          {/* About */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-3"
          >
            <h4 className="font-bold text-white text-sm uppercase tracking-wider">Ministerio Cielo Efata</h4>
            <p className="text-muted text-sm leading-relaxed">
              Transformando vidas a través de la integración de neurociencia, exégesis bíblica e inteligencia artificial.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-3"
          >
            <h4 className="font-bold text-white text-sm uppercase tracking-wider">Enlaces Rápidos</h4>
            <ul className="space-y-2 text-sm">
              {['Evaluación', 'Recursos', 'Blog', 'Contacto'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-muted hover:text-primary transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Social */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-3"
          >
            <h4 className="font-bold text-white text-sm uppercase tracking-wider">Síguenos</h4>
            <div className="flex gap-4 justify-center md:justify-start">
              {socialLinks.map((social, idx) => (
                <motion.a
                  key={idx}
                  href={social.href}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center hover:bg-primary/40 transition-colors"
                >
                  <social.icon className="w-5 h-5 text-primary" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          viewport={{ once: true }}
          className="border-t border-white/10 pt-8 text-center text-sm text-muted"
        >
          <p>&copy; 2026 Ministerio Cielo Efata. Todos los derechos reservados.</p>
        </motion.div>
      </div>
    </motion.footer>
  );
}
