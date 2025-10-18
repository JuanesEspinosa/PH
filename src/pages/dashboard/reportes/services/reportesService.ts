import api from '@/lib/axios'

export interface ReporteRequest {
  tipoReporte: 'Productividad' | 'Rendimiento' | 'Costos'
  fechaInicio?: string
  fechaFin?: string
  cultivoId?: number
  loteId?: number
  trabajadorId?: number
}

export interface ReporteResponse {
  success: boolean
  url: string
  filename: string
  size: number
  generatedAt: string
  sheets?: string[]
  tipoReporte: string
}

export interface ReporteDisponible {
  id: string
  nombre: string
  descripcion: string
  formatos: ('PDF' | 'Excel')[]
  icono: string
  color: string
}

export interface ReporteGenerado {
  filename: string
  size: number
  created: string
  modified: string
  url: string
}

export const reportesService = {
  // Obtener reportes disponibles
  getReportesDisponibles: async (): Promise<ReporteDisponible[]> => {
    const { data } = await api.get('/reportes')
    return data.data
  },

  // Generar reporte PDF
  generarPDF: async (request: ReporteRequest): Promise<ReporteResponse> => {
    const { data } = await api.post('/reportes/generar-pdf', request)
    return data.data
  },

  // Generar reporte Excel
  generarExcel: async (request: Omit<ReporteRequest, 'tipoReporte'> & { tipoReporte: Exclude<ReporteRequest['tipoReporte'], 'Comparativo'> }): Promise<ReporteResponse> => {
    const { data } = await api.post('/reportes/generar-excel', request)
    return data.data
  },

  // Descargar archivo de reporte
  descargarReporte: async (filename: string): Promise<Blob> => {
    const response = await api.get(`/reportes/descargar/${filename}`, {
      responseType: 'blob'
    })
    return response.data
  },

  // Listar reportes generados
  getReportesGenerados: async (): Promise<ReporteGenerado[]> => {
    const { data } = await api.get('/reportes/generados')
    return data.data
  },

  // Eliminar reporte generado
  eliminarReporte: async (filename: string): Promise<void> => {
    await api.delete(`/reportes/${filename}`)
  },

  // Obtener información de un reporte específico
  getInfoReporte: async (tipoReporte: string): Promise<ReporteDisponible> => {
    const { data } = await api.get(`/reportes/${tipoReporte}`)
    return data.data
  }
}

