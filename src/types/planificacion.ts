// ============================================================================
// TIPOS PARA PLANIFICACIÓN Y MONITOREO DE ACTIVIDADES
// ============================================================================

export enum PeriodoTiempo {
  DIA = 'DIA',
  SEMANA = 'SEMANA',
  QUINCENAL = 'QUINCENAL',
  MES = 'MES'
}

export enum EstadoActividad {
  PENDIENTE = 'PENDIENTE',
  EN_PROGRESO = 'EN_PROGRESO',
  COMPLETADA = 'COMPLETADA',
  ATRASADA = 'ATRASADA',
  CANCELADA = 'CANCELADA'
}

export enum TipoActividad {
  SIEMBRA = 'SIEMBRA',
  RIEGO = 'RIEGO',
  FUMIGACION = 'FUMIGACION',
  FERTILIZACION = 'FERTILIZACION',
  COSECHA = 'COSECHA',
  MANTENIMIENTO = 'MANTENIMIENTO',
  PODA = 'PODA',
  CONTROL_PLAGAS = 'CONTROL_PLAGAS',
  OTRO = 'OTRO'
}

export enum NivelPrioridad {
  BAJA = 'BAJA',
  MEDIA = 'MEDIA',
  ALTA = 'ALTA',
  URGENTE = 'URGENTE'
}

export enum TipoAlerta {
  RETRASO = 'RETRASO',
  BAJO_RENDIMIENTO = 'BAJO_RENDIMIENTO',
  ACTIVIDAD_VENCIDA = 'ACTIVIDAD_VENCIDA',
  DESVIACION_TIEMPO = 'DESVIACION_TIEMPO',
  DESVIACION_RECURSOS = 'DESVIACION_RECURSOS',
  CLIMA_ADVERSO = 'CLIMA_ADVERSO',
  FALTA_RECURSOS = 'FALTA_RECURSOS'
}

// ============================================================================
// INTERFACES PRINCIPALES
// ============================================================================

export interface ActividadPlanificada {
  id: string;
  nombre: string;
  descripcion: string;
  tipo: TipoActividad;
  prioridad: NivelPrioridad;
  estado: EstadoActividad;
  
  // Temporalidad
  fecha_inicio_planificada: Date;
  fecha_fin_planificada: Date;
  duracion_estimada_horas: number;
  periodo: PeriodoTiempo;
  
  // Ejecución real
  fecha_inicio_real?: Date;
  fecha_fin_real?: Date;
  duracion_real_horas?: number;
  progreso_porcentaje: number; // 0-100
  
  // Asignación
  lote_id?: string;
  lote_nombre?: string;
  cultivo_id?: string;
  cultivo_nombre?: string;
  trabajadores_asignados: string[]; // IDs de trabajadores
  trabajadores_nombres?: string[];
  responsable_id?: string;
  responsable_nombre?: string;
  
  // Recursos
  recursos_necesarios?: RecursoNecesario[];
  recursos_utilizados?: RecursoUtilizado[];
  
  // Métricas y desviaciones
  desviacion_tiempo_dias?: number; // Positivo = atrasado, Negativo = adelantado
  desviacion_recursos_porcentaje?: number;
  rendimiento_trabajadores?: RendimientoTrabajador[];
  
  // Alertas y notificaciones
  alertas_activas: Alerta[];
  requiere_atencion: boolean;
  
  // Metas y objetivos
  metas?: MetaActividad[];
  
  // Metadata
  notas?: string;
  fecha_creacion: Date;
  creado_por?: string;
  ultima_actualizacion?: Date;
}

export interface RecursoNecesario {
  tipo: 'INSUMO' | 'HERRAMIENTA' | 'MAQUINARIA';
  id_recurso?: string;
  nombre: string;
  cantidad_planificada: number;
  unidad: string;
}

export interface RecursoUtilizado {
  tipo: 'INSUMO' | 'HERRAMIENTA' | 'MAQUINARIA';
  id_recurso?: string;
  nombre: string;
  cantidad_utilizada: number;
  unidad: string;
  fecha_uso: Date;
}

