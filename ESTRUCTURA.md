# 📁 Estructura del Proyecto

Este documento explica la organización del proyecto y el propósito de cada carpeta y archivo principal.

```
react-vite-template/
│
├── .vscode/                      # Configuración de VSCode
│   ├── settings.json            # Configuración del editor
│   └── extensions.json          # Extensiones recomendadas
│
├── public/                       # Archivos estáticos públicos
│   └── vite.svg                 # Logo de Vite
│
├── src/                          # Código fuente principal
│   │
│   ├── components/              # Componentes reutilizables
│   │   ├── auth/               # Componentes de autenticación
│   │   │   └── ProtectedRoute.tsx    # HOC para proteger rutas
│   │   │
│   │   ├── layouts/            # Layouts de la aplicación
│   │   │   └── DashboardLayout.tsx   # Layout del dashboard
│   │   │
│   │   └── ui/                 # Componentes UI de shadcn
│   │       ├── avatar.tsx
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── dropdown-menu.tsx
│   │       ├── input.tsx
│   │       ├── label.tsx
│   │       ├── toast.tsx
│   │       └── toaster.tsx
│   │
│   ├── hooks/                  # Custom React Hooks
│   │   └── use-toast.ts       # Hook para notificaciones
│   │
│   ├── lib/                    # Librerías y utilidades
│   │   ├── axios.ts           # Configuración de Axios
│   │   └── utils.ts           # Utilidades generales (cn)
│   │
│   ├── pages/                  # Páginas de la aplicación
│   │   ├── auth/              # Páginas de autenticación
│   │   │   ├── LoginPage.tsx
│   │   │   ├── RegisterPage.tsx
│   │   │   └── ForgotPasswordPage.tsx
│   │   │
│   │   ├── dashboard/         # Páginas del dashboard
│   │   │   ├── DashboardPage.tsx
│   │   │   └── UsersPage.tsx
│   │   │
│   │   └── LandingPage.tsx    # Página de inicio
│   │
│   ├── services/              # Servicios de API
│   │   ├── authService.ts    # Servicio de autenticación
│   │   └── usersService.ts   # Servicio de usuarios
│   │
│   ├── stores/                # Stores de Zustand
│   │   ├── authStore.ts      # Estado global de auth
│   │   └── usersStore.ts     # Estado global de usuarios
│   │
│   ├── types/                 # Tipos de TypeScript
│   │   └── index.ts          # Tipos principales
│   │
│   ├── App.tsx               # Componente raíz con rutas
│   ├── main.tsx              # Punto de entrada
│   ├── index.css             # Estilos globales + Tailwind
│   └── vite-env.d.ts         # Tipos de variables de entorno
│
├── .env.example              # Ejemplo de variables de entorno
├── .eslintrc.cjs            # Configuración de ESLint
├── .gitignore               # Archivos ignorados por Git
├── .prettierrc              # Configuración de Prettier
├── index.html               # HTML principal
├── package.json             # Dependencias y scripts
├── postcss.config.js        # Configuración de PostCSS
├── tailwind.config.js       # Configuración de Tailwind CSS
├── tsconfig.json            # Configuración de TypeScript
├── tsconfig.node.json       # Config de TS para Node
├── vite.config.ts           # Configuración de Vite
│
├── README.md                # Documentación principal
├── GUIA_INICIO.md          # Guía rápida de inicio
├── SEGURIDAD.md            # Guía de seguridad
└── ESTRUCTURA.md           # Este archivo
```

## 📂 Descripción Detallada

### `/src/components/`

Componentes reutilizables organizados por categoría:

