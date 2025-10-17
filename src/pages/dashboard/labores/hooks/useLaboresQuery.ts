import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useToast } from '@/hooks/use-toast'
import { queryKeys } from '@/lib/queryClient'
import {
  laboresService,
  CreateLaborDto,
  UpdateLaborDto,
} from '../services/laboresService'

export function useLaboresQuery() {
  const [searchParams] = useSearchParams()
  const searchQuery = searchParams.get('q') || ''

  return useQuery({
    queryKey: queryKeys.labores.list(searchQuery),
    queryFn: async () => {
      if (searchQuery) {
        return laboresService.search(searchQuery)
      }
      return laboresService.getAll()
    },
  })
}

export function useLaborQuery(id: string) {
  return useQuery({
    queryKey: queryKeys.labores.detail(id),
    queryFn: () => laboresService.getById(id),
    enabled: !!id,
  })
}

export function useEstadisticasLaboresQuery() {
  return useQuery({
    queryKey: ['estadisticasLabores'],
    queryFn: () => laboresService.getEstadisticas(),
  })
}

export function useCreateLaborMutation() {
  const { toast } = useToast()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateLaborDto) => laboresService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.labores.lists() })
      queryClient.invalidateQueries({ queryKey: ['estadisticasLabores'] })
      
      toast({
        title: 'Labor registrada',
        description: 'La labor ha sido registrada exitosamente.',
      })
      
      navigate('/dashboard/labores')
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message || 'No se pudo registrar la labor.',
        variant: 'destructive',
      })
    },
  })
}

export function useUpdateLaborMutation() {
  const { toast } = useToast()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateLaborDto }) =>
      laboresService.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.labores.lists() })
      queryClient.invalidateQueries({ queryKey: queryKeys.labores.detail(variables.id) })
      queryClient.invalidateQueries({ queryKey: ['estadisticasLabores'] })
      
      toast({
        title: 'Labor actualizada',
        description: 'La labor ha sido actualizada exitosamente.',
      })
      
      navigate(`/dashboard/labores/${variables.id}`)
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message || 'No se pudo actualizar la labor.',
        variant: 'destructive',
      })
    },
  })
}

export function useDeleteLaborMutation() {
  const { toast } = useToast()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => laboresService.delete(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.labores.lists() })
      queryClient.removeQueries({ queryKey: queryKeys.labores.detail(id) })
      queryClient.invalidateQueries({ queryKey: ['estadisticasLabores'] })
      
      toast({
        title: 'Labor eliminada',
        description: 'La labor ha sido eliminada exitosamente.',
      })
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'No se pudo eliminar la labor.',
        variant: 'destructive',
      })
    },
  })
}

export function useLaboresSearch() {
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

