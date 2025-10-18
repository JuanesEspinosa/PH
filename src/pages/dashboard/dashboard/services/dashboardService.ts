import api from '@/lib/axios'

export interface EstadisticaAgricola {
  totalProduccion: number
  totalArea: number
  rendimientoPromedio: number
  variacionSemanal: number
  variacionMensual: number
  proyeccionRendimiento: number
  camposActivos: number
  cultivosEnProceso: number
  eficienciaPromedio: number
}

export interface ProduccionMensual {
  mes: string
  cafe: number
  cana: number
  maiz: number
  platano: number
  total: number
}

export interface RendimientoPorHectarea {
  mes: string
  rendimiento: number
  objetivo: number
}

export interface DistribucionCultivo {
  nombre: string
  area: number
  porcentaje: number
  produccion: number
  color: string
}

export interface EficienciaCampo {
  campo: string
  eficiencia: number
  meta: number
}

export interface LaborDiaria {
  dia: string
  cosecha: number
  riego: number
  fertilizacion: number
  transporte: number
}

export interface CalidadProduccion {
  mes: string
  excelente: number
  buena: number
  regular: number
  mala: number
}

export const dashboardService = {
  getEstadisticas: async (): Promise<EstadisticaAgricola> => {
    const { data } = await api.get('/dashboard/estadisticas')
    return data
  },

  getProduccionMensual: async (): Promise<ProduccionMensual[]> => {
    const { data } = await api.get('/dashboard/produccion-mensual')
    return data
  },

  getRendimientoHectarea: async (): Promise<RendimientoPorHectarea[]> => {
    const { data } = await api.get('/dashboard/rendimiento-hectarea')
    return data
  },

  getDistribucionCultivos: async (): Promise<DistribucionCultivo[]> => {
    const { data } = await api.get('/dashboard/distribucion-cultivos')
    return data
  },

  getEficienciaCampos: async (): Promise<EficienciaCampo[]> => {
    const { data } = await api.get('/dashboard/eficiencia-campos')
    return data
  },

  getLaboresDiarias: async (): Promise<LaborDiaria[]> => {
    const { data } = await api.get('/dashboard/labores-diarias')
    return data
  },

  getCalidadProduccion: async (): Promise<CalidadProduccion[]> => {
    const { data } = await api.get('/dashboard/calidad-produccion')
    return data
  }
}

