# 🚀 Guía de Inicio Rápido

Esta guía te ayudará a comenzar con el proyecto en **5 minutos**.

## ✅ Paso 1: Instalación

```bash
# Instalar dependencias
npm install

# o si prefieres yarn
yarn install

# o si prefieres pnpm
pnpm install
```

## ✅ Paso 2: Configuración

Crea un archivo `.env` en la raíz del proyecto:

```bash
cp .env.example .env
```

El contenido predeterminado es:

```env
VITE_API_URL=http://localhost:3000/api
VITE_APP_NAME=MyApp
```

## ✅ Paso 3: Iniciar el proyecto

```bash
npm run dev
```

La aplicación estará disponible en: **http://localhost:5173**

## 🎯 Rutas Disponibles

### Rutas Públicas (sin autenticación)

- **/** - Landing page principal
- **/login** - Inicio de sesión
- **/register** - Registro de nuevos usuarios
- **/forgot-password** - Recuperación de contraseña

### Rutas Protegidas (requieren autenticación)

- **/dashboard** - Panel de control principal
- **/dashboard/users** - Gestión de usuarios

## 🔐 Modo Demo

El proyecto está en **modo demo** por defecto. Puedes iniciar sesión con cualquier email y contraseña.

### Ejemplo:
- **Email:** demo@example.com
- **Contraseña:** cualquier_contraseña

Una vez iniciada la sesión, serás redirigido al dashboard.

## 🛠️ Próximos Pasos

### 1. Conectar con tu API

Edita `src/services/authService.ts` y `src/services/usersService.ts` para descomentar las llamadas reales a la API:

```typescript
// En LoginPage.tsx, cambia esto:
const mockResponse = { ... }

// Por esto:
const response = await authService.login(formData)
```

### 2. Configurar tu Backend

Actualiza la variable `VITE_API_URL` en `.env` con la URL de tu API:

```env
VITE_API_URL=https://tu-api.com/api
```

### 3. Personalizar Estilos

Los colores y temas se configuran en `src/index.css`:

```css
:root {
  --primary: 221.2 83.2% 53.3%;  /* Cambia este color */
  /* ... más variables */
}
```

### 4. Agregar Nuevas Páginas

1. Crea un archivo en `src/pages/`
2. Agrega la ruta en `src/App.tsx`
3. (Opcional) Protege la ruta con `<ProtectedRoute>`

Ejemplo:

```typescript
// src/App.tsx
<Route path="/nueva-pagina" element={<NuevaPagina />} />
```

### 5. Agregar Nuevos Componentes UI

Visita [shadcn/ui](https://ui.shadcn.com/) y copia los componentes que necesites en `src/components/ui/`.

## 📚 Recursos Útiles

- **Documentación de Vite:** https://vitejs.dev/
- **React Docs:** https://react.dev/
- **Tailwind CSS:** https://tailwindcss.com/docs
- **shadcn/ui:** https://ui.shadcn.com/
- **Zustand:** https://zustand-demo.pmnd.rs/
- **React Router:** https://reactrouter.com/

## 🆘 ¿Necesitas Ayuda?

- Revisa el `README.md` completo para más detalles
- Consulta la sección de "Solución de Problemas" en el README
- Los comentarios en el código explican las funcionalidades clave

## 🎉 ¡Listo!

Ya tienes todo configurado. Ahora puedes:

1. ✅ Explorar las páginas existentes
2. ✅ Modificar los componentes según tus necesidades
3. ✅ Conectar con tu backend
4. ✅ Desplegar a producción

**¡Feliz desarrollo! 💻🚀**

