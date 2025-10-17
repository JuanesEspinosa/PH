# 📁 Estructura Modular de Pages

## 🎯 Filosofía

Cada módulo es independiente con su propia estructura de componentes, hooks, servicios y vistas.

## 📂 Estructura General

```
src/pages/
├── Home/
│   └── LandingPage.tsx
├── auth/
│   ├── components/
│   ├── hooks/
│   ├── services/
│   ├── views/
│   ├── README.md
│   ├── API.md
│   └── BACKEND.md
├── dashboard/
│   ├── dashboard/
│   │   └── DashboardPage.tsx
│   └── usuarios/
│       ├── components/
│       ├── hooks/
│       ├── services/
│       ├── views/
│       ├── README.md
│       ├── API.md
│       └── BACKEND.md
└── README.md (este archivo)
```

## 📚 Módulos

### 🏠 Home
Landing page pública

### 🔐 Auth
Módulo de autenticación completo
- Login, Registro, Recuperar contraseña
- React Query
- Ver: `auth/README.md`

### 📊 Dashboard
Panel de control principal

### 👥 Usuarios
Gestión CRUD de usuarios
- Lista con búsqueda (searchParams)
- Crear, editar, eliminar
- React Query
- Ver: `dashboard/usuarios/README.md`

## 🧩 Anatomía de un Módulo

Cada módulo sigue esta estructura:

```
modulo/
├── components/       # Componentes UI específicos del módulo
├── hooks/           # Custom hooks (React Query)
├── services/        # Llamadas a API (Axios)
├── views/           # Páginas/vistas del módulo
├── README.md        # Documentación general
├── API.md           # Especificaciones de API
└── BACKEND.md       # Implementación backend
```

## 🔧 Stack Tecnológico

- **React + TypeScript**
- **React Query** - Manejo de estado servidor
- **Axios** - Cliente HTTP
- **React Router** - Navegación
- **SearchParams** - Estado en URL
- **Zustand** - Estado global (opcional)

## 🚀 Cómo Agregar un Nuevo Módulo

### 1. Crear estructura

```bash
mkdir -p src/pages/dashboard/nuevo_modulo/{components,hooks,services,views}
```

### 2. Crear archivos base

```bash
touch src/pages/dashboard/nuevo_modulo/{README.md,API.md,BACKEND.md}
touch src/pages/dashboard/nuevo_modulo/services/nuevoModuloService.ts
touch src/pages/dashboard/nuevo_modulo/hooks/useNuevoModuloQuery.ts
```

### 3. Configurar servicio

```typescript
// services/nuevoModuloService.ts
import api from '@/lib/axios'

export const nuevoModuloService = {
  getAll: async () => {
    const { data } = await api.get('/api/nuevo-modulo')
    return data
  },
  // ... más métodos
}
```

### 4. Crear hooks con React Query

```typescript
// hooks/useNuevoModuloQuery.ts
import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '@/lib/queryClient'
import { nuevoModuloService } from '../services/nuevoModuloService'

export function useNuevoModuloQuery() {
  return useQuery({
    queryKey: queryKeys.nuevoModulo.all,
    queryFn: () => nuevoModuloService.getAll(),
  })
}
```

### 5. Agregar rutas

```typescript
// src/App.tsx
import NuevoModuloView from '@/pages/dashboard/nuevo_modulo/views/NuevoModuloView'

<Route path="nuevo-modulo" element={<NuevoModuloView />} />
```

### 6. Actualizar queryKeys

```typescript
// src/lib/queryClient.ts
export const queryKeys = {
  // ...
  nuevoModulo: {
    all: ['nuevo-modulo'] as const,
    // ...
  },
}
```

### 7. Documentar

- `README.md` - Uso y ejemplos
- `API.md` - Endpoints backend
- `BACKEND.md` - Implementación backend

## ✅ Convenciones

1. **Nombres en camelCase** para archivos TypeScript
2. **PascalCase** para componentes React
3. **Prefijo use** para hooks
4. **Sufijo Service** para servicios
5. **Sufijo View** para vistas
6. **React Query** para todas las operaciones async
7. **SearchParams** para filtros y búsquedas
8. **READMEs < 300 líneas** (dividir en API.md y BACKEND.md)

## 📖 Más Información

- [React Query Docs](https://tanstack.com/query)
- [React Router Docs](https://reactrouter.com)
- `src/lib/queryClient.ts` - Configuración global
- `src/lib/axios.ts` - Cliente HTTP

---

**Cada módulo es autónomo y reutilizable. ¡Mantén la consistencia!**
