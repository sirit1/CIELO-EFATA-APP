import { NextRequest, NextResponse } from 'next/server';
import { generatePreviewInsights } from '@/lib/openai';

export async function POST(request: NextRequest) {
  try {
    const { emotionalLevel, puntaje } = await request.json();
    
    const preview = await generatePreviewInsights(emotionalLevel, puntaje);

    return NextResponse.json({ preview });
  } catch (error: any) {
    console.error('[v0] Preview error:', error);
    return NextResponse.json(
      { preview: 'Acceso a insights completos disponible en Premium' },
      { status: 200 }
    );
  }
}
