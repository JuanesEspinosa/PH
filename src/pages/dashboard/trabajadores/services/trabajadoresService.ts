// import api from '@/lib/axios' // Comentado por ahora (mock)

export interface Trabajador {
  id: string
  nombres: string
  apellidos: string
  documento: string
  tipoDocumento: 'DNI' | 'Pasaporte' | 'Cédula' | 'Otro'
  telefono: string
  email: string
  cargo: string
  fechaIngreso: string // Formato YYYY-MM-DD
  estado: 'activo' | 'inactivo' | 'vacaciones' | 'licencia'
  direccion: string
  fechaCreacion: string
  ultimaModificacion?: string
}

export interface CreateTrabajadorDto {
  nombres: string
  apellidos: string
  documento: string
  tipoDocumento: 'DNI' | 'Pasaporte' | 'Cédula' | 'Otro'
  telefono: string
  email: string
  cargo: string
  fechaIngreso: string
  direccion: string
}

export interface UpdateTrabajadorDto {
  nombres?: string
  apellidos?: string
  documento?: string
  tipoDocumento?: 'DNI' | 'Pasaporte' | 'Cédula' | 'Otro'
  telefono?: string
  email?: string
  cargo?: string
  fechaIngreso?: string
  estado?: 'activo' | 'inactivo' | 'vacaciones' | 'licencia'
  direccion?: string
}

// Datos de ejemplo (simulación de API)
const MOCK_TRABAJADORES: Trabajador[] = [
  {
    id: '1',
    nombres: 'Juan Carlos',
    apellidos: 'Pérez González',
    documento: '12345678A',
    tipoDocumento: 'DNI',
    telefono: '+34 600 123 456',
    email: 'juan.perez@empresa.com',
    cargo: 'Desarrollador Senior',
    fechaIngreso: '2022-01-15',
    estado: 'activo',
    direccion: 'Calle Mayor 123, 28013 Madrid, España',
    fechaCreacion: '2022-01-15',
    ultimaModificacion: '2024-10-17T10:30:00',
  },
  {
    id: '2',
    nombres: 'María Isabel',
    apellidos: 'García Martínez',
    documento: '87654321B',
    tipoDocumento: 'DNI',
    telefono: '+34 600 234 567',
    email: 'maria.garcia@empresa.com',
    cargo: 'Diseñadora UX/UI',
    fechaIngreso: '2022-03-20',
    estado: 'activo',
    direccion: 'Avenida de la Constitución 45, 41001 Sevilla, España',
    fechaCreacion: '2022-03-20',
    ultimaModificacion: '2024-10-16T15:45:00',
  },
  {
    id: '3',
    nombres: 'Carlos Alberto',
    apellidos: 'López Rodríguez',
    documento: 'AB123456',
    tipoDocumento: 'Pasaporte',
    telefono: '+34 600 345 678',
    email: 'carlos.lopez@empresa.com',
    cargo: 'Gerente de Proyectos',
    fechaIngreso: '2021-06-10',
    estado: 'vacaciones',
    direccion: 'Plaza de España 10, 08014 Barcelona, España',
    fechaCreacion: '2021-06-10',
    ultimaModificacion: '2024-10-15T09:20:00',
  },
  {
    id: '4',
    nombres: 'Ana Sofía',
    apellidos: 'Martínez Fernández',
    documento: '11223344C',
    tipoDocumento: 'DNI',
    telefono: '+34 600 456 789',
    email: 'ana.martinez@empresa.com',
    cargo: 'Analista de Recursos Humanos',
    fechaIngreso: '2023-02-05',
    estado: 'activo',
    direccion: 'Calle de Alcalá 200, 28028 Madrid, España',
    fechaCreacion: '2023-02-05',
    ultimaModificacion: '2024-10-17T08:15:00',
  },
  {
    id: '5',
    nombres: 'Pedro José',
    apellidos: 'Sánchez Gómez',
    documento: '55667788D',
    tipoDocumento: 'DNI',
    telefono: '+34 600 567 890',
    email: 'pedro.sanchez@empresa.com',
    cargo: 'Contador Financiero',
    fechaIngreso: '2020-09-12',
    estado: 'inactivo',
    direccion: 'Gran Vía 88, 48011 Bilbao, España',
    fechaCreacion: '2020-09-12',
    ultimaModificacion: '2024-09-20T14:30:00',
  },
  {
    id: '6',
    nombres: 'Laura Patricia',
    apellidos: 'Ruiz Jiménez',
    documento: 'CD789012',
    tipoDocumento: 'Pasaporte',
    telefono: '+34 600 678 901',
    email: 'laura.ruiz@empresa.com',
    cargo: 'Desarrolladora Frontend',
    fechaIngreso: '2023-07-18',
    estado: 'activo',
    direccion: 'Rambla de Catalunya 77, 08007 Barcelona, España',
    fechaCreacion: '2023-07-18',
    ultimaModificacion: '2024-10-17T11:00:00',
  },
]

