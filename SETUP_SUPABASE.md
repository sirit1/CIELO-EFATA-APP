# Setup Supabase para Cielo Efata Enterprise

## 1. Variables de Entorno Necesarias

Reemplaza en `.env.local`:

```
SUPABASE_SERVICE_ROLE_KEY=<Tu service role key de Supabase>
BETTER_AUTH_SECRET=<Genera con: openssl rand -base64 32>
GOOGLE_CLIENT_ID=<Tu Google OAuth Client ID>
GOOGLE_CLIENT_SECRET=<Tu Google OAuth Client Secret>
```

## 2. Ejecutar SQL en Supabase

Ve a **Supabase Dashboard → SQL Editor** y copia-pega el contenido de `lib/schema.sql`

Este script crea:
- Tabla de Badges (25 badges iniciales)
- Tabla de User Badges (logros desbloqueados)
- Tabla de Referrals (sistema viral)
- Tabla de User Streaks (contador de días consecutivos)
- Tabla de User Stats (estadísticas del usuario)
- Tabla de Quiz Attempts (historial)
- Tabla de Achievements (logros especiales)

## 3. Habilitar Google OAuth (Opcional)

Si quieres agregar login con Google:

1. Ve a [Google Cloud Console](https://console.cloud.google.com)
2. Crea un proyecto nuevo
3. Habilita "Google+ API"
4. Ve a "Credenciales" → "Crear Credenciales" → "OAuth 2.0 Client ID"
5. Configura como "Aplicación web"
6. Agrega `http://localhost:3000/callback` y `https://tudominio.com/callback` en Redirecciones autorizadas
7. Copia Client ID y Client Secret en `.env.local`

## 4. Better Auth Secret

Genera una clave segura:
```bash
openssl rand -base64 32
```

Pega el resultado en `BETTER_AUTH_SECRET` en `.env.local`

## 5. Configuración CORS en Supabase (si es necesario)

Si ves errores de CORS:
- Ve a Supabase Dashboard → Settings → API
- Agrega tu dominio a "Allowed origins"

## 6. Verificar que funciona

Reinicia el servidor:
```bash
npm run dev
```

Intenta:
1. Registrarte con un email
2. Ir a `/dashboard` (si estás autenticado)
3. Ver tus badges y stats

## Próximos pasos:

- Ejecutar migrations de Better Auth
- Habilitar RLS (Row Level Security) en Supabase
- Configurar backups automáticos
