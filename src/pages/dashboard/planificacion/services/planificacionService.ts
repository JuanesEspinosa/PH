import {
  ActividadPlanificada,
  CreateActividadDto,
  UpdateActividadDto,
  EstadoActividad,
  TipoActividad,
  NivelPrioridad,
  PeriodoTiempo,
  TipoAlerta,
  Alerta,
  EstadisticasPlanificacion,
  ComparacionPlanificadoReal,
  ReporteEficiencia,
  FiltrosPlanificacion,
  ActualizarProgresoDto
} from '@/types/planificacion';

// ============================================================================
// DATOS MOCK
// ============================================================================

let ACTIVIDADES_MOCK: ActividadPlanificada[] = [
  {
    id: '1',
    nombre: 'Siembra de Café - Lote Norte',
    descripcion: 'Siembra de 500 plantas de café arábigo en el lote norte',
    tipo: TipoActividad.SIEMBRA,
    prioridad: NivelPrioridad.ALTA,
    estado: EstadoActividad.COMPLETADA,
    fecha_inicio_planificada: new Date('2024-10-01'),
    fecha_fin_planificada: new Date('2024-10-03'),
    duracion_estimada_horas: 24,
    periodo: PeriodoTiempo.DIA,
    fecha_inicio_real: new Date('2024-10-01'),
    fecha_fin_real: new Date('2024-10-03'),
    duracion_real_horas: 22,
    progreso_porcentaje: 100,
    lote_id: '1',
    lote_nombre: 'Lote Norte A',
    cultivo_id: '1',
    cultivo_nombre: 'Café',
    trabajadores_asignados: ['1', '2', '3'],
    trabajadores_nombres: ['Juan Pérez', 'María García', 'Carlos López'],
    responsable_id: '1',
    responsable_nombre: 'Juan Pérez',
    desviacion_tiempo_dias: 0,
    desviacion_recursos_porcentaje: -8, // 8% menos recursos usados
    rendimiento_trabajadores: [
      { trabajador_id: '1', trabajador_nombre: 'Juan Pérez', horas_trabajadas: 8, horas_planificadas: 8, eficiencia_porcentaje: 105, tareas_completadas: 21, tareas_asignadas: 20 },
      { trabajador_id: '2', trabajador_nombre: 'María García', horas_trabajadas: 7, horas_planificadas: 8, eficiencia_porcentaje: 98, tareas_completadas: 19, tareas_asignadas: 20 },
      { trabajador_id: '3', trabajador_nombre: 'Carlos López', horas_trabajadas: 7, horas_planificadas: 8, eficiencia_porcentaje: 100, tareas_completadas: 20, tareas_asignadas: 20 }
    ],
    alertas_activas: [],
    requiere_atencion: false,
    fecha_creacion: new Date('2024-09-25'),
    creado_por: 'Admin'
  },
  {
    id: '2',
    nombre: 'Cosecha de Banano - Lote Sur',
    descripcion: 'Cosecha programada de banano tipo exportación',
    tipo: TipoActividad.COSECHA,
    prioridad: NivelPrioridad.URGENTE,
    estado: EstadoActividad.ATRASADA,
    fecha_inicio_planificada: new Date('2024-10-15'),
    fecha_fin_planificada: new Date('2024-10-17'),
    duracion_estimada_horas: 32,
    periodo: PeriodoTiempo.DIA,
    fecha_inicio_real: new Date('2024-10-16'),
    duracion_real_horas: 28,
    progreso_porcentaje: 65,
    lote_id: '2',
    lote_nombre: 'Lote Sur B',
    cultivo_id: '2',
    cultivo_nombre: 'Banano',
    trabajadores_asignados: ['2', '3', '4', '5'],
    trabajadores_nombres: ['María García', 'Carlos López', 'Ana Martínez', 'Pedro Rodríguez'],
    responsable_id: '2',
    responsable_nombre: 'María García',
    desviacion_tiempo_dias: 2,
    desviacion_recursos_porcentaje: 15,
    rendimiento_trabajadores: [
      { trabajador_id: '2', trabajador_nombre: 'María García', horas_trabajadas: 12, horas_planificadas: 16, eficiencia_porcentaje: 75, tareas_completadas: 24, tareas_asignadas: 32 },
      { trabajador_id: '3', trabajador_nombre: 'Carlos López', horas_trabajadas: 10, horas_planificadas: 16, eficiencia_porcentaje: 70, tareas_completadas: 22, tareas_asignadas: 32 }
    ],
    alertas_activas: [
      {
        id: 'a1',
        tipo: TipoAlerta.RETRASO,
        severidad: 'ERROR',
        titulo: 'Cosecha atrasada',
        mensaje: 'La cosecha de banano lleva 2 días de retraso. Se recomienda asignar más personal.',
        actividad_id: '2',
        fecha_generacion: new Date(),
        leida: false,
        resuelta: false
      },
      {
        id: 'a2',
        tipo: TipoAlerta.BAJO_RENDIMIENTO,
        severidad: 'WARNING',
        titulo: 'Bajo rendimiento del equipo',
        mensaje: 'El equipo está trabajando al 72% de eficiencia esperada.',
        actividad_id: '2',
        fecha_generacion: new Date(),
        leida: false,
        resuelta: false
      }
    ],
    requiere_atencion: true,
    fecha_creacion: new Date('2024-10-10'),
    creado_por: 'Admin'
  },
  {
    id: '3',
    nombre: 'Fumigación Preventiva - Lote Este',
    descripcion: 'Fumigación preventiva contra plagas en el lote este',
    tipo: TipoActividad.FUMIGACION,
    prioridad: NivelPrioridad.ALTA,
    estado: EstadoActividad.EN_PROGRESO,
    fecha_inicio_planificada: new Date('2024-10-20'),
    fecha_fin_planificada: new Date('2024-10-22'),
    duracion_estimada_horas: 16,
    periodo: PeriodoTiempo.SEMANA,
    fecha_inicio_real: new Date('2024-10-20'),
    duracion_real_horas: 8,
    progreso_porcentaje: 50,
    lote_id: '3',
    lote_nombre: 'Lote Este C',
    cultivo_id: '3',
    cultivo_nombre: 'Maíz',
    trabajadores_asignados: ['4', '5'],
    trabajadores_nombres: ['Ana Martínez', 'Pedro Rodríguez'],
    responsable_id: '4',
    responsable_nombre: 'Ana Martínez',
    desviacion_tiempo_dias: 0,
    rendimiento_trabajadores: [
      { trabajador_id: '4', trabajador_nombre: 'Ana Martínez', horas_trabajadas: 4, horas_planificadas: 8, eficiencia_porcentaje: 95, tareas_completadas: 8, tareas_asignadas: 16 },
      { trabajador_id: '5', trabajador_nombre: 'Pedro Rodríguez', horas_trabajadas: 4, horas_planificadas: 8, eficiencia_porcentaje: 92, tareas_completadas: 7, tareas_asignadas: 16 }
    ],
    alertas_activas: [],
    requiere_atencion: false,
    fecha_creacion: new Date('2024-10-15'),
    creado_por: 'Admin'
  },
  {
    id: '4',
    nombre: 'Fertilización Mensual - Lote Este',
    descripcion: 'Aplicación de fertilizante orgánico en el lote este',
    tipo: TipoActividad.FERTILIZACION,
    prioridad: NivelPrioridad.MEDIA,
    estado: EstadoActividad.PENDIENTE,
    fecha_inicio_planificada: new Date('2024-10-25'),
    fecha_fin_planificada: new Date('2024-10-27'),
    duracion_estimada_horas: 20,
    periodo: PeriodoTiempo.MES,
    progreso_porcentaje: 0,
    lote_id: '3',
    lote_nombre: 'Lote Este C',
    cultivo_id: '3',
    cultivo_nombre: 'Maíz',
    trabajadores_asignados: ['1', '3'],
    trabajadores_nombres: ['Juan Pérez', 'Carlos López'],
    responsable_id: '1',
    responsable_nombre: 'Juan Pérez',
    recursos_necesarios: [
      { tipo: 'INSUMO', nombre: 'Fertilizante Orgánico', cantidad_planificada: 200, unidad: 'kg' },
      { tipo: 'HERRAMIENTA', nombre: 'Esparcidor', cantidad_planificada: 2, unidad: 'unidad' }
    ],
    alertas_activas: [],
    requiere_atencion: false,
    fecha_creacion: new Date('2024-10-18'),
    creado_por: 'Admin'
  },
  {
    id: '5',
    nombre: 'Mantenimiento de Sistema de Riego - Lote Norte',
    descripcion: 'Revisión y mantenimiento del sistema de riego automatizado en lote norte',
    tipo: TipoActividad.MANTENIMIENTO,
    prioridad: NivelPrioridad.ALTA,
    estado: EstadoActividad.EN_PROGRESO,
    fecha_inicio_planificada: new Date('2024-10-22'),
    fecha_fin_planificada: new Date('2024-10-24'),
    duracion_estimada_horas: 12,
    periodo: PeriodoTiempo.SEMANA,
    fecha_inicio_real: new Date('2024-10-22'),
    duracion_real_horas: 6,
    progreso_porcentaje: 40,
    lote_id: '1',
    lote_nombre: 'Lote Norte A',
    cultivo_id: '1',
    cultivo_nombre: 'Café',
    trabajadores_asignados: ['5'],
    trabajadores_nombres: ['Pedro Rodríguez'],
    responsable_id: '5',
    responsable_nombre: 'Pedro Rodríguez',
    alertas_activas: [
      {
        id: 'a3',
        tipo: TipoAlerta.FALTA_RECURSOS,
        severidad: 'WARNING',
        titulo: 'Falta de repuestos',
        mensaje: 'Se detectó falta de válvulas de repuesto para completar el mantenimiento.',
        actividad_id: '5',
        fecha_generacion: new Date(),
        leida: false,
        resuelta: false
      }
    ],
    requiere_atencion: true,
    fecha_creacion: new Date('2024-10-20'),
    creado_por: 'Admin'
  },
  {
    id: '6',
    nombre: 'Cosecha de Papa - Lote Oeste',
    descripcion: 'Cosecha programada de papa criolla',
    tipo: TipoActividad.COSECHA,
    prioridad: NivelPrioridad.ALTA,
    estado: EstadoActividad.PENDIENTE,
    fecha_inicio_planificada: new Date('2024-10-28'),
    fecha_fin_planificada: new Date('2024-10-30'),
    duracion_estimada_horas: 24,
    periodo: PeriodoTiempo.DIA,
    progreso_porcentaje: 0,
    lote_id: '4',
    lote_nombre: 'Lote Oeste D',
    cultivo_id: '4',
    cultivo_nombre: 'Papa',
    trabajadores_asignados: ['1', '2', '4'],
    trabajadores_nombres: ['Juan Pérez', 'María García', 'Ana Martínez'],
    responsable_id: '1',
    responsable_nombre: 'Juan Pérez',
    alertas_activas: [],
    requiere_atencion: false,
    fecha_creacion: new Date('2024-10-23'),
    creado_por: 'Admin',
    metas: [
      { id: 'm1', descripcion: 'Kilos de papa cosechados', valor_objetivo: 2500, unidad: 'kg', cumplida: false },
      { id: 'm2', descripcion: 'Sacos recolectados', valor_objetivo: 50, unidad: 'sacos', cumplida: false }
    ]
  },
  {
    id: '7',
    nombre: 'Preparación de Suelo - Lote Central',
    descripcion: 'Arado y preparación del suelo para nueva siembra',
    tipo: TipoActividad.MANTENIMIENTO,
    prioridad: NivelPrioridad.MEDIA,
    estado: EstadoActividad.EN_PROGRESO,
    fecha_inicio_planificada: new Date('2024-10-23'),
    fecha_fin_planificada: new Date('2024-10-25'),
    duracion_estimada_horas: 16,
    periodo: PeriodoTiempo.DIA,
    fecha_inicio_real: new Date('2024-10-23'),
    duracion_real_horas: 10,
    progreso_porcentaje: 60,
    lote_id: '5',
    lote_nombre: 'Lote Central E',
    cultivo_id: '5',
    cultivo_nombre: 'Tomate',
    trabajadores_asignados: ['3', '5'],
    trabajadores_nombres: ['Carlos López', 'Pedro Rodríguez'],
    responsable_id: '3',
    responsable_nombre: 'Carlos López',
    rendimiento_trabajadores: [
      { trabajador_id: '3', trabajador_nombre: 'Carlos López', horas_trabajadas: 5, horas_planificadas: 8, eficiencia_porcentaje: 88, tareas_completadas: 9, tareas_asignadas: 12 },
      { trabajador_id: '5', trabajador_nombre: 'Pedro Rodríguez', horas_trabajadas: 5, horas_planificadas: 8, eficiencia_porcentaje: 90, tareas_completadas: 10, tareas_asignadas: 12 }
    ],
    alertas_activas: [],
    requiere_atencion: false,
    fecha_creacion: new Date('2024-10-20'),
    creado_por: 'Admin',
    metas: [
      { id: 'm3', descripcion: 'Hectáreas aradas', valor_objetivo: 2.5, valor_actual: 1.5, unidad: 'ha', cumplida: false, porcentaje_cumplimiento: 60 }
    ]
  },
  {
    id: '8',
    nombre: 'Riego Intensivo - Lote Sur',
    descripcion: 'Riego intensivo debido a sequía',
    tipo: TipoActividad.RIEGO,
    prioridad: NivelPrioridad.URGENTE,
    estado: EstadoActividad.EN_PROGRESO,
    fecha_inicio_planificada: new Date('2024-10-21'),
    fecha_fin_planificada: new Date('2024-10-27'),
    duracion_estimada_horas: 48,
    periodo: PeriodoTiempo.SEMANA,
    fecha_inicio_real: new Date('2024-10-21'),
    duracion_real_horas: 32,
    progreso_porcentaje: 75,
    lote_id: '2',
    lote_nombre: 'Lote Sur B',
    cultivo_id: '2',
    cultivo_nombre: 'Banano',
    trabajadores_asignados: ['4', '5'],
    trabajadores_nombres: ['Ana Martínez', 'Pedro Rodríguez'],
    responsable_id: '4',
    responsable_nombre: 'Ana Martínez',
    rendimiento_trabajadores: [
      { trabajador_id: '4', trabajador_nombre: 'Ana Martínez', horas_trabajadas: 16, horas_planificadas: 24, eficiencia_porcentaje: 85, tareas_completadas: 18, tareas_asignadas: 24 },
      { trabajador_id: '5', trabajador_nombre: 'Pedro Rodríguez', horas_trabajadas: 16, horas_planificadas: 24, eficiencia_porcentaje: 80, tareas_completadas: 17, tareas_asignadas: 24 }
    ],
    alertas_activas: [
      {
        id: 'a4',
        tipo: TipoAlerta.CLIMA_ADVERSO,
        severidad: 'WARNING',
        titulo: 'Sequía prolongada',
        mensaje: 'Se requiere riego adicional debido a falta de lluvias',
        actividad_id: '8',
        fecha_generacion: new Date(),
        leida: false,
        resuelta: false
      }
    ],
    requiere_atencion: true,
    fecha_creacion: new Date('2024-10-18'),
    creado_por: 'Admin',
    metas: [
      { id: 'm4', descripcion: 'Litros de agua aplicados', valor_objetivo: 15000, valor_actual: 11250, unidad: 'L', cumplida: false, porcentaje_cumplimiento: 75 }
    ]
  }
];

