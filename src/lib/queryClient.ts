import { QueryClient } from '@tanstack/react-query'

/**
 * Configuración global de React Query
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Tiempo que los datos permanecen frescos
      staleTime: 1000 * 60 * 5, // 5 minutos
      
      // Tiempo que los datos se mantienen en caché
      gcTime: 1000 * 60 * 10, // 10 minutos (antes cacheTime)
      
      // Reintentos en caso de error
      retry: 1,
      
      // Refetch automático cuando la ventana recupera el foco
      refetchOnWindowFocus: false,
      
      // Refetch automático al reconectar
      refetchOnReconnect: true,
    },
    mutations: {
      // Reintentos para mutations
      retry: 0,
    },
  },
})

/**
 * Query Keys - Mantener consistencia en las keys
 */
export const queryKeys = {
  // Auth
  auth: {
    user: ['auth', 'user'] as const,
    verify: ['auth', 'verify'] as const,
  },
  
  // Usuarios
  usuarios: {
    all: ['usuarios'] as const,
    lists: () => [...queryKeys.usuarios.all, 'list'] as const,
    list: (filters?: string) => [...queryKeys.usuarios.lists(), filters] as const,
    details: () => [...queryKeys.usuarios.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.usuarios.details(), id] as const,
    search: (query: string) => [...queryKeys.usuarios.all, 'search', query] as const,
  },
}


