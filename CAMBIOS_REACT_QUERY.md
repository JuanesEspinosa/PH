# ✨ Cambios: Integración de React Query y SearchParams

## 📋 Resumen

Se ha integrado **React Query (TanStack Query v5)** y **SearchParams** para un mejor manejo de estado servidor y filtros en URL.

## 🎯 Mejoras Implementadas

### 1. React Query

#### ✅ Ventajas
- **Caché inteligente** - Los datos se reutilizan automáticamente
- **Estados automáticos** - Loading, error, success
- **Refetch automático** - Mantiene datos actualizados
- **Optimistic updates** - UI instantánea
- **DevTools** - Debug visual de queries

#### 📦 Instalación
```bash
npm install @tanstack/react-query @tanstack/react-query-devtools
```

#### 🔧 Configuración
- `src/lib/queryClient.ts` - Cliente global y query keys
- `src/main.tsx` - Provider y DevTools

### 2. SearchParams

#### ✅ Ventajas
- **Estado en URL** - Compartible via link
- **Persistencia** - Se mantiene al recargar
- **Historial** - Funciona con back/forward
- **Bookmarkable** - URLs guardables

#### 🔧 Implementación
- Integrado en hooks de usuarios
- Query keys reactivas
- Sincronización automática con React Query

## 📂 Archivos Nuevos

### Core
```
src/lib/
├── queryClient.ts         # Cliente y query keys
└── axios.ts              # Actualizado con integración

src/main.tsx              # Actualizado con QueryProvider
```

### Hooks de Auth (React Query)
```
src/pages/auth/hooks/
└── useAuthQuery.ts       # Login, Register, Logout con React Query
```

### Hooks de Usuarios (React Query + SearchParams)
```
src/pages/dashboard/usuarios/hooks/
└── useUsuariosQuery.ts   # CRUD + Search con React Query
```

### Vistas Actualizadas
```
src/pages/dashboard/usuarios/views/
├── UsuariosListView.tsx      # Lista con search
├── UsuarioCreateView.tsx     # Crear
├── UsuarioEditView.tsx       # Editar
└── UsuarioDetailView.tsx     # Detalle
```

## 📚 Documentación

### Nuevas Guías
- **[REACT_QUERY.md](./REACT_QUERY.md)** - Guía completa de React Query
- **[SEARCHPARAMS.md](./SEARCHPARAMS.md)** - Guía de SearchParams

### READMEs Divididos
Cada módulo ahora tiene:
- `README.md` - Descripción y uso (< 300 líneas)
- `API.md` - Especificaciones de endpoints
- `BACKEND.md` - Implementación backend

```
src/pages/auth/
├── README.md
├── API.md
└── BACKEND.md

src/pages/dashboard/usuarios/
├── README.md
├── API.md
└── BACKEND.md
```

## 🔄 Cambios en el Código

### Antes (sin React Query)

```typescript
// Hook tradicional
export function useUsuarios() {
  const [usuarios, setUsuarios] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    usuariosService.getAll()
      .then(setUsuarios)
      .finally(() => setLoading(false))
  }, [])

  return { usuarios, loading }
}
```

### Después (con React Query)

```typescript
// Hook con React Query
export function useUsuariosQuery() {
  return useQuery({
    queryKey: queryKeys.usuarios.lists(),
    queryFn: () => usuariosService.getAll(),
  })
}

// Uso en componente
const { data: usuarios, isLoading } = useUsuariosQuery()
```

### SearchParams Integration

```typescript
// Búsqueda en URL: /usuarios?q=juan
export function useUsuariosQuery() {
  const [searchParams] = useSearchParams()
  const searchQuery = searchParams.get('q') || ''

  return useQuery({
    queryKey: queryKeys.usuarios.list(searchQuery), // Key reactiva
    queryFn: async () => {
      if (searchQuery) return usuariosService.search(searchQuery)
      return usuariosService.getAll()
    },
  })
}
```

## 🎨 Nuevas Features

### 1. Búsqueda con URL
```typescript
// URL: /dashboard/usuarios?q=juan
const { searchQuery, setSearch, clearSearch } = useUsuariosSearch()

setSearch('juan')  // Actualiza URL y refetch automático
```

### 2. Caché Inteligente
```typescript
// Primera carga: fetch de API
const { data } = useUsuariosQuery()

// Segunda carga: datos desde caché (instantáneo)
// Refetch en background si están stale
```

### 3. Invalidación Automática
```typescript
const { mutate: createUsuario } = useCreateUsuarioMutation()

createUsuario(data) // Invalida y refetch lista automáticamente
```

### 4. DevTools
- Ver queries activas
- Estado de caché
- Refetch manual
- Debug visual

## 🚀 Cómo Usar

### Login con React Query

```typescript
import { useLoginMutation } from '@/pages/auth/hooks/useAuthQuery'

const { mutate: login, isPending } = useLoginMutation()

login({ email: 'user@example.com', password: '123456' })
```

### CRUD de Usuarios

```typescript
// Lista con búsqueda
const { data: usuarios, isLoading } = useUsuariosQuery()
const { searchQuery, setSearch } = useUsuariosSearch()

// Crear
const { mutate: createUsuario } = useCreateUsuarioMutation()
createUsuario({ nombre: 'Juan', email: 'juan@example.com' })

// Actualizar
const { mutate: updateUsuario } = useUpdateUsuarioMutation()
updateUsuario({ id: '123', data: { nombre: 'Juan Actualizado' } })

// Eliminar
const { mutate: deleteUsuario } = useDeleteUsuarioMutation()
deleteUsuario('123')
```

## 📊 Query Keys

Centralizadas en `src/lib/queryClient.ts`:

```typescript
export const queryKeys = {
  auth: {
    user: ['auth', 'user'] as const,
    verify: ['auth', 'verify'] as const,
  },
  usuarios: {
    all: ['usuarios'] as const,
    lists: () => [...queryKeys.usuarios.all, 'list'] as const,
    list: (filters?: string) => [...queryKeys.usuarios.lists(), filters] as const,
    details: () => [...queryKeys.usuarios.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.usuarios.details(), id] as const,
  },
}
```

## 🔧 Configuración de Axios

Actualizada con integración de React Query:

```typescript
// Interceptor en 401: limpiar queries
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      queryClient.clear() // Limpiar todas las queries
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)
```

## ✅ Checklist de Implementación

- [x] Instalar React Query
- [x] Configurar QueryClient
- [x] Definir query keys
- [x] Hooks de auth con React Query
- [x] Hooks de usuarios con React Query
- [x] SearchParams en usuarios
- [x] Actualizar vistas
- [x] DevTools habilitadas
- [x] Documentación
- [x] Dividir READMEs grandes

## 🎓 Recursos de Aprendizaje

- **[REACT_QUERY.md](./REACT_QUERY.md)** - Guía completa con ejemplos
- **[SEARCHPARAMS.md](./SEARCHPARAMS.md)** - Patrones y mejores prácticas
- [Docs Oficiales React Query](https://tanstack.com/query/latest)
- [React Router SearchParams](https://reactrouter.com/en/main/hooks/use-search-params)

## 🔄 Migración de Código Legacy

Si tienes hooks antiguos:

1. **Reemplazar useState + useEffect** con `useQuery`
2. **Reemplazar funciones async** con `useMutation`
3. **Agregar invalidaciones** tras mutations
4. **Usar query keys** de `queryKeys`

---

**¡React Query + SearchParams hacen el código más simple, rápido y mantenible!**


