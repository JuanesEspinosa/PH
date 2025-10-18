import api from '@/lib/axios';
import {
  ActividadPlanificada,
  CreateActividadDto,
  UpdateActividadDto,
  EstadisticasPlanificacion,
  EstadoActividad,
  TipoActividad
} from '@/types/planificacion';

// ============================================================================
// SERVICIOS - API REAL
// ============================================================================

export const planificacionService = {
  // Obtener todas las actividades
  obtenerActividades: async (): Promise<ActividadPlanificada[]> => {
    const { data } = await api.get<ActividadPlanificada[]>('/planificacion');
    return data.map(actividad => ({
      ...actividad,
      id: actividad.id.toString(),
      lote_id: actividad.lote_id?.toString(),
      cultivo_id: actividad.cultivo_id?.toString(),
      responsable_id: actividad.responsable_id?.toString(),
      fecha_inicio_planificada: new Date(actividad.fecha_inicio_planificada),
      fecha_fin_planificada: new Date(actividad.fecha_fin_planificada),
      fecha_inicio_real: actividad.fecha_inicio_real ? new Date(actividad.fecha_inicio_real) : undefined,
      fecha_fin_real: actividad.fecha_fin_real ? new Date(actividad.fecha_fin_real) : undefined,
      fecha_creacion: new Date(actividad.fecha_creacion)
    }));
  },

  // Obtener una actividad por ID
  obtenerActividadPorId: async (id: string): Promise<ActividadPlanificada> => {
    const { data } = await api.get<ActividadPlanificada>(`/planificacion/${id}`);
    return {
      ...data,
      id: data.id.toString(),
      lote_id: data.lote_id?.toString(),
      cultivo_id: data.cultivo_id?.toString(),
      responsable_id: data.responsable_id?.toString(),
      fecha_inicio_planificada: new Date(data.fecha_inicio_planificada),
      fecha_fin_planificada: new Date(data.fecha_fin_planificada),
      fecha_inicio_real: data.fecha_inicio_real ? new Date(data.fecha_inicio_real) : undefined,
      fecha_fin_real: data.fecha_fin_real ? new Date(data.fecha_fin_real) : undefined,
      fecha_creacion: new Date(data.fecha_creacion)
    };
  },

  // Obtener actividades de un lote específico
  obtenerActividadesPorLote: async (loteId: string): Promise<ActividadPlanificada[]> => {
    const { data } = await api.get<ActividadPlanificada[]>(`/planificacion/lote/${loteId}`);
    return data.map(actividad => ({
      ...actividad,
      id: actividad.id.toString(),
      lote_id: actividad.lote_id?.toString(),
      cultivo_id: actividad.cultivo_id?.toString(),
      responsable_id: actividad.responsable_id?.toString(),
      fecha_inicio_planificada: new Date(actividad.fecha_inicio_planificada),
      fecha_fin_planificada: new Date(actividad.fecha_fin_planificada),
      fecha_inicio_real: actividad.fecha_inicio_real ? new Date(actividad.fecha_inicio_real) : undefined,
      fecha_fin_real: actividad.fecha_fin_real ? new Date(actividad.fecha_fin_real) : undefined,
      fecha_creacion: new Date(actividad.fecha_creacion)
    }));
  },

  // Crear una actividad
  crearActividad: async (actividadData: CreateActividadDto): Promise<ActividadPlanificada> => {
    // Convertir IDs de string a number
    const dataToSend: any = {
      ...actividadData,
      lote_id: actividadData.lote_id ? parseInt(actividadData.lote_id as any) : undefined,
      cultivo_id: actividadData.cultivo_id ? parseInt(actividadData.cultivo_id as any) : undefined,
      responsable_id: actividadData.responsable_id ? parseInt(actividadData.responsable_id as any) : undefined,
    };

    // Solo enviar trabajadores si están definidos y no son del mock
    // Por ahora, no enviar trabajadores hasta tener usuarios reales en la BD
    if (actividadData.trabajadores_asignados && actividadData.trabajadores_asignados.length > 0) {
      // Comentado temporalmente hasta tener usuarios reales
      // dataToSend.trabajadores_asignados = actividadData.trabajadores_asignados.map(id => parseInt(id as any));
      console.warn('Trabajadores ignorados: necesitas crear usuarios en la BD primero');
    }

    const { data } = await api.post<ActividadPlanificada>('/planificacion', dataToSend);
    return {
      ...data,
      id: data.id.toString(),
      lote_id: data.lote_id?.toString(),
      cultivo_id: data.cultivo_id?.toString(),
      responsable_id: data.responsable_id?.toString(),
      fecha_inicio_planificada: new Date(data.fecha_inicio_planificada),
      fecha_fin_planificada: new Date(data.fecha_fin_planificada),
      fecha_inicio_real: data.fecha_inicio_real ? new Date(data.fecha_inicio_real) : undefined,
      fecha_fin_real: data.fecha_fin_real ? new Date(data.fecha_fin_real) : undefined,
      fecha_creacion: new Date(data.fecha_creacion)
    };
  },

  // Actualizar una actividad
  actualizarActividad: async (id: string, actividadData: UpdateActividadDto): Promise<ActividadPlanificada> => {
    // Convertir IDs de string a number
    const dataToSend: any = {
      ...actividadData,
      lote_id: actividadData.lote_id ? parseInt(actividadData.lote_id as any) : undefined,
      cultivo_id: actividadData.cultivo_id ? parseInt(actividadData.cultivo_id as any) : undefined,
      responsable_id: actividadData.responsable_id ? parseInt(actividadData.responsable_id as any) : undefined,
    };

    // Solo enviar trabajadores si están definidos y no son del mock
    if (actividadData.trabajadores_asignados && actividadData.trabajadores_asignados.length > 0) {
      // Comentado temporalmente hasta tener usuarios reales
      // dataToSend.trabajadores_asignados = actividadData.trabajadores_asignados.map(id => parseInt(id as any));
      console.warn('Trabajadores ignorados: necesitas crear usuarios en la BD primero');
    }

    const { data } = await api.put<ActividadPlanificada>(`/planificacion/${id}`, dataToSend);
    return {
      ...data,
      id: data.id.toString(),
      lote_id: data.lote_id?.toString(),
      cultivo_id: data.cultivo_id?.toString(),
      responsable_id: data.responsable_id?.toString(),
      fecha_inicio_planificada: new Date(data.fecha_inicio_planificada),
      fecha_fin_planificada: new Date(data.fecha_fin_planificada),
      fecha_inicio_real: data.fecha_inicio_real ? new Date(data.fecha_inicio_real) : undefined,
      fecha_fin_real: data.fecha_fin_real ? new Date(data.fecha_fin_real) : undefined,
      fecha_creacion: new Date(data.fecha_creacion)
    };
  },

  // Eliminar una actividad
  eliminarActividad: async (id: string): Promise<void> => {
    await api.delete(`/planificacion/${id}`);
  },

  // Obtener estadísticas
  obtenerEstadisticas: async (): Promise<EstadisticasPlanificacion> => {
    const { data } = await api.get<any>('/planificacion/estadisticas');
    
    // Mapear a la estructura esperada por el frontend
    return {
      total_actividades: data.total_actividades || 0,
      actividades_pendientes: data.pendientes || 0,
      actividades_en_progreso: data.en_progreso || 0,
      actividades_completadas: data.completadas || 0,
      actividades_atrasadas: data.atrasadas || 0,
      
      tasa_cumplimiento_porcentaje: data.tasa_cumplimiento || 0,
      promedio_desviacion_tiempo_dias: data.promedio_desviacion || 0,
      
      alertas_activas: data.alertas_activas || 0,
      alertas_criticas: data.alertas_criticas || 0,
      
      eficiencia_general_porcentaje: data.eficiencia_general || 0,
      rendimiento_promedio_trabajadores: data.rendimiento_promedio || 0,
      
      actividades_por_tipo: {
        [TipoActividad.SIEMBRA]: data.por_tipo?.siembra || 0,
        [TipoActividad.RIEGO]: data.por_tipo?.riego || 0,
        [TipoActividad.FUMIGACION]: data.por_tipo?.fumigacion || 0,
        [TipoActividad.FERTILIZACION]: data.por_tipo?.fertilizacion || 0,
        [TipoActividad.COSECHA]: data.por_tipo?.cosecha || 0,
        [TipoActividad.MANTENIMIENTO]: data.por_tipo?.mantenimiento || 0,
        [TipoActividad.PODA]: data.por_tipo?.poda || 0,
        [TipoActividad.CONTROL_PLAGAS]: data.por_tipo?.control_plagas || 0,
        [TipoActividad.OTRO]: data.por_tipo?.otro || 0
      },
      
      actividades_por_estado: {
        [EstadoActividad.PENDIENTE]: data.pendientes || 0,
        [EstadoActividad.EN_PROGRESO]: data.en_progreso || 0,
        [EstadoActividad.COMPLETADA]: data.completadas || 0,
        [EstadoActividad.ATRASADA]: data.atrasadas || 0,
        [EstadoActividad.CANCELADA]: data.canceladas || 0
      }
    };
  },

};

