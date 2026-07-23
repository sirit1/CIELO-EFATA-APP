import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

export async function POST(request: NextRequest) {
  try {
    const { threadId, postId, isLike } = await request.json();

    if (isLike) {
      const { error } = await supabase.from('forum_likes').insert([{
        user_id: 'user-id',
        thread_id: threadId || null,
        post_id: postId || null,
      }]);
      if (error) throw error;
    } else {
      const { error } = await supabase
        .from('forum_likes')
        .delete()
        .eq('user_id', 'user-id')
        .match(threadId ? { thread_id: threadId } : { post_id: postId });
      if (error) throw error;
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
