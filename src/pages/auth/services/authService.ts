import api from '@/lib/axios'
import { User } from '@/types'

// Tipos
export interface AuthUser extends User {
  // Usar el tipo User base del store
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  nombre: string
  email: string
  password: string
  confirmPassword: string
}

export interface ForgotPasswordData {
  email: string
}

export interface AuthResponse {
  user: AuthUser
  token: string
}

/**
 * Servicio de Autenticación
 * 
 * MOCK: Actualmente usa datos simulados
 * TODO: Reemplazar con llamadas reales a la API
 */
export const authService = {
  /**
   * Login - Iniciar sesión
   * POST /api/auth/login
   */
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const { data } = await api.post<{user: { id: number; nombre: string; email: string; rol: string; avatar?: string }, token: string}>('/auth/login', credentials)
    
    // Mapear respuesta del backend al formato del frontend
    return {
      user: {
        id: data.user.id.toString(),
        name: data.user.nombre,
        email: data.user.email,
        role: data.user.rol === 'admin' ? 'admin' : 'user',
        avatar: data.user.avatar,
      },
      token: data.token,
    }
  },

  /**
   * Register - Registrar nuevo usuario
   * POST /api/auth/register
   */
  register: async (registerData: RegisterData): Promise<AuthResponse> => {
    // Validación en frontend
    if (registerData.password !== registerData.confirmPassword) {
      throw new Error('Las contraseñas no coinciden')
    }

    const { data } = await api.post<{user: { id: number; nombre: string; email: string; rol: string; avatar?: string }, token: string}>('/auth/register', {
      nombre: registerData.nombre,
      email: registerData.email,
      password: registerData.password
    })
    
    // Mapear respuesta del backend al formato del frontend
    return {
      user: {
        id: data.user.id.toString(),
        name: data.user.nombre,
        email: data.user.email,
        role: data.user.rol === 'admin' ? 'admin' : 'user',
        avatar: data.user.avatar,
      },
      token: data.token,
    }
  },

  /**
   * Forgot Password - Recuperar contraseña
   * POST /api/auth/forgot-password
   */
  forgotPassword: async (forgotData: ForgotPasswordData): Promise<{ message: string }> => {
    const { data } = await api.post<{ message: string }>('/auth/forgot-password', forgotData)
    return data
  },

  /**
   * Verify Token - Verificar token JWT
   * GET /api/auth/verify
   */
  verifyToken: async (): Promise<AuthUser> => {
    const { data } = await api.get<{ id: number; nombre: string; email: string; rol: string; avatar?: string }>('/auth/verify')
    
    // Mapear respuesta del backend al formato del frontend
    return {
      id: data.id.toString(),
      name: data.nombre,
      email: data.email,
      role: data.rol === 'admin' ? 'admin' : 'user',
      avatar: data.avatar,
    }
  },

  /**
   * Logout - Cerrar sesión
   * POST /api/auth/logout
   */
  logout: async (): Promise<void> => {
    await api.post('/auth/logout')
  },
}
