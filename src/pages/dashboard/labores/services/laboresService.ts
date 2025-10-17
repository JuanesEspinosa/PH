export interface Labor {
  id: string
  fecha: string
  cultivo: string
  lote: string
  trabajadorId: string
  trabajadorNombre: string
  tipoLaborId: string
  tipoLaborNombre: string
  cantidadRecolectada: number
  unidadMedida: 'kg' | 'litros' | 'unidades' | 'toneladas' | 'quintales'
  pesoTotal: number
  horaInicio: string
  horaFin: string
  ubicacionGPS: {
    latitud: number
    longitud: number
  }
  condicionesClimaticas?: {
    temperatura?: number
    humedad?: number
    lluvia?: boolean
  }
  herramientasInsumos?: string[]
  observaciones?: string
  fotos?: string[]
  duracionMinutos?: number
  rendimientoPorHora?: number
  costoEstimado?: number
  estado: 'en_proceso' | 'completada' | 'pausada' | 'cancelada'
  fechaCreacion: string
  ultimaModificacion?: string
  supervisorId?: string
}

export interface CreateLaborDto {
  fecha: string
  cultivo: string
  lote: string
  trabajadorId: string
  tipoLaborId: string
  cantidadRecolectada: number
  unidadMedida: 'kg' | 'litros' | 'unidades' | 'toneladas' | 'quintales'
  pesoTotal: number
  horaInicio: string
  horaFin: string
  ubicacionGPS: {
    latitud: number
    longitud: number
  }
  condicionesClimaticas?: {
    temperatura?: number
    humedad?: number
    lluvia?: boolean
  }
  herramientasInsumos?: string[]
  observaciones?: string
  fotos?: string[]
}

export interface UpdateLaborDto {
  fecha?: string
  cultivo?: string
  lote?: string
  trabajadorId?: string
  tipoLaborId?: string
  cantidadRecolectada?: number
  unidadMedida?: 'kg' | 'litros' | 'unidades' | 'toneladas' | 'quintales'
  pesoTotal?: number
  horaInicio?: string
  horaFin?: string
  ubicacionGPS?: {
    latitud: number
    longitud: number
  }
  condicionesClimaticas?: {
    temperatura?: number
    humedad?: number
    lluvia?: boolean
  }
  herramientasInsumos?: string[]
  observaciones?: string
  estado?: 'en_proceso' | 'completada' | 'pausada' | 'cancelada'
}

