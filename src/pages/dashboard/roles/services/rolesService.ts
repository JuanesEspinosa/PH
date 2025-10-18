import api from '@/lib/axios'

export interface Rol {
  id: number
  nombre: string
  created_at: string
  updated_at: string
}

export interface CreateRolDTO {
  nombre: string
}

export interface UpdateRolDTO extends Partial<CreateRolDTO> {}

export const rolesService = {
  getRoles: async (): Promise<Rol[]> => {
    const { data } = await api.get('/roles')
    return data
  },

  getRol: async (id: number): Promise<Rol> => {
    const { data } = await api.get(`/roles/${id}`)
    return data
  },

  createRol: async (rolData: CreateRolDTO): Promise<Rol> => {
    const { data } = await api.post('/roles', rolData)
    return data
  },

  updateRol: async (id: number, rolData: UpdateRolDTO): Promise<Rol> => {
    const { data } = await api.put(`/roles/${id}`, rolData)
    return data
  },

  deleteRol: async (id: number): Promise<void> => {
    await api.delete(`/roles/${id}`)
  },
}

