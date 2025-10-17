import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useToast } from '@/hooks/use-toast'
import { queryKeys } from '@/lib/queryClient'
import {
  usuariosService,
  CreateUsuarioDto,
  UpdateUsuarioDto,
} from '../services/usuariosService'

/**
 * Hook para obtener lista de usuarios con React Query
 * Incluye soporte para búsqueda con searchParams
 */
export function useUsuariosQuery() {
  const [searchParams] = useSearchParams()
  const searchQuery = searchParams.get('q') || ''

  return useQuery({
    queryKey: queryKeys.usuarios.list(searchQuery),
    queryFn: async () => {
      if (searchQuery) {
        return usuariosService.search(searchQuery)
      }
      return usuariosService.getAll()
    },
  })
}

/**
 * Hook para obtener un usuario por ID
 */
export function useUsuarioQuery(id: string) {
  return useQuery({
    queryKey: queryKeys.usuarios.detail(id),
    queryFn: () => usuariosService.getById(id),
    enabled: !!id,
  })
}

/**
 * Hook para crear usuario con React Query
 */
export function useCreateUsuarioMutation() {
  const { toast } = useToast()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateUsuarioDto) => usuariosService.create(data),
    onSuccess: (data) => {
      // Invalidar lista de usuarios para refrescarla
      queryClient.invalidateQueries({ queryKey: queryKeys.usuarios.lists() })
      
      toast({
        title: 'Usuario creado',
        description: `${data.nombre} ha sido creado exitosamente.`,
      })
      
      navigate('/dashboard/usuarios')
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'No se pudo crear el usuario.',
        variant: 'destructive',
      })
    },
  })
}

/**
 * Hook para actualizar usuario con React Query
 */
export function useUpdateUsuarioMutation() {
  const { toast } = useToast()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateUsuarioDto }) =>
      usuariosService.update(id, data),
    onSuccess: (data, variables) => {
      // Invalidar queries relacionadas
      queryClient.invalidateQueries({ queryKey: queryKeys.usuarios.lists() })
      queryClient.invalidateQueries({ queryKey: queryKeys.usuarios.detail(variables.id) })
      
      toast({
        title: 'Usuario actualizado',
        description: `${data.nombre} ha sido actualizado exitosamente.`,
      })
      
      navigate(`/dashboard/usuarios/${variables.id}`)
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'No se pudo actualizar el usuario.',
        variant: 'destructive',
      })
    },
  })
}

/**
 * Hook para eliminar usuario con React Query
 */
export function useDeleteUsuarioMutation() {
  const { toast } = useToast()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => usuariosService.delete(id),
    onSuccess: (_, id) => {
      // Invalidar lista de usuarios
      queryClient.invalidateQueries({ queryKey: queryKeys.usuarios.lists() })
      
      // Remover usuario específico de la caché
      queryClient.removeQueries({ queryKey: queryKeys.usuarios.detail(id) })
      
      toast({
        title: 'Usuario eliminado',
        description: 'El usuario ha sido eliminado exitosamente.',
      })
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'No se pudo eliminar el usuario.',
        variant: 'destructive',
      })
    },
  })
}

/**
 * Hook para búsqueda de usuarios
 * Usa searchParams para mantener el estado en la URL
 */
export function useUsuariosSearch() {
  const [searchParams, setSearchParams] = useSearchParams()

  const setSearch = (query: string) => {
    if (query) {
      searchParams.set('q', query)
    } else {
      searchParams.delete('q')
    }
    setSearchParams(searchParams)
  }

  const clearSearch = () => {
    searchParams.delete('q')
    setSearchParams(searchParams)
  }

  return {
    searchQuery: searchParams.get('q') || '',
    setSearch,
    clearSearch,
  }
}

