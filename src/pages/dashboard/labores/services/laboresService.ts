export interface Labor {
  id: number
  fecha: string
  cultivo: string
  lote: string
  trabajador_id: number
  trabajador_nombre: string
  tipo_labor_id: number
  tipo_labor_nombre: string
  cantidad_recolectada: number
  unidad_medida: 'kg' | 'litros' | 'unidades' | 'toneladas' | 'quintales'
  peso_total: number
  hora_inicio: string
  hora_fin: string
  ubicacion_gps: {
    latitud: number
    longitud: number
  }
  condiciones_climaticas?: {
    temperatura?: number
    humedad?: number
    lluvia?: boolean
  }
  herramientas_insumos?: string[]
  observaciones?: string
  fotos?: string[]
  duracion_minutos?: number
  rendimiento_por_hora?: number
  costo_estimado?: number
  estado: 'en_proceso' | 'completada' | 'pausada' | 'cancelada'
  fecha_creacion: string
  ultima_modificacion?: string
  supervisor_id?: number
  actividad_planificada_id?: number
}

export interface CreateLaborDto {
  fecha: string
  cultivo: string
  lote: string
  trabajador_id: number
  tipo_labor_id: number
  cantidad_recolectada: number
  unidad_medida: 'kg' | 'litros' | 'unidades' | 'toneladas' | 'quintales'
  peso_total: number
  hora_inicio: string
  hora_fin: string
  ubicacion_gps: {
    latitud: number
    longitud: number
  }
  condiciones_climaticas?: {
    temperatura?: number
    humedad?: number
    lluvia?: boolean
  }
  herramientas_insumos?: string[]
  observaciones?: string
  fotos?: string[]
  actividad_planificada_id?: string
}

export interface UpdateLaborDto {
  fecha?: string
  cultivo?: string
  lote?: string
  trabajador_id?: number
  tipo_labor_id?: number
  cantidad_recolectada?: number
  unidad_medida?: 'kg' | 'litros' | 'unidades' | 'toneladas' | 'quintales'
  peso_total?: number
  hora_inicio?: string
  hora_fin?: string
  ubicacion_gps?: {
    latitud: number
    longitud: number
  }
  condiciones_climaticas?: {
    temperatura?: number
    humedad?: number
    lluvia?: boolean
  }
  herramientas_insumos?: string[]
  observaciones?: string
  estado?: 'en_proceso' | 'completada' | 'pausada' | 'cancelada'
  actividad_planificada_id?: number
}

import api from '@/lib/axios'

export const laboresService = {
  // Obtener todas las labores
  async getAll(): Promise<Labor[]> {
    try {
      const response = await api.get<Labor[]>('/labores')
      return response.data
    } catch (error) {
      console.error('Error al obtener labores:', error)
      throw new Error('No se pudieron cargar las labores')
    }
  },

  // Obtener una labor por ID
  async getById(id: string): Promise<Labor> {
    try {
      const response = await api.get<Labor>(`/labores/${id}`)
      return response.data
    } catch (error) {
      console.error('Error al obtener labor:', error)
      throw new Error('Labor no encontrada')
    }
  },

  // Crear una nueva labor
  async create(data: CreateLaborDto): Promise<Labor> {
    try {
      const response = await api.post<Labor>('/labores', data)
      return response.data
    } catch (error: any) {
      console.error('Error al crear labor:', error)
      
      // Manejar errores específicos del backend
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message)
      }
      
      throw new Error('No se pudo crear la labor')
    }
  },

  // Actualizar una labor
  async update(id: string, data: UpdateLaborDto): Promise<Labor> {
    try {
      const response = await api.put<Labor>(`/labores/${id}`, data)
      return response.data
    } catch (error: any) {
      console.error('Error al actualizar labor:', error)
      
      // Manejar errores específicos del backend
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message)
      }
      
      throw new Error('No se pudo actualizar la labor')
    }
  },

  // Eliminar una labor
  async delete(id: string): Promise<void> {
    try {
      await api.delete(`/labores/${id}`)
    } catch (error: any) {
      console.error('Error al eliminar labor:', error)
      
      // Manejar errores específicos del backend
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message)
      }
      
      throw new Error('No se pudo eliminar la labor')
    }
  },

  // Buscar labores
  async search(query: string): Promise<Labor[]> {
    try {
      const response = await api.get<Labor[]>(`/labores/search?q=${encodeURIComponent(query)}`)
      return response.data
    } catch (error) {
      console.error('Error al buscar labores:', error)
      throw new Error('No se pudo realizar la búsqueda')
    }
  },

  // Obtener labores por rango de fechas
  async getByDateRange(fechaInicio: string, fechaFin: string): Promise<Labor[]> {
    try {
      const response = await api.get<Labor[]>(`/labores/fecha-rango?inicio=${fechaInicio}&fin=${fechaFin}`)
      return response.data
    } catch (error) {
      console.error('Error al obtener labores por fecha:', error)
      throw new Error('No se pudieron cargar las labores del rango de fechas')
    }
  },

  // Obtener labores por trabajador
  async getByTrabajador(trabajadorId: string): Promise<Labor[]> {
    try {
      const response = await api.get<Labor[]>(`/labores/trabajador/${trabajadorId}`)
      return response.data
    } catch (error) {
      console.error('Error al obtener labores por trabajador:', error)
      throw new Error('No se pudieron cargar las labores del trabajador')
    }
  },

  // Obtener estadísticas
  async getEstadisticas() {
    try {
      const response = await api.get('/labores/estadisticas')
      return response.data
    } catch (error) {
      console.error('Error al obtener estadísticas:', error)
      throw new Error('No se pudieron cargar las estadísticas')
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

