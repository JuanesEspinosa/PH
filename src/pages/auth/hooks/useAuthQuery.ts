import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/stores/authStore'
import { useToast } from '@/hooks/use-toast'
import { queryKeys } from '@/lib/queryClient'
import {
  authService,
  LoginCredentials,
  RegisterData,
  ForgotPasswordData,
} from '../services/authService'

/**
 * Hook para login con React Query
 */
export function useLoginMutation() {
  const { login: setAuthUser } = useAuthStore()
  const { toast } = useToast()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (credentials: LoginCredentials) => authService.login(credentials),
    onSuccess: (data) => {
      setAuthUser(data.user, data.token)
      
      // Setear datos del usuario en la caché
      queryClient.setQueryData(queryKeys.auth.user, data.user)
      
      toast({
        title: '¡Bienvenido!',
        description: 'Has iniciado sesión correctamente.',
      })
      
      navigate('/dashboard')
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Credenciales incorrectas. Inténtalo de nuevo.',
        variant: 'destructive',
      })
    },
  })
}

/**
 * Hook para registro con React Query
 */
export function useRegisterMutation() {
  const { login: setAuthUser } = useAuthStore()
  const { toast } = useToast()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: RegisterData) => {
      // Validaciones
      if (data.password !== data.confirmPassword) {
        throw new Error('Las contraseñas no coinciden')
      }
      if (data.password.length < 6) {
        throw new Error('La contraseña debe tener al menos 6 caracteres')
      }
      return authService.register(data)
    },
    onSuccess: (data) => {
      setAuthUser(data.user, data.token)
      queryClient.setQueryData(queryKeys.auth.user, data.user)
      
      toast({
        title: '¡Registro exitoso!',
        description: 'Tu cuenta ha sido creada correctamente.',
      })
      
      navigate('/dashboard')
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message || 'No se pudo completar el registro.',
        variant: 'destructive',
      })
    },
  })
}

/**
 * Hook para recuperación de contraseña con React Query
 */
export function useForgotPasswordMutation() {
  const { toast } = useToast()

  return useMutation({
    mutationFn: (data: ForgotPasswordData) => authService.forgotPassword(data),
    onSuccess: () => {
      toast({
        title: 'Email enviado',
        description: 'Revisa tu bandeja de entrada para restablecer tu contraseña.',
      })
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'No se pudo enviar el email. Inténtalo de nuevo.',
        variant: 'destructive',
      })
    },
  })
}

/**
 * Hook para verificar token (query)
 */
export function useVerifyToken() {
  return useQuery({
    queryKey: queryKeys.auth.verify,
    queryFn: () => authService.verifyToken(),
    enabled: !!localStorage.getItem('token'),
    retry: false,
  })
}

/**
 * Hook para logout con React Query
 */
export function useLogoutMutation() {
  const { logout: clearAuth } = useAuthStore()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      clearAuth()
      queryClient.clear() // Limpiar todas las queries
      navigate('/login')
    },
    onError: () => {
      // Aún así cerramos la sesión en el cliente
      clearAuth()
      queryClient.clear()
      navigate('/login')
    },
  })
}

