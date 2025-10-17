# 🚀 Guía de React Query

## 📋 Descripción

Esta plantilla usa **@tanstack/react-query** (v5) para manejo de estado servidor con caché inteligente.

## ⚙️ Configuración

### Instalación

```bash
npm install @tanstack/react-query @tanstack/react-query-devtools
```

### Setup Global

```typescript
// src/main.tsx
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { queryClient } from './lib/queryClient'

<QueryClientProvider client={queryClient}>
  <App />
  <ReactQueryDevtools initialIsOpen={false} />
</QueryClientProvider>
```

### Configuración del Cliente

```typescript
// src/lib/queryClient.ts
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,      // 5 minutos
      gcTime: 1000 * 60 * 10,         // 10 minutos
      retry: 1,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    },
    mutations: {
      retry: 0,
    },
  },
})
```

## 🔑 Query Keys

Definición centralizada:

```typescript
// src/lib/queryClient.ts
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
    search: (query: string) => [...queryKeys.usuarios.all, 'search', query] as const,
  },
}
```

## 📖 Uso

### 1. Queries (Leer datos)

```typescript
import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '@/lib/queryClient'
import { usuariosService } from './services/usuariosService'

export function useUsuariosQuery() {
  return useQuery({
    queryKey: queryKeys.usuarios.lists(),
    queryFn: () => usuariosService.getAll(),
  })
}

// En componente:
const { data, isLoading, error, refetch } = useUsuariosQuery()
```

### 2. Mutations (Crear/Actualizar/Eliminar)

```typescript
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useCreateUsuarioMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data) => usuariosService.create(data),
    onSuccess: () => {
      // Invalida query para refrescar lista
      queryClient.invalidateQueries({ queryKey: queryKeys.usuarios.lists() })
    },
  })
}

// En componente:
const { mutate: createUsuario, isPending } = useCreateUsuarioMutation()

createUsuario({ nombre: 'Juan', email: 'juan@example.com' })
```

### 3. Con SearchParams

```typescript
import { useSearchParams } from 'react-router-dom'

export function useUsuariosQuery() {
  const [searchParams] = useSearchParams()
  const searchQuery = searchParams.get('q') || ''

  return useQuery({
    queryKey: queryKeys.usuarios.list(searchQuery),
    queryFn: () => {
      if (searchQuery) return usuariosService.search(searchQuery)
      return usuariosService.getAll()
    },
  })
}
```

## 🎯 Patrones Comunes

### Invalidar Queries

```typescript
// Invalida una query específica
queryClient.invalidateQueries({ queryKey: queryKeys.usuarios.detail('123') })

// Invalida todas las queries de usuarios
queryClient.invalidateQueries({ queryKey: queryKeys.usuarios.all })
```

### Setear Datos Manualmente

```typescript
// Setear datos en caché
queryClient.setQueryData(queryKeys.usuarios.detail('123'), nuevoUsuario)
```

### Remover Queries

```typescript
// Remover query de la caché
queryClient.removeQueries({ queryKey: queryKeys.usuarios.detail('123') })
```

### Limpiar Todo

```typescript
// Limpiar toda la caché (ej: al logout)
queryClient.clear()
```

## ⚡ Features Avanzadas

### Optimistic Updates

```typescript
export function useUpdateUsuarioMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }) => usuariosService.update(id, data),
    onMutate: async ({ id, data }) => {
      // Cancelar queries en progreso
      await queryClient.cancelQueries({ queryKey: queryKeys.usuarios.detail(id) })

      // Obtener datos actuales
      const previousUsuario = queryClient.getQueryData(queryKeys.usuarios.detail(id))

      // Actualizar optimísticamente
      queryClient.setQueryData(queryKeys.usuarios.detail(id), (old) => ({
        ...old,
        ...data,
      }))

      // Retornar context con datos previos
      return { previousUsuario }
    },
    onError: (err, variables, context) => {
      // Rollback en error
      if (context?.previousUsuario) {
        queryClient.setQueryData(
          queryKeys.usuarios.detail(variables.id),
          context.previousUsuario
        )
      }
    },
    onSettled: (data, error, { id }) => {
      // Refrescar datos del servidor
      queryClient.invalidateQueries({ queryKey: queryKeys.usuarios.detail(id) })
    },
  })
}
```

### Dependent Queries

```typescript
// Query que depende de otra
export function useUsuarioQuery(id: string) {
  return useQuery({
    queryKey: queryKeys.usuarios.detail(id),
    queryFn: () => usuariosService.getById(id),
    enabled: !!id, // Solo ejecuta si hay id
  })
}
```

### Infinite Queries

```typescript
export function useInfiniteUsuariosQuery() {
  return useInfiniteQuery({
    queryKey: queryKeys.usuarios.lists(),
    queryFn: ({ pageParam = 1 }) => 
      usuariosService.getAll({ page: pageParam }),
    getNextPageParam: (lastPage) => lastPage.nextPage,
  })
}
```

## 🔧 DevTools

Las DevTools se abren automáticamente en desarrollo:

```typescript
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

<ReactQueryDevtools initialIsOpen={false} />
```

**Features:**
- Ver todas las queries activas
- Ver estado de caché
- Invalidar queries manualmente
- Ver query keys
- Refetch manual

## 📊 Estados

```typescript
const { data, isLoading, isError, error, isSuccess, isPending, refetch } = useQuery()

// Mutations
const { mutate, isPending, isError, error, isSuccess } = useMutation()
```

| Estado | Descripción |
|--------|-------------|
| `isLoading` | Primera carga, sin datos en caché |
| `isPending` | Query/mutation en progreso |
| `isError` | Ocurrió un error |
| `isSuccess` | Completado exitosamente |
| `data` | Datos obtenidos |
| `error` | Error ocurrido |

## 💡 Tips

1. **Usa query keys consistentes** - Define en `queryKeys`
2. **Invalida queries tras mutations** - Mantiene datos sincronizados
3. **Usa `enabled`** - Para queries condicionales
4. **Aprovecha el caché** - Configura `staleTime` apropiadamente
5. **DevTools son tu amigo** - Úsalas para debug
6. **onSuccess/onError** - Para side effects (toasts, navegación)

## 🔗 Recursos

- [Docs Oficiales](https://tanstack.com/query/latest)
- [Ejemplos](https://tanstack.com/query/latest/docs/react/examples/react/basic)
- [Guía de Migraciones](https://tanstack.com/query/latest/docs/react/guides/migrating-to-v5)

---

**¡React Query hace el manejo de estado servidor increíblemente simple!**


