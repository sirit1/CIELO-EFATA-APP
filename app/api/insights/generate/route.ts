import { NextRequest, NextResponse } from 'next/server';
import { generateEmotionalInsights } from '@/lib/openai';

export async function POST(request: NextRequest) {
  try {
    const { emotionalLevel, puntaje, respuestas } = await request.json();
    
    if (!emotionalLevel || puntaje === undefined) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const insights = await generateEmotionalInsights(
      emotionalLevel,
      puntaje,
      respuestas || []
    );

    return NextResponse.json(insights);
  } catch (error: any) {
    console.error('[v0] OpenAI error:', error);
    return NextResponse.json(
      { error: 'Failed to generate insights' },
      { status: 500 }
    );
  }
}
