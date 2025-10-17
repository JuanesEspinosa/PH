# ⚡ Instalación Rápida

Guía paso a paso para instalar y ejecutar el proyecto en **menos de 5 minutos**.

## 📋 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** versión 16 o superior
- **npm** (viene con Node.js) o **yarn** o **pnpm**
- Un editor de código (recomendado: VSCode)

### Verificar instalación

```bash
node --version  # Debe ser v16.x.x o superior
npm --version   # Debe ser 8.x.x o superior
```

Si no tienes Node.js instalado:
- **Windows/Mac:** Descarga desde [nodejs.org](https://nodejs.org/)
- **Linux:** `sudo apt install nodejs npm` (Ubuntu/Debian)

## 🚀 Instalación

### Paso 1: Descargar el proyecto

Si tienes el proyecto desde GitHub:

```bash
git clone https://github.com/tu-usuario/tu-repo.git
cd tu-repo
```

Si descargaste un ZIP:

```bash
# Descomprime el archivo ZIP
# Navega a la carpeta del proyecto
cd nombre-de-la-carpeta
```

### Paso 2: Instalar dependencias

Ejecuta uno de los siguientes comandos según tu gestor de paquetes:

```bash
# Con npm (recomendado)
npm install

# Con yarn
yarn install

# Con pnpm
pnpm install
```

**Tiempo estimado:** 1-2 minutos

### Paso 3: Configurar variables de entorno

Copia el archivo de ejemplo:

```bash
# Windows (CMD)
copy .env.example .env

# Windows (PowerShell)
Copy-Item .env.example .env

# Mac/Linux
cp .env.example .env
```

El archivo `.env` ya tiene valores por defecto que funcionan:

```env
VITE_API_URL=http://localhost:3000/api
VITE_APP_NAME=MyApp
```

> **Nota:** Estos valores son para desarrollo. Cámbialos según tu configuración.

### Paso 4: Ejecutar el proyecto

```bash
npm run dev
```

**¡Listo!** La aplicación estará disponible en:

```
http://localhost:5173
```

## ✅ Verificación

Si todo está correcto, deberías ver:

```
  VITE v5.x.x  ready in XXX ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h to show help
```

Abre tu navegador en `http://localhost:5173` y verás la landing page.

## 🎯 Probar las Funcionalidades

### 1. Landing Page
- Abre `http://localhost:5173/`
- Deberías ver una página de inicio atractiva

### 2. Login
- Ve a `http://localhost:5173/login`
- Ingresa cualquier email y contraseña (modo demo)
- Serás redirigido al dashboard

### 3. Dashboard
- Después del login, verás el panel administrativo
- Navega a "Usuarios" para ver la gestión de usuarios

### 4. Logout
- Haz clic en tu avatar en la esquina superior derecha
- Selecciona "Cerrar sesión"

## 🛠️ Comandos Disponibles

```bash
# Desarrollo (con hot reload)
npm run dev

# Build para producción
npm run build

# Preview de la build
npm run preview

# Linting (verificar código)
npm run lint
```

## 📁 Estructura del Proyecto

Después de la instalación, tu estructura debería verse así:

```
proyecto/
├── node_modules/       ← Dependencias instaladas
├── public/            ← Archivos estáticos
├── src/               ← Código fuente
├── .env               ← Variables de entorno (creado por ti)
├── package.json       ← Configuración del proyecto
└── vite.config.ts     ← Configuración de Vite
```

## 🔧 Configuración del Editor (Opcional)

### VSCode

Si usas VSCode, instala las extensiones recomendadas:

1. Abre VSCode
2. Presiona `Ctrl+Shift+P` (o `Cmd+Shift+P` en Mac)
3. Escribe "Extensions: Show Recommended Extensions"
4. Instala las extensiones sugeridas:
   - ESLint
   - Prettier
   - Tailwind CSS IntelliSense
   - TypeScript Vue Plugin

### Configuración automática

El proyecto incluye configuración de VSCode en `.vscode/settings.json` que se aplicará automáticamente.

## 🐛 Solución de Problemas

### Error: "Cannot find module"

**Solución:**
```bash
# Borra node_modules y reinstala
rm -rf node_modules package-lock.json
npm install
```

### Error: "Port 5173 is already in use"

**Solución:**
```bash
# Opción 1: Cierra el proceso que usa el puerto
# Opción 2: Usa otro puerto
npm run dev -- --port 3000
```

### Error: "EACCES: permission denied"

**Solución (Mac/Linux):**
```bash
# Usa sudo solo si es necesario
sudo npm install
```

### Warnings de dependencias

**Solución:**
```bash
# Los warnings son normales, no afectan la funcionalidad
# Para auditarlas:
npm audit
npm audit fix
```

### El proyecto no recarga automáticamente

**Solución:**
1. Verifica que el servidor de desarrollo esté corriendo
2. Limpia la caché del navegador
3. Reinicia el servidor (`Ctrl+C` y `npm run dev`)

## 🌐 Navegadores Soportados

- ✅ Chrome (versión 90+)
- ✅ Firefox (versión 88+)
- ✅ Safari (versión 14+)
- ✅ Edge (versión 90+)

## 📚 Próximos Pasos

Ahora que tienes el proyecto corriendo:

1. **Lee la documentación:**
   - `README.md` - Documentación completa
   - `GUIA_INICIO.md` - Guía de inicio
   - `EJEMPLOS.md` - Ejemplos de código

2. **Explora el código:**
   - Revisa los componentes en `src/components/`
   - Mira las páginas en `src/pages/`
   - Entiende los stores en `src/stores/`

3. **Personaliza:**
   - Cambia colores en `src/index.css`
   - Modifica textos en las páginas
   - Agrega tu logo

4. **Conecta con tu API:**
   - Actualiza `VITE_API_URL` en `.env`
   - Modifica los servicios en `src/services/`

5. **Despliega:**
   - Lee `DEPLOYMENT.md` para opciones de despliegue
   - Vercel, Netlify o tu plataforma preferida

## 💡 Consejos

### Para Windows

Si usas Windows y tienes problemas con los comandos:

```bash
# Usa PowerShell o Git Bash en lugar de CMD
# O instala WSL (Windows Subsystem for Linux)
```

### Para Mac/Linux

Si encuentras errores de permisos:

```bash
# Usa nvm (Node Version Manager) para gestionar Node.js
# https://github.com/nvm-sh/nvm
```

### Para todos

- **Usa un terminal moderno:** Windows Terminal, iTerm2, o Hyper
- **Aprende los atajos:** `Ctrl+C` para detener el servidor
- **Mantén Node.js actualizado:** Revisa periódicamente nuevas versiones

## 🆘 Ayuda Adicional

### Recursos

- **Documentación de Vite:** https://vitejs.dev/
- **Documentación de React:** https://react.dev/
- **Documentación de TypeScript:** https://www.typescriptlang.org/

### Comunidad

- Abre un Issue en GitHub si encuentras problemas
- Revisa Issues existentes para soluciones
- Lee las Discussions para preguntas generales

## ✅ Checklist de Instalación

Marca cada paso completado:

- [ ] Node.js y npm instalados
- [ ] Proyecto descargado/clonado
- [ ] `npm install` ejecutado exitosamente
- [ ] Archivo `.env` creado
- [ ] `npm run dev` ejecutado exitosamente
- [ ] Navegador abierto en `localhost:5173`
- [ ] Landing page visible
- [ ] Login funcional
- [ ] Dashboard accesible
- [ ] Editor configurado (opcional)
- [ ] Documentación leída

## 🎉 ¡Felicidades!

Si completaste todos los pasos, **¡tu proyecto está listo!**

Ahora puedes:
- Explorar el código
- Hacer cambios
- Agregar funcionalidades
- Conectar con tu backend
- Desplegar a producción

**¿Preguntas?** Revisa la documentación completa en `README.md`

**¿Listo para personalizar?** Ve a `GUIA_INICIO.md`

**¿Quieres desplegar?** Lee `DEPLOYMENT.md`

---

**¡Disfruta desarrollando! 🚀**


