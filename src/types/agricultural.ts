// Tipos para el sistema agrícola
export interface LaborAgricola {
  id: string
  tipo: 'cosecha' | 'corte' | 'pesaje' | 'transporte' | 'siembra' | 'fertilizacion' | 'riego'
  fecha: string
  campo: string
  cultivo: string
  cantidad: number
  unidad: 'kg' | 'toneladas' | 'hectareas' | 'litros' | 'unidades'
  trabajador: string
  observaciones?: string
  coordenadas?: {
    lat: number
    lng: number
  }
}

export interface Campo {
  id: string
  nombre: string
  ubicacion: string
  area: number // en hectáreas
  cultivo: string
  estado: 'activo' | 'inactivo' | 'en_preparacion'
  fechaSiembra: string
  fechaCosechaEstimada?: string
}

export interface Rendimiento {
  campo: string
  cultivo: string
  fecha: string
  produccion: number
  area: number
  rendimientoPorHectarea: number
  calidad: 'excelente' | 'buena' | 'regular' | 'mala'
}

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

export interface ReporteAgricola {
  id: string
  titulo: string
  tipo: 'productividad' | 'rendimiento' | 'costos' | 'calidad' | 'comparativo'
  fechaGeneracion: string
  periodo: {
    inicio: string
    fin: string
  }
  datos: any
  resumen: string
  recomendaciones?: string[]
}

export interface MetricaTiempoReal {
  timestamp: string
  temperatura: number
  humedad: number
  ph: number
  humedadSuelo: number
  campo: string
}

