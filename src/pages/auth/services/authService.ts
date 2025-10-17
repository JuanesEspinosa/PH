// import api from '@/lib/axios' // Comentado por ahora (mock)
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
    // TODO: Reemplazar con API real
    // const { data } = await api.post('/auth/login', credentials)
    // return data

    // MOCK: Simulación
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Validación mock
        if (credentials.password === '123456') {
          const mockUser: AuthUser = {
            id: '1',
            name: 'Usuario Demo',
            email: credentials.email,
            role: credentials.email.includes('admin') ? 'admin' : 'user',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=demo',
          }

          const mockToken = 'mock-jwt-token-' + Date.now()

          resolve({
            user: mockUser,
            token: mockToken,
          })
        } else {
          reject(new Error('Credenciales incorrectas'))
        }
      }, 1000)
    })
  },

  /**
   * Register - Registrar nuevo usuario
   * POST /api/auth/register
   */
  register: async (data: RegisterData): Promise<AuthResponse> => {
    // TODO: Reemplazar con API real
    // const { data: response } = await api.post('/auth/register', data)
    // return response

    // MOCK: Simulación
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Validaciones mock
        if (data.password !== data.confirmPassword) {
          reject(new Error('Las contraseñas no coinciden'))
          return
        }

        if (data.password.length < 6) {
          reject(new Error('La contraseña debe tener al menos 6 caracteres'))
          return
        }

        const mockUser: AuthUser = {
          id: '2',
          name: data.nombre,
          email: data.email,
          role: 'user',
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.email}`,
        }

        const mockToken = 'mock-jwt-token-' + Date.now()

        resolve({
          user: mockUser,
          token: mockToken,
        })
      }, 1500)
    })
  },

  /**
   * Forgot Password - Recuperar contraseña
   * POST /api/auth/forgot-password
   */
  forgotPassword: async (_data: ForgotPasswordData): Promise<{ message: string }> => {
    // TODO: Reemplazar con API real
    // const { data: response } = await api.post('/auth/forgot-password', data)
    // return response

    // MOCK: Simulación
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ message: 'Email enviado' })
      }, 1000)
    })
  },

  /**
   * Verify Token - Verificar token JWT
   * GET /api/auth/verify
   */
  verifyToken: async (): Promise<AuthUser> => {
    // TODO: Reemplazar con API real
    // const { data } = await api.get('/auth/verify')
    // return data

    // MOCK: Simulación
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ 
          id: '1', 
          name: 'Usuario', 
          email: 'user@example.com', 
          role: 'user' as const 
        })
      }, 500)
    })
  },

  /**
   * Logout - Cerrar sesión
   * POST /api/auth/logout
   */
  logout: async (): Promise<void> => {
    // TODO: Reemplazar con API real
    // await api.post('/auth/logout')

    // MOCK: No hace nada en el backend
    return Promise.resolve()
  },
}
