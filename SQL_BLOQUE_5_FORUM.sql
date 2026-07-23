-- Forum Categories Table
CREATE TABLE IF NOT EXISTS public.forum_categories (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  color VARCHAR(20) DEFAULT '#3b82f6',
  icon VARCHAR(50) DEFAULT 'MessageCircle',
  slug VARCHAR(100) NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Forum Threads Table
CREATE TABLE IF NOT EXISTS public.forum_threads (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  category_id BIGINT NOT NULL REFERENCES public.forum_categories(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  views INT DEFAULT 0,
  likes INT DEFAULT 0,
  replies_count INT DEFAULT 0,
  pinned BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Forum Posts (Replies) Table
CREATE TABLE IF NOT EXISTS public.forum_posts (
  id BIGSERIAL PRIMARY KEY,
  thread_id BIGINT NOT NULL REFERENCES public.forum_threads(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  likes INT DEFAULT 0,
  is_solution BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Forum Likes Table
CREATE TABLE IF NOT EXISTS public.forum_likes (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  thread_id BIGINT REFERENCES public.forum_threads(id) ON DELETE CASCADE,
  post_id BIGINT REFERENCES public.forum_posts(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, thread_id),
  UNIQUE(user_id, post_id),
  CHECK ((thread_id IS NOT NULL AND post_id IS NULL) OR (thread_id IS NULL AND post_id IS NOT NULL))
);

-- Forum Notifications Table
CREATE TABLE IF NOT EXISTS public.forum_notifications (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  thread_id BIGINT REFERENCES public.forum_threads(id) ON DELETE CASCADE,
  post_id BIGINT REFERENCES public.forum_posts(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL, -- reply, like, mention
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Indexes for Performance
CREATE INDEX IF NOT EXISTS idx_forum_threads_category ON public.forum_threads(category_id);
CREATE INDEX IF NOT EXISTS idx_forum_threads_user ON public.forum_threads(user_id);
CREATE INDEX IF NOT EXISTS idx_forum_threads_created ON public.forum_threads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_forum_posts_thread ON public.forum_posts(thread_id);
CREATE INDEX IF NOT EXISTS idx_forum_posts_user ON public.forum_posts(user_id);
CREATE INDEX IF NOT EXISTS idx_forum_likes_user ON public.forum_likes(user_id);
CREATE INDEX IF NOT EXISTS idx_forum_notifications_user ON public.forum_notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_forum_notifications_read ON public.forum_notifications(read);

-- Enable RLS
ALTER TABLE public.forum_categories DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.forum_threads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.forum_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.forum_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.forum_notifications ENABLE ROW LEVEL SECURITY;

-- Categories are public (read-only)
CREATE POLICY "Categories are viewable by everyone" ON public.forum_categories
  FOR SELECT USING (true);

-- Threads RLS
CREATE POLICY "Threads are viewable by everyone" ON public.forum_threads
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own threads" ON public.forum_threads
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own threads" ON public.forum_threads
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own threads" ON public.forum_threads
  FOR DELETE USING (auth.uid() = user_id);

-- Posts RLS
CREATE POLICY "Posts are viewable by everyone" ON public.forum_posts
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own posts" ON public.forum_posts
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own posts" ON public.forum_posts
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own posts" ON public.forum_posts
  FOR DELETE USING (auth.uid() = user_id);

-- Likes RLS
CREATE POLICY "Users can view likes" ON public.forum_likes
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own likes" ON public.forum_likes
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own likes" ON public.forum_likes
  FOR DELETE USING (auth.uid() = user_id);

-- Notifications RLS
CREATE POLICY "Users can view their own notifications" ON public.forum_notifications
  FOR SELECT USING (auth.uid() = user_id);

-- Insert default categories
INSERT INTO public.forum_categories (name, description, color, icon, slug) VALUES
('General', 'Temas generales y discusiones', '#3b82f6', 'MessageCircle', 'general'),
('Tips & Tricks', 'Comparte consejos y estrategias', '#8b5cf6', 'Lightbulb', 'tips-tricks'),
('Recursos', 'Materiales y recursos útiles', '#ec4899', 'BookOpen', 'recursos'),
('Logros', 'Celebra tus badges y logros', '#f59e0b', 'Trophy', 'logros'),
('Soporte', 'Ayuda y preguntas técnicas', '#10b981', 'HelpCircle', 'soporte')
ON CONFLICT (name) DO NOTHING;

-- Create function to update views count
CREATE OR REPLACE FUNCTION increment_thread_views()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.forum_threads
  SET views = views + 1
  WHERE id = NEW.id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create function to update replies count
CREATE OR REPLACE FUNCTION increment_reply_count()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.forum_threads
  SET replies_count = replies_count + 1
  WHERE id = NEW.thread_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
