import { LoteModel, Lote, CreateLoteDto, UpdateLoteDto } from '../models/lote.model'

// ============================================================================
// SERVICIO DE LOTES
// ============================================================================

export class LotesService {
  /**
   * Obtener todos los lotes
   */
  async getAllLotes(): Promise<Lote[]> {
    return await LoteModel.findAll()
  }

  /**
   * Obtener un lote por ID
   */
  async getLoteById(id: number): Promise<Lote> {
    const lote = await LoteModel.findById(id)
    
    if (!lote) {
      throw new Error('Lote no encontrado')
    }
    
    return lote
  }

  /**
   * Crear un nuevo lote
   */
  async createLote(data: CreateLoteDto): Promise<Lote> {
    // Validaciones
    if (!data.codigo || data.codigo.trim().length === 0) {
      throw new Error('El código del lote es requerido')
    }

    if (!data.nombre || data.nombre.trim().length === 0) {
      throw new Error('El nombre del lote es requerido')
    }

    if (!data.area_hectareas || data.area_hectareas <= 0) {
      throw new Error('El área debe ser mayor a 0')
    }

    if (!data.coordenadas || data.coordenadas.length < 3) {
      throw new Error('Se requieren al menos 3 coordenadas para definir el lote')
    }

    // Verificar que el código no exista
    const codigoExists = await LoteModel.codigoExists(data.codigo)
    if (codigoExists) {
      throw new Error('Ya existe un lote con ese código')
    }

    // Crear lote
    const id = await LoteModel.create(data)
    
    // Obtener el lote creado
    const lote = await LoteModel.findById(id)
    
    if (!lote) {
      throw new Error('Error al crear el lote')
    }
    
    return lote
  }

  /**
   * Actualizar un lote
   */
  async updateLote(id: number, data: UpdateLoteDto): Promise<Lote> {
    // Verificar que el lote existe
    const exists = await LoteModel.exists(id)
    if (!exists) {
      throw new Error('Lote no encontrado')
    }

    // Validaciones
    if (data.codigo !== undefined) {
      if (data.codigo.trim().length === 0) {
        throw new Error('El código del lote no puede estar vacío')
      }
      
      // Verificar que el código no exista (excepto el actual)
      const codigoExists = await LoteModel.codigoExists(data.codigo, id)
      if (codigoExists) {
        throw new Error('Ya existe un lote con ese código')
      }
    }

    if (data.nombre !== undefined && data.nombre.trim().length === 0) {
      throw new Error('El nombre del lote no puede estar vacío')
    }

    if (data.area_hectareas !== undefined && data.area_hectareas <= 0) {
      throw new Error('El área debe ser mayor a 0')
    }

    if (data.coordenadas !== undefined && data.coordenadas.length < 3) {
      throw new Error('Se requieren al menos 3 coordenadas para definir el lote')
    }

    // Actualizar
    const updated = await LoteModel.update(id, data)
    
    if (!updated) {
      throw new Error('No se pudo actualizar el lote')
    }

    // Obtener el lote actualizado
    const lote = await LoteModel.findById(id)
    
    if (!lote) {
      throw new Error('Error al obtener el lote actualizado')
    }
    
    return lote
  }

  /**
   * Eliminar un lote
   */
  async deleteLote(id: number): Promise<void> {
    // Verificar que el lote existe
    const exists = await LoteModel.exists(id)
    if (!exists) {
      throw new Error('Lote no encontrado')
    }

    // Eliminar (también elimina coordenadas por CASCADE)
    await LoteModel.delete(id)
  }

  /**
   * Obtener estadísticas de lotes
   */
  async getEstadisticas(): Promise<any> {
    return await LoteModel.getEstadisticas()
  }
}

export const lotesService = new LotesService()

