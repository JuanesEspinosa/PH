// Tipos de usuario
export interface User {
  id: string
  email: string
  name: string
  role: 'admin' | 'user'
  avatar?: string
  createdAt?: string
}

// Tipos de autenticación
export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export interface AuthResponse {
  user: User
  token: string
}

// Tipos de API
export interface ApiError {
  message: string
  errors?: Record<string, string[]>
}


