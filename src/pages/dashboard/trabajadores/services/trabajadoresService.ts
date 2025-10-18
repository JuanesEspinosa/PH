import api from '@/lib/axios'

export interface Trabajador {
  id: number
  nombres: string
  apellidos: string
  documento: string
  tipo_documento: 'DNI' | 'Pasaporte' | 'Cédula' | 'Otro'
  telefono: string
  email: string
  cargo: string
  fecha_ingreso: string // Formato YYYY-MM-DD
  estado: 'activo' | 'inactivo' | 'vacaciones' | 'licencia'
  direccion: string
  fecha_creacion: string
  ultima_modificacion?: string
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


export const trabajadoresService = {
  // Obtener todos los trabajadores
  async getAll(): Promise<Trabajador[]> {
    try {
      const response = await api.get<Trabajador[]>('/trabajadores')
      return response.data
    } catch (error) {
      console.error('Error al obtener trabajadores:', error)
      throw new Error('No se pudieron cargar los trabajadores')
    }
  },

  // Obtener un trabajador por ID
  async getById(id: string): Promise<Trabajador> {
    try {
      const response = await api.get<Trabajador>(`/trabajadores/${id}`)
      return response.data
    } catch (error) {
      console.error('Error al obtener trabajador:', error)
      throw new Error('Trabajador no encontrado')
    }
  },

  // Crear un nuevo trabajador
  async create(data: CreateTrabajadorDto): Promise<Trabajador> {
    try {
      // Convertir camelCase a snake_case para el backend
      const backendData = {
        nombres: data.nombres,
        apellidos: data.apellidos,
        documento: data.documento,
        tipo_documento: data.tipoDocumento,
        telefono: data.telefono,
        email: data.email,
        cargo: data.cargo,
        fecha_ingreso: data.fechaIngreso,
        direccion: data.direccion,
      }
      
      const response = await api.post<Trabajador>('/trabajadores', backendData)
      return response.data
    } catch (error: any) {
      console.error('Error al crear trabajador:', error)
      
      // Manejar errores específicos del backend
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message)
      }
      
      throw new Error('No se pudo crear el trabajador')
    }
  },

  // Actualizar un trabajador
  async update(id: string, data: UpdateTrabajadorDto): Promise<Trabajador> {
    try {
      // Convertir camelCase a snake_case para el backend
      const backendData: any = {}
      
      if (data.nombres !== undefined) backendData.nombres = data.nombres
      if (data.apellidos !== undefined) backendData.apellidos = data.apellidos
      if (data.documento !== undefined) backendData.documento = data.documento
      if (data.tipoDocumento !== undefined) backendData.tipo_documento = data.tipoDocumento
      if (data.telefono !== undefined) backendData.telefono = data.telefono
      if (data.email !== undefined) backendData.email = data.email
      if (data.cargo !== undefined) backendData.cargo = data.cargo
      if (data.fechaIngreso !== undefined) backendData.fecha_ingreso = data.fechaIngreso
      if (data.estado !== undefined) backendData.estado = data.estado
      if (data.direccion !== undefined) backendData.direccion = data.direccion
      
      const response = await api.put<Trabajador>(`/trabajadores/${id}`, backendData)
      return response.data
    } catch (error: any) {
      console.error('Error al actualizar trabajador:', error)
      
      // Manejar errores específicos del backend
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message)
      }
      
      throw new Error('No se pudo actualizar el trabajador')
    }
  },

  // Eliminar un trabajador (soft delete - cambiar estado a inactivo)
  async delete(id: string): Promise<void> {
    try {
      // En lugar de eliminar físicamente, marcamos como inactivo
      await api.put(`/trabajadores/${id}`, { estado: 'inactivo' })
    } catch (error: any) {
      console.error('Error al eliminar trabajador:', error)
      
      // Si falla el soft delete, intentamos eliminación física
      try {
        await api.delete(`/trabajadores/${id}`)
      } catch (deleteError: any) {
        if (deleteError.response?.data?.message) {
          throw new Error(deleteError.response.data.message)
        }
        throw new Error('No se pudo eliminar el trabajador')
      }
    }
  },

  // Buscar trabajadores
  async search(query: string): Promise<Trabajador[]> {
    try {
      const response = await api.get<Trabajador[]>(`/trabajadores/search?q=${encodeURIComponent(query)}`)
      return response.data
    } catch (error) {
      console.error('Error al buscar trabajadores:', error)
      throw new Error('No se pudo realizar la búsqueda')
    }
  },
}

