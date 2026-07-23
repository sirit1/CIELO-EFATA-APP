# 🚀 GUÍA ULTRA-SIMPLE PARA EJECUTAR SQL EN SUPABASE

## ⏱️ Tiempo Total: 5 minutos

---

## PASO 1: Abre Supabase (30 segundos)

1. Ve a tu navegador
2. Abre: https://supabase.com/dashboard
3. Deberías estar logueado (si no, inicia sesión)
4. Verás tus proyectos - busca: **xzjoruazhlwmaebnqqbv** (tu proyecto)
5. Haz clic en él

```
🌐 Supabase Dashboard
└── Tus Proyectos
    └── xzjoruazhlwmaebnqqbv ← AQUÍ
        └── Entra
```

---

## PASO 2: Ve a SQL Editor (30 segundos)

Una vez dentro de tu proyecto:

1. Mira el **menú izquierdo** (lado izquierdo de la pantalla)
2. Busca: **SQL Editor** (tiene un icono de código `<>`)
3. Haz clic en él

```
Menú Izquierdo:
├── 📊 Dashboard
├── 🗄️ Table Editor
├── 🔐 Authentication
├── 🚀 API
├── ⚙️ Settings
└── </> SQL Editor ← AQUÍ
```

---

## PASO 3: Copia el SQL (1 minuto)

### Option A: Copiar desde GitHub (RECOMENDADO)

1. Abre una nueva pestaña
2. Ve a: https://github.com/sirit1/CIELO-EFATA-APP/blob/v0/user-interface-redesign-0367dfd3/lib/schema.sql
3. Verás el código SQL
4. Haz clic en el icono **copiar** (arriba a la derecha del código)
5. Se copiará automáticamente

### Option B: Copiar desde tu proyecto local

```bash
cat /vercel/share/v0-project/lib/schema.sql
```

Copia todo el contenido que ves.

---

## PASO 4: Pega el SQL en Supabase (2 minutos)

1. Vuelve a la pestaña de **Supabase SQL Editor**
2. Verás un área blanca grande (el editor)
3. Haz clic en el área blanca
4. Pega el código: **Ctrl+V** (Windows) o **Cmd+V** (Mac)

```
┌─────────────────────────────────────────┐
│ SQL Editor                              │
├─────────────────────────────────────────┤
│                                         │
│  [Tu SQL code aquí]                    │
│                                         │
│  -- Tabla badges                       │
│  CREATE TABLE badges (                 │
│    id SERIAL PRIMARY KEY,              │
│    ...                                 │
│                                         │
└─────────────────────────────────────────┘
```

---

## PASO 5: Ejecuta el SQL (1 minuto)

1. Una vez pegado el SQL, busca el botón **"Run"** (botón azul en la esquina)
2. Haz clic en **RUN**

```
        ┌─────────────────────────────┐
        │  RUN (botón azul)           │
        └─────────────────────────────┘
```

Esperarás a que termine...

---

## PASO 6: Verifica que funcionó (30 segundos)

Después de ejecutar:

1. Deberías ver un mensaje: **"Success"** o **"Query successful"** ✅
2. O un área verde diciendo "X rows affected"

**Si ves eso = ¡FUNCIONÓ!**

Si ves rojo o error, vuelve al Paso 1 y asegúrate que todo esté bien.

---

## PASO 7: Verifica que las tablas se crearon

1. Ve al menú izquierdo
2. Haz clic en **Table Editor** (🗄️)
3. Deberías ver tus tablas nuevas:

```
Tablas que deberías ver:
✓ badges
✓ user_badges
✓ referrals
✓ user_stats
✓ user_streaks
✓ quiz_attempts
✓ badge_categories
✓ evaluaciones (ya existía)
```

Si ves estas 8 tablas = **¡ÉXITO!** 🎉

---

## ❌ Si algo sale mal

### Error: "Syntax error"
- Copiar el SQL completo de GitHub (asegúrate de copiar TODO)
- Vuelve a pegar en SQL Editor
- Intenta de nuevo

### Error: "Table already exists"
- Significa que ya ejecutaste el SQL
- Es normal, ahora ve al Paso 7 para verificar
- NO necesitas hacer nada más

### No veo las tablas en Table Editor
- Recarga la página: F5
- Vuelve a hacer clic en "Table Editor"
- Espera 5 segundos

---

## 📸 REFERENCIAS VISUALES

### Menú Supabase:
```
┌─ Supabase Dashboard ───────────────┐
│                                    │
│  📊 Dashboard                      │
│  🗄️  Table Editor                  │
│  🔐 Authentication                 │
│  🚀 API                            │
│  ⚙️  Settings                      │
│  </> SQL Editor ← AQUÍ             │
│                                    │
└────────────────────────────────────┘
```

### SQL Editor:
```
┌─ SQL Editor ──────────────────────┐
│                                   │
│  [Tu SQL aquí] ← Pega código aquí │
│                                   │
│     ┌──────────────────────┐      │
│     │ RUN (Azul)          │      │
│     └──────────────────────┘      │
│                                   │
│     ✅ Success!                   │
│                                   │
└───────────────────────────────────┘
```

---

## ✅ DESPUÉS DEL SQL

Una vez que hayas ejecutado el SQL correctamente:

**Siguiente paso = Configurar `.env.local`**

Lee: `SUPABASE_SETUP_VISUAL.md` (sección "PASO 2: Configurar .env.local")

---

## 🎯 RESUMEN RÁPIDO

```
1. Abre Supabase → Tu proyecto
2. Menú izquierdo → SQL Editor
3. GitHub → Copia lib/schema.sql
4. SQL Editor → Pega (Ctrl+V)
5. Click → RUN
6. Espera → ✅ Success!
7. Verifica → Table Editor (deberías ver 8 tablas)
8. Listo → Siguiente paso: .env.local
```

---

## 🆘 SOPORTE RÁPIDO

Si tienes problemas:

1. **¿No encuentras SQL Editor?** → Menú izquierdo, icono `</>`
2. **¿Error al correr?** → Copia de GitHub directamente, TODO el código
3. **¿No ves las tablas?** → F5 para recargar, espera 5 segundos
4. **¿Sigue sin funcionar?** → Cuéntame el error exacto que ves

---

**¡Listo! Ya tienes el SQL ejecutado. Ahora a configurar .env.local** 🚀
