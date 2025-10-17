import api from '@/lib/axios';
import {
  ActividadPlanificada,
  CreateActividadDto,
  UpdateActividadDto,
  EstadisticasPlanificacion
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
    const dataToSend = {
      ...actividadData,
      lote_id: actividadData.lote_id ? parseInt(actividadData.lote_id as any) : undefined,
      cultivo_id: actividadData.cultivo_id ? parseInt(actividadData.cultivo_id as any) : undefined,
      responsable_id: actividadData.responsable_id ? parseInt(actividadData.responsable_id as any) : undefined,
      trabajadores_asignados: actividadData.trabajadores_asignados?.map(id => parseInt(id as any))
    };

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
    const dataToSend = {
      ...actividadData,
      lote_id: actividadData.lote_id ? parseInt(actividadData.lote_id as any) : undefined,
      cultivo_id: actividadData.cultivo_id ? parseInt(actividadData.cultivo_id as any) : undefined,
      responsable_id: actividadData.responsable_id ? parseInt(actividadData.responsable_id as any) : undefined,
      trabajadores_asignados: actividadData.trabajadores_asignados?.map(id => parseInt(id as any))
    };

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
      actividades_por_estado: {
        pendientes: data.pendientes || 0,
        en_progreso: data.en_progreso || 0,
        completadas: data.completadas || 0,
        atrasadas: data.atrasadas || 0
      },
      progreso_promedio: data.progreso_promedio || 0,
      actividades_requieren_atencion: data.requieren_atencion || 0,
      actividades_proximas: 0, // Este dato se puede calcular en frontend si es necesario
      horas_planificadas_totales: 0,
      horas_reales_totales: 0,
      eficiencia_global: 0,
      alertas_criticas_count: 0
    };
  }
};

export default planificacionService;
