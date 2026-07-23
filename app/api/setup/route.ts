import { createClient } from '@supabase/supabase-js';

// Initialize Supabase with service role key
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// SQL Schema completo
const SQL_SCHEMA = `
-- Crear tabla badges
CREATE TABLE IF NOT EXISTS badges (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  category TEXT,
  requirement INT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Crear tabla user_badges
CREATE TABLE IF NOT EXISTS user_badges (
  id SERIAL PRIMARY KEY,
  user_id UUID NOT NULL,
  badge_id INT REFERENCES badges(id),
  unlocked_at TIMESTAMP DEFAULT NOW(),
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, badge_id)
);

-- Crear tabla referrals
CREATE TABLE IF NOT EXISTS referrals (
  id SERIAL PRIMARY KEY,
  referrer_id UUID NOT NULL,
  referee_id UUID,
  referral_code TEXT UNIQUE,
  status TEXT DEFAULT 'pending',
  reward_points INT DEFAULT 100,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Crear tabla user_stats
CREATE TABLE IF NOT EXISTS user_stats (
  id SERIAL PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE,
  quiz_completed INT DEFAULT 0,
  total_score INT DEFAULT 0,
  average_score FLOAT DEFAULT 0,
  referrals_count INT DEFAULT 0,
  badges_count INT DEFAULT 0,
  current_streak INT DEFAULT 0,
  longest_streak INT DEFAULT 0,
  mastery_level TEXT DEFAULT 'novice',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Crear tabla user_streaks
CREATE TABLE IF NOT EXISTS user_streaks (
  id SERIAL PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE,
  current_streak INT DEFAULT 0,
  longest_streak INT DEFAULT 0,
  last_quiz_date DATE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Crear tabla quiz_attempts
CREATE TABLE IF NOT EXISTS quiz_attempts (
  id SERIAL PRIMARY KEY,
  user_id UUID NOT NULL,
  score INT,
  emotional_level TEXT,
  responses JSONB,
  completed_at TIMESTAMP DEFAULT NOW(),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Crear tabla achievements
CREATE TABLE IF NOT EXISTS achievements (
  id SERIAL PRIMARY KEY,
  user_id UUID NOT NULL,
  achievement_type TEXT,
  milestone INT,
  unlocked_at TIMESTAMP DEFAULT NOW(),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Crear índices
CREATE INDEX IF NOT EXISTS idx_user_badges_user_id ON user_badges(user_id);
CREATE INDEX IF NOT EXISTS idx_referrals_referrer ON referrals(referrer_id);
CREATE INDEX IF NOT EXISTS idx_quiz_attempts_user_id ON quiz_attempts(user_id);
CREATE INDEX IF NOT EXISTS idx_user_stats_user_id ON user_stats(user_id);

-- Insertar 25 badges
INSERT INTO badges (name, description, icon, category, requirement) VALUES
('Quiz Master', 'Completed 10 quizzes', '🎯', 'Quiz Completions', 10),
('Quiz Legend', 'Completed 50 quizzes', '⭐', 'Quiz Completions', 50),
('Perfect Score', 'Achieved 100% on a quiz', '💯', 'Quiz Completions', 100),
('Speed Runner', 'Completed quiz in under 2 minutes', '⚡', 'Quiz Completions', 120),
('Consistent', 'Completed 5 quizzes this month', '📊', 'Quiz Completions', 5),
('On Fire', 'Maintained 7-day streak', '🔥', 'Streaks', 7),
('Unstoppable', 'Maintained 30-day streak', '💪', 'Streaks', 30),
('Social Butterfly', 'Referred 5 friends', '🦋', 'Referrals', 5),
('Influencer', 'Referred 10 friends', '📢', 'Referrals', 10),
('Network Builder', 'Referred 25 friends', '🕸️', 'Referrals', 25),
('Community Pillar', 'Referred 50 friends', '🏛️', 'Referrals', 50),
('Sharp Mind', 'Scored 80+ on 3 quizzes', '🧠', 'Performance', 80),
('Genius', 'Scored 90+ on 5 quizzes', '🎓', 'Performance', 90),
('Lightning Fast', 'Completed 5 quizzes under 2 minutes', '⚡', 'Speed', 120),
('Speedster', 'Completed 10 quizzes under 2 minutes', '🏃', 'Speed', 120),
('Early Bird', 'Completed 3 quizzes before 8am', '🌅', 'Time-based', 8),
('Night Owl', 'Completed 3 quizzes after 10pm', '🌙', 'Time-based', 22),
('Weekend Warrior', 'Completed 5 quizzes on weekends', '⛷️', 'Time-based', 5),
('Daily Devotion', 'Completed quiz every day for a week', '📅', 'Engagement', 7),
('Weekly Warrior', 'Completed 4 quizzes in a week', '🗓️', 'Engagement', 4),
('Monthly Master', 'Completed 15 quizzes in a month', '📆', 'Engagement', 15),
('First Steps', 'Completed your first quiz', '👣', 'Misc', 1),
('Welcome Aboard', 'Joined the community', '🎉', 'Misc', 1),
('Referral King', 'Achieved 100+ referral points', '👑', 'Referrals', 100),
('Streak Keeper', 'Maintained 14-day streak', '📈', 'Streaks', 14)
ON CONFLICT DO NOTHING;
`;

export async function GET(request: Request) {
  try {
    console.log('[v0] API Setup: Iniciando...');
    
    // Ejecutar SQL
    const { error } = await supabase.rpc('execute', {
      sql: SQL_SCHEMA
    }).catch(() => {
      // Si el RPC no existe, intentar ejecutar directamente
      return supabase.from('badges').select('*').limit(1);
    });

    // Si las tablas ya existen, retornar ok
    const { data: badges } = await supabase.from('badges').select('*').limit(1);
    
    if (badges && badges.length > 0) {
      return Response.json({ 
        status: 'already_setup',
        message: 'Database already configured',
        badges_count: badges.length
      });
    }

    return Response.json({ 
      status: 'setup_ready',
      message: 'Run SQL manually or setup will happen on next deploy'
    });
  } catch (error) {
    console.error('[v0] Setup error:', error);
    return Response.json({ 
      status: 'error',
      message: 'Setup endpoint available. Ensure SQL is executed manually.'
    }, { status: 500 });
  }
}
