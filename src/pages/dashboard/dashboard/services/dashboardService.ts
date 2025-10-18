import api from '@/lib/axios'

// Interfaces del dashboard (sincronizadas con el backend)
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

// Nuevas interfaces para gráficas adicionales
export interface ActividadesPlanificadas {
  mes: string
  pendientes: number
  en_progreso: number
  completadas: number
  atrasadas: number
  canceladas: number
}

export interface TrabajadoresPorCargo {
  cargo: string
  cantidad: number
  activos: number
  inactivos: number
  color: string
}

export interface TiposLaborFrecuentes {
  tipo: string
  cantidad: number
  categoria: string
  porcentaje: number
  color: string
}

export interface EstadoLotes {
  estado: string
  cantidad: number
  area_total: number
  porcentaje: number
  color: string
}

export interface RendimientoPorTrabajador {
  trabajador: string
  rendimiento_promedio: number
  total_labores: number
  eficiencia: number
}

export interface CostosPorActividad {
  mes: string
  siembra: number
  riego: number
  fertilizacion: number
  cosecha: number
  mantenimiento: number
  total: number
}

// Interfaces para filtros
export interface DashboardFilters {
  fechaInicio?: string
  fechaFin?: string
  cultivoId?: number
  loteId?: number
  trabajadorId?: number
}

// Interface para respuesta completa del dashboard
export interface DashboardResponse {
  estadisticas: EstadisticaAgricola
  produccionMensual: ProduccionMensual[]
  rendimientoHectarea: RendimientoPorHectarea[]
  distribucionCultivos: DistribucionCultivo[]
  eficienciaCampos: EficienciaCampo[]
  laboresDiarias: LaborDiaria[]
  calidadProduccion: CalidadProduccion[]
  // Nuevas gráficas
  actividadesPlanificadas: ActividadesPlanificadas[]
  trabajadoresPorCargo: TrabajadoresPorCargo[]
  tiposLaborFrecuentes: TiposLaborFrecuentes[]
  estadoLotes: EstadoLotes[]
  rendimientoPorTrabajador: RendimientoPorTrabajador[]
  costosPorActividad: CostosPorActividad[]
}

// Interface para respuesta de API
export interface ApiResponse<T> {
  success: boolean
  data: T
  timestamp: string
}

