# 🔑 CONFIGURAR .env.local - GUÍA FÁCIL

## ⏱️ Tiempo Total: 3 minutos

---

## ¿QUÉ ES .env.local?

Es un archivo donde guardas **claves secretas** para que tu app funcione.
- **NO va a GitHub** (es privado)
- Contiene credenciales de Supabase
- Es necesario para que la app funcione

---

## PASO 1: Abre tu editor de código (30 segundos)

1. Abre **VS Code** (o tu editor favorito)
2. Abre tu proyecto: `/vercel/share/v0-project`

Verás una carpeta así:

```
cielo-efata-project/
├── app/
├── components/
├── lib/
├── .env.example ← ESTE ARCHIVO
├── .env.local   ← LO CREARÁS
├── package.json
└── ...
```

---

## PASO 2: Crea el archivo .env.local (1 minuto)

### Option A: Crear desde cero

1. Haz clic derecho en la carpeta raíz
2. Selecciona: **New File**
3. Nombre: `.env.local` (exactamente así)
4. Presiona Enter

### Option B: Copiar desde .env.example

1. Haz clic derecho en `.env.example`
2. Selecciona: **Duplicate**
3. Renombra a: `.env.local`

---

## PASO 3: Copia el contenido base (30 segundos)

Abre `.env.example` y verás:

```
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xzjoruazhlwmaebnqqbv.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_AVcvj1Bq_uD7sYhbJZeHWA_NobPbVVF

# Auth
SUPABASE_SERVICE_ROLE_KEY=
BETTER_AUTH_SECRET=
NEXT_PUBLIC_APP_URL=http://localhost:3000

# OAuth (opcional - para después)
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

Copia TODO esto.

---

## PASO 4: Pega en .env.local (30 segundos)

1. Abre `.env.local` (el archivo que creaste)
2. Pega el contenido: **Ctrl+V**
3. Guarda: **Ctrl+S**

Verás algo así:

```
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xzjoruazhlwmaebnqqbv.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_AVcvj1Bq_uD7sYhbJZeHWA_NobPbVVF

# Auth
SUPABASE_SERVICE_ROLE_KEY=
BETTER_AUTH_SECRET=
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## PASO 5: Obtén SUPABASE_SERVICE_ROLE_KEY (1 minuto)

### ¿Dónde conseguirlo?

1. Abre Supabase: https://supabase.com/dashboard
2. Proyecto: **xzjoruazhlwmaebnqqbv**
3. Menú izquierdo → **Settings** (⚙️)
4. En Settings, busca: **API**
5. Verás dos keys:
   - `anon public` (ya tienes)
   - `service_role secret` ← ESTA

Haz clic en el icono **copiar** al lado de `service_role secret`

```
┌─ Supabase Settings ────────────────────┐
│                                        │
│  API KEYS:                             │
│                                        │
│  anon public                           │
│  sb_publishable_AVcvj1Bq_uD...        │
│  [copiar]                              │
│                                        │
│  service_role secret                   │
│  eyJhbGciOiJIUzI1NiIsInR5cCI...      │
│  [copiar] ← ESTA                       │
│                                        │
└────────────────────────────────────────┘
```

---

## PASO 6: Pega SERVICE_ROLE_KEY en .env.local (30 segundos)

1. En `.env.local`, encuentra esta línea:
   ```
   SUPABASE_SERVICE_ROLE_KEY=
   ```

2. Después del `=` pega la key que copiaste:
   ```
   SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI...
   ```

3. Guarda: **Ctrl+S**

---

## PASO 7: Genera BETTER_AUTH_SECRET (1 minuto)

### En Windows:

1. Abre **Terminal** o **PowerShell**
2. Pega este comando:
   ```
   [convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes((1..32 | ForEach-Object {[char](Get-Random -Minimum 33 -Maximum 126))} -join '')))
   ```
3. Presiona Enter
4. Verás algo como: `abc123def456...`
5. Cópialo

### En Mac/Linux:

1. Abre **Terminal**
2. Pega este comando:
   ```
   openssl rand -base64 32
   ```
3. Presiona Enter
4. Verás algo como: `abc123def456...`
5. Cópialo

---

## PASO 8: Pega BETTER_AUTH_SECRET en .env.local (30 segundos)

1. En `.env.local`, encuentra:
   ```
   BETTER_AUTH_SECRET=
   ```

2. Pega lo que generaste:
   ```
   BETTER_AUTH_SECRET=abc123def456xyz789...
   ```

3. Guarda: **Ctrl+S**

---

## ✅ TU .env.local FINAL DEBERÍA VERSE ASÍ:

```
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xzjoruazhlwmaebnqqbv.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_AVcvj1Bq_uD7sYhbJZeHWA_NobPbVVF

# Auth
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI0InS6cDVGMWZGYjNNVUZf...
BETTER_AUTH_SECRET=xY9pQ2mN5zL8vJ3kH7wF9sD4aB6cE1oR3tU5...
NEXT_PUBLIC_APP_URL=http://localhost:3000

# OAuth (dejar vacío por ahora)
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

---

## 🔒 IMPORTANTE: .env.local NO VA A GITHUB

En `.gitignore` ya está añadido (por seguridad).

**Nunca** hagas push de `.env.local` a GitHub.

---

## PASO 9: Verifica que funciona (30 segundos)

1. Abre Terminal en VS Code: **Ctrl+ñ** (o Terminal → New Terminal)
2. Escribe:
   ```
   npm run dev
   ```
3. Presiona Enter
4. Espera a que compile...
5. Deberías ver: **`ready - started server on 0.0.0.0:3000`**

```
✓ Compiled successfully
ready - started server on 0.0.0.0:3000
```

---

## 🌐 ABRE TU APP

1. Ve a: http://localhost:3000
2. Deberías ver tu app funcionando
3. Haz clic en **"Registrate para Empezar"**
4. Deberías ver un modal de auth

**Si ves el modal = ¡FUNCIONA!** ✅

---

## ✅ RESUMEN RÁPIDO

```
1. Crea archivo .env.local
2. Copia contenido de .env.example
3. Supabase Settings → API → Copia service_role
4. Pega en SUPABASE_SERVICE_ROLE_KEY=
5. Genera BETTER_AUTH_SECRET (openssl o PowerShell)
6. Pega en BETTER_AUTH_SECRET=
7. Guarda archivo
8. Terminal: npm run dev
9. Abre: http://localhost:3000
10. ¡Listo!
```

---

## 🆘 TROUBLESHOOTING

### ❌ "Module not found"
- Asegúrate de tener `.env.local` en la carpeta raíz
- Reinicia el servidor: Ctrl+C y luego `npm run dev`

### ❌ "Error: SUPABASE_SERVICE_ROLE_KEY is not set"
- Abre `.env.local`
- Verifica que `SUPABASE_SERVICE_ROLE_KEY=` no esté vacío
- Copia la key de Supabase Settings → API

### ❌ "Supabase connection failed"
- Verifica que `NEXT_PUBLIC_SUPABASE_URL` es correcto
- Verifica que `NEXT_PUBLIC_SUPABASE_ANON_KEY` es correcto

### ❌ No se abre el modal de auth
- Verifica que `BETTER_AUTH_SECRET` no está vacío
- Reinicia servidor

---

## 🎉 ¡LISTO!

Ya tienes:
- ✅ SQL ejecutado en Supabase
- ✅ .env.local configurado
- ✅ Servidor corriendo
- ✅ App funcionando localmente

**Siguiente:** Verifica que todo funciona y luego hace push a GitHub para que Vercel auto-redeploy.

---

**¿Necesitas ayuda con algo?** Cuéntame qué error ves.
