# Backend Marketplace - Deploy en Render

## Pasos para desplegar el backend en Render:

1. **Crea una cuenta en Render** (si no tienes):
   - Ve a https://render.com
   - Regístrate con GitHub

2. **Conecta tu repositorio**:
   - En Render, clic en "New +" → "Web Service"
   - Selecciona tu repositorio `Lab15_AWA`
   - Elige la rama `main`

3. **Configura el servicio**:
   - **Name**: `Lab15-backend` (o el nombre que prefieras)
   - **Root Directory**: `backend-marketplace`
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `node src/server.js`

4. **Configura las variables de entorno**:
   En la sección "Environment Variables", añade:
   ```
   DB_HOST = tu-db-host (de Railway)
   DB_PORT = 3306
   DB_NAME = railway
   DB_USER = tu-usuario
   DB_PASSWORD = tu-contraseña
   JWT_SECRET = tu-secret-aleatorio (ej: mySuperSecretKey123!)
   ```

5. **Deploy**:
   - Clic en "Create Web Service"
   - Espera a que se compile (5-10 minutos)
   - Verás la URL: `https://tu-app.onrender.com`

**NOTA**: Guarda la URL del backend, la necesitarás para el frontend.

---

# Frontend Marketplace - Deploy en Vercel

## Pasos para desplegar el frontend en Vercel:

1. **Crea una cuenta en Vercel** (si no tienes):
   - Ve a https://vercel.com
   - Regístrate con GitHub

2. **Importa tu proyecto**:
   - Clic en "Add New..." → "Project"
   - Selecciona tu repositorio `Lab15_AWA`

3. **Configura el frontend**:
   - **Framework Preset**: Next.js
   - **Root Directory**: `frontend-marketplace`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`

4. **Configura variables de entorno**:
   En "Environment Variables", añade:
   ```
   NEXT_PUBLIC_API_URL = https://tu-app.onrender.com/api
   ```
   (Reemplaza con la URL real de tu backend en Render)

5. **Deploy**:
   - Clic en "Deploy"
   - Verá en 2-3 minutos
   - Tu URL será: `https://tu-app.vercel.app`

---

## Pasos finales:

1. Actualiza el `.env.local` del frontend con la URL de Render
2. Haz push a GitHub (cambios se despliegan automáticamente)
3. Prueba el flujo completo: login, crear productos, editar, filtrar

¡Listo! Tu marketplace estará en producción.
