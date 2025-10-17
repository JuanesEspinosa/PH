# 🚀 Plantilla React + Vite + TypeScript

Una plantilla completa y moderna para proyectos web con React, configurada con las mejores tecnologías y prácticas del mercado.

## 📋 Características

- ⚡ **Vite** - Build tool ultra rápido
- ⚛️ **React 18** - Última versión de React
- 🔷 **TypeScript** - Tipado estático para mayor seguridad
- 🎨 **Tailwind CSS** - Framework CSS utility-first
- 🧩 **shadcn/ui** - Componentes UI modernos y accesibles
- 🌐 **React Router** - Navegación y rutas
- 🔮 **React Query** - Manejo de estado servidor con caché inteligente
- 📦 **Zustand** - Gestión de estado global (opcional)
- 🔌 **Axios** - Cliente HTTP con interceptores configurados
- 🔍 **SearchParams** - Estado de filtros y búsquedas en URL
- 🔐 **Autenticación completa** - Login, registro y recuperación de contraseña
- 🛡️ **Rutas protegidas** - Sistema de protección de rutas implementado
- 📱 **Diseño responsivo** - Adaptado a todos los dispositivos
- 🎯 **BackOffice** - Dashboard administrativo funcional con CRUD

## 🏗️ Estructura del Proyecto

```
├── public/                 # Archivos estáticos
├── src/
│   ├── components/        # Componentes reutilizables
│   │   ├── auth/         # Componentes de autenticación
│   │   ├── layouts/      # Layouts de la aplicación
│   │   └── ui/           # Componentes de shadcn/ui
│   ├── hooks/            # Custom hooks globales
│   ├── lib/              # Utilidades y configuraciones
│   ├── pages/            # Módulos de la aplicación
│   │   ├── auth/         # Páginas de autenticación
│   │   ├── dashboard/    # Dashboard principal
│   │   └── [modulo]/     # Estructura modular
│   │       ├── components/  # Componentes del módulo
│   │       ├── hooks/       # Hooks del módulo
│   │       ├── views/       # Vistas del módulo
│   │       └── services/    # Servicios del módulo
│   ├── services/         # Servicios de API globales
│   ├── stores/           # Stores de Zustand
│   ├── types/            # Tipos de TypeScript
│   ├── App.tsx           # Componente principal
│   ├── main.tsx          # Punto de entrada
│   └── index.css         # Estilos globales
├── .env.example          # Variables de entorno de ejemplo
├── index.html            # HTML principal
├── package.json          # Dependencias y scripts
├── tailwind.config.js    # Configuración de Tailwind
├── tsconfig.json         # Configuración de TypeScript
└── vite.config.ts        # Configuración de Vite
```

> 📖 **Nota:** El proyecto usa una arquitectura modular. Ver [ESTRUCTURA_MODULAR.md](./ESTRUCTURA_MODULAR.md) para más detalles.

## 🚀 Instalación

### Prerrequisitos

- Node.js >= 16.0.0
- npm o yarn o pnpm

### Paso 1: Instalar dependencias

```bash
npm install
# o
yarn install
# o
pnpm install
```

### Paso 2: Configurar variables de entorno

Copia el archivo `.env.example` y renómbralo a `.env`:

```bash
cp .env.example .env
```

Edita el archivo `.env` con tus configuraciones:

```env
VITE_API_URL=http://localhost:3000/api
VITE_APP_NAME=MyApp
```

### Paso 3: Iniciar el servidor de desarrollo

```bash
npm run dev
# o
yarn dev
# o
pnpm dev
```

La aplicación estará disponible en `http://localhost:5173`

## 📦 Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Genera la build de producción
- `npm run preview` - Previsualiza la build de producción
- `npm run lint` - Ejecuta el linter

## 🔐 Autenticación

La plantilla incluye un sistema completo de autenticación:

### Login

- Ruta: `/login`
- Credenciales demo: Cualquier email y contraseña (modo demo)

### Registro

- Ruta: `/register`
- Validaciones incluidas

### Recuperación de contraseña

- Ruta: `/forgot-password`
- Flujo completo implementado

### Implementación en producción

Para conectar con tu API real, actualiza los servicios en `src/services/authService.ts`:

```typescript
// Descomenta y usa las llamadas reales a la API
const response = await authService.login(formData)
```

## 🛡️ Rutas Protegidas

Las rutas del dashboard están protegidas y solo son accesibles para usuarios autenticados:

```typescript
<Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <DashboardLayout />
    </ProtectedRoute>
  }
>
  {/* Rutas anidadas protegidas */}
</Route>
```

## 🌐 Configuración de API

La configuración de Axios está en `src/lib/axios.ts` e incluye:

