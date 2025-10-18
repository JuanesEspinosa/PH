import api from '@/lib/axios'

export interface Usuario {
  id: number
  nombre: string
  email: string
  rol: string
  avatar?: string
  reset_token?: string
  reset_token_expiry?: string
  created_at: string
  updated_at: string
}

export interface CreateUsuarioDTO {
  nombre: string
  email: string
  password: string
  rol: string
}

export interface UpdateUsuarioDTO {
  nombre?: string
  email?: string
  password?: string
  rol?: string
}

export interface UsuariosEstadisticas {
  total: number
  activos: number
  inactivos: number
  administradores: number
  porRol: { [key: string]: number }
}

export const usuariosService = {
  getUsuarios: async (): Promise<Usuario[]> => {
    const { data } = await api.get('/usuarios')
    return data
  },

  getUsuario: async (id: number): Promise<Usuario> => {
    const { data } = await api.get(`/usuarios/${id}`)
    return data
  },

  createUsuario: async (usuarioData: CreateUsuarioDTO): Promise<Usuario> => {
    const { data } = await api.post('/usuarios', usuarioData)
    return data
  },

  updateUsuario: async (id: number, usuarioData: UpdateUsuarioDTO): Promise<Usuario> => {
    const { data } = await api.put(`/usuarios/${id}`, usuarioData)
    return data
  },

  deleteUsuario: async (id: number): Promise<void> => {
    await api.delete(`/usuarios/${id}`)
  },

  getEstadisticas: async (): Promise<UsuariosEstadisticas> => {
    const { data } = await api.get('/usuarios/estadisticas')
    return data
  }
}