// ============================================================================
// ALIASES PARA COMPATIBILIDAD CON HOOKS (inglés)
// ============================================================================
planificacionService.getAll = async (filtros?: any) => {
  // TODO: Implementar filtros cuando el backend los soporte
  return planificacionService.obtenerActividades();
};

planificacionService.getById = (id: string) => planificacionService.obtenerActividadPorId(id);

planificacionService.create = (data: CreateActividadDto) => planificacionService.crearActividad(data);

planificacionService.update = (id: string, data: UpdateActividadDto) => 
  planificacionService.actualizarActividad(id, data);

planificacionService.delete = (id: string) => planificacionService.eliminarActividad(id);

planificacionService.getEstadisticas = () => planificacionService.obtenerEstadisticas();

planificacionService.actualizarProgreso = async (id: string, data: any) => {
  // Actualizar la actividad con el progreso
  return planificacionService.actualizarActividad(id, {
    progreso_porcentaje: data.progreso_porcentaje,
    fecha_inicio_real: data.fecha_inicio_real,
    fecha_fin_real: data.fecha_fin_real,
    duracion_real_horas: data.duracion_real_horas
  });
};

planificacionService.getComparacion = async (id: string) => {
  // Obtener la actividad y calcular la comparación
  const actividad = await planificacionService.obtenerActividadPorId(id);
  return {
    actividad,
    desviacion_tiempo: actividad.desviacion_tiempo_dias || 0,
    eficiencia: actividad.duracion_real_horas && actividad.duracion_estimada_horas
      ? (actividad.duracion_estimada_horas / actividad.duracion_real_horas) * 100
      : 0
  };
};

export default planificacionService;
