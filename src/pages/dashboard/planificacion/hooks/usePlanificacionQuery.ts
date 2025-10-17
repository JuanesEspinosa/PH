import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { planificacionService } from '../services/planificacionService';
import {
  CreateActividadDto,
  UpdateActividadDto,
  FiltrosPlanificacion,
  ActualizarProgresoDto
} from '@/types/planificacion';
import { useToast } from '@/hooks/use-toast';

// Query Keys
export const planificacionKeys = {
  all: ['planificacion'] as const,
  list: (filtros?: FiltrosPlanificacion) => ['planificacion', 'list', filtros] as const,
  detail: (id: string) => ['planificacion', id] as const,
  estadisticas: ['planificacion', 'estadisticas'] as const,
  comparacion: (id: string) => ['planificacion', 'comparacion', id] as const,
};

// Hook para obtener actividades
export const useActividades = (filtros?: FiltrosPlanificacion) => {
  return useQuery({
    queryKey: planificacionKeys.list(filtros),
    queryFn: () => planificacionService.getAll(filtros),
  });
};

// Hook para obtener una actividad
export const useActividad = (id: string) => {
  return useQuery({
    queryKey: planificacionKeys.detail(id),
    queryFn: () => planificacionService.getById(id),
    enabled: !!id,
  });
};

// Hook para obtener actividades de un lote específico
export const useActividadesDelLote = (loteId: string) => {
  return useQuery({
    queryKey: ['planificacion', 'lote', loteId],
    queryFn: async () => {
      const todasActividades = await planificacionService.getAll();
      return todasActividades.filter(act => act.lote_id === loteId);
    },
    enabled: !!loteId,
  });
};

// Hook para obtener estadísticas
export const useEstadisticas = () => {
  return useQuery({
    queryKey: planificacionKeys.estadisticas,
    queryFn: planificacionService.getEstadisticas,
    refetchInterval: 30000, // Refrescar cada 30 segundos
  });
};

// Hook para crear actividad
export const useCreateActividad = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: (data: CreateActividadDto) => planificacionService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: planificacionKeys.all });
      toast({
        title: '✓ Actividad creada',
        description: 'La actividad se ha planificado correctamente',
      });
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'No se pudo crear la actividad',
        variant: 'destructive',
      });
    },
  });
};

// Hook para actualizar actividad
export const useUpdateActividad = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateActividadDto }) =>
      planificacionService.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: planificacionKeys.all });
      queryClient.invalidateQueries({ queryKey: planificacionKeys.detail(variables.id) });
      toast({
        title: '✓ Actividad actualizada',
        description: 'Los cambios se han guardado correctamente',
      });
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'No se pudo actualizar la actividad',
        variant: 'destructive',
      });
    },
  });
};

// Hook para actualizar progreso
export const useActualizarProgreso = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: ActualizarProgresoDto }) =>
      planificacionService.actualizarProgreso(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: planificacionKeys.all });
      queryClient.invalidateQueries({ queryKey: planificacionKeys.detail(variables.id) });
      queryClient.invalidateQueries({ queryKey: planificacionKeys.estadisticas });
      toast({
        title: '✓ Progreso actualizado',
        description: 'El progreso de la actividad se ha actualizado',
      });
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'No se pudo actualizar el progreso',
        variant: 'destructive',
      });
    },
  });
};

// Hook para eliminar actividad
export const useDeleteActividad = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: (id: string) => planificacionService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: planificacionKeys.all });
      toast({
        title: '✓ Actividad eliminada',
        description: 'La actividad se ha eliminado correctamente',
      });
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'No se pudo eliminar la actividad',
        variant: 'destructive',
      });
    },
  });
};

// Hook para obtener comparación planificado vs real
export const useComparacion = (id: string) => {
  return useQuery({
    queryKey: planificacionKeys.comparacion(id),
    queryFn: () => planificacionService.getComparacion(id),
    enabled: !!id,
  });
};

