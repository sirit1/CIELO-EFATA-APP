import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category') || 'general';
    const q = searchParams.get('q') || '';

    let query = supabase
      .from('forum_threads')
      .select('*')
      .eq('category_id', category === 'general' ? 1 : 2)
      .order('pinned', { ascending: false })
      .order('created_at', { ascending: false })
      .limit(20);

    if (q) {
      query = query.ilike('title', `%${q}%`);
    }

    const { data, error } = await query;
    if (error) throw error;

    return NextResponse.json(data || []);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { title, content, category } = await request.json();

    const { data, error } = await supabase.from('forum_threads').insert([{
      title,
      content,
      category_id: 1,
      user_id: 'user-id', // Reemplazar con auth
      created_at: new Date().toISOString(),
    }]).select();

    if (error) throw error;
    return NextResponse.json(data?.[0], { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
