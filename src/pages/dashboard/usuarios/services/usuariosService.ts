// import api from '@/lib/axios' // Comentado por ahora (mock)

export interface Usuario {
  id: string
  nombre: string
  email: string
  rol: 'admin' | 'usuario'
  telefono?: string
  departamento?: string
  estado: 'activo' | 'inactivo'
  fechaCreacion: string
  ultimoAcceso?: string
}

export interface CreateUsuarioDto {
  nombre: string
  email: string
  password: string
  rol: 'admin' | 'usuario'
  telefono?: string
  departamento?: string
}

export interface UpdateUsuarioDto {
  nombre?: string
  email?: string
  rol?: 'admin' | 'usuario'
  telefono?: string
  departamento?: string
  estado?: 'activo' | 'inactivo'
}

// Datos de ejemplo (simulación de API)
const MOCK_USUARIOS: Usuario[] = [
  {
    id: '1',
    nombre: 'Juan Pérez',
    email: 'juan@example.com',
    rol: 'admin',
    telefono: '+34 600 123 456',
    departamento: 'Tecnología',
    estado: 'activo',
    fechaCreacion: '2024-01-15',
    ultimoAcceso: '2024-10-17T10:30:00',
  },
  {
    id: '2',
    nombre: 'María García',
    email: 'maria@example.com',
    rol: 'usuario',
    telefono: '+34 600 234 567',
    departamento: 'Marketing',
    estado: 'activo',
    fechaCreacion: '2024-02-20',
    ultimoAcceso: '2024-10-16T15:45:00',
  },
  {
    id: '3',
    nombre: 'Carlos López',
    email: 'carlos@example.com',
    rol: 'usuario',
    telefono: '+34 600 345 678',
    departamento: 'Ventas',
    estado: 'activo',
    fechaCreacion: '2024-03-10',
    ultimoAcceso: '2024-10-15T09:20:00',
  },
  {
    id: '4',
    nombre: 'Ana Martínez',
    email: 'ana@example.com',
    rol: 'admin',
    telefono: '+34 600 456 789',
    departamento: 'Recursos Humanos',
    estado: 'activo',
    fechaCreacion: '2024-04-05',
    ultimoAcceso: '2024-10-17T08:15:00',
  },
  {
    id: '5',
    nombre: 'Pedro Sánchez',
    email: 'pedro@example.com',
    rol: 'usuario',
    telefono: '+34 600 567 890',
    departamento: 'Finanzas',
    estado: 'inactivo',
    fechaCreacion: '2024-05-12',
    ultimoAcceso: '2024-09-20T14:30:00',
  },
]

let mockDatabase = [...MOCK_USUARIOS]

export const usuariosService = {
  // Obtener todos los usuarios
  async getAll(): Promise<Usuario[]> {
    // Simular delay de red
    await new Promise((resolve) => setTimeout(resolve, 500))
    
    // En producción: return (await api.get<Usuario[]>('/usuarios')).data
    return [...mockDatabase]
  },

  // Obtener un usuario por ID
  async getById(id: string): Promise<Usuario> {
    await new Promise((resolve) => setTimeout(resolve, 300))
    
    const usuario = mockDatabase.find((u) => u.id === id)
    if (!usuario) {
      throw new Error('Usuario no encontrado')
    }
    
    // En producción: return (await api.get<Usuario>(`/usuarios/${id}`)).data
    return { ...usuario }
  },

  // Crear un nuevo usuario
  async create(data: CreateUsuarioDto): Promise<Usuario> {
    await new Promise((resolve) => setTimeout(resolve, 500))
    
    const nuevoUsuario: Usuario = {
      id: Date.now().toString(),
      nombre: data.nombre,
      email: data.email,
      rol: data.rol,
      telefono: data.telefono,
      departamento: data.departamento,
      estado: 'activo',
      fechaCreacion: new Date().toISOString().split('T')[0],
      ultimoAcceso: new Date().toISOString(),
    }
    
    mockDatabase.push(nuevoUsuario)
    
    // En producción: return (await api.post<Usuario>('/usuarios', data)).data
    return { ...nuevoUsuario }
  },

  // Actualizar un usuario
  async update(id: string, data: UpdateUsuarioDto): Promise<Usuario> {
    await new Promise((resolve) => setTimeout(resolve, 500))
    
    const index = mockDatabase.findIndex((u) => u.id === id)
    if (index === -1) {
      throw new Error('Usuario no encontrado')
    }
    
    mockDatabase[index] = {
      ...mockDatabase[index],
      ...data,
    }
    
    // En producción: return (await api.put<Usuario>(`/usuarios/${id}`, data)).data
    return { ...mockDatabase[index] }
  },

  // Eliminar un usuario
  async delete(id: string): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 500))
    
    const index = mockDatabase.findIndex((u) => u.id === id)
    if (index === -1) {
      throw new Error('Usuario no encontrado')
    }
    
    mockDatabase = mockDatabase.filter((u) => u.id !== id)
    
    // En producción: await api.delete(`/usuarios/${id}`)
  },

  // Buscar usuarios
  async search(query: string): Promise<Usuario[]> {
    await new Promise((resolve) => setTimeout(resolve, 300))
    
    const lowerQuery = query.toLowerCase()
    const filtered = mockDatabase.filter(
      (u) =>
        u.nombre.toLowerCase().includes(lowerQuery) ||
        u.email.toLowerCase().includes(lowerQuery) ||
        u.departamento?.toLowerCase().includes(lowerQuery)
    )
    
    // En producción: return (await api.get<Usuario[]>(`/usuarios/search?q=${query}`)).data
    return filtered
  },
}