export interface RendimientoTrabajador {
  trabajador_id: string;
  trabajador_nombre: string;
  horas_trabajadas: number;
  horas_planificadas: number;
  eficiencia_porcentaje: number; // 0-100
  tareas_completadas: number;
  tareas_asignadas: number;
  observaciones?: string;
}

export interface Alerta {
  id: string;
  tipo: TipoAlerta;
  severidad: 'INFO' | 'WARNING' | 'ERROR' | 'CRITICAL';
  titulo: string;
  mensaje: string;
  actividad_id: string;
  fecha_generacion: Date;
  leida: boolean;
  resuelta: boolean;
  fecha_resolucion?: Date;
}

export interface MetaActividad {
  id: string;
  descripcion: string;
  valor_objetivo: number;
  valor_actual?: number;
  unidad: string;
  cumplida: boolean;
  porcentaje_cumplimiento?: number; // 0-100
  fecha_cumplimiento?: Date;
}

// ============================================================================
// ESTADÍSTICAS Y REPORTES
// ============================================================================

export interface EstadisticasPlanificacion {
  total_actividades: number;
  actividades_pendientes: number;
  actividades_en_progreso: number;
  actividades_completadas: number;
  actividades_atrasadas: number;
  
  tasa_cumplimiento_porcentaje: number; // % de actividades completadas a tiempo
  promedio_desviacion_tiempo_dias: number;
  
  alertas_activas: number;
  alertas_criticas: number;
  
  eficiencia_general_porcentaje: number;
  rendimiento_promedio_trabajadores: number;
  
  actividades_por_tipo: Record<TipoActividad, number>;
  actividades_por_estado: Record<EstadoActividad, number>;
}

export interface ComparacionPlanificadoReal {
  actividad_id: string;
  actividad_nombre: string;
  
  tiempo_planificado_horas: number;
  tiempo_real_horas: number;
  desviacion_tiempo_porcentaje: number;
  
  recursos_planificados: number;
  recursos_utilizados: number;
  desviacion_recursos_porcentaje: number;
  
  trabajadores_planificados: number;
  trabajadores_reales: number;
  
  costo_planificado?: number;
  costo_real?: number;
  desviacion_costo_porcentaje?: number;
}

export interface ReporteEficiencia {
  periodo_inicio: Date;
  periodo_fin: Date;
  
  actividades_evaluadas: number;
  tasa_cumplimiento: number;
  eficiencia_promedio: number;
  
  actividades_a_tiempo: number;
  actividades_con_retraso: number;
  retraso_promedio_dias: number;
  
  mejor_trabajador: {
    id: string;
    nombre: string;
    eficiencia: number;
  };
  
  actividades_mas_eficientes: ActividadPlanificada[];
  actividades_con_problemas: ActividadPlanificada[];
  
  recomendaciones: string[];
}

// ============================================================================
// FILTROS Y BÚSQUEDA
// ============================================================================

export interface FiltrosPlanificacion {
  estado?: EstadoActividad[];
  tipo?: TipoActividad[];
  prioridad?: NivelPrioridad[];
  periodo?: PeriodoTiempo;
  fecha_desde?: Date;
  fecha_hasta?: Date;
  lote_id?: string;
  cultivo_id?: string;
  trabajador_id?: string;
  solo_atrasadas?: boolean;
  solo_con_alertas?: boolean;
  busqueda?: string;
}

// ============================================================================
// DTOs
// ============================================================================

export interface CreateActividadDto extends Omit<ActividadPlanificada, 
  'id' | 'estado' | 'progreso_porcentaje' | 'alertas_activas' | 
  'requiere_atencion' | 'fecha_creacion'> {
  estado?: EstadoActividad;
  progreso_porcentaje?: number;
}

export interface UpdateActividadDto extends Partial<CreateActividadDto> {
  fecha_inicio_real?: Date;
  fecha_fin_real?: Date;
  duracion_real_horas?: number;
  progreso_porcentaje?: number;
}

export interface ActualizarProgresoDto {
  progreso_porcentaje: number;
  notas?: string;
  recursos_utilizados?: RecursoUtilizado[];
  rendimiento_trabajadores?: RendimientoTrabajador[];
}

