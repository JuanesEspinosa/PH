import type { LaborAgricola, Campo, Rendimiento, EstadisticaAgricola, MetricaTiempoReal } from '@/types/agricultural'

// Datos de campos agrícolas
export const camposMock: Campo[] = [
  {
    id: '1',
    nombre: 'Campo Norte A',
    ubicacion: 'Sector Norte - Valle del Cauca',
    area: 45.5,
    cultivo: 'Café',
    estado: 'activo',
    fechaSiembra: '2024-03-15',
    fechaCosechaEstimada: '2025-01-20'
  },
  {
    id: '2',
    nombre: 'Campo Sur B',
    ubicacion: 'Sector Sur - Valle del Cauca',
    area: 38.2,
    cultivo: 'Caña de Azúcar',
    estado: 'activo',
    fechaSiembra: '2024-02-10',
    fechaCosechaEstimada: '2024-12-15'
  },
  {
    id: '3',
    nombre: 'Campo Este C',
    ubicacion: 'Sector Este - Valle del Cauca',
    area: 52.8,
    cultivo: 'Maíz',
    estado: 'activo',
    fechaSiembra: '2024-04-20',
    fechaCosechaEstimada: '2024-11-30'
  },
  {
    id: '4',
    nombre: 'Campo Oeste D',
    ubicacion: 'Sector Oeste - Valle del Cauca',
    area: 41.0,
    cultivo: 'Plátano',
    estado: 'en_preparacion',
    fechaSiembra: '2024-06-01',
    fechaCosechaEstimada: '2025-02-15'
  }
]

// Datos de labores agrícolas
export const laboresAgricolasMock: LaborAgricola[] = [
  {
    id: '1',
    tipo: 'cosecha',
    fecha: '2024-10-15',
    campo: 'Campo Norte A',
    cultivo: 'Café',
    cantidad: 2450,
    unidad: 'kg',
    trabajador: 'Juan Rodríguez',
    observaciones: 'Cosecha de alta calidad, granos bien maduros'
  },
  {
    id: '2',
    tipo: 'pesaje',
    fecha: '2024-10-15',
    campo: 'Campo Sur B',
    cultivo: 'Caña de Azúcar',
    cantidad: 18.5,
    unidad: 'toneladas',
    trabajador: 'María González',
    observaciones: 'Peso registrado antes del transporte'
  },
  {
    id: '3',
    tipo: 'riego',
    fecha: '2024-10-14',
    campo: 'Campo Este C',
    cultivo: 'Maíz',
    cantidad: 15000,
    unidad: 'litros',
    trabajador: 'Carlos Pérez',
    observaciones: 'Riego por aspersión completado'
  },
  {
    id: '4',
    tipo: 'fertilizacion',
    fecha: '2024-10-13',
    campo: 'Campo Oeste D',
    cultivo: 'Plátano',
    cantidad: 350,
    unidad: 'kg',
    trabajador: 'Ana Martínez',
    observaciones: 'Fertilizante orgánico aplicado'
  },
  {
    id: '5',
    tipo: 'transporte',
    fecha: '2024-10-12',
    campo: 'Campo Norte A',
    cultivo: 'Café',
    cantidad: 3200,
    unidad: 'kg',
    trabajador: 'Pedro López',
    observaciones: 'Transporte a bodega central'
  }
]

// Datos de rendimiento por período
export const rendimientosMock: Rendimiento[] = [
  {
    campo: 'Campo Norte A',
    cultivo: 'Café',
    fecha: '2024-10-01',
    produccion: 2450,
    area: 45.5,
    rendimientoPorHectarea: 53.8,
    calidad: 'excelente'
  },
  {
    campo: 'Campo Sur B',
    cultivo: 'Caña de Azúcar',
    fecha: '2024-10-01',
    produccion: 18500,
    area: 38.2,
    rendimientoPorHectarea: 484.3,
    calidad: 'buena'
  },
  {
    campo: 'Campo Este C',
    cultivo: 'Maíz',
    fecha: '2024-10-01',
    produccion: 4200,
    area: 52.8,
    rendimientoPorHectarea: 79.5,
    calidad: 'buena'
  },
  {
    campo: 'Campo Oeste D',
    cultivo: 'Plátano',
    fecha: '2024-10-01',
    produccion: 0,
    area: 41.0,
    rendimientoPorHectarea: 0,
    calidad: 'regular'
  }
]

// Estadísticas generales
export const estadisticasAgricolasMock: EstadisticaAgricola = {
  totalProduccion: 25150, // kg
  totalArea: 177.5, // hectáreas
  rendimientoPromedio: 141.7, // kg por hectárea
  variacionSemanal: 8.5, // % positivo
  variacionMensual: 15.3, // % positivo
  proyeccionRendimiento: 32000, // kg proyectados para fin de mes
  camposActivos: 3,
  cultivosEnProceso: 4,
  eficienciaPromedio: 87.5 // %
}

