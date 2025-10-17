import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useToast } from '@/hooks/use-toast'
import { queryKeys } from '@/lib/queryClient'
import {
  trabajadoresService,
  CreateTrabajadorDto,
  UpdateTrabajadorDto,
} from '../services/trabajadoresService'

/**
 * Hook para obtener lista de trabajadores con React Query
 * Incluye soporte para búsqueda con searchParams
 */
export function useTrabajadoresQuery() {
  const [searchParams] = useSearchParams()
  const searchQuery = searchParams.get('q') || ''

  return useQuery({
    queryKey: queryKeys.trabajadores.list(searchQuery),
    queryFn: async () => {
      if (searchQuery) {
        return trabajadoresService.search(searchQuery)
      }
      return trabajadoresService.getAll()
    },
  })
}

/**
 * Hook para obtener un trabajador por ID
 */
export function useTrabajadorQuery(id: string) {
  return useQuery({
    queryKey: queryKeys.trabajadores.detail(id),
    queryFn: () => trabajadoresService.getById(id),
    enabled: !!id,
  })
}

/**
 * Hook para crear trabajador con React Query
 */
export function useCreateTrabajadorMutation() {
  const { toast } = useToast()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateTrabajadorDto) => trabajadoresService.create(data),
    onSuccess: (data) => {
      // Invalidar lista de trabajadores para refrescarla
      queryClient.invalidateQueries({ queryKey: queryKeys.trabajadores.lists() })
      
      toast({
        title: 'Trabajador creado',
        description: `${data.nombres} ${data.apellidos} ha sido creado exitosamente.`,
      })
      
      navigate('/dashboard/trabajadores')
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'No se pudo crear el trabajador.',
        variant: 'destructive',
      })
    },
  })
}

/**
 * Hook para actualizar trabajador con React Query
 */
export function useUpdateTrabajadorMutation() {
  const { toast } = useToast()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateTrabajadorDto }) =>
      trabajadoresService.update(id, data),
    onSuccess: (data, variables) => {
      // Invalidar queries relacionadas
      queryClient.invalidateQueries({ queryKey: queryKeys.trabajadores.lists() })
      queryClient.invalidateQueries({ queryKey: queryKeys.trabajadores.detail(variables.id) })
      
      toast({
        title: 'Trabajador actualizado',
        description: `${data.nombres} ${data.apellidos} ha sido actualizado exitosamente.`,
      })
      
      navigate(`/dashboard/trabajadores/${variables.id}`)
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'No se pudo actualizar el trabajador.',
        variant: 'destructive',
      })
    },
  })
}

/**
 * Hook para eliminar trabajador con React Query
 */
export function useDeleteTrabajadorMutation() {
  const { toast } = useToast()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => trabajadoresService.delete(id),
    onSuccess: (_, id) => {
      // Invalidar lista de trabajadores
      queryClient.invalidateQueries({ queryKey: queryKeys.trabajadores.lists() })
      
      // Remover trabajador específico de la caché
      queryClient.removeQueries({ queryKey: queryKeys.trabajadores.detail(id) })
      
      toast({
        title: 'Trabajador eliminado',
        description: 'El trabajador ha sido eliminado exitosamente.',
      })
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'No se pudo eliminar el trabajador.',
        variant: 'destructive',
      })
    },
  })
}

/**
 * Hook para búsqueda de trabajadores
 * Usa searchParams para mantener el estado en la URL
 */
export function useTrabajadoresSearch() {
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

