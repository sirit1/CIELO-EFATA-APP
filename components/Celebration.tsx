'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export function Celebration() {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    // Activar celebración después de 500ms
    const timer = setTimeout(() => setIsActive(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const confetti = Array.from({ length: 50 }).map((_, i) => ({
    id: i,
    delay: Math.random() * 0.5,
    duration: 2 + Math.random() * 1,
    left: Math.random() * 100,
    size: 4 + Math.random() * 8,
  }));

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-40">
      {confetti.map((c) => (
        <motion.div
          key={c.id}
          className="absolute rounded-full"
          style={{
            left: `${c.left}%`,
            top: '-20px',
            width: c.size,
            height: c.size,
            backgroundColor: ['#a855f7', '#4f46e5', '#fbbf24', '#22c55e', '#ef4444'][
              Math.floor(Math.random() * 5)
            ],
          }}
          initial={{ opacity: 1, y: 0, rotate: 0 }}
          animate={{
            opacity: 0,
            y: window.innerHeight + 20,
            rotate: Math.random() * 720,
          }}
          transition={{
            delay: c.delay,
            duration: c.duration,
            ease: 'easeIn',
          }}
        />
      ))}

      {/* Burst effect */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`burst-${i}`}
            className="absolute w-2 h-2 bg-accent rounded-full"
            initial={{
              opacity: 1,
              x: 0,
              y: 0,
            }}
            animate={{
              opacity: 0,
              x: Math.cos((i / 8) * Math.PI * 2) * 200,
              y: Math.sin((i / 8) * Math.PI * 2) * 200,
            }}
            transition={{
              duration: 1,
              ease: 'easeOut',
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}
