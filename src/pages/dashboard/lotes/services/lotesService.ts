import api from '@/lib/axios';
import { 
  Lote, 
  CreateLoteDto, 
  UpdateLoteDto, 
  LotesEstadisticas,
  Coordenada
} from '@/types/lotes';

// ============================================================================
// SERVICIOS - API REAL
// ============================================================================

// ============================================================================
// FUNCIONES EXPORTADAS (ALIASES PARA COMPATIBILIDAD)
// ============================================================================

export const lotesService = {
  // Obtener todos los lotes
  obtenerLotes: async (): Promise<Lote[]> => {
    const { data } = await api.get<Lote[]>('/lotes');
    return data.map(lote => ({
      ...lote,
      id: lote.id.toString(),
      cultivo_id: lote.cultivo_id?.toString(),
      fecha_creacion: new Date(lote.fecha_creacion),
      fecha_ultima_modificacion: lote.fecha_ultima_modificacion ? new Date(lote.fecha_ultima_modificacion) : undefined,
      fecha_ultima_actividad: lote.fecha_ultima_actividad ? new Date(lote.fecha_ultima_actividad) : undefined
    }));
  },

  // Obtener un lote por ID
  obtenerLotePorId: async (id: string): Promise<Lote> => {
    const { data } = await api.get<Lote>(`/lotes/${id}`);
    return {
      ...data,
      id: data.id.toString(),
      cultivo_id: data.cultivo_id?.toString(),
      fecha_creacion: new Date(data.fecha_creacion),
      fecha_ultima_modificacion: data.fecha_ultima_modificacion ? new Date(data.fecha_ultima_modificacion) : undefined,
      fecha_ultima_actividad: data.fecha_ultima_actividad ? new Date(data.fecha_ultima_actividad) : undefined
    };
  },

  // Crear un lote
  crearLote: async (loteData: CreateLoteDto): Promise<Lote> => {
    // Convertir cultivo_id de string a number si existe
    const dataToSend = {
      ...loteData,
      cultivo_id: loteData.cultivo_id ? parseInt(loteData.cultivo_id as any) : undefined
    };

    const { data } = await api.post<Lote>('/lotes', dataToSend);
    return {
      ...data,
      id: data.id.toString(),
      cultivo_id: data.cultivo_id?.toString(),
      fecha_creacion: new Date(data.fecha_creacion),
      fecha_ultima_modificacion: data.fecha_ultima_modificacion ? new Date(data.fecha_ultima_modificacion) : undefined,
      fecha_ultima_actividad: data.fecha_ultima_actividad ? new Date(data.fecha_ultima_actividad) : undefined
    };
  },

  // Actualizar un lote
  actualizarLote: async (id: string, loteData: UpdateLoteDto): Promise<Lote> => {
    // Convertir cultivo_id de string a number si existe
    const dataToSend = {
      ...loteData,
      cultivo_id: loteData.cultivo_id ? parseInt(loteData.cultivo_id as any) : undefined
    };

    const { data } = await api.put<Lote>(`/lotes/${id}`, dataToSend);
    return {
      ...data,
      id: data.id.toString(),
      cultivo_id: data.cultivo_id?.toString(),
      fecha_creacion: new Date(data.fecha_creacion),
      fecha_ultima_modificacion: data.fecha_ultima_modificacion ? new Date(data.fecha_ultima_modificacion) : undefined,
      fecha_ultima_actividad: data.fecha_ultima_actividad ? new Date(data.fecha_ultima_actividad) : undefined
    };
  },

  // Eliminar un lote
  eliminarLote: async (id: string): Promise<void> => {
    await api.delete(`/lotes/${id}`);
  },

  // Obtener estadísticas
  obtenerEstadisticas: async (): Promise<LotesEstadisticas> => {
    const { data } = await api.get<LotesEstadisticas>('/lotes/estadisticas');
    return data;
  }
};

// ============================================================================
// FUNCIONES DE UTILIDAD PARA COORDENADAS GPS
// ============================================================================

/**
 * Calcular área de un polígono en hectáreas usando la fórmula del área de Gauss
 */
export const calcularArea = (coordenadas: Coordenada[]): number => {
  if (coordenadas.length < 3) return 0;

  let area = 0;
  const n = coordenadas.length;

  for (let i = 0; i < n; i++) {
    const j = (i + 1) % n;
    area += coordenadas[i].lng * coordenadas[j].lat;
    area -= coordenadas[j].lng * coordenadas[i].lat;
  }

  area = Math.abs(area) / 2;

  // Convertir de grados cuadrados a hectáreas
  // 1 grado² ≈ 12364 km² a latitud 0 (aproximación)
  // Ajustar por latitud promedio
  const latPromedio = coordenadas.reduce((sum, c) => sum + c.lat, 0) / n;
  const factorLatitud = Math.cos((latPromedio * Math.PI) / 180);
  
  // 1 grado² ≈ 111.32 km * 111.32 km * cos(lat)
  const km2 = area * 111.32 * 111.32 * factorLatitud;
  
  // Convertir km² a hectáreas (1 km² = 100 ha)
  return parseFloat((km2 * 100).toFixed(2));
};

/**
 * Calcular perímetro de un polígono en metros usando la fórmula de Haversine
 */
export const calcularPerimetro = (coordenadas: Coordenada[]): number => {
  if (coordenadas.length < 2) return 0;

  let perimetro = 0;
  const R = 6371000; // Radio de la Tierra en metros

  for (let i = 0; i < coordenadas.length; i++) {
    const p1 = coordenadas[i];
    const p2 = coordenadas[(i + 1) % coordenadas.length];

    const lat1 = (p1.lat * Math.PI) / 180;
    const lat2 = (p2.lat * Math.PI) / 180;
    const deltaLat = ((p2.lat - p1.lat) * Math.PI) / 180;
    const deltaLng = ((p2.lng - p1.lng) * Math.PI) / 180;

    const a =
      Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
      Math.cos(lat1) * Math.cos(lat2) * Math.sin(deltaLng / 2) * Math.sin(deltaLng / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    perimetro += R * c;
  }

  return parseFloat(perimetro.toFixed(2));
};

// ============================================================================
// ALIASES PARA COMPATIBILIDAD CON HOOKS
// ============================================================================

export const getLotes = async (filtros?: any): Promise<Lote[]> => {
  // Por ahora ignora filtros, se pueden implementar después en el backend
  return lotesService.obtenerLotes();
};

export const getLoteById = lotesService.obtenerLotePorId;
export const createLote = lotesService.crearLote;

// Wrapper para updateLote que acepta objeto {id, ...data}
export const updateLote = async (params: { id: string; [key: string]: any }): Promise<Lote> => {
  const { id, ...data } = params;
  return lotesService.actualizarLote(id, data as UpdateLoteDto);
};

export const deleteLote = lotesService.eliminarLote;
export const getLotesEstadisticas = lotesService.obtenerEstadisticas;

export default lotesService;
