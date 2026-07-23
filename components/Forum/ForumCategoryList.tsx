'use client';
import { motion } from 'framer-motion';

interface ForumCategoryListProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const CATEGORIES = [
  { id: 'general', name: 'General', color: 'from-blue-500 to-blue-600' },
  { id: 'tips-tricks', name: 'Tips & Tricks', color: 'from-purple-500 to-purple-600' },
  { id: 'recursos', name: 'Recursos', color: 'from-pink-500 to-pink-600' },
  { id: 'logros', name: 'Logros', color: 'from-amber-500 to-amber-600' },
  { id: 'soporte', name: 'Soporte', color: 'from-green-500 to-green-600' },
];

export function ForumCategoryList({ selectedCategory, onSelectCategory }: ForumCategoryListProps) {
  return (
    <div className="space-y-2">
      {CATEGORIES.map((category, i) => (
        <motion.button
          key={category.id}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.05 }}
          onClick={() => onSelectCategory(category.id)}
          className={`w-full text-left px-4 py-3 rounded-lg transition ${
            selectedCategory === category.id
              ? `bg-gradient-to-r ${category.color} text-white font-semibold`
              : 'bg-slate-800/50 text-slate-300 hover:bg-slate-800'
          }`}
        >
          {category.name}
        </motion.button>
      ))}
    </div>
  );
}