const MOCK_LABORES: Labor[] = [
  {
    id: '1',
    fecha: '2024-10-15',
    cultivo: 'Maíz',
    lote: 'Lote A-1',
    trabajadorId: '1',
    trabajadorNombre: 'Juan Carlos Pérez González',
    tipoLaborId: '2',
    tipoLaborNombre: 'Siembra Directa',
    cantidadRecolectada: 150,
    unidadMedida: 'kg',
    pesoTotal: 150,
    horaInicio: '08:00',
    horaFin: '14:00',
    ubicacionGPS: {
      latitud: -12.0464,
      longitud: -77.0428,
    },
    condicionesClimaticas: {
      temperatura: 24,
      humedad: 65,
      lluvia: false,
    },
    herramientasInsumos: ['Sembradora mecánica', 'Semillas certificadas', 'Fertilizante NPK'],
    observaciones: 'Siembra realizada en condiciones óptimas. Suelo bien preparado.',
    duracionMinutos: 360,
    rendimientoPorHora: 25,
    costoEstimado: 180,
    estado: 'completada',
    fechaCreacion: '2024-10-15',
    ultimaModificacion: '2024-10-15T14:30:00',
  },
  {
    id: '2',
    fecha: '2024-10-16',
    cultivo: 'Café',
    lote: 'Lote B-3',
    trabajadorId: '2',
    trabajadorNombre: 'María Isabel García Martínez',
    tipoLaborId: '6',
    tipoLaborNombre: 'Cosecha Mecanizada',
    cantidadRecolectada: 320,
    unidadMedida: 'kg',
    pesoTotal: 320,
    horaInicio: '06:00',
    horaFin: '15:00',
    ubicacionGPS: {
      latitud: -12.0501,
      longitud: -77.0389,
    },
    condicionesClimaticas: {
      temperatura: 22,
      humedad: 70,
      lluvia: false,
    },
    herramientasInsumos: ['Cosechadora selectiva', 'Sacos de yute', 'Balanza digital'],
    observaciones: 'Café cereza en punto óptimo de maduración. Alta calidad del grano.',
    duracionMinutos: 540,
    rendimientoPorHora: 35.5,
    costoEstimado: 270,
    estado: 'completada',
    fechaCreacion: '2024-10-16',
    ultimaModificacion: '2024-10-16T15:20:00',
  },
  {
    id: '3',
    fecha: '2024-10-17',
    cultivo: 'Arroz',
    lote: 'Lote C-2',
    trabajadorId: '3',
    trabajadorNombre: 'Carlos Alberto López Rodríguez',
    tipoLaborId: '3',
    tipoLaborNombre: 'Riego por Goteo',
    cantidadRecolectada: 0,
    unidadMedida: 'litros',
    pesoTotal: 0,
    horaInicio: '07:00',
    horaFin: '10:00',
    ubicacionGPS: {
      latitud: -12.0489,
      longitud: -77.0412,
    },
    condicionesClimaticas: {
      temperatura: 26,
      humedad: 55,
      lluvia: false,
    },
    herramientasInsumos: ['Sistema de riego por goteo', 'Bomba de agua', 'Fertilizante líquido'],
    observaciones: 'Riego programado completado. Sistema funcionando correctamente.',
    duracionMinutos: 180,
    rendimientoPorHora: 0,
    costoEstimado: 90,
    estado: 'completada',
    fechaCreacion: '2024-10-17',
  },
  {
    id: '4',
    fecha: '2024-10-17',
    cultivo: 'Tomate',
    lote: 'Lote D-1',
    trabajadorId: '4',
    trabajadorNombre: 'Ana Sofía Martínez Fernández',
    tipoLaborId: '5',
    tipoLaborNombre: 'Control Integrado de Plagas',
    cantidadRecolectada: 0,
    unidadMedida: 'litros',
    pesoTotal: 0,
    horaInicio: '09:00',
    horaFin: '12:00',
    ubicacionGPS: {
      latitud: -12.0478,
      longitud: -77.0445,
    },
    condicionesClimaticas: {
      temperatura: 25,
      humedad: 60,
      lluvia: false,
    },
    herramientasInsumos: ['Fumigadora', 'Insecticida biológico', 'Equipo de protección'],
    observaciones: 'Aplicación preventiva contra mosca blanca. Se observó presencia leve.',
    duracionMinutos: 180,
    rendimientoPorHora: 0,
    costoEstimado: 120,
    estado: 'completada',
    fechaCreacion: '2024-10-17',
  },
]

let mockDatabase = [...MOCK_LABORES]

const calcularMetricas = (labor: Partial<Labor>): Partial<Labor> => {
  if (labor.horaInicio && labor.horaFin) {
    const inicio = new Date(`2000-01-01T${labor.horaInicio}`)
    const fin = new Date(`2000-01-01T${labor.horaFin}`)
    const duracionMinutos = (fin.getTime() - inicio.getTime()) / 60000
    const duracionHoras = duracionMinutos / 60
    const rendimientoPorHora = duracionHoras > 0 ? labor.cantidadRecolectada! / duracionHoras : 0
    const costoEstimado = duracionMinutos * 0.5

    return {
      ...labor,
      duracionMinutos: Math.round(duracionMinutos),
      rendimientoPorHora: Math.round(rendimientoPorHora * 10) / 10,
      costoEstimado: Math.round(costoEstimado * 100) / 100,
    }
  }
  return labor
}