// Datos históricos para gráficos (últimos 6 meses)
export const produccionMensual = [
  { mes: 'May', cafe: 18500, cana: 85000, maiz: 22000, platano: 15000, total: 140500 },
  { mes: 'Jun', cafe: 21200, cana: 92000, maiz: 24500, platano: 18000, total: 155700 },
  { mes: 'Jul', cafe: 23800, cana: 88000, maiz: 26000, platano: 19500, total: 157300 },
  { mes: 'Ago', cafe: 25100, cana: 95000, maiz: 28500, platano: 21000, total: 169600 },
  { mes: 'Sep', cafe: 26500, cana: 98000, maiz: 25000, platano: 22500, total: 172000 },
  { mes: 'Oct', cafe: 28200, cana: 102000, maiz: 27500, platano: 24000, total: 181700 }
]

// Rendimiento por hectárea (últimos 6 meses)
export const rendimientoPorHectarea = [
  { mes: 'May', rendimiento: 125.5, objetivo: 140 },
  { mes: 'Jun', rendimiento: 132.8, objetivo: 140 },
  { mes: 'Jul', rendimiento: 138.2, objetivo: 140 },
  { mes: 'Ago', rendimiento: 142.5, objetivo: 145 },
  { mes: 'Sep', rendimiento: 145.8, objetivo: 145 },
  { mes: 'Oct', rendimiento: 151.2, objetivo: 150 }
]

// Distribución de cultivos
export const distribucionCultivos = [
  { nombre: 'Café', area: 45.5, porcentaje: 25.6, produccion: 28200, color: '#8B4513' },
  { nombre: 'Caña de Azúcar', area: 38.2, porcentaje: 21.5, produccion: 102000, color: '#90EE90' },
  { nombre: 'Maíz', area: 52.8, porcentaje: 29.7, produccion: 27500, color: '#FFD700' },
  { nombre: 'Plátano', area: 41.0, porcentaje: 23.1, produccion: 24000, color: '#FFE135' }
]

// Eficiencia por campo
export const eficienciaPorCampo = [
  { campo: 'Campo Norte A', eficiencia: 92, meta: 90 },
  { campo: 'Campo Sur B', eficiencia: 88, meta: 85 },
  { campo: 'Campo Este C', eficiencia: 85, meta: 85 },
  { campo: 'Campo Oeste D', eficiencia: 0, meta: 80 }
]

// Labores diarias (última semana)
export const laboresDiarias = [
  { dia: 'Lun', cosecha: 8, riego: 4, fertilizacion: 2, transporte: 5 },
  { dia: 'Mar', cosecha: 10, riego: 3, fertilizacion: 3, transporte: 6 },
  { dia: 'Mié', cosecha: 12, riego: 5, fertilizacion: 2, transporte: 7 },
  { dia: 'Jue', cosecha: 9, riego: 4, fertilizacion: 4, transporte: 5 },
  { dia: 'Vie', cosecha: 11, riego: 6, fertilizacion: 3, transporte: 8 },
  { dia: 'Sáb', cosecha: 7, riego: 3, fertilizacion: 1, transporte: 4 },
  { dia: 'Dom', cosecha: 5, riego: 2, fertilizacion: 1, transporte: 2 }
]

// Calidad de producción (últimos 6 meses)
export const calidadProduccion = [
  { mes: 'May', excelente: 45, buena: 38, regular: 15, mala: 2 },
  { mes: 'Jun', excelente: 48, buena: 40, regular: 10, mala: 2 },
  { mes: 'Jul', excelente: 52, buena: 35, regular: 11, mala: 2 },
  { mes: 'Ago', excelente: 55, buena: 33, regular: 10, mala: 2 },
  { mes: 'Sep', excelente: 58, buena: 32, regular: 8, mala: 2 },
  { mes: 'Oct', excelente: 62, buena: 30, regular: 7, mala: 1 }
]

// Métricas en tiempo real
export const metricasTiempoReal: MetricaTiempoReal[] = [
  {
    timestamp: new Date().toISOString(),
    temperatura: 24.5,
    humedad: 68,
    ph: 6.5,
    humedadSuelo: 45,
    campo: 'Campo Norte A'
  },
  {
    timestamp: new Date().toISOString(),
    temperatura: 26.2,
    humedad: 72,
    ph: 6.8,
    humedadSuelo: 52,
    campo: 'Campo Sur B'
  },
  {
    timestamp: new Date().toISOString(),
    temperatura: 23.8,
    humedad: 65,
    ph: 6.3,
    humedadSuelo: 48,
    campo: 'Campo Este C'
  }
]

// Costos operacionales mensuales
export const costosOperacionales = [
  { mes: 'May', personal: 45000, insumos: 28000, transporte: 12000, otros: 8000 },
  { mes: 'Jun', personal: 47000, insumos: 30000, transporte: 13000, otros: 8500 },
  { mes: 'Jul', personal: 46000, insumos: 29000, transporte: 12500, otros: 8200 },
  { mes: 'Ago', personal: 48000, insumos: 31000, transporte: 14000, otros: 9000 },
  { mes: 'Sep', personal: 49000, insumos: 32000, transporte: 13500, otros: 8800 },
  { mes: 'Oct', personal: 50000, insumos: 33000, transporte: 15000, otros: 9200 }
]

// Proyección de cosecha (próximos 3 meses)
export const proyeccionCosecha = [
  { mes: 'Nov', estimado: 185000, minimo: 170000, maximo: 195000 },
  { mes: 'Dic', estimado: 192000, minimo: 178000, maximo: 205000 },
  { mes: 'Ene', estimado: 198000, minimo: 185000, maximo: 210000 }
]

