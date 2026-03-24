# 🌿 Workspace Solutions — Sitio Web Completo

Sitio web + foro comunitario funcional construido con **Next.js 14** y **Supabase**.

---

## 🚀 Cómo publicar en Vercel en 4 pasos

### PASO 1: Crear tu base de datos en Supabase (gratis)

1. Ve a [supabase.com](https://supabase.com) y crea una cuenta gratis
2. Crea un **nuevo proyecto** (elige la región más cercana a Costa Rica: us-east-1 o similar)
3. Una vez creado, ve a **SQL Editor** (menú izquierdo)
4. Copia y pega todo el contenido del archivo `supabase-schema.sql` y haz clic en **Run**
5. Ve a **Settings → API** y copia:
   - `Project URL` → tu `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → tu `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### PASO 2: Configurar autenticación en Supabase

1. En Supabase ve a **Authentication → Settings**
2. Desactivá **"Confirm email"** si querés que los usuarios entren sin confirmar correo (más fácil para empezar)
3. Podés activarlo después cuando tengas un dominio real configurado

### PASO 3: Subir a GitHub

```bash
# Dentro de la carpeta workspace-solutions:
git init
git add .
git commit -m "initial commit"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/workspace-solutions.git
git push -u origin main
```

### PASO 4: Publicar en Vercel

1. Ve a [vercel.com](https://vercel.com) y conectá tu cuenta de GitHub
2. Haz clic en **New Project** → seleccioná tu repositorio
3. Vercel detectará Next.js automáticamente
4. En la sección **Environment Variables** agrega:
   - `NEXT_PUBLIC_SUPABASE_URL` = (tu URL de Supabase)
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = (tu anon key de Supabase)
5. Haz clic en **Deploy** ✅

¡Listo! Tu sitio estará en vivo en `https://workspace-solutions.vercel.app` (o el nombre que elijas).

---

## 📁 Estructura del proyecto

```
workspace-solutions/
├── pages/
│   ├── _app.js          # Wrapper con autenticación global
│   ├── index.js         # Landing page principal
│   ├── comunidad.js     # 🌟 Foro comunitario (en tiempo real)
│   ├── login.js         # Inicio de sesión
│   ├── registro.js      # Crear cuenta
│   ├── contacto.js      # Formulario de contacto
│   └── recursos.js      # Biblioteca de recursos
├── components/
│   ├── Navbar.js        # Navegación responsive
│   └── Toast.js         # Notificaciones
├── lib/
│   └── supabase.js      # Cliente de Supabase
├── styles/
│   └── globals.css      # Estilos globales y variables
├── supabase-schema.sql  # 📋 SQL para crear las tablas
└── .env.local.example   # Variables de entorno de ejemplo
```

---

## ✨ Funcionalidades del Foro

- ✅ Registro e inicio de sesión (Supabase Auth)
- ✅ Crear publicaciones por categoría (consejos, experiencias, preguntas, recursos, logros)
- ✅ Buscar y filtrar publicaciones
- ✅ Ordenar por reciente, popular o más activo
- ✅ Sistema de likes en tiempo real
- ✅ Respuestas a publicaciones con scroll
- ✅ Actualizaciones en tiempo real (Supabase Realtime)
- ✅ Avatares generados automáticamente
- ✅ Diseño completamente responsive

---

## 🎨 Tecnologías

- **Next.js 14** — Framework React
- **Supabase** — Base de datos + autenticación + tiempo real
- **date-fns** — Formateo de fechas en español
- **Google Fonts** — Playfair Display + DM Sans

---

## 📝 Variables de entorno necesarias

Creá un archivo `.env.local` con:

```env
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key
```

---

¿Problemas? Contactá a hola@workspacesolutions.cr
