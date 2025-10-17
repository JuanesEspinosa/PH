# 📝 Changelog

Todos los cambios notables en este proyecto serán documentados en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/),
y este proyecto adhiere a [Semantic Versioning](https://semver.org/lang/es/).

## [1.0.0] - 2024-10-17

### ✨ Agregado

#### Configuración Inicial
- Configuración de proyecto con Vite + React + TypeScript
- Integración de Tailwind CSS para estilos
- Configuración de ESLint y Prettier
- Soporte para path aliases (`@/`)
- Archivo de variables de entorno de ejemplo

#### Componentes UI (shadcn/ui)
- Componente `Button` con múltiples variantes
- Componente `Input` para formularios
- Componente `Card` y subcomponentes relacionados
- Componente `Label` para etiquetas de formulario
- Sistema de notificaciones `Toast` y `Toaster`
- Componente `DropdownMenu` completo
- Componente `Avatar` para imágenes de perfil
- Hook personalizado `useToast` para notificaciones

#### Autenticación
- Página de Login con validación
- Página de Registro con validaciones de contraseña
- Página de Recuperación de contraseña
- Store de autenticación con Zustand (`authStore`)
- Servicio de autenticación (`authService`)
- Componente `ProtectedRoute` para rutas privadas
- Persistencia de sesión en localStorage
- Manejo de tokens JWT

#### Landing Page
- Hero section atractiva y responsiva
- Sección de características destacadas
- Sección de beneficios
- Call-to-Action (CTA)
- Footer completo con enlaces
- Diseño totalmente responsivo

#### Dashboard/Backoffice
- Layout del dashboard con sidebar colapsable
- Página principal del dashboard con estadísticas
- Gráficos y métricas de ejemplo
- Página de gestión de usuarios con tabla
- Búsqueda y filtrado de usuarios
- Menú de usuario con dropdown
- Navegación protegida
- Diseño responsivo para móviles

#### Gestión de Estado
- Store de autenticación (`authStore`)
- Store de usuarios (`usersStore`)
- Inicialización automática del estado de auth

#### Servicios y API
- Cliente Axios configurado (`lib/axios`)
- Interceptores para tokens automáticos
- Manejo global de errores HTTP
- Servicio de autenticación completo
- Servicio CRUD de usuarios
- Tipos TypeScript para todas las entidades

#### Navegación
- React Router configurado
- Rutas públicas (landing, auth)
- Rutas protegidas (dashboard)
- Rutas anidadas en dashboard
- Redirección automática al login

#### Documentación
- README completo con guía de instalación
- Guía de inicio rápido (`GUIA_INICIO.md`)
- Documentación de seguridad (`SEGURIDAD.md`)
- Documentación de estructura (`ESTRUCTURA.md`)
- Guía de despliegue (`DEPLOYMENT.md`)
- Changelog para seguimiento de versiones

#### Configuración de Desarrollo
- Configuración de VSCode con extensiones recomendadas
- Configuración de Prettier
- Configuración de TypeScript estricta
- Scripts npm para desarrollo y build

### 🎨 Estilos y Diseño
- Sistema de diseño basado en Tailwind CSS
- Variables CSS para temas personalizables
- Soporte para modo oscuro (configurado)
- Paleta de colores coherente
- Componentes totalmente responsivos
- Animaciones y transiciones suaves

### 🔒 Seguridad
- Validación de inputs en formularios
- Sanitización de datos de usuario
- Tokens JWT para autenticación
- Rutas protegidas en el frontend
- Manejo seguro de errores
- Mejores prácticas documentadas

### 🛠️ Herramientas y Utilidades
- Función `cn()` para combinar clases de Tailwind
- Tipos TypeScript para variables de entorno
- Configuración de path aliases
- Hot Module Replacement (HMR)

### 📱 Características de UX
- Loading states en formularios
- Mensajes de error amigables
- Notificaciones toast
- Feedback visual en acciones
- Navegación intuitiva
- Estados vacíos bien diseñados

---

## Tipos de Cambios

- `✨ Agregado` - Para nuevas funcionalidades
- `🔧 Cambiado` - Para cambios en funcionalidades existentes
- `🐛 Corregido` - Para corrección de bugs
- `🗑️ Eliminado` - Para funcionalidades removidas
- `🔒 Seguridad` - Para correcciones de seguridad
- `📚 Documentación` - Para cambios solo en documentación
- `⚡ Rendimiento` - Para mejoras de rendimiento

---

## [1.1.0] - 2024-10-17

### 🗑️ Eliminado

#### Código Legacy
- Eliminado `src/pages/auth/hooks/useAuth.ts` (reemplazado por useAuthQuery.ts)
- Eliminado `src/pages/dashboard/usuarios/hooks/useUsuarios.ts` (reemplazado por useUsuariosQuery.ts)
- Componentes migrados a React Query:
  - LoginForm.tsx - Usa `useLoginMutation`
  - RegisterForm.tsx - Usa `useRegisterMutation`
  - ForgotPasswordForm.tsx - Usa `useForgotPasswordMutation`

### ✨ Agregado

#### React Query (TanStack Query v5)
- Instalación y configuración de React Query
- QueryClient configurado con opciones optimizadas
- QueryClientProvider en `main.tsx`
- React Query DevTools para desarrollo
- Query keys centralizadas en `src/lib/queryClient.ts`
- Hooks con React Query para autenticación
- Hooks con React Query para usuarios (CRUD completo)
- Caché inteligente y automática
- Invalidación automática tras mutations
- Manejo de estados (loading, error, success) automático

#### SearchParams
- Hook `useUsuariosSearch` para búsqueda en URL
- Integración de searchParams con React Query
- Query keys reactivas según params de URL
- Estado de filtros persistente en URL compartible

#### Documentación Nueva
- **[REACT_QUERY.md](./REACT_QUERY.md)** - Guía completa de React Query
- **[SEARCHPARAMS.md](./SEARCHPARAMS.md)** - Guía de SearchParams
- **[CAMBIOS_REACT_QUERY.md](./CAMBIOS_REACT_QUERY.md)** - Resumen de migración
- READMEs de módulos divididos en:
  - `README.md` - Descripción y uso (< 300 líneas)
  - `API.md` - Especificaciones de endpoints
  - `BACKEND.md` - Implementación backend

### 🔧 Cambiado

#### Arquitectura
- `src/lib/axios.ts` - Integrado con React Query (limpieza de caché en 401)
- `src/main.tsx` - Agregado QueryClientProvider y DevTools
- Hooks de autenticación migrados a React Query
- Hooks de usuarios migrados a React Query con searchParams
- Vistas de usuarios actualizadas con nuevos hooks

#### Estructura de Módulos
- Cada módulo ahora tiene documentación completa:
  - `src/pages/auth/` - README.md, API.md, BACKEND.md
  - `src/pages/dashboard/usuarios/` - README.md, API.md, BACKEND.md
- READMEs principales reducidos a menos de 300 líneas

### ⚡ Rendimiento
- Caché automático reduce llamadas a API
- Refetch en background para datos stale
- Optimistic updates para UI instantánea
- Invalidación inteligente de queries

---

## [Unreleased]

### Planificado para futuras versiones

- [ ] Implementación de tests (Vitest, React Testing Library)
- [ ] Modo oscuro completo
- [ ] Internacionalización (i18n)
- [ ] Paginación con React Query
- [ ] Filtros avanzados con searchParams
- [ ] Exportación de datos (CSV, PDF)
- [ ] Notificaciones en tiempo real
- [ ] Chat o mensajería
- [ ] Dashboard personalizable
- [ ] Multi-tenancy
- [ ] Roles y permisos más granulares
- [ ] PWA (Progressive Web App)
- [ ] Offline support con React Query
- [ ] Documentación de API con Swagger

---

## Notas de Versiones

### Versión 1.0.0

Esta es la primera versión estable del proyecto. Incluye todas las funcionalidades base necesarias para comenzar a desarrollar una aplicación web completa con React.

**Características principales:**
- ✅ Autenticación completa
- ✅ Dashboard funcional
- ✅ Gestión de usuarios
- ✅ Landing page atractiva
- ✅ Documentación completa
- ✅ Diseño responsivo

**Tecnologías:**
- React 18
- TypeScript 5
- Vite 5
- Tailwind CSS 3
- shadcn/ui
- Zustand 4
- React Router 6
- Axios 1

**Para Contribuidores:**

Si contribuyes al proyecto, por favor:
1. Actualiza este CHANGELOG con tus cambios
2. Sigue el formato establecido
3. Clasifica tus cambios correctamente
4. Incluye el número de PR o issue si aplica

---

**Enlaces:**
- [Repositorio](https://github.com/tu-usuario/tu-repo)
- [Documentación](./README.md)
- [Reporte de Bugs](https://github.com/tu-usuario/tu-repo/issues)

---

**Última actualización:** 2024-10-17

