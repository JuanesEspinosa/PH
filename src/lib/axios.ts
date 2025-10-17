import axios, { AxiosError } from 'axios'
import { queryClient } from './queryClient'

// Configuración base de Axios
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Interceptor de request - Agregar token a las peticiones
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Interceptor de response - Manejo de errores global
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    // Manejo de errores comunes
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // Token inválido o expirado
          localStorage.removeItem('token')
          localStorage.removeItem('user')
          
          // Limpiar queries de React Query
          queryClient.clear()
          
          // Redirigir al login
          if (window.location.pathname !== '/login') {
            window.location.href = '/login'
          }
          break
          
        case 403:
          console.error('No tienes permisos para realizar esta acción')
          break
          
        case 404:
          console.error('Recurso no encontrado')
          break
          
        case 500:
          console.error('Error del servidor')
          break
          
        default:
          console.error('Error en la petición:', error.response.data)
      }
    } else if (error.request) {
      console.error('No se recibió respuesta del servidor')
    } else {
      console.error('Error al configurar la petición:', error.message)
    }
    
    return Promise.reject(error)
  }
)

/**
 * Tipos de error personalizados
 */
export interface ApiError {
  message: string
  errors?: Record<string, string[]>
  statusCode?: number
}

/**
 * Helper para extraer mensaje de error
 */
export const getErrorMessage = (error: unknown): string => {
  if (error instanceof AxiosError) {
    return error.response?.data?.message || error.message || 'Error desconocido'
  }
  if (error instanceof Error) {
    return error.message
  }
  return 'Error desconocido'
}

export default api
