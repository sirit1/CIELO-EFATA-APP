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
