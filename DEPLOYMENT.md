# 🚀 Guía de Despliegue

Esta guía explica cómo desplegar tu aplicación en diferentes plataformas.

## 📋 Preparación

Antes de desplegar, asegúrate de:

1. ✅ Ejecutar `npm run build` sin errores
2. ✅ Probar la build localmente con `npm run preview`
3. ✅ Configurar las variables de entorno de producción
4. ✅ Pasar todos los tests (si los tienes)
5. ✅ Revisar el checklist de seguridad en `SEGURIDAD.md`

## 🌐 Vercel (Recomendado)

Vercel es la opción más sencilla y está optimizada para Vite.

### Método 1: Deploy desde GitHub

1. **Sube tu código a GitHub**

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/tu-usuario/tu-repo.git
git push -u origin main
```

2. **Conecta con Vercel**

- Ve a [vercel.com](https://vercel.com)
- Haz clic en "Import Project"
- Selecciona tu repositorio
- Vercel detectará automáticamente que es un proyecto Vite

3. **Configura variables de entorno**

En el dashboard de Vercel:
- Settings → Environment Variables
- Agrega `VITE_API_URL` con la URL de tu API de producción

4. **Deploy**

¡Listo! Cada push a `main` desplegará automáticamente.

### Método 2: Deploy desde CLI

```bash
# Instalar Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy a producción
vercel --prod
```

### Configuración de Vercel

Crea un archivo `vercel.json`:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

## 🎯 Netlify

### Método 1: Deploy desde GitHub

1. **Sube tu código a GitHub**
2. **Conecta con Netlify**
   - Ve a [netlify.com](https://netlify.com)
   - "Add new site" → "Import an existing project"
   - Conecta con GitHub y selecciona tu repo

3. **Configuración de build**
   - Build command: `npm run build`
   - Publish directory: `dist`

4. **Variables de entorno**
   - Site settings → Environment variables
   - Agrega `VITE_API_URL`

### Método 2: Deploy desde CLI

```bash
# Instalar Netlify CLI
npm i -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy

# Deploy a producción
netlify deploy --prod
```

### Configuración de Netlify

Crea un archivo `netlify.toml`:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  NODE_VERSION = "18"
```

## 📦 GitHub Pages

### 1. Configurar Vite

Edita `vite.config.ts`:

```typescript
export default defineConfig({
  plugins: [react()],
  base: '/nombre-de-tu-repo/', // ← Importante
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

### 2. Crear script de deploy

Agrega a `package.json`:

```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

### 3. Instalar gh-pages

```bash
npm install --save-dev gh-pages
```

### 4. Deploy

```bash
npm run deploy
```

### 5. Configurar GitHub Pages

- Ve a tu repositorio en GitHub
- Settings → Pages
- Source: gh-pages branch

## ☁️ AWS S3 + CloudFront

### 1. Build del proyecto

```bash
npm run build
```

### 2. Crear bucket S3

```bash
aws s3 mb s3://tu-app-nombre
```

### 3. Configurar bucket como sitio web

```bash
aws s3 website s3://tu-app-nombre \
  --index-document index.html \
  --error-document index.html
```

### 4. Subir archivos

```bash
aws s3 sync dist/ s3://tu-app-nombre
```

### 5. Configurar CloudFront

- Crea una distribución de CloudFront
- Origin: Tu bucket S3
- Error Pages: Redirige 403 y 404 a `/index.html`

## 🐳 Docker

### Dockerfile

Crea un `Dockerfile`:

```dockerfile
# Build stage
FROM node:18-alpine as build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

### nginx.conf

Crea `nginx.conf`:

```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
}
```

### Build y run

```bash
# Build
docker build -t mi-app .

# Run
docker run -p 8080:80 mi-app
```

### Docker Compose

Crea `docker-compose.yml`:

```yaml
version: '3.8'

services:
  web:
    build: .
    ports:
      - "8080:80"
    environment:
      - VITE_API_URL=https://api.produccion.com
    restart: unless-stopped
```

```bash
docker-compose up -d
```

## 🔧 Variables de Entorno en Producción

### Vercel/Netlify

Usa el dashboard para configurar:

```
VITE_API_URL=https://api.tudominio.com/api
VITE_APP_NAME=MiApp
```

### Docker

Pasa variables al construir:

```bash
docker build --build-arg VITE_API_URL=https://api.prod.com -t mi-app .
```

O en runtime:

```bash
docker run -e VITE_API_URL=https://api.prod.com -p 8080:80 mi-app
```

## 🔍 Verificación Post-Despliegue

### Checklist

- [ ] La aplicación carga correctamente
- [ ] Todas las rutas funcionan (incluye deep linking)
- [ ] Las variables de entorno están configuradas
- [ ] HTTPS está habilitado
- [ ] Los assets se cargan correctamente
- [ ] El routing funciona (refresh en rutas anidadas)
- [ ] Las llamadas a API funcionan
- [ ] No hay errores en la consola
- [ ] El sitio es responsive en móvil
- [ ] SEO básico está configurado

### Herramientas de Verificación

```bash
# Lighthouse (Performance)
npx lighthouse https://tu-sitio.com

# Check SSL
curl -I https://tu-sitio.com

# Check headers
curl -I https://tu-sitio.com
```

## 🔄 CI/CD

### GitHub Actions

Crea `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Vercel

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build
        run: npm run build
        env:
          VITE_API_URL: ${{ secrets.VITE_API_URL }}
          
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

## 🚨 Solución de Problemas

### Rutas no funcionan después del refresh

**Problema:** Error 404 al recargar en rutas como `/dashboard`

**Solución:** Configura redirects/rewrites en tu servidor:

- Vercel: Ya está configurado automáticamente
- Netlify: Agrega `_redirects` en `/public/`:
  ```
  /*    /index.html   200
  ```
- Nginx: Usa `try_files $uri /index.html`

### Assets no se cargan

**Problema:** CSS, JS o imágenes dan 404

**Solución:** Revisa la configuración de `base` en `vite.config.ts`

### Variables de entorno no funcionan

**Problema:** `import.meta.env.VITE_API_URL` es undefined

**Solución:**
1. Asegúrate de que la variable empiece con `VITE_`
2. Reconstruye el proyecto después de cambiar variables
3. En producción, configúralas en el dashboard del hosting

## 📊 Monitoreo

### Herramientas recomendadas

- **Analytics:** Google Analytics, Plausible
- **Errores:** Sentry, LogRocket
- **Performance:** Vercel Analytics, New Relic
- **Uptime:** UptimeRobot, Pingdom

## 🎉 ¡Listo!

Tu aplicación está desplegada. Para actualizaciones futuras:

1. Haz cambios en tu código
2. Commit y push a GitHub
3. El deploy será automático (si configuraste CI/CD)
4. Verifica que todo funcione correctamente

---

¿Problemas? Revisa los logs de tu plataforma de hosting o abre un issue en el repositorio.


