// ============================================================================
// TIPOS PARA MÓDULO DE LOTES AGRÍCOLAS
// ============================================================================

// Coordenadas GPS para delimitar lotes
export interface Coordenada {
  lat: number;
  lng: number;
}

// Estados posibles de un lote
export enum EstadoLote {
  OPERATIVO = 'OPERATIVO',
  EN_SIEMBRA = 'EN_SIEMBRA',
  EN_CRECIMIENTO = 'EN_CRECIMIENTO',
  EN_COSECHA = 'EN_COSECHA',
  EN_FUMIGACION = 'EN_FUMIGACION',
  EN_MANTENIMIENTO = 'EN_MANTENIMIENTO',
  EN_DESCANSO = 'EN_DESCANSO',
  INACTIVO = 'INACTIVO'
}

// Configuración de colores para cada estado
export const COLORES_ESTADO: Record<EstadoLote, { color: string; fillColor: string; label: string }> = {
  [EstadoLote.OPERATIVO]: {
    color: '#10b981',
    fillColor: '#10b98180',
    label: 'Operativo'
  },
  [EstadoLote.EN_SIEMBRA]: {
    color: '#8b5cf6',
    fillColor: '#8b5cf680',
    label: 'En Siembra'
  },
  [EstadoLote.EN_CRECIMIENTO]: {
    color: '#22c55e',
    fillColor: '#22c55e80',
    label: 'En Crecimiento'
  },
  [EstadoLote.EN_COSECHA]: {
    color: '#f59e0b',
    fillColor: '#f59e0b80',
    label: 'En Cosecha'
  },
  [EstadoLote.EN_FUMIGACION]: {
    color: '#ef4444',
    fillColor: '#ef444480',
    label: 'En Fumigación'
  },
  [EstadoLote.EN_MANTENIMIENTO]: {
    color: '#f97316',
    fillColor: '#f9731680',
    label: 'En Mantenimiento'
  },
  [EstadoLote.EN_DESCANSO]: {
    color: '#6b7280',
    fillColor: '#6b728080',
    label: 'En Descanso'
  },
  [EstadoLote.INACTIVO]: {
    color: '#9ca3af',
    fillColor: '#9ca3af60',
    label: 'Inactivo'
  }
};

// Tipo de suelo
export enum TipoSuelo {
  ARCILLOSO = 'ARCILLOSO',
  ARENOSO = 'ARENOSO',
  LIMOSO = 'LIMOSO',
  FRANCO = 'FRANCO',
  HUMIFERO = 'HUMÍFERO',
  PEDREGOSO = 'PEDREGOSO'
}

// Topografía del lote
export enum Topografia {
  PLANO = 'PLANO',
  ONDULADO = 'ONDULADO',
  INCLINADO = 'INCLINADO',
  MONTAÑOSO = 'MONTAÑOSO'
}

// Sistema de riego
export enum SistemaRiego {
  GOTEO = 'GOTEO',
  ASPERSION = 'ASPERSIÓN',
  GRAVEDAD = 'GRAVEDAD',
  MICROASPERSION = 'MICROASPERSIÓN',
  NINGUNO = 'NINGUNO'
}

// Interfaz principal de Lote
export interface Lote {
  id: string;
  codigo: string;
  nombre: string;
  descripcion?: string;
  
  // Ubicación y delimitación
  coordenadas: Coordenada[]; // Array de puntos que forman el polígono
  area_hectareas: number;
  perimetro_metros?: number;
  altitud_msnm?: number;
  
  // Cultivo asociado
  cultivo_id?: string;
  cultivo_nombre?: string;
  
  // Estado y operación
  estado: EstadoLote;
  fecha_ultima_actividad?: Date;
  proxima_actividad?: string;
  
  // Características del suelo y terreno
  tipo_suelo?: TipoSuelo;
  ph_suelo?: number;
  topografia?: Topografia;
  
  // Infraestructura
  sistema_riego?: SistemaRiego;
  tiene_cerca: boolean;
  tiene_sombra: boolean;
  acceso_vehicular: boolean;
  
  // Datos adicionales
  fecha_creacion: Date;
  fecha_ultima_modificacion?: Date;
  usuario_responsable_id?: string;
  notas?: string;
  
  // Imágenes y documentos
  imagenes?: string[];
  documentos?: string[];
}

// DTO para crear lote
export interface CreateLoteDto {
  codigo: string;
  nombre: string;
  descripcion?: string;
  coordenadas: Coordenada[];
  area_hectareas: number;
  perimetro_metros?: number;
  altitud_msnm?: number;
  cultivo_id?: string;
  estado: EstadoLote;
  tipo_suelo?: TipoSuelo;
  ph_suelo?: number;
  topografia?: Topografia;
  sistema_riego?: SistemaRiego;
  tiene_cerca: boolean;
  tiene_sombra: boolean;
  acceso_vehicular: boolean;
  notas?: string;
}

// DTO para actualizar lote
export interface UpdateLoteDto extends Partial<CreateLoteDto> {
  id: string;
}

// Filtros para búsqueda de lotes
export interface LotesFiltros {
  estado?: EstadoLote;
  cultivo_id?: string;
  area_min?: number;
  area_max?: number;
  tipo_suelo?: TipoSuelo;
  sistema_riego?: SistemaRiego;
  busqueda?: string;
}

// Estadísticas de lotes
export interface LotesEstadisticas {
  total_lotes: number;
  total_hectareas: number;
  por_estado: Record<EstadoLote, number>;
  area_promedio: number;
  lotes_con_riego: number;
  lotes_activos: number;
}

// Vista del mapa
export interface MapaConfig {
  centro: Coordenada;
  zoom: number;
  mostrar_etiquetas: boolean;
  tipo_mapa: 'satellite' | 'streets' | 'hybrid';
}

// Evento de cambio de coordenadas
export interface CoordenadaEvento {
  lote_id: string;
  coordenadas: Coordenada[];
  accion: 'agregar' | 'actualizar' | 'eliminar';
}

// Opciones para el selector de lotes
export interface LoteOption {
  value: string;
  label: string;
  area: number;
  estado: EstadoLote;
  cultivo?: string;
}

