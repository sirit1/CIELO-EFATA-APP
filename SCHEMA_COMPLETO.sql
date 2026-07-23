-- ============================================
-- BLOQUE 1: CREAR TABLAS
-- Copia todo esto y pega en Supabase SQL Editor
-- ============================================

-- Tabla de Badges (Logros)
CREATE TABLE IF NOT EXISTS badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  description TEXT,
  icon VARCHAR(50) NOT NULL,
  color VARCHAR(20) NOT NULL,
  requirement INT NOT NULL,
  category VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Tabla de User Badges
CREATE TABLE IF NOT EXISTS user_badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  badge_id UUID NOT NULL REFERENCES badges(id) ON DELETE CASCADE,
  unlocked_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, badge_id)
);

-- Tabla de Referrals
CREATE TABLE IF NOT EXISTS referrals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  referrer_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  referral_code VARCHAR(20) UNIQUE NOT NULL,
  referred_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  converted_at TIMESTAMP,
  reward_points INT DEFAULT 0
);

-- Tabla de User Streaks
CREATE TABLE IF NOT EXISTS user_streaks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  current_streak INT DEFAULT 0,
  longest_streak INT DEFAULT 0,
  last_quiz_date DATE,
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Tabla de User Stats
CREATE TABLE IF NOT EXISTS user_stats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  total_quizzes INT DEFAULT 0,
  average_score DECIMAL(5,2) DEFAULT 0,
  total_points INT DEFAULT 0,
  mastery_level VARCHAR(20) DEFAULT 'novice',
  badges_count INT DEFAULT 0,
  referrals_count INT DEFAULT 0,
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Tabla de Quiz Attempts
CREATE TABLE IF NOT EXISTS quiz_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  score INT NOT NULL,
  responses JSONB NOT NULL,
  emotional_level VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Tabla de Achievements
CREATE TABLE IF NOT EXISTS achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  achievement_name VARCHAR(100) NOT NULL,
  description TEXT,
  points INT DEFAULT 0,
  earned_at TIMESTAMP DEFAULT NOW()
);
-- ============================================
-- BLOQUE 2: CREAR ÍNDICES (Opcional pero recomendado)
-- Copia todo esto y pega en Supabase SQL Editor
-- ============================================

CREATE INDEX IF NOT EXISTS idx_user_badges_user_id ON user_badges(user_id);
CREATE INDEX IF NOT EXISTS idx_referrals_referrer_id ON referrals(referrer_id);
CREATE INDEX IF NOT EXISTS idx_quiz_attempts_user_id ON quiz_attempts(user_id);
CREATE INDEX IF NOT EXISTS idx_quiz_attempts_created_at ON quiz_attempts(created_at);
CREATE INDEX IF NOT EXISTS idx_user_stats_user_id ON user_stats(user_id);
-- ============================================
-- BLOQUE 3: INSERTAR 25 BADGES
-- Copia todo esto y pega en Supabase SQL Editor
-- ============================================

INSERT INTO badges (name, description, icon, color, requirement, category) VALUES
('First Step', 'Complete your first evaluation', '🎯', 'blue', 1, 'quiz_completions'),
('Eager Beaver', 'Complete 5 evaluations', '🚀', 'purple', 5, 'quiz_completions'),
('Persistent', 'Complete 10 evaluations', '💪', 'green', 10, 'quiz_completions'),
('Mindful Master', 'Complete 25 evaluations', '🧘', 'indigo', 25, 'quiz_completions'),
('Expert Analyzer', 'Complete 50 evaluations', '🎓', 'gold', 50, 'quiz_completions'),
('On Fire', 'Maintain 7-day streak', '🔥', 'orange', 7, 'streak'),
('Unstoppable', 'Maintain 30-day streak', '⚡', 'red', 30, 'streak'),
('Social Butterfly', 'Invite 1 friend', '🦋', 'pink', 1, 'referrals'),
('Friend Maker', 'Invite 5 friends', '👥', 'cyan', 5, 'referrals'),
('Influencer', 'Invite 10 friends', '📢', 'teal', 10, 'referrals'),
('Network King', 'Invite 25 friends', '👑', 'gold', 25, 'referrals'),
('Perfect Score', 'Get a perfect 100 score', '💯', 'yellow', 100, 'quiz_performance'),
('High Achiever', 'Score 90+ on 5 quizzes', '⭐', 'silver', 90, 'quiz_performance'),
('Balanced Mind', 'Get a balanced emotional profile', '⚖️', 'green', 50, 'quiz_performance'),
('Night Owl', 'Complete evaluation after 10 PM', '🌙', 'purple', 22, 'quiz_time'),
('Early Bird', 'Complete evaluation before 6 AM', '🌅', 'orange', 6, 'quiz_time'),
('Weekend Warrior', 'Complete 5 evaluations on weekends', '💼', 'blue', 5, 'quiz_time'),
('Feedback Master', 'Share your result', '📤', 'green', 1, 'engagement'),
('Community Member', 'Participate in community', '🤝', 'blue', 5, 'engagement'),
('Quiz Speedrunner', 'Complete quiz in under 2 minutes', '⚡', 'cyan', 120, 'quiz_speed'),
('Thoughtful Responder', 'Complete quiz in over 10 minutes', '🤔', 'purple', 600, 'quiz_speed'),
('Multi-linguist', 'Complete quizzes in different languages', '🌍', 'gold', 2, 'misc'),
('Last Minute', 'Complete quiz at 11:59 PM', '⏰', 'red', 23, 'misc'),
('Comeback Kid', 'Return after 30 days away', '🔄', 'green', 30, 'engagement'),
('Legendary', 'Unlock all badges', '🏆', 'gold', 25, 'misc')
ON CONFLICT DO NOTHING;
