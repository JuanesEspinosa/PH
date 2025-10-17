import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useToast } from '@/hooks/use-toast'
import { queryKeys } from '@/lib/queryClient'
import {
  tiposLaborService,
  CreateTipoLaborDto,
  UpdateTipoLaborDto,
} from '../services/tiposLaborService'

export function useTiposLaborQuery() {
  const [searchParams] = useSearchParams()
  const searchQuery = searchParams.get('q') || ''

  return useQuery({
    queryKey: queryKeys.tiposLabor.list(searchQuery),
    queryFn: async () => {
      if (searchQuery) {
        return tiposLaborService.search(searchQuery)
      }
      return tiposLaborService.getAll()
    },
  })
}

export function useTipoLaborQuery(id: string) {
  return useQuery({
    queryKey: queryKeys.tiposLabor.detail(id),
    queryFn: () => tiposLaborService.getById(id),
    enabled: !!id,
  })
}

export function useCreateTipoLaborMutation() {
  const { toast } = useToast()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateTipoLaborDto) => tiposLaborService.create(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.tiposLabor.lists() })
      
      toast({
        title: 'Tipo de labor creado',
        description: `${data.nombre} ha sido creado exitosamente.`,
      })
      
      navigate('/dashboard/tipos-labor')
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message || 'No se pudo crear el tipo de labor.',
        variant: 'destructive',
      })
    },
  })
}

export function useUpdateTipoLaborMutation() {
  const { toast } = useToast()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateTipoLaborDto }) =>
      tiposLaborService.update(id, data),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.tiposLabor.lists() })
      queryClient.invalidateQueries({ queryKey: queryKeys.tiposLabor.detail(variables.id) })
      
      toast({
        title: 'Tipo de labor actualizado',
        description: `${data.nombre} ha sido actualizado exitosamente.`,
      })
      
      navigate(`/dashboard/tipos-labor/${variables.id}`)
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message || 'No se pudo actualizar el tipo de labor.',
        variant: 'destructive',
      })
    },
  })
}

export function useDeleteTipoLaborMutation() {
  const { toast } = useToast()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => tiposLaborService.delete(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.tiposLabor.lists() })
      queryClient.removeQueries({ queryKey: queryKeys.tiposLabor.detail(id) })
      
      toast({
        title: 'Tipo de labor eliminado',
        description: 'El tipo de labor ha sido eliminado exitosamente.',
      })
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'No se pudo eliminar el tipo de labor.',
        variant: 'destructive',
      })
    },
  })
}

export function useTiposLaborSearch() {
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