export const dashboardService = {
  // Obtener todos los datos del dashboard de una vez
  getDashboardCompleto: async (filters?: DashboardFilters): Promise<DashboardResponse> => {
    const params = new URLSearchParams()
    if (filters?.fechaInicio) params.append('fechaInicio', filters.fechaInicio)
    if (filters?.fechaFin) params.append('fechaFin', filters.fechaFin)
    if (filters?.cultivoId) params.append('cultivoId', filters.cultivoId.toString())
    if (filters?.loteId) params.append('loteId', filters.loteId.toString())
    if (filters?.trabajadorId) params.append('trabajadorId', filters.trabajadorId.toString())
    
    const { data } = await api.get<ApiResponse<DashboardResponse>>(`/dashboard?${params.toString()}`)
    return data.data
  },

  getEstadisticas: async (filters?: DashboardFilters): Promise<EstadisticaAgricola> => {
    const params = new URLSearchParams()
    if (filters?.fechaInicio) params.append('fechaInicio', filters.fechaInicio)
    if (filters?.fechaFin) params.append('fechaFin', filters.fechaFin)
    if (filters?.cultivoId) params.append('cultivoId', filters.cultivoId.toString())
    if (filters?.loteId) params.append('loteId', filters.loteId.toString())
    if (filters?.trabajadorId) params.append('trabajadorId', filters.trabajadorId.toString())
    
    const { data } = await api.get<ApiResponse<EstadisticaAgricola>>(`/dashboard/estadisticas?${params.toString()}`)
    return data.data
  },

  getProduccionMensual: async (filters?: DashboardFilters): Promise<ProduccionMensual[]> => {
    const params = new URLSearchParams()
    if (filters?.fechaInicio) params.append('fechaInicio', filters.fechaInicio)
    if (filters?.fechaFin) params.append('fechaFin', filters.fechaFin)
    if (filters?.cultivoId) params.append('cultivoId', filters.cultivoId.toString())
    if (filters?.loteId) params.append('loteId', filters.loteId.toString())
    if (filters?.trabajadorId) params.append('trabajadorId', filters.trabajadorId.toString())
    
    const { data } = await api.get<ApiResponse<ProduccionMensual[]>>(`/dashboard/produccion-mensual?${params.toString()}`)
    return data.data
  },

  getRendimientoHectarea: async (filters?: DashboardFilters): Promise<RendimientoPorHectarea[]> => {
    const params = new URLSearchParams()
    if (filters?.fechaInicio) params.append('fechaInicio', filters.fechaInicio)
    if (filters?.fechaFin) params.append('fechaFin', filters.fechaFin)
    if (filters?.cultivoId) params.append('cultivoId', filters.cultivoId.toString())
    if (filters?.loteId) params.append('loteId', filters.loteId.toString())
    if (filters?.trabajadorId) params.append('trabajadorId', filters.trabajadorId.toString())
    
    const { data } = await api.get<ApiResponse<RendimientoPorHectarea[]>>(`/dashboard/rendimiento-hectarea?${params.toString()}`)
    return data.data
  },

  getDistribucionCultivos: async (filters?: DashboardFilters): Promise<DistribucionCultivo[]> => {
    const params = new URLSearchParams()
    if (filters?.fechaInicio) params.append('fechaInicio', filters.fechaInicio)
    if (filters?.fechaFin) params.append('fechaFin', filters.fechaFin)
    if (filters?.cultivoId) params.append('cultivoId', filters.cultivoId.toString())
    if (filters?.loteId) params.append('loteId', filters.loteId.toString())
    if (filters?.trabajadorId) params.append('trabajadorId', filters.trabajadorId.toString())
    
    const { data } = await api.get<ApiResponse<DistribucionCultivo[]>>(`/dashboard/distribucion-cultivos?${params.toString()}`)
    return data.data
  },

  getEficienciaCampos: async (filters?: DashboardFilters): Promise<EficienciaCampo[]> => {
    const params = new URLSearchParams()
    if (filters?.fechaInicio) params.append('fechaInicio', filters.fechaInicio)
    if (filters?.fechaFin) params.append('fechaFin', filters.fechaFin)
    if (filters?.cultivoId) params.append('cultivoId', filters.cultivoId.toString())
    if (filters?.loteId) params.append('loteId', filters.loteId.toString())
    if (filters?.trabajadorId) params.append('trabajadorId', filters.trabajadorId.toString())
    
    const { data } = await api.get<ApiResponse<EficienciaCampo[]>>(`/dashboard/eficiencia-campos?${params.toString()}`)
    return data.data
  },

  getLaboresDiarias: async (filters?: DashboardFilters): Promise<LaborDiaria[]> => {
    const params = new URLSearchParams()
    if (filters?.fechaInicio) params.append('fechaInicio', filters.fechaInicio)
    if (filters?.fechaFin) params.append('fechaFin', filters.fechaFin)
    if (filters?.cultivoId) params.append('cultivoId', filters.cultivoId.toString())
    if (filters?.loteId) params.append('loteId', filters.loteId.toString())
    if (filters?.trabajadorId) params.append('trabajadorId', filters.trabajadorId.toString())
    
    const { data } = await api.get<ApiResponse<LaborDiaria[]>>(`/dashboard/labores-diarias?${params.toString()}`)
    return data.data
  },

  getCalidadProduccion: async (filters?: DashboardFilters): Promise<CalidadProduccion[]> => {
    const params = new URLSearchParams()
    if (filters?.fechaInicio) params.append('fechaInicio', filters.fechaInicio)
    if (filters?.fechaFin) params.append('fechaFin', filters.fechaFin)
    if (filters?.cultivoId) params.append('cultivoId', filters.cultivoId.toString())
    if (filters?.loteId) params.append('loteId', filters.loteId.toString())
    if (filters?.trabajadorId) params.append('trabajadorId', filters.trabajadorId.toString())
    
    const { data } = await api.get<ApiResponse<CalidadProduccion[]>>(`/dashboard/calidad-produccion?${params.toString()}`)
    return data.data
  },

  // Nuevos métodos para gráficas adicionales
  getActividadesPlanificadas: async (filters?: DashboardFilters): Promise<ActividadesPlanificadas[]> => {
    const params = new URLSearchParams()
    if (filters?.fechaInicio) params.append('fechaInicio', filters.fechaInicio)
    if (filters?.fechaFin) params.append('fechaFin', filters.fechaFin)
    if (filters?.cultivoId) params.append('cultivoId', filters.cultivoId.toString())
    if (filters?.loteId) params.append('loteId', filters.loteId.toString())
    if (filters?.trabajadorId) params.append('trabajadorId', filters.trabajadorId.toString())
    
    const { data } = await api.get<ApiResponse<ActividadesPlanificadas[]>>(`/dashboard/actividades-planificadas?${params.toString()}`)
    return data.data
  },

  getTrabajadoresPorCargo: async (filters?: DashboardFilters): Promise<TrabajadoresPorCargo[]> => {
    const params = new URLSearchParams()
    if (filters?.fechaInicio) params.append('fechaInicio', filters.fechaInicio)
    if (filters?.fechaFin) params.append('fechaFin', filters.fechaFin)
    if (filters?.cultivoId) params.append('cultivoId', filters.cultivoId.toString())
    if (filters?.loteId) params.append('loteId', filters.loteId.toString())
    if (filters?.trabajadorId) params.append('trabajadorId', filters.trabajadorId.toString())
    
    const { data } = await api.get<ApiResponse<TrabajadoresPorCargo[]>>(`/dashboard/trabajadores-por-cargo?${params.toString()}`)
    return data.data
  },

  getTiposLaborFrecuentes: async (filters?: DashboardFilters): Promise<TiposLaborFrecuentes[]> => {
    const params = new URLSearchParams()
    if (filters?.fechaInicio) params.append('fechaInicio', filters.fechaInicio)
    if (filters?.fechaFin) params.append('fechaFin', filters.fechaFin)
    if (filters?.cultivoId) params.append('cultivoId', filters.cultivoId.toString())
    if (filters?.loteId) params.append('loteId', filters.loteId.toString())
    if (filters?.trabajadorId) params.append('trabajadorId', filters.trabajadorId.toString())
    
    const { data } = await api.get<ApiResponse<TiposLaborFrecuentes[]>>(`/dashboard/tipos-labor-frecuentes?${params.toString()}`)
    return data.data
  },

  getEstadoLotes: async (filters?: DashboardFilters): Promise<EstadoLotes[]> => {
    const params = new URLSearchParams()
    if (filters?.fechaInicio) params.append('fechaInicio', filters.fechaInicio)
    if (filters?.fechaFin) params.append('fechaFin', filters.fechaFin)
    if (filters?.cultivoId) params.append('cultivoId', filters.cultivoId.toString())
    if (filters?.loteId) params.append('loteId', filters.loteId.toString())
    if (filters?.trabajadorId) params.append('trabajadorId', filters.trabajadorId.toString())
    
    const { data } = await api.get<ApiResponse<EstadoLotes[]>>(`/dashboard/estado-lotes?${params.toString()}`)
    return data.data
  },

  getRendimientoPorTrabajador: async (filters?: DashboardFilters): Promise<RendimientoPorTrabajador[]> => {
    const params = new URLSearchParams()
    if (filters?.fechaInicio) params.append('fechaInicio', filters.fechaInicio)
    if (filters?.fechaFin) params.append('fechaFin', filters.fechaFin)
    if (filters?.cultivoId) params.append('cultivoId', filters.cultivoId.toString())
    if (filters?.loteId) params.append('loteId', filters.loteId.toString())
    if (filters?.trabajadorId) params.append('trabajadorId', filters.trabajadorId.toString())
    
    const { data } = await api.get<ApiResponse<RendimientoPorTrabajador[]>>(`/dashboard/rendimiento-por-trabajador?${params.toString()}`)
    return data.data
  },

  getCostosPorActividad: async (filters?: DashboardFilters): Promise<CostosPorActividad[]> => {
    const params = new URLSearchParams()
    if (filters?.fechaInicio) params.append('fechaInicio', filters.fechaInicio)
    if (filters?.fechaFin) params.append('fechaFin', filters.fechaFin)
    if (filters?.cultivoId) params.append('cultivoId', filters.cultivoId.toString())
    if (filters?.loteId) params.append('loteId', filters.loteId.toString())
    if (filters?.trabajadorId) params.append('trabajadorId', filters.trabajadorId.toString())
    
    const { data } = await api.get<ApiResponse<CostosPorActividad[]>>(`/dashboard/costos-por-actividad?${params.toString()}`)
    return data.data
  }
}