let mockDatabase = [...MOCK_TRABAJADORES]

export const trabajadoresService = {
  // Obtener todos los trabajadores
  async getAll(): Promise<Trabajador[]> {
    // Simular delay de red
    await new Promise((resolve) => setTimeout(resolve, 500))
    
    // En producción: return (await api.get<Trabajador[]>('/trabajadores')).data
    return [...mockDatabase]
  },

  // Obtener un trabajador por ID
  async getById(id: string): Promise<Trabajador> {
    await new Promise((resolve) => setTimeout(resolve, 300))
    
    const trabajador = mockDatabase.find((t) => t.id === id)
    if (!trabajador) {
      throw new Error('Trabajador no encontrado')
    }
    
    // En producción: return (await api.get<Trabajador>(`/trabajadores/${id}`)).data
    return { ...trabajador }
  },

  // Crear un nuevo trabajador
  async create(data: CreateTrabajadorDto): Promise<Trabajador> {
    await new Promise((resolve) => setTimeout(resolve, 500))
    
    const nuevoTrabajador: Trabajador = {
      id: Date.now().toString(),
      nombres: data.nombres,
      apellidos: data.apellidos,
      documento: data.documento,
      tipoDocumento: data.tipoDocumento,
      telefono: data.telefono,
      email: data.email,
      cargo: data.cargo,
      fechaIngreso: data.fechaIngreso,
      direccion: data.direccion,
      estado: 'activo',
      fechaCreacion: new Date().toISOString().split('T')[0],
      ultimaModificacion: new Date().toISOString(),
    }
    
    mockDatabase.push(nuevoTrabajador)
    
    // En producción: return (await api.post<Trabajador>('/trabajadores', data)).data
    return { ...nuevoTrabajador }
  },

  // Actualizar un trabajador
  async update(id: string, data: UpdateTrabajadorDto): Promise<Trabajador> {
    await new Promise((resolve) => setTimeout(resolve, 500))
    
    const index = mockDatabase.findIndex((t) => t.id === id)
    if (index === -1) {
      throw new Error('Trabajador no encontrado')
    }
    
    mockDatabase[index] = {
      ...mockDatabase[index],
      ...data,
      ultimaModificacion: new Date().toISOString(),
    }
    
    // En producción: return (await api.put<Trabajador>(`/trabajadores/${id}`, data)).data
    return { ...mockDatabase[index] }
  },

  // Eliminar un trabajador
  async delete(id: string): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 500))
    
    const index = mockDatabase.findIndex((t) => t.id === id)
    if (index === -1) {
      throw new Error('Trabajador no encontrado')
    }
    
    mockDatabase = mockDatabase.filter((t) => t.id !== id)
    
    // En producción: await api.delete(`/trabajadores/${id}`)
  },

  // Buscar trabajadores
  async search(query: string): Promise<Trabajador[]> {
    await new Promise((resolve) => setTimeout(resolve, 300))
    
    const lowerQuery = query.toLowerCase()
    const filtered = mockDatabase.filter(
      (t) =>
        t.nombres.toLowerCase().includes(lowerQuery) ||
        t.apellidos.toLowerCase().includes(lowerQuery) ||
        t.email.toLowerCase().includes(lowerQuery) ||
        t.documento.toLowerCase().includes(lowerQuery) ||
        t.cargo.toLowerCase().includes(lowerQuery)
    )
    
    // En producción: return (await api.get<Trabajador[]>(`/trabajadores/search?q=${query}`)).data
    return filtered
  },
}