// Simular delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// ============================================================================
// FUNCIONES DE CÁLCULO
// ============================================================================

/**
 * Calcula la desviación de tiempo entre lo planificado y lo real
 */
function calcularDesviacionTiempo(actividad: ActividadPlanificada): number {
  if (!actividad.fecha_inicio_real) return 0;
  
  const hoy = new Date();
  const fechaFinEsperada = new Date(actividad.fecha_fin_planificada);
  const fechaFinReal = actividad.fecha_fin_real || hoy;
  
  const diferenciaDias = Math.ceil((fechaFinReal.getTime() - fechaFinEsperada.getTime()) / (1000 * 60 * 60 * 24));
  return diferenciaDias;
}

/**
 * Genera alertas automáticas basadas en el estado de la actividad
 */
function generarAlertas(actividad: ActividadPlanificada): Alerta[] {
  const alertas: Alerta[] = [];
  const hoy = new Date();
  
  // Alerta por retraso
  if (actividad.desviacion_tiempo_dias && actividad.desviacion_tiempo_dias > 0) {
    alertas.push({
      id: `alert-${actividad.id}-retraso`,
      tipo: TipoAlerta.RETRASO,
      severidad: actividad.desviacion_tiempo_dias > 3 ? 'CRITICAL' : 'WARNING',
      titulo: 'Actividad atrasada',
      mensaje: `La actividad lleva ${actividad.desviacion_tiempo_dias} días de retraso`,
      actividad_id: actividad.id,
      fecha_generacion: hoy,
      leida: false,
      resuelta: false
    });
  }
  
  // Alerta por actividad vencida
  if (actividad.estado !== EstadoActividad.COMPLETADA && 
      new Date(actividad.fecha_fin_planificada) < hoy) {
    alertas.push({
      id: `alert-${actividad.id}-vencida`,
      tipo: TipoAlerta.ACTIVIDAD_VENCIDA,
      severidad: 'ERROR',
      titulo: 'Actividad vencida',
      mensaje: 'La fecha límite de esta actividad ha pasado',
      actividad_id: actividad.id,
      fecha_generacion: hoy,
      leida: false,
      resuelta: false
    });
  }
  
  // Alerta por bajo rendimiento
  const rendimientoPromedio = actividad.rendimiento_trabajadores?.reduce((sum, r) => 
    sum + r.eficiencia_porcentaje, 0) / (actividad.rendimiento_trabajadores?.length || 1);
  
  if (rendimientoPromedio < 80 && actividad.rendimiento_trabajadores?.length) {
    alertas.push({
      id: `alert-${actividad.id}-rendimiento`,
      tipo: TipoAlerta.BAJO_RENDIMIENTO,
      severidad: 'WARNING',
      titulo: 'Bajo rendimiento detectado',
      mensaje: `Eficiencia promedio del equipo: ${rendimientoPromedio.toFixed(1)}%`,
      actividad_id: actividad.id,
      fecha_generacion: hoy,
      leida: false,
      resuelta: false
    });
  }
  
  return alertas;
}

