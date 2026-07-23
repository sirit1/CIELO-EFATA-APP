# SETUP SIN ERRORES - 3 PASOS SIMPLES

**Esto es imposible de equivocarse.**

---

## PASO 1: Ejecutar SQL en Supabase (3 min)

1. **Abre Supabase:**
   - Ve a: https://supabase.com/dashboard
   - Haz clic en tu proyecto: `sirit1s Projects`

2. **Abre SQL Editor:**
   - Menú izquierdo → Icono `</>` (SQL Editor)
   - O haz clic en "SQL Editor" en la barra superior

3. **Ejecuta BLOQUE 1 (Tablas):**
   - Abre archivo: `SQL_BLOQUE_1_TABLAS.sql` en tu editor
   - **Copia TODO el contenido** (Ctrl+A, Ctrl+C)
   - En Supabase SQL Editor, haz clic en campo blanco
   - **Pega** (Ctrl+V)
   - Haz clic en botón **"Run"** (arriba a la derecha, botón verde)
   - Espera 2 segundos
   - Deberías ver: **"Success"** ✅

4. **Ejecuta BLOQUE 2 (Índices):**
   - Abre archivo: `SQL_BLOQUE_2_INDICES.sql`
   - **Copia TODO** (Ctrl+A, Ctrl+C)
   - En Supabase SQL Editor, haz clic en campo blanco
   - **Borra todo lo anterior** (Ctrl+A, Delete)
   - **Pega** (Ctrl+V)
   - Haz clic en **"Run"**
   - Espera 2 segundos
   - Deberías ver: **"Success"** ✅

5. **Ejecuta BLOQUE 3 (25 Badges):**
   - Abre archivo: `SQL_BLOQUE_3_BADGES.sql`
   - **Copia TODO** (Ctrl+A, Ctrl+C)
   - En Supabase SQL Editor, haz clic en campo blanco
   - **Borra todo lo anterior** (Ctrl+A, Delete)
   - **Pega** (Ctrl+V)
   - Haz clic en **"Run"**
   - Espera 2 segundos
   - Deberías ver: **"Success"** ✅

6. **Verificar que funcionó:**
   - Menú izquierdo → Haz clic en "Table Editor" (icono de tabla)
   - Deberías ver 8 tablas nuevas:
     - `badges` ✅
     - `user_badges` ✅
     - `referrals` ✅
     - `user_streaks` ✅
     - `user_stats` ✅
     - `quiz_attempts` ✅
     - `achievements` ✅

---

## PASO 2: Configurar .env.local (5 min)

1. **Obtener credenciales de Supabase:**
   - En Supabase: Menú izquierdo → **Settings** (icono de engranaje)
   - Haz clic en **"API"**
   - Verás 2 keys:
     - `URL` (ej: https://xzjoruazhlwmaebnqqbv.supabase.co)
     - `anon public` (ej: sb_publishable_...)
     - `service_role secret` (ej: eyJhbGc...)
   - **Copia estos 3 valores**

2. **Crear archivo `.env.local`:**
   - En tu editor de código (VS Code, etc)
   - En la raíz del proyecto (donde está `package.json`)
   - Crea archivo: `.env.local`

3. **Llenar `.env.local`:**

```
NEXT_PUBLIC_SUPABASE_URL=https://xzjoruazhlwmaebnqqbv.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_AVcvj1Bq_uD7sYhbJZeHWA_NobPbVVF
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
NEXT_PUBLIC_APP_URL=http://localhost:3000
BETTER_AUTH_SECRET=generalo_abajo
```

4. **Generar BETTER_AUTH_SECRET:**

**En Mac/Linux:**
```bash
openssl rand -base64 32
```
Copia el resultado y pega después de `BETTER_AUTH_SECRET=`

**En Windows (PowerShell):**
```powershell
[Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes((New-Guid).ToString() + (Get-Random -Maximum 1000000))) | Select-Object -First 32
```
O simplemente usa este valor:
```
BETTER_AUTH_SECRET=abc123def456ghi789jkl012mno345pqr
```

5. **Guarda .env.local**
   - Ctrl+S (o Cmd+S en Mac)

---

## PASO 3: Iniciar servidor (2 min)

1. **Abre Terminal:**
   - En VS Code: Ver → Terminal
   - O abre Terminal separada

2. **Ejecuta:**
```bash
npm run dev
```

3. **Deberías ver:**
```
> next dev

  ▲ Next.js 16.0.0
  - Local:        http://localhost:3000
```

4. **Abre en navegador:**
   - Ve a: http://localhost:3000

5. **Verifica que funciona:**
   - Deberías ver tu app
   - Click en botón "Registrata para Empezar"
   - Deberías ver modal de Login/Signup
   - Intenta registrarte con un email de prueba

---

## ✅ CHECKLIST FINAL

- [ ] SQL Bloque 1 ejecutado (Tablas)
- [ ] SQL Bloque 2 ejecutado (Índices)
- [ ] SQL Bloque 3 ejecutado (Badges)
- [ ] Ves 8 tablas en Supabase
- [ ] `.env.local` creado con credenciales
- [ ] Servidor corriendo (`npm run dev`)
- [ ] App visible en http://localhost:3000
- [ ] Modal de auth funciona

---

## 🆘 PROBLEMAS COMUNES

### "No veo tablas en Supabase"
→ Haz clic en **"Refresh"** (F5) en Table Editor

### "Error: relation 'badges' does not exist"
→ Asegúrate de haber ejecutado **BLOQUE 1** primero

### "El servidor no inicia"
→ Verifica que `.env.local` tenga TODAS las variables
→ Abre Terminal en la carpeta correcta

### "Botón de auth no funciona"
→ Espera 5 segundos después de guardar `.env.local`
→ Reinicia servidor: Ctrl+C, luego `npm run dev`

### "Cuando registro me da error"
→ Verifica que Email Auth esté habilitado en Supabase Settings

---

## 🎉 LISTO

Cuando todo funcione, tendrás:
- ✅ Autenticación funcionando
- ✅ 25 badges listos
- ✅ Sistema de referrals
- ✅ Dashboard personal
- ✅ Base de datos lista para producción

**Reporta cualquier error y te ayudo inmediatamente.**