- **auth/** - Componentes relacionados con autenticación
- **layouts/** - Layouts que envuelven páginas
- **ui/** - Componentes de interfaz de shadcn/ui

### `/src/hooks/`

Custom hooks de React. Actualmente incluye:

- **use-toast.ts** - Hook para el sistema de notificaciones

### `/src/lib/`

Configuraciones y utilidades:

- **axios.ts** - Cliente HTTP configurado con interceptores
- **utils.ts** - Funciones utilitarias (como `cn()` para clases)

### `/src/pages/`

Páginas principales de la aplicación:

- **auth/** - Login, registro, recuperación de contraseña
- **dashboard/** - Panel administrativo y gestión
- **LandingPage.tsx** - Página de inicio pública

### `/src/services/`

Capa de servicios para comunicación con API:

- **authService.ts** - Endpoints de autenticación
- **usersService.ts** - CRUD de usuarios

### `/src/stores/`

Gestión de estado global con Zustand:

- **authStore.ts** - Estado de autenticación (user, token, etc.)
- **usersStore.ts** - Estado de usuarios (lista, CRUD)

### `/src/types/`

Definiciones de tipos TypeScript compartidos.

## 🔄 Flujo de Datos

```
┌─────────────────────────────────────────────────────┐
│                    Usuario                          │
└──────────────────┬──────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────┐
│              Componente/Página                      │
│  (LoginPage, DashboardPage, etc.)                   │
└──────────────────┬──────────────────────────────────┘
                   │
                   ├──────────────────┐
                   ▼                  ▼
         ┌─────────────────┐  ┌──────────────┐
         │  Zustand Store  │  │   Service    │
         │  (authStore)    │  │ (authService)│
         └─────────────────┘  └──────┬───────┘
                                     │
                                     ▼
                             ┌──────────────┐
                             │     Axios    │
                             │  (lib/axios) │
                             └──────┬───────┘
                                     │
                                     ▼
                             ┌──────────────┐
                             │   API REST   │
                             └──────────────┘
```

## 🎯 Patrones de Diseño

### 1. Composición de Componentes

```typescript
// Layout envuelve páginas
<DashboardLayout>
  <DashboardPage />
</DashboardLayout>

// ProtectedRoute protege rutas
<ProtectedRoute>
  <DashboardLayout />
</ProtectedRoute>
```

### 2. Custom Hooks

```typescript
// Reutilización de lógica
const { toast } = useToast()
const { user, logout } = useAuthStore()
```

### 3. Servicios

```typescript
// Capa de abstracción para API
const users = await usersService.getUsers()
```

### 4. Stores (Estado Global)

```typescript
// Estado centralizado y reactivo
const useAuthStore = create<AuthState>((set) => ({
  user: null,
  login: (user) => set({ user }),
  // ...
}))
```

## 📝 Convenciones de Nomenclatura

### Archivos

- **Componentes:** PascalCase - `UserCard.tsx`
- **Hooks:** camelCase con prefijo "use" - `useAuth.ts`
- **Servicios:** camelCase con sufijo "Service" - `authService.ts`
- **Stores:** camelCase con sufijo "Store" - `authStore.ts`
- **Tipos:** PascalCase - `User.ts`
- **Utilidades:** camelCase - `formatDate.ts`

### Código

- **Componentes:** PascalCase - `function UserCard()`
- **Funciones:** camelCase - `function getUserById()`
- **Constantes:** UPPER_SNAKE_CASE - `const MAX_USERS = 100`
- **Variables:** camelCase - `const userName = 'John'`
- **Interfaces/Types:** PascalCase - `interface User {}`

## 🔧 Agregar Nuevas Funcionalidades

### Agregar una nueva página

1. Crea el archivo en `/src/pages/` o subcarpeta correspondiente
2. Agrega la ruta en `/src/App.tsx`
3. (Opcional) Protege con `<ProtectedRoute>`

### Agregar un nuevo componente UI

1. Visita [shadcn/ui](https://ui.shadcn.com/)
2. Copia el componente a `/src/components/ui/`
3. Úsalo en tus páginas

### Agregar un nuevo servicio

1. Crea el archivo en `/src/services/`
2. Usa el cliente `api` de `/src/lib/axios.ts`
3. Define los tipos en `/src/types/`

### Agregar un nuevo store

1. Crea el archivo en `/src/stores/`
2. Define el tipo del estado
3. Implementa con `create()` de Zustand

## 🎨 Estilos y Temas

### Tailwind CSS

Los estilos se escriben usando clases de utilidad de Tailwind:

```tsx
<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
  Click me
</button>
```

### Variables CSS

Los colores del tema se definen en `/src/index.css`:

```css
:root {
  --primary: 221.2 83.2% 53.3%;
  --secondary: 210 40% 96.1%;
  /* ... */
}
```

### Función `cn()`

Combina clases de Tailwind con conditional rendering:

```tsx
import { cn } from '@/lib/utils'

<div className={cn(
  'base-class',
  isActive && 'active-class',
  className
)} />
```

## 🚀 Desarrollo

### Hot Module Replacement (HMR)

Vite proporciona HMR instantáneo. Los cambios se reflejan sin recargar la página.

### TypeScript

Todos los archivos deben estar tipados. Usa `any` solo como último recurso.

### Linting

Ejecuta `npm run lint` antes de hacer commit.

## 📚 Recursos

- [Documentación de Vite](https://vitejs.dev/)
- [React Docs](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Zustand](https://zustand-demo.pmnd.rs/)

---

**Última actualización:** 2024

