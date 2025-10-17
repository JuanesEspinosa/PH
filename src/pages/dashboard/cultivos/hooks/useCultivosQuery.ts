import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { cultivosService } from '../services/cultivosService';
import { CreateCultivoDto, UpdateCultivoDto } from '@/types/cultivos';
import { useToast } from '@/hooks/use-toast';

// ============================================================================
// HOOKS DE REACT QUERY PARA CULTIVOS
// ============================================================================

// Query Keys
export const cultivosKeys = {
  all: ['cultivos'] as const,
  activos: ['cultivos', 'activos'] as const,
  detail: (id: string) => ['cultivos', id] as const,
};

// Hook para obtener todos los cultivos
export const useCultivos = () => {
  return useQuery({
    queryKey: cultivosKeys.all,
    queryFn: cultivosService.getAll,
  });
};

// Hook para obtener solo cultivos activos
export const useCultivosActivos = () => {
  return useQuery({
    queryKey: cultivosKeys.activos,
    queryFn: cultivosService.getActivos,
  });
};

// Hook para obtener un cultivo por ID
export const useCultivo = (id: string) => {
  return useQuery({
    queryKey: cultivosKeys.detail(id),
    queryFn: () => cultivosService.getById(id),
    enabled: !!id,
  });
};

// Hook para crear cultivo
export const useCreateCultivo = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: (data: CreateCultivoDto) => cultivosService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cultivosKeys.all });
      queryClient.invalidateQueries({ queryKey: cultivosKeys.activos });
      toast({
        title: '✓ Cultivo creado',
        description: 'El cultivo se ha registrado correctamente',
      });
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'No se pudo crear el cultivo',
        variant: 'destructive',
      });
    },
  });
};

// Hook para actualizar cultivo
export const useUpdateCultivo = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateCultivoDto }) =>
      cultivosService.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: cultivosKeys.all });
      queryClient.invalidateQueries({ queryKey: cultivosKeys.activos });
      queryClient.invalidateQueries({ queryKey: cultivosKeys.detail(variables.id) });
      toast({
        title: '✓ Cultivo actualizado',
        description: 'Los cambios se han guardado correctamente',
      });
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'No se pudo actualizar el cultivo',
        variant: 'destructive',
      });
    },
  });
};

// Hook para eliminar cultivo
export const useDeleteCultivo = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: (id: string) => cultivosService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cultivosKeys.all });
      queryClient.invalidateQueries({ queryKey: cultivosKeys.activos });
      toast({
        title: '✓ Cultivo eliminado',
        description: 'El cultivo se ha marcado como inactivo',
      });
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'No se pudo eliminar el cultivo',
        variant: 'destructive',
      });
    },
  });
};