- Base URL configurable
- Interceptores de request para agregar tokens
- Interceptores de response para manejo de errores
- Timeout configurado
- Manejo automático de errores 401, 403, 404, 500

### Ejemplo de uso:

```typescript
import api from '@/lib/axios'

// GET request
const users = await api.get('/users')

// POST request
const newUser = await api.post('/users', { name: 'John', email: 'john@example.com' })

// PUT request
const updatedUser = await api.put(`/users/${id}`, { name: 'Jane' })

// DELETE request
await api.delete(`/users/${id}`)
```

## 📊 Gestión de Estado

Utiliza Zustand para la gestión de estado global. Stores incluidos:

### Auth Store

```typescript
import { useAuthStore } from '@/stores/authStore'

const { user, isAuthenticated, login, logout } = useAuthStore()
```

### Users Store

```typescript
import { useUsersStore } from '@/stores/usersStore'

const { users, setUsers, addUser, updateUser, deleteUser } = useUsersStore()
```

## 🎨 Componentes UI

La plantilla usa **shadcn/ui**, una colección de componentes accesibles y personalizables:

- Button
- Input
- Card
- Label
- Toast
- Dropdown Menu
- Avatar
- Y más...

### Ejemplo de uso:

```typescript
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

<Button variant="default">Click me</Button>
<Input type="email" placeholder="Email" />
```

## 🔧 Personalización

### Colores y tema

Edita `src/index.css` para cambiar el esquema de colores:

```css
:root {
  --primary: 221.2 83.2% 53.3%;
  --secondary: 210 40% 96.1%;
  /* ... más variables */
}
```

### Componentes

Los componentes de shadcn/ui son totalmente personalizables. Edita los archivos en `src/components/ui/` según tus necesidades.

## 🛠️ Mejores Prácticas

### Seguridad

1. **Nunca expongas credenciales** en el código fuente
2. **Usa variables de entorno** para configuración sensible
3. **Implementa validación** tanto en frontend como backend
4. **Sanitiza inputs** de usuario
5. **Usa HTTPS** en producción

### Manejo de errores

```typescript
try {
  const response = await api.get('/users')
  // Manejar respuesta exitosa
} catch (error) {
  // El interceptor ya maneja errores comunes
  // Aquí puedes agregar lógica adicional
  toast({
    title: 'Error',
    description: 'No se pudieron cargar los usuarios',
    variant: 'destructive',
  })
}
```

### Tipado TypeScript

Siempre define tipos para tus datos:

```typescript
interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'user'
}
```

## 📱 Páginas Incluidas

### Públicas

- **Landing Page** (`/`) - Página de inicio atractiva
- **Login** (`/login`) - Inicio de sesión
- **Registro** (`/register`) - Crear cuenta
- **Recuperar contraseña** (`/forgot-password`) - Recuperación

### Protegidas (requieren autenticación)

- **Dashboard** (`/dashboard`) - Panel principal
- **Usuarios** (`/dashboard/users`) - Gestión de usuarios

## 🚢 Despliegue

### Build de producción

```bash
npm run build
```

Los archivos optimizados se generarán en la carpeta `dist/`.

### Opciones de despliegue

- **Vercel** - Recomendado para Vite
- **Netlify** - Fácil configuración
- **GitHub Pages** - Gratis para proyectos open source
- **AWS S3 + CloudFront** - Para aplicaciones enterprise

### Vercel (Recomendado)

1. Instala Vercel CLI: `npm i -g vercel`
2. Ejecuta: `vercel`
3. Sigue las instrucciones

### Netlify

1. Instala Netlify CLI: `npm i -g netlify-cli`
2. Ejecuta: `netlify deploy --prod`

## 🤝 Contribución

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Notas Adicionales

### Modo Demo

La aplicación está configurada en modo demo y usa datos mock. Para producción:

1. Configura tu backend/API
2. Actualiza `VITE_API_URL` en `.env`
3. Descomenta las llamadas reales en los servicios
4. Implementa autenticación real con JWT

### Extensiones VSCode Recomendadas

- ESLint
- Prettier
- Tailwind CSS IntelliSense
- TypeScript Vue Plugin (Volar)

### Solución de Problemas

#### Error: "Cannot find module '@/...'"

Asegúrate de que tu IDE reconoce los path aliases. En VSCode, el archivo `tsconfig.json` debería ser suficiente.

#### Error de módulos faltantes

```bash
rm -rf node_modules package-lock.json
npm install
```

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo LICENSE para más detalles.

## 🙏 Agradecimientos

- [Vite](https://vitejs.dev/)
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Zustand](https://zustand-demo.pmnd.rs/)
- [React Router](https://reactrouter.com/)
- [Axios](https://axios-http.com/)

---

**¡Feliz codificación! 🎉**

Si tienes preguntas o sugerencias, no dudes en abrir un issue.

