import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useToast } from '@/hooks/use-toast'
import {
  usuariosService,
  type CreateUsuarioDTO,
  type UpdateUsuarioDTO,
} from '../services/usuariosService'

export function useUsuariosQuery() {
  return useQuery({
    queryKey: ['usuarios'],
    queryFn: usuariosService.getUsuarios,
    retry: 1,
    staleTime: 30000,
  })
}

export function useUsuarioQuery(id: number) {
  return useQuery({
    queryKey: ['usuarios', id],
    queryFn: () => usuariosService.getUsuario(id),
    enabled: !!id,
    retry: 1,
  })
}

export function useEstadisticasQuery() {
  return useQuery({
    queryKey: ['usuarios', 'estadisticas'],
    queryFn: usuariosService.getEstadisticas,
    retry: 1,
    staleTime: 60000, // 1 minuto
  })
}

export function useCreateUsuarioMutation() {
  const { toast } = useToast()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateUsuarioDTO) => usuariosService.createUsuario(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['usuarios'] })
      queryClient.invalidateQueries({ queryKey: ['usuarios', 'estadisticas'] })
      
      toast({
        title: '✅ Usuario creado',
        description: `${data.nombre} ha sido creado exitosamente.`,
      })
      
      navigate('/dashboard/usuarios')
    },
    onError: (error: any) => {
      toast({
        title: '❌ Error',
        description: error?.response?.data?.message || 'No se pudo crear el usuario.',
        variant: 'destructive',
      })
    },
  })
}

export function useUpdateUsuarioMutation() {
  const { toast } = useToast()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateUsuarioDTO }) =>
      usuariosService.updateUsuario(id, data),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['usuarios'] })
      queryClient.invalidateQueries({ queryKey: ['usuarios', variables.id] })
      queryClient.invalidateQueries({ queryKey: ['usuarios', 'estadisticas'] })
      
      toast({
        title: '✅ Usuario actualizado',
        description: `${data.nombre} ha sido actualizado exitosamente.`,
      })
      
      navigate(`/dashboard/usuarios/${variables.id}`)
    },
    onError: (error: any) => {
      toast({
        title: '❌ Error',
        description: error?.response?.data?.message || 'No se pudo actualizar el usuario.',
        variant: 'destructive',
      })
    },
  })
}

export function useDeleteUsuarioMutation() {
  const { toast } = useToast()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => usuariosService.deleteUsuario(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['usuarios'] })
      queryClient.removeQueries({ queryKey: ['usuarios', id] })
      queryClient.invalidateQueries({ queryKey: ['usuarios', 'estadisticas'] })
      
      toast({
        title: '✅ Usuario eliminado',
        description: 'El usuario ha sido eliminado exitosamente.',
      })
    },
    onError: (error: any) => {
      toast({
        title: '❌ Error',
        description: error?.response?.data?.message || 'No se pudo eliminar el usuario.',
        variant: 'destructive',
      })
    },
  })
}
