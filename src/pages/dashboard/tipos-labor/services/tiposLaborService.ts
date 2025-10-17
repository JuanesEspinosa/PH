// import api from '@/lib/axios'

export interface TipoLabor {
  id: string
  nombre: string
  descripcion?: string
  categoria: 'siembra' | 'cosecha' | 'riego' | 'fertilizacion' | 'control_plagas' | 'mantenimiento' | 'otro'
  fechaCreacion: string
  ultimaModificacion?: string
}

export interface CreateTipoLaborDto {
  nombre: string
  descripcion?: string
  categoria: 'siembra' | 'cosecha' | 'riego' | 'fertilizacion' | 'control_plagas' | 'mantenimiento' | 'otro'
}

export interface UpdateTipoLaborDto {
  nombre?: string
  descripcion?: string
  categoria?: 'siembra' | 'cosecha' | 'riego' | 'fertilizacion' | 'control_plagas' | 'mantenimiento' | 'otro'
}

const MOCK_TIPOS_LABOR: TipoLabor[] = [
  {
    id: '1',
    nombre: 'Preparación de Terreno',
    descripcion: 'Arado, nivelación y preparación del suelo para siembra',
    categoria: 'siembra',
    fechaCreacion: '2024-01-10',
    ultimaModificacion: '2024-10-17T10:30:00',
  },
  {
    id: '2',
    nombre: 'Siembra Directa',
    descripcion: 'Siembra de semillas sin labranza previa del suelo',
    categoria: 'siembra',
    fechaCreacion: '2024-01-15',
    ultimaModificacion: '2024-10-16T15:45:00',
  },
  {
    id: '3',
    nombre: 'Riego por Goteo',
    descripcion: 'Sistema de irrigación localizada de alta eficiencia',
    categoria: 'riego',
    fechaCreacion: '2024-02-01',
    ultimaModificacion: '2024-10-15T09:20:00',
  },
  {
    id: '4',
    nombre: 'Fertilización Foliar',
    descripcion: 'Aplicación de nutrientes directamente en las hojas',
    categoria: 'fertilizacion',
    fechaCreacion: '2024-02-10',
    ultimaModificacion: '2024-10-17T08:15:00',
  },
  {
    id: '5',
    nombre: 'Control Integrado de Plagas',
    descripcion: 'Manejo combinado de métodos biológicos y químicos',
    categoria: 'control_plagas',
    fechaCreacion: '2024-02-20',
    ultimaModificacion: '2024-09-20T14:30:00',
  },
  {
    id: '6',
    nombre: 'Cosecha Mecanizada',
    descripcion: 'Recolección de cultivos usando maquinaria especializada',
    categoria: 'cosecha',
    fechaCreacion: '2024-03-01',
    ultimaModificacion: '2024-10-17T11:00:00',
  },
  {
    id: '7',
    nombre: 'Poda de Formación',
    descripcion: 'Corte selectivo para dar forma y mejorar producción',
    categoria: 'mantenimiento',
    fechaCreacion: '2024-03-15',
  },
  {
    id: '8',
    nombre: 'Análisis de Suelo',
    descripcion: 'Evaluación de propiedades físicas, químicas y biológicas',
    categoria: 'otro',
    fechaCreacion: '2024-04-01',
  },
]

let mockDatabase = [...MOCK_TIPOS_LABOR]

export const tiposLaborService = {
  async getAll(): Promise<TipoLabor[]> {
    await new Promise((resolve) => setTimeout(resolve, 300))
    return [...mockDatabase]
  },

  async getById(id: string): Promise<TipoLabor> {
    await new Promise((resolve) => setTimeout(resolve, 200))
    
    const tipoLabor = mockDatabase.find((t) => t.id === id)
    if (!tipoLabor) {
      throw new Error('Tipo de labor no encontrado')
    }
    
    return { ...tipoLabor }
  },

  async create(data: CreateTipoLaborDto): Promise<TipoLabor> {
    await new Promise((resolve) => setTimeout(resolve, 400))
    
    const nombreExiste = mockDatabase.some(
      (t) => t.nombre.toLowerCase() === data.nombre.toLowerCase()
    )
    
    if (nombreExiste) {
      throw new Error('Ya existe un tipo de labor con ese nombre')
    }
    
    const nuevoTipoLabor: TipoLabor = {
      id: Date.now().toString(),
      nombre: data.nombre,
      descripcion: data.descripcion,
      categoria: data.categoria,
      fechaCreacion: new Date().toISOString().split('T')[0],
      ultimaModificacion: new Date().toISOString(),
    }
    
    mockDatabase.push(nuevoTipoLabor)
    return { ...nuevoTipoLabor }
  },

  async update(id: string, data: UpdateTipoLaborDto): Promise<TipoLabor> {
    await new Promise((resolve) => setTimeout(resolve, 400))
    
    const index = mockDatabase.findIndex((t) => t.id === id)
    if (index === -1) {
      throw new Error('Tipo de labor no encontrado')
    }
    
    if (data.nombre) {
      const nombreExiste = mockDatabase.some(
        (t) => t.id !== id && t.nombre.toLowerCase() === data.nombre!.toLowerCase()
      )
      
      if (nombreExiste) {
        throw new Error('Ya existe un tipo de labor con ese nombre')
      }
    }
    
    mockDatabase[index] = {
      ...mockDatabase[index],
      ...data,
      ultimaModificacion: new Date().toISOString(),
    }
    
    return { ...mockDatabase[index] }
  },

  async delete(id: string): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 300))
    
    const index = mockDatabase.findIndex((t) => t.id === id)
    if (index === -1) {
      throw new Error('Tipo de labor no encontrado')
    }
    
    mockDatabase = mockDatabase.filter((t) => t.id !== id)
  },

  async search(query: string): Promise<TipoLabor[]> {
    await new Promise((resolve) => setTimeout(resolve, 200))
    
    const lowerQuery = query.toLowerCase()
    const filtered = mockDatabase.filter(
      (t) =>
        t.nombre.toLowerCase().includes(lowerQuery) ||
        t.descripcion?.toLowerCase().includes(lowerQuery) ||
        t.categoria.toLowerCase().includes(lowerQuery)
    )
    
    return filtered
  },
}