/**
 * Actualiza el estado de una actividad basándose en fechas y progreso
 */
function actualizarEstadoActividad(actividad: ActividadPlanificada): EstadoActividad {
  const hoy = new Date();
  
  if (actividad.progreso_porcentaje === 100) {
    return EstadoActividad.COMPLETADA;
  }
  
  if (actividad.fecha_inicio_real && actividad.progreso_porcentaje > 0) {
    if (hoy > new Date(actividad.fecha_fin_planificada)) {
      return EstadoActividad.ATRASADA;
    }
    return EstadoActividad.EN_PROGRESO;
  }
  
  if (hoy > new Date(actividad.fecha_fin_planificada)) {
    return EstadoActividad.ATRASADA;
  }
  
  return EstadoActividad.PENDIENTE;
}

// ============================================================================
// SERVICIO DE PLANIFICACIÓN
// ============================================================================

export const planificacionService = {
  /**
   * Obtener todas las actividades
   */
  getAll: async (filtros?: FiltrosPlanificacion): Promise<ActividadPlanificada[]> => {
    await delay(300);
    
    let actividades = [...ACTIVIDADES_MOCK];
    
    // Aplicar filtros
    if (filtros) {
      if (filtros.estado && filtros.estado.length > 0) {
        actividades = actividades.filter(a => filtros.estado!.includes(a.estado));
      }
      
      if (filtros.tipo && filtros.tipo.length > 0) {
        actividades = actividades.filter(a => filtros.tipo!.includes(a.tipo));
      }
      
      if (filtros.prioridad && filtros.prioridad.length > 0) {
        actividades = actividades.filter(a => filtros.prioridad!.includes(a.prioridad));
      }
      
      if (filtros.solo_atrasadas) {
        actividades = actividades.filter(a => a.estado === EstadoActividad.ATRASADA);
      }
      
      if (filtros.solo_con_alertas) {
        actividades = actividades.filter(a => a.alertas_activas.length > 0);
      }
      
      if (filtros.lote_id) {
        actividades = actividades.filter(a => a.lote_id === filtros.lote_id);
      }
      
      if (filtros.trabajador_id) {
        actividades = actividades.filter(a => 
          a.trabajadores_asignados.includes(filtros.trabajador_id!)
        );
      }
      
      if (filtros.busqueda) {
        const busqueda = filtros.busqueda.toLowerCase();
        actividades = actividades.filter(a =>
          a.nombre.toLowerCase().includes(busqueda) ||
          a.descripcion.toLowerCase().includes(busqueda)
        );
      }
    }
    
    return actividades;
  },
  
  /**
   * Obtener por ID
   */
  getById: async (id: string): Promise<ActividadPlanificada> => {
    await delay(200);
    const actividad = ACTIVIDADES_MOCK.find(a => a.id === id);
    if (!actividad) throw new Error('Actividad no encontrada');
    return actividad;
  },
  
  /**
   * Crear actividad
   */
  create: async (data: CreateActividadDto): Promise<ActividadPlanificada> => {
    await delay(400);
    
    const nueva: ActividadPlanificada = {
      ...data,
      id: Date.now().toString(),
      estado: data.estado || EstadoActividad.PENDIENTE,
      progreso_porcentaje: data.progreso_porcentaje || 0,
      alertas_activas: [],
      requiere_atencion: false,
      fecha_creacion: new Date()
    };
    
    ACTIVIDADES_MOCK.push(nueva);
    return nueva;
  },
  
  /**
   * Actualizar actividad
   */
  update: async (id: string, data: UpdateActividadDto): Promise<ActividadPlanificada> => {
    await delay(400);
    
    const index = ACTIVIDADES_MOCK.findIndex(a => a.id === id);
    if (index === -1) throw new Error('Actividad no encontrada');
    
    ACTIVIDADES_MOCK[index] = {
      ...ACTIVIDADES_MOCK[index],
      ...data,
      ultima_actualizacion: new Date()
    };
    
    // Recalcular desviaciones y alertas
    ACTIVIDADES_MOCK[index].desviacion_tiempo_dias = calcularDesviacionTiempo(ACTIVIDADES_MOCK[index]);
    ACTIVIDADES_MOCK[index].estado = actualizarEstadoActividad(ACTIVIDADES_MOCK[index]);
    ACTIVIDADES_MOCK[index].alertas_activas = generarAlertas(ACTIVIDADES_MOCK[index]);
    ACTIVIDADES_MOCK[index].requiere_atencion = ACTIVIDADES_MOCK[index].alertas_activas.some(a => 
      a.severidad === 'ERROR' || a.severidad === 'CRITICAL'
    );
    
    return ACTIVIDADES_MOCK[index];
  },
  
  /**
   * Actualizar progreso de actividad
   */
  actualizarProgreso: async (id: string, data: ActualizarProgresoDto): Promise<ActividadPlanificada> => {
    await delay(300);
    
    const index = ACTIVIDADES_MOCK.findIndex(a => a.id === id);
    if (index === -1) throw new Error('Actividad no encontrada');
    
    ACTIVIDADES_MOCK[index] = {
      ...ACTIVIDADES_MOCK[index],
      progreso_porcentaje: data.progreso_porcentaje,
      notas: data.notas || ACTIVIDADES_MOCK[index].notas,
      recursos_utilizados: data.recursos_utilizados || ACTIVIDADES_MOCK[index].recursos_utilizados,
      rendimiento_trabajadores: data.rendimiento_trabajadores || ACTIVIDADES_MOCK[index].rendimiento_trabajadores,
      ultima_actualizacion: new Date()
    };
    
    // Si es la primera vez que se inicia
    if (!ACTIVIDADES_MOCK[index].fecha_inicio_real && data.progreso_porcentaje > 0) {
      ACTIVIDADES_MOCK[index].fecha_inicio_real = new Date();
    }
    
    // Si se completa
    if (data.progreso_porcentaje === 100 && !ACTIVIDADES_MOCK[index].fecha_fin_real) {
      ACTIVIDADES_MOCK[index].fecha_fin_real = new Date();
    }
    
    // Actualizar estado y alertas
    ACTIVIDADES_MOCK[index].estado = actualizarEstadoActividad(ACTIVIDADES_MOCK[index]);
    ACTIVIDADES_MOCK[index].alertas_activas = generarAlertas(ACTIVIDADES_MOCK[index]);
    
    return ACTIVIDADES_MOCK[index];
  },
  
  /**
   * Eliminar actividad
   */
  delete: async (id: string): Promise<void> => {
    await delay(300);
    const index = ACTIVIDADES_MOCK.findIndex(a => a.id === id);
    if (index === -1) throw new Error('Actividad no encontrada');
    ACTIVIDADES_MOCK.splice(index, 1);
  },
  
  /**
   * Obtener estadísticas generales
   */
  getEstadisticas: async (): Promise<EstadisticasPlanificacion> => {
    await delay(200);
    
    const actividades = ACTIVIDADES_MOCK;
    const total = actividades.length;
    
    const porEstado = {
      [EstadoActividad.PENDIENTE]: actividades.filter(a => a.estado === EstadoActividad.PENDIENTE).length,
      [EstadoActividad.EN_PROGRESO]: actividades.filter(a => a.estado === EstadoActividad.EN_PROGRESO).length,
      [EstadoActividad.COMPLETADA]: actividades.filter(a => a.estado === EstadoActividad.COMPLETADA).length,
      [EstadoActividad.ATRASADA]: actividades.filter(a => a.estado === EstadoActividad.ATRASADA).length,
      [EstadoActividad.CANCELADA]: actividades.filter(a => a.estado === EstadoActividad.CANCELADA).length,
    };
    
    const completadasATiempo = actividades.filter(a => 
      a.estado === EstadoActividad.COMPLETADA && 
      (a.desviacion_tiempo_dias || 0) <= 0
    ).length;
    
    const tasaCumplimiento = total > 0 ? (completadasATiempo / porEstado[EstadoActividad.COMPLETADA] * 100) || 0 : 0;
    
    const desviacionPromedio = actividades.reduce((sum, a) => 
      sum + (a.desviacion_tiempo_dias || 0), 0) / total || 0;
    
    const alertas = actividades.flatMap(a => a.alertas_activas);
    const alertasCriticas = alertas.filter(a => a.severidad === 'CRITICAL' || a.severidad === 'ERROR').length;
    
    const eficienciaGeneral = actividades.reduce((sum, a) => {
      const rendimientoPromedio = a.rendimiento_trabajadores?.reduce((s, r) => 
        s + r.eficiencia_porcentaje, 0) / (a.rendimiento_trabajadores?.length || 1) || 0;
      return sum + rendimientoPromedio;
    }, 0) / total || 0;
    
    const porTipo = Object.values(TipoActividad).reduce((acc, tipo) => {
      acc[tipo] = actividades.filter(a => a.tipo === tipo).length;
      return acc;
    }, {} as Record<TipoActividad, number>);
    
    return {
      total_actividades: total,
      actividades_pendientes: porEstado[EstadoActividad.PENDIENTE],
      actividades_en_progreso: porEstado[EstadoActividad.EN_PROGRESO],
      actividades_completadas: porEstado[EstadoActividad.COMPLETADA],
      actividades_atrasadas: porEstado[EstadoActividad.ATRASADA],
      tasa_cumplimiento_porcentaje: tasaCumplimiento,
      promedio_desviacion_tiempo_dias: desviacionPromedio,
      alertas_activas: alertas.filter(a => !a.resuelta).length,
      alertas_criticas: alertasCriticas,
      eficiencia_general_porcentaje: eficienciaGeneral,
      rendimiento_promedio_trabajadores: eficienciaGeneral,
      actividades_por_tipo: porTipo,
      actividades_por_estado: porEstado
    };
  },
  
  /**
   * Generar reporte de comparación planificado vs real
   */
  getComparacion: async (actividadId: string): Promise<ComparacionPlanificadoReal> => {
    await delay(200);
    
    const actividad = ACTIVIDADES_MOCK.find(a => a.id === actividadId);
    if (!actividad) throw new Error('Actividad no encontrada');
    
    return {
      actividad_id: actividad.id,
      actividad_nombre: actividad.nombre,
      tiempo_planificado_horas: actividad.duracion_estimada_horas,
      tiempo_real_horas: actividad.duracion_real_horas || 0,
      desviacion_tiempo_porcentaje: actividad.duracion_real_horas 
        ? ((actividad.duracion_real_horas - actividad.duracion_estimada_horas) / actividad.duracion_estimada_horas * 100)
        : 0,
      recursos_planificados: actividad.recursos_necesarios?.reduce((s, r) => s + r.cantidad_planificada, 0) || 0,
      recursos_utilizados: actividad.recursos_utilizados?.reduce((s, r) => s + r.cantidad_utilizada, 0) || 0,
      desviacion_recursos_porcentaje: actividad.desviacion_recursos_porcentaje || 0,
      trabajadores_planificados: actividad.trabajadores_asignados.length,
      trabajadores_reales: actividad.rendimiento_trabajadores?.length || 0
    };
  }
};

export default planificacionService;

