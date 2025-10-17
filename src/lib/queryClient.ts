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
  
  // Trabajadores
  trabajadores: {
    all: ['trabajadores'] as const,
    lists: () => [...queryKeys.trabajadores.all, 'list'] as const,
    list: (filters?: string) => [...queryKeys.trabajadores.lists(), filters] as const,
    details: () => [...queryKeys.trabajadores.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.trabajadores.details(), id] as const,
    search: (query: string) => [...queryKeys.trabajadores.all, 'search', query] as const,
  },
  
  // Tipos de Labor
  tiposLabor: {
    all: ['tiposLabor'] as const,
    lists: () => [...queryKeys.tiposLabor.all, 'list'] as const,
    list: (filters?: string) => [...queryKeys.tiposLabor.lists(), filters] as const,
    details: () => [...queryKeys.tiposLabor.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.tiposLabor.details(), id] as const,
    search: (query: string) => [...queryKeys.tiposLabor.all, 'search', query] as const,
  },
  
  // Labores Agrícolas
  labores: {
    all: ['labores'] as const,
    lists: () => [...queryKeys.labores.all, 'list'] as const,
    list: (filters?: string) => [...queryKeys.labores.lists(), filters] as const,
    details: () => [...queryKeys.labores.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.labores.details(), id] as const,
    search: (query: string) => [...queryKeys.labores.all, 'search', query] as const,
  },
}