export const laboresService = {
  async getAll(): Promise<Labor[]> {
    await new Promise((resolve) => setTimeout(resolve, 400))
    return [...mockDatabase]
  },

  async getById(id: string): Promise<Labor> {
    await new Promise((resolve) => setTimeout(resolve, 300))
    
    const labor = mockDatabase.find((l) => l.id === id)
    if (!labor) {
      throw new Error('Labor no encontrada')
    }
    
    return { ...labor }
  },

  async create(data: CreateLaborDto): Promise<Labor> {
    await new Promise((resolve) => setTimeout(resolve, 500))
    
    const trabajador = await import('../../trabajadores/services/trabajadoresService').then(m => 
      m.trabajadoresService.getById(data.trabajadorId)
    ).catch(() => ({ nombres: '', apellidos: '' }))
    
    const tipoLabor = await import('../../tipos-labor/services/tiposLaborService').then(m => 
      m.tiposLaborService.getById(data.tipoLaborId)
    ).catch(() => ({ nombre: '' }))
    
    const laborBase = {
      id: Date.now().toString(),
      ...data,
      trabajadorNombre: `${trabajador.nombres} ${trabajador.apellidos}`,
      tipoLaborNombre: tipoLabor.nombre,
      estado: 'completada' as const,
      fechaCreacion: new Date().toISOString().split('T')[0],
      ultimaModificacion: new Date().toISOString(),
    }
    
    const nuevaLabor = calcularMetricas(laborBase) as Labor
    
    mockDatabase.push(nuevaLabor)
    return { ...nuevaLabor }
  },

  async update(id: string, data: UpdateLaborDto): Promise<Labor> {
    await new Promise((resolve) => setTimeout(resolve, 500))
    
    const index = mockDatabase.findIndex((l) => l.id === id)
    if (index === -1) {
      throw new Error('Labor no encontrada')
    }
    
    const laborActualizada = {
      ...mockDatabase[index],
      ...data,
      ultimaModificacion: new Date().toISOString(),
    }
    
    mockDatabase[index] = calcularMetricas(laborActualizada) as Labor
    
    return { ...mockDatabase[index] }
  },

  async delete(id: string): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 300))
    
    const index = mockDatabase.findIndex((l) => l.id === id)
    if (index === -1) {
      throw new Error('Labor no encontrada')
    }
    
    mockDatabase = mockDatabase.filter((l) => l.id !== id)
  },

  async search(query: string): Promise<Labor[]> {
    await new Promise((resolve) => setTimeout(resolve, 300))
    
    const lowerQuery = query.toLowerCase()
    const filtered = mockDatabase.filter(
      (l) =>
        l.cultivo.toLowerCase().includes(lowerQuery) ||
        l.lote.toLowerCase().includes(lowerQuery) ||
        l.trabajadorNombre.toLowerCase().includes(lowerQuery) ||
        l.tipoLaborNombre.toLowerCase().includes(lowerQuery) ||
        l.observaciones?.toLowerCase().includes(lowerQuery)
    )
    
    return filtered
  },

  async getByDateRange(fechaInicio: string, fechaFin: string): Promise<Labor[]> {
    await new Promise((resolve) => setTimeout(resolve, 300))
    
    const filtered = mockDatabase.filter(
      (l) => l.fecha >= fechaInicio && l.fecha <= fechaFin
    )
    
    return filtered
  },

  async getByTrabajador(trabajadorId: string): Promise<Labor[]> {
    await new Promise((resolve) => setTimeout(resolve, 300))
    return mockDatabase.filter((l) => l.trabajadorId === trabajadorId)
  },

  async getEstadisticas() {
    await new Promise((resolve) => setTimeout(resolve, 300))
    
    return {
      totalLabores: mockDatabase.length,
      completadas: mockDatabase.filter((l) => l.estado === 'completada').length,
      enProceso: mockDatabase.filter((l) => l.estado === 'en_proceso').length,
      totalRecolectado: mockDatabase.reduce((sum, l) => sum + l.cantidadRecolectada, 0),
      promedioRendimiento: mockDatabase.length > 0
        ? mockDatabase.reduce((sum, l) => sum + (l.rendimientoPorHora || 0), 0) / mockDatabase.length
        : 0,
      costoTotal: mockDatabase.reduce((sum, l) => sum + (l.costoEstimado || 0), 0),
    }
  },
}

export const CULTIVOS_DISPONIBLES = [
  'Maíz',
  'Café',
  'Arroz',
  'Trigo',
  'Tomate',
  'Papa',
  'Cebolla',
  'Zanahoria',
  'Lechuga',
  'Frijol',
  'Soja',
  'Caña de Azúcar',
  'Algodón',
  'Banano',
  'Aguacate',
  'Mango',
  'Cacao',
  'Naranja',
  'Limón',
  'Otro',
]

export const LOTES_DISPONIBLES = [
  'Lote A-1',
  'Lote A-2',
  'Lote A-3',
  'Lote B-1',
  'Lote B-2',
  'Lote B-3',
  'Lote C-1',
  'Lote C-2',
  'Lote D-1',
  'Lote D-2',
]

export const HERRAMIENTAS_DISPONIBLES = [
  'Tractor',
  'Arado',
  'Sembradora mecánica',
  'Cosechadora',
  'Fumigadora',
  'Sistema de riego',
  'Bomba de agua',
  'Balanza digital',
  'Azadón',
  'Machete',
  'Rastrillo',
  'Carretilla',
  'Manguera',
  'Aspersores',
]

