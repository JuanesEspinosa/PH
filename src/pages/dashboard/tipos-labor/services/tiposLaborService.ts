import api from '@/lib/axios'

export interface TipoLabor {
  id: number
  nombre: string
  descripcion?: string
  categoria: 'siembra' | 'cosecha' | 'riego' | 'fertilizacion' | 'control_plagas' | 'mantenimiento' | 'otro'
  fecha_creacion: string
  ultima_modificacion?: string
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


export const tiposLaborService = {
  // Obtener todos los tipos de labor
  async getAll(): Promise<TipoLabor[]> {
    try {
      const response = await api.get<TipoLabor[]>('/tipos-labor')
      return response.data
    } catch (error) {
      console.error('Error al obtener tipos de labor:', error)
      throw new Error('No se pudieron cargar los tipos de labor')
    }
  },

  // Obtener un tipo de labor por ID
  async getById(id: string): Promise<TipoLabor> {
    try {
      const response = await api.get<TipoLabor>(`/tipos-labor/${id}`)
      return response.data
    } catch (error) {
      console.error('Error al obtener tipo de labor:', error)
      throw new Error('Tipo de labor no encontrado')
    }
  },

  // Crear un nuevo tipo de labor
  async create(data: CreateTipoLaborDto): Promise<TipoLabor> {
    try {
      const response = await api.post<TipoLabor>('/tipos-labor', data)
      return response.data
    } catch (error: any) {
      console.error('Error al crear tipo de labor:', error)
      
      // Manejar errores específicos del backend
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message)
      }
      
      throw new Error('No se pudo crear el tipo de labor')
    }
  },

  // Actualizar un tipo de labor
  async update(id: string, data: UpdateTipoLaborDto): Promise<TipoLabor> {
    try {
      const response = await api.put<TipoLabor>(`/tipos-labor/${id}`, data)
      return response.data
    } catch (error: any) {
      console.error('Error al actualizar tipo de labor:', error)
      
      // Manejar errores específicos del backend
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message)
      }
      
      throw new Error('No se pudo actualizar el tipo de labor')
    }
  },

  // Eliminar un tipo de labor
  async delete(id: string): Promise<void> {
    try {
      await api.delete(`/tipos-labor/${id}`)
    } catch (error: any) {
      console.error('Error al eliminar tipo de labor:', error)
      
      // Manejar errores específicos del backend
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message)
      }
      
      throw new Error('No se pudo eliminar el tipo de labor')
    }
  },

  // Buscar tipos de labor
  async search(query: string): Promise<TipoLabor[]> {
    try {
      const response = await api.get<TipoLabor[]>(`/tipos-labor/search?q=${encodeURIComponent(query)}`)
      return response.data
    } catch (error) {
      console.error('Error al buscar tipos de labor:', error)
      throw new Error('No se pudo realizar la búsqueda')
    }
  },
}

