import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { rolesService, type Rol, type CreateRolDTO, type UpdateRolDTO } from '../services/rolesService'
import { useToast } from '@/hooks/use-toast'

export const useRolesQuery = () => {
  return useQuery({
    queryKey: ['roles'],
    queryFn: rolesService.getRoles,
    retry: 1, // Solo reintentar 1 vez en caso de error
    staleTime: 30000, // Considerar datos válidos por 30 segundos
  })
}

export const useRolQuery = (id: number) => {
  return useQuery({
    queryKey: ['roles', id],
    queryFn: () => rolesService.getRol(id),
    enabled: !!id,
    retry: 1,
  })
}

export const useCreateRolMutation = () => {
  const queryClient = useQueryClient()
  const { toast } = useToast()

  return useMutation({
    mutationFn: (data: CreateRolDTO) => rolesService.createRol(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roles'] })
      toast({
        title: '✅ Rol creado',
        description: 'El rol se ha creado correctamente',
      })
    },
    onError: () => {
      toast({
        title: '❌ Error',
        description: 'No se pudo crear el rol',
        variant: 'destructive',
      })
    },
  })
}

export const useUpdateRolMutation = () => {
  const queryClient = useQueryClient()
  const { toast } = useToast()

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateRolDTO }) =>
      rolesService.updateRol(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roles'] })
      toast({
        title: '✅ Rol actualizado',
        description: 'El rol se ha actualizado correctamente',
      })
    },
    onError: () => {
      toast({
        title: '❌ Error',
        description: 'No se pudo actualizar el rol',
        variant: 'destructive',
      })
    },
  })
}

export const useDeleteRolMutation = () => {
  const queryClient = useQueryClient()
  const { toast } = useToast()

  return useMutation({
    mutationFn: (id: number) => rolesService.deleteRol(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roles'] })
      toast({
        title: '✅ Rol eliminado',
        description: 'El rol se ha eliminado correctamente',
      })
    },
    onError: () => {
      toast({
        title: '❌ Error',
        description: 'No se pudo eliminar el rol',
        variant: 'destructive',
      })
    },
  })
}

