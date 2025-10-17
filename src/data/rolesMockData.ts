import type { Rol } from '@/pages/dashboard/roles/services/rolesService'

export const rolesMock: Rol[] = [
  {
    id: 1,
    nombre: 'Administrador',
    usuariosAsignados: 3,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-10-01T15:30:00Z'
  },
  {
    id: 2,
    nombre: 'Supervisor Agrícola',
    usuariosAsignados: 8,
    createdAt: '2024-02-20T09:00:00Z',
    updatedAt: '2024-09-15T11:20:00Z'
  },
  {
    id: 3,
    nombre: 'Operador de Campo',
    usuariosAsignados: 15,
    createdAt: '2024-03-10T08:00:00Z',
    updatedAt: '2024-10-10T14:00:00Z'
  },
  {
    id: 4,
    nombre: 'Analista de Datos',
    usuariosAsignados: 5,
    createdAt: '2024-04-05T10:30:00Z',
    updatedAt: '2024-09-20T16:45:00Z'
  },
  {
    id: 5,
    nombre: 'Gestor de Personal',
    usuariosAsignados: 2,
    createdAt: '2024-05-12T11:00:00Z',
    updatedAt: '2024-10-05T09:30:00Z'
  }
]

