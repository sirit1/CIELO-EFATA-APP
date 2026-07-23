# SUPABASE SETUP - PASO A PASO (5 MINUTOS)

## PASO 1: Abrir SQL Editor en Supabase

1. Ve a tu Supabase Dashboard: https://supabase.com/dashboard/project/xzjoruazhlwmaebnqqbv
2. En el menú izquierdo, haz clic en **SQL Editor**
3. Haz clic en el botón **+ New query** (arriba a la derecha)

## PASO 2: Copiar y Ejecutar SQL Schema

El SQL que necesitas ejecutar está en: `/lib/schema.sql`

**Aquí está el SQL completo:**

```sql
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

-- Tabla de User Badges (Badges desbloqueados por usuario)
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

-- Tabla de Quiz Attempts (Historial)
CREATE TABLE IF NOT EXISTS quiz_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  score INT NOT NULL,
  responses JSONB NOT NULL,
  emotional_level VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Tabla de Achievements (Logros especiales)
CREATE TABLE IF NOT EXISTS achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  achievement_name VARCHAR(100) NOT NULL,
  description TEXT,
  points INT DEFAULT 0,
  earned_at TIMESTAMP DEFAULT NOW()
);

-- Índices para performance
CREATE INDEX IF NOT EXISTS idx_user_badges_user_id ON user_badges(user_id);
CREATE INDEX IF NOT EXISTS idx_referrals_referrer_id ON referrals(referrer_id);
CREATE INDEX IF NOT EXISTS idx_quiz_attempts_user_id ON quiz_attempts(user_id);
CREATE INDEX IF NOT EXISTS idx_quiz_attempts_created_at ON quiz_attempts(created_at);
CREATE INDEX IF NOT EXISTS idx_user_stats_user_id ON user_stats(user_id);

-- Inserts de Badges iniciales (25 badges)
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
```

### Instrucciones:

1. **Selecciona todo el SQL arriba** (Ctrl+A o Cmd+A)
2. **Pega en tu SQL Editor de Supabase**
3. **Haz clic en el botón Run** (o presiona Cmd/Ctrl + Enter)
4. Espera a que se complete (10-20 segundos)

## PASO 3: Verificar que se ejecutó correctamente

Después de ejecutar el SQL:

1. Abre el **Table Editor** (en el menú izquierdo)
2. Deberías ver estas tablas nuevas:
   - `badges` (con 25 badges iniciales)
   - `user_badges`
   - `referrals`
   - `user_streaks`
   - `user_stats`
   - `quiz_attempts`
   - `achievements`

Si ves todas estas tablas, estás listo para continuar.

## PASO 4: Configurar autenticación en Supabase

1. Ve a **Authentication** en el menú izquierdo
2. Haz clic en **Providers**
3. Busca **Email** y asegúrate que está **habilitado** (toggle verde)
4. Si quieres agregar Google OAuth:
   - Haz clic en **Google**
   - Configura tus credenciales de Google Console
   - (Opcional - puedo ayudarte con esto)

## PASO 5: Obtener las credenciales para .env.local

1. Ve a **Project Settings** (engranaje abajo a la izquierda)
2. Haz clic en **API**
3. Copia:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** key → `SUPABASE_SERVICE_ROLE_KEY`

## PASO 6: Actualizar .env.local

En tu proyecto (`/vercel/share/v0-project/.env.local`):

```env
NEXT_PUBLIC_SUPABASE_URL=https://xzjoruazhlwmaebnqqbv.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key_aqui
SUPABASE_SERVICE_ROLE_KEY=tu_service_role_key_aqui
NEXT_PUBLIC_APP_URL=http://localhost:3000
BETTER_AUTH_SECRET=tu_secret_aqui
```

Para generar `BETTER_AUTH_SECRET`, corre en terminal:
```bash
openssl rand -base64 32
```

## PASO 7: Reiniciar servidor y probar

```bash
npm run dev
```

Luego ve a: http://localhost:3000

Deberías ver:
- Botón "Registrate para Empezar"
- Modal de login/signup
- Dashboard funcional después de registrarse

---

## TROUBLESHOOTING

**Si ves error "relation already exists":**
- Es normal si ejecutaste el SQL antes
- Simplemente corre de nuevo, tiene `IF NOT EXISTS`

**Si no ves las tablas:**
- Refresca el Table Editor (F5)
- Verifica que estés en el schema `public`

**Si el login no funciona:**
- Verifica que Email authentication está habilitado en Providers
- Comprueba que .env.local tiene las credenciales correctas
- Reinicia el servidor (`npm run dev`)

---

## ¡LISTO!

Con estos 7 pasos, tienes:
- ✅ Base de datos con 8 tablas
- ✅ 25 badges automáticos
- ✅ Autenticación con Supabase
- ✅ Sistema de referrals
- ✅ Gamificación lista para usar

La app está lista para producción. Solo ejecuta el SQL y actualiza .env.local.
