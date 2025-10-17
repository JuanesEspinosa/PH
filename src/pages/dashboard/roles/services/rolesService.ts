import { rolesMock } from '@/data/rolesMockData'

export interface Rol {
  id: number
  nombre: string
  usuariosAsignados: number
  createdAt: string
  updatedAt: string
}

export interface CreateRolDTO {
  nombre: string
}

export interface UpdateRolDTO extends Partial<CreateRolDTO> {}

// Mock data storage (simula una base de datos en memoria)
let rolesData = [...rolesMock]

export const rolesService = {
  getRoles: async (): Promise<Rol[]> => {
    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 300))
    return rolesData
  },

  getRol: async (id: number): Promise<Rol> => {
    await new Promise(resolve => setTimeout(resolve, 200))
    const rol = rolesData.find(r => r.id === id)
    if (!rol) throw new Error('Rol no encontrado')
    return rol
  },

  createRol: async (data: CreateRolDTO): Promise<Rol> => {
    await new Promise(resolve => setTimeout(resolve, 300))
    const newRol: Rol = {
      id: Math.max(...rolesData.map(r => r.id), 0) + 1,
      ...data,
      usuariosAsignados: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    rolesData.push(newRol)
    return newRol
  },

  updateRol: async (id: number, data: UpdateRolDTO): Promise<Rol> => {
    await new Promise(resolve => setTimeout(resolve, 300))
    const index = rolesData.findIndex(r => r.id === id)
    if (index === -1) throw new Error('Rol no encontrado')
    
    rolesData[index] = {
      ...rolesData[index],
      ...data,
      updatedAt: new Date().toISOString()
    }
    return rolesData[index]
  },

  deleteRol: async (id: number): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 300))
    const index = rolesData.findIndex(r => r.id === id)
    if (index === -1) throw new Error('Rol no encontrado')
    rolesData.splice(index, 1)
  },
}

