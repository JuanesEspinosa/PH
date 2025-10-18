import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useToast } from '@/hooks/use-toast'
import { queryKeys } from '@/lib/queryClient'
import {
  laboresService,
  CreateLaborDto,
  UpdateLaborDto,
} from '../services/laboresService'
import { planificacionService } from '../../planificacion/services/planificacionService'

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
    mutationFn: async (data: CreateLaborDto) => {
      // Crear la labor
      const labor = await laboresService.create(data)
      
      // Si hay una actividad planificada asociada, actualizar su progreso
      if (data.actividad_planificada_id) {
        try {
          // Calcular el progreso basado en la cantidad recolectada vs metas
          // Por ahora, incrementamos el progreso en un 10% por labor registrada
          const actividad = await planificacionService.obtenerActividadPorId(data.actividad_planificada_id)
          const nuevoProgreso = Math.min(actividad.progreso_porcentaje + 10, 100)
          
          await planificacionService.actualizarProgreso(data.actividad_planificada_id, {
            progreso_porcentaje: nuevoProgreso,
            fecha_inicio_real: nuevoProgreso > 0 && !actividad.fecha_inicio_real ? new Date() : actividad.fecha_inicio_real,
            fecha_fin_real: nuevoProgreso === 100 ? new Date() : actividad.fecha_fin_real
          })
          
          // Invalidar queries de planificación
          queryClient.invalidateQueries({ queryKey: queryKeys.planificacion.lists() })
          queryClient.invalidateQueries({ queryKey: queryKeys.planificacion.detail(data.actividad_planificada_id) })
        } catch (error) {
          console.warn('No se pudo actualizar el progreso de la actividad:', error)
        }
      }
      
      return labor
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.labores.lists() })
      queryClient.invalidateQueries({ queryKey: ['estadisticasLabores'] })
      
      toast({
        title: 'Labor registrada',
        description: 'La labor ha sido registrada exitosamente.',
      })
      
      navigate('/dashboard/labores')
    },
    onError: (error: any) => {
      const errorMessage = error.message || 'No se pudo registrar la labor.'
      toast({
        title: 'Error',
        description: errorMessage,
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
    mutationFn: async ({ id, data }: { id: string; data: UpdateLaborDto }) => {
      // Actualizar la labor
      const labor = await laboresService.update(id, data)
      
      // Si hay una actividad planificada asociada, actualizar su progreso
      if (data.actividad_planificada_id) {
        try {
          // Obtener la actividad actual
          const actividad = await planificacionService.obtenerActividadPorId(data.actividad_planificada_id.toString())
          
          // Calcular el nuevo progreso basado en los cambios
          // Si se cambió la cantidad recolectada, ajustar el progreso
          let nuevoProgreso = actividad.progreso_porcentaje
          
          if (data.cantidad_recolectada !== undefined) {
            // Incrementar progreso en 5% por actualización de cantidad
            nuevoProgreso = Math.min(actividad.progreso_porcentaje + 5, 100)
          }
          
          // Actualizar el progreso de la actividad
          await planificacionService.actualizarProgreso(data.actividad_planificada_id.toString(), {
            progreso_porcentaje: nuevoProgreso,
            fecha_inicio_real: nuevoProgreso > 0 && !actividad.fecha_inicio_real ? new Date() : actividad.fecha_inicio_real,
            fecha_fin_real: nuevoProgreso === 100 ? new Date() : actividad.fecha_fin_real
          })
          
          // Invalidar queries de planificación
          queryClient.invalidateQueries({ queryKey: queryKeys.planificacion.lists() })
          queryClient.invalidateQueries({ queryKey: queryKeys.planificacion.detail(data.actividad_planificada_id.toString()) })
        } catch (error) {
          console.warn('No se pudo actualizar el progreso de la actividad:', error)
        }
      }
      
      return labor
    },
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
    onError: (error: any) => {
      const errorMessage = error.message || 'No se pudo actualizar la labor.'
      toast({
        title: 'Error',
        description: errorMessage,
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
    onError: (error: any) => {
      const errorMessage = error.message || 'No se pudo eliminar la labor.'
      toast({
        title: 'Error',
        description: errorMessage,
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

