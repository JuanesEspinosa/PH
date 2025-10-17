import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from '@/hooks/use-toast';
import {
  getLotes,
  getLoteById,
  createLote,
  updateLote,
  deleteLote,
  getLotesEstadisticas
} from '../services/lotesService';
import type { CreateLoteDto, UpdateLoteDto, LotesFiltros } from '@/types/lotes';

// ============================================================================
// QUERY KEYS
// ============================================================================

export const lotesKeys = {
  all: ['lotes'] as const,
  lists: () => [...lotesKeys.all, 'list'] as const,
  list: (filtros?: LotesFiltros) => [...lotesKeys.lists(), filtros] as const,
  details: () => [...lotesKeys.all, 'detail'] as const,
  detail: (id: string) => [...lotesKeys.details(), id] as const,
  estadisticas: () => [...lotesKeys.all, 'estadisticas'] as const,
};

// ============================================================================
// HOOKS DE QUERIES
// ============================================================================

/**
 * Hook para obtener lista de lotes con filtros
 */
export const useLotes = (filtros?: LotesFiltros) => {
  return useQuery({
    queryKey: lotesKeys.list(filtros),
    queryFn: () => getLotes(filtros),
    staleTime: 1000 * 60 * 5, // 5 minutos
  });
};

/**
 * Hook para obtener un lote específico por ID
 */
export const useLote = (id: string) => {
  return useQuery({
    queryKey: lotesKeys.detail(id),
    queryFn: () => getLoteById(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
};

/**
 * Hook para obtener estadísticas de lotes
 */
export const useLotesEstadisticas = () => {
  return useQuery({
    queryKey: lotesKeys.estadisticas(),
    queryFn: getLotesEstadisticas,
    staleTime: 1000 * 60 * 2, // 2 minutos
  });
};

// ============================================================================
// HOOKS DE MUTATIONS
// ============================================================================

/**
 * Hook para crear un nuevo lote
 */
export const useCreateLote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createLote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: lotesKeys.lists() });
      queryClient.invalidateQueries({ queryKey: lotesKeys.estadisticas() });
      
      toast({
        title: '✅ Lote creado',
        description: 'El lote ha sido registrado exitosamente.',
      });
    },
    onError: (error: Error) => {
      toast({
        title: '❌ Error al crear lote',
        description: error.message || 'No se pudo crear el lote. Intenta nuevamente.',
        variant: 'destructive',
      });
    },
  });
};

/**
 * Hook para actualizar un lote existente
 */
export const useUpdateLote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateLote,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: lotesKeys.lists() });
      queryClient.invalidateQueries({ queryKey: lotesKeys.detail(data.id) });
      queryClient.invalidateQueries({ queryKey: lotesKeys.estadisticas() });
      
      toast({
        title: '✅ Lote actualizado',
        description: 'Los cambios han sido guardados exitosamente.',
      });
    },
    onError: (error: Error) => {
      toast({
        title: '❌ Error al actualizar lote',
        description: error.message || 'No se pudo actualizar el lote. Intenta nuevamente.',
        variant: 'destructive',
      });
    },
  });
};

/**
 * Hook para eliminar un lote
 */
export const useDeleteLote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteLote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: lotesKeys.lists() });
      queryClient.invalidateQueries({ queryKey: lotesKeys.estadisticas() });
      
      toast({
        title: '✅ Lote eliminado',
        description: 'El lote ha sido eliminado correctamente.',
      });
    },
    onError: (error: Error) => {
      toast({
        title: '❌ Error al eliminar lote',
        description: error.message || 'No se pudo eliminar el lote. Intenta nuevamente.',
        variant: 'destructive',
      });
    },
  });
};

/**
 * Hook para actualizar el estado de un lote rápidamente
 */
export const useUpdateEstadoLote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, estado }: { id: string; estado: any }) => 
      updateLote({ id, estado }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: lotesKeys.lists() });
      queryClient.invalidateQueries({ queryKey: lotesKeys.estadisticas() });
      
      toast({
        title: '✅ Estado actualizado',
        description: 'El estado del lote ha sido cambiado.',
      });
    },
    onError: (error: Error) => {
      toast({
        title: '❌ Error',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
};

