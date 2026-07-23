import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Ministerio Cielo Efata - Evaluación Neuroexegética Premium',
  description: 'Descubre cómo tus emociones afectan tus decisiones. Evaluación profunda basada en neurociencia y diseño divino.',
  keywords: 'evaluación, neurociencia, emociones, control emocional, bienestar mental',
  openGraph: {
    title: 'Ministerio Cielo Efata',
    description: 'Evaluación Neuroexegética Premium',
    type: 'website',
    locale: 'es_ES',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#090d16',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="bg-background">
      <body className="bg-background text-foreground antialiased">
        <div className="min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
