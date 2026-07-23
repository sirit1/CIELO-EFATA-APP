import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export interface InsightAnalysis {
  title: string;
  summary: string;
  analysis: string;
  recommendations: string[];
  resources: string[];
  nextSteps: string;
}

export async function generateEmotionalInsights(
  emotionalLevel: string,
  puntaje: number,
  respuestas: number[]
): Promise<InsightAnalysis> {
  const prompt = `
Eres un experto en neuroexegética y psicología emocional. Analiza los siguientes datos de evaluación emocional:

Nivel Emocional: ${emotionalLevel}
Puntaje: ${puntaje}/100
Respuestas: ${respuestas.join(', ')}

Proporciona un análisis profundo Y profesional en JSON con los siguientes campos:
{
  "title": "Título del análisis (máximo 50 caracteres)",
  "summary": "Resumen ejecutivo (2-3 oraciones)",
  "analysis": "Análisis profundo de 300-400 palabras explicando el nivel emocional, patrones observados, y factores neurobiológicos",
  "recommendations": ["Recomendación 1", "Recomendación 2", "Recomendación 3", "Recomendación 4"],
  "resources": ["Recurso 1 sugerido", "Recurso 2 sugerido", "Recurso 3 sugerido"],
  "nextSteps": "Pasos concretos a seguir (2-3 párrafos)"
}

Sé específico, profundo y profesional. Este análisis será para usuarios de una aplicación de evaluación emocional.
`;

  const response = await openai.chat.completions.create({
    model: 'gpt-4-turbo',
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
    temperature: 0.7,
    max_tokens: 1500,
  });

  const content = response.choices[0].message.content || '{}';
  
  try {
    return JSON.parse(content) as InsightAnalysis;
  } catch {
    console.error('[v0] Error parsing OpenAI response:', content);
    return {
      title: 'Análisis de Evaluación',
      summary: 'Se completó tu evaluación emocional.',
      analysis: 'Tu resultado proporciona información valiosa sobre tu estado emocional actual.',
      recommendations: [
        'Practica mindfulness diariamente',
        'Mantén un diario de emociones',
        'Busca apoyo profesional si lo necesitas',
      ],
      resources: [
        'Libros recomendados sobre inteligencia emocional',
        'Aplicaciones de meditación',
        'Grupos de soporte',
      ],
      nextSteps: 'Revisa tu análisis completo y considera los pasos sugeridos.',
    };
  }
}

export async function generatePreviewInsights(
  emotionalLevel: string,
  puntaje: number
): Promise<string> {
  const prompt = `En máximo 2 oraciones, proporciona una descripción breve pero impactante del nivel emocional "${emotionalLevel}" con puntaje ${puntaje}/100.`;

  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
    temperature: 0.5,
    max_tokens: 100,
  });

  return response.choices[0].message.content || 'Resultados disponibles en Premium';
}
