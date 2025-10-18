import api from '@/lib/axios'

export interface ReporteRequest {
  tipoReporte: 'Productividad' | 'Rendimiento' | 'Costos' | 'Comparativo'
}

export interface ReporteResponse {
  success: boolean
  url: string
  filename: string
  size: number
  generatedAt: string
  sheets?: string[]
}

export const reportesService = {
  generarPDF: async (tipoReporte: ReporteRequest['tipoReporte']): Promise<ReporteResponse> => {
    const { data } = await api.post('/reportes/generar-pdf', { tipoReporte })
    return data
  },

  generarExcel: async (tipoReporte: Exclude<ReporteRequest['tipoReporte'], 'Comparativo'>): Promise<ReporteResponse> => {
    const { data } = await api.post('/reportes/generar-excel', { tipoReporte })
    return data
  },

  getReportesDisponibles: async (): Promise<any[]> => {
    const { data } = await api.get('/reportes')
    return data
  }
}

