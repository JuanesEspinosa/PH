import { 
  Lote, 
  CreateLoteDto, 
  UpdateLoteDto, 
  LotesFiltros, 
  LotesEstadisticas,
  EstadoLote,
  TipoSuelo,
  Topografia,
  SistemaRiego,
  Coordenada
} from '@/types/lotes';

// ============================================================================
// DATOS MOCK DE LOTES
// ============================================================================

const LOTES_MOCK: Lote[] = [
  {
    id: '1',
    codigo: 'LOT-001',
    nombre: 'Lote Norte A',
    descripcion: 'Lote principal de café en zona alta',
    coordenadas: [
      { lat: 4.6097, lng: -74.0817 },
      { lat: 4.6105, lng: -74.0817 },
      { lat: 4.6105, lng: -74.0808 },
      { lat: 4.6097, lng: -74.0808 }
    ],
    area_hectareas: 5.2,
    perimetro_metros: 910,
    altitud_msnm: 1850,
    cultivo_id: 'cult-001',
    cultivo_nombre: 'Café Arábigo',
    estado: EstadoLote.EN_CRECIMIENTO,
    fecha_ultima_actividad: new Date('2024-01-10'),
    proxima_actividad: 'Fumigación preventiva',
    tipo_suelo: TipoSuelo.FRANCO,
    ph_suelo: 6.5,
    topografia: Topografia.ONDULADO,
    sistema_riego: SistemaRiego.GOTEO,
    tiene_cerca: true,
    tiene_sombra: true,
    acceso_vehicular: true,
    fecha_creacion: new Date('2023-03-15'),
    fecha_ultima_modificacion: new Date('2024-01-10'),
    notas: 'Excelente drenaje, suelo fértil',
    imagenes: []
  },
  {
    id: '2',
    codigo: 'LOT-002',
    nombre: 'Lote Sur B',
    descripcion: 'Lote de plátano hartón',
    coordenadas: [
      { lat: 4.6080, lng: -74.0817 },
      { lat: 4.6088, lng: -74.0817 },
      { lat: 4.6088, lng: -74.0805 },
      { lat: 4.6080, lng: -74.0805 }
    ],
    area_hectareas: 3.8,
    perimetro_metros: 780,
    altitud_msnm: 1720,
    cultivo_id: 'cult-002',
    cultivo_nombre: 'Plátano Hartón',
    estado: EstadoLote.EN_COSECHA,
    fecha_ultima_actividad: new Date('2024-01-15'),
    tipo_suelo: TipoSuelo.ARCILLOSO,
    ph_suelo: 6.8,
    topografia: Topografia.PLANO,
    sistema_riego: SistemaRiego.ASPERSION,
    tiene_cerca: true,
    tiene_sombra: false,
    acceso_vehicular: true,
    fecha_creacion: new Date('2023-02-10'),
    notas: 'Producción constante',
    imagenes: []
  },
  {
    id: '3',
    codigo: 'LOT-003',
    nombre: 'Lote Este C',
    descripcion: 'En preparación para nueva siembra de cacao',
    coordenadas: [
      { lat: 4.6097, lng: -74.0798 },
      { lat: 4.6107, lng: -74.0798 },
      { lat: 4.6107, lng: -74.0788 },
      { lat: 4.6097, lng: -74.0788 }
    ],
    area_hectareas: 6.5,
    perimetro_metros: 1020,
    altitud_msnm: 1680,
    estado: EstadoLote.EN_MANTENIMIENTO,
    fecha_ultima_actividad: new Date('2024-01-08'),
    proxima_actividad: 'Preparación del suelo',
    tipo_suelo: TipoSuelo.HUMIFERO,
    ph_suelo: 6.2,
    topografia: Topografia.PLANO,
    sistema_riego: SistemaRiego.GOTEO,
    tiene_cerca: false,
    tiene_sombra: true,
    acceso_vehicular: false,
    fecha_creacion: new Date('2023-08-20'),
    notas: 'Requiere instalación de cerca perimetral',
    imagenes: []
  },
  {
    id: '4',
    codigo: 'LOT-004',
    nombre: 'Lote Oeste D',
    descripcion: 'Lote de aguacate Hass',
    coordenadas: [
      { lat: 4.6070, lng: -74.0825 },
      { lat: 4.6082, lng: -74.0825 },
      { lat: 4.6082, lng: -74.0812 },
      { lat: 4.6070, lng: -74.0812 }
    ],
    area_hectareas: 4.2,
    perimetro_metros: 820,
    altitud_msnm: 1950,
    cultivo_id: 'cult-004',
    cultivo_nombre: 'Aguacate Hass',
    estado: EstadoLote.OPERATIVO,
    fecha_ultima_actividad: new Date('2024-01-12'),
    tipo_suelo: TipoSuelo.FRANCO,
    ph_suelo: 6.7,
    topografia: Topografia.ONDULADO,
    sistema_riego: SistemaRiego.MICROASPERSION,
    tiene_cerca: true,
    tiene_sombra: false,
    acceso_vehicular: true,
    fecha_creacion: new Date('2022-11-05'),
    notas: 'Árboles jóvenes, alta producción esperada',
    imagenes: []
  },
  {
    id: '5',
    codigo: 'LOT-005',
    nombre: 'Lote Centro E',
    descripcion: 'Lote experimental de maíz',
    coordenadas: [
      { lat: 4.6088, lng: -74.0803 },
      { lat: 4.6095, lng: -74.0803 },
      { lat: 4.6095, lng: -74.0795 },
      { lat: 4.6088, lng: -74.0795 }
    ],
    area_hectareas: 2.3,
    perimetro_metros: 610,
    altitud_msnm: 1800,
    cultivo_id: 'cult-005',
    cultivo_nombre: 'Maíz',
    estado: EstadoLote.EN_FUMIGACION,
    fecha_ultima_actividad: new Date('2024-01-16'),
    proxima_actividad: 'Control de plagas',
    tipo_suelo: TipoSuelo.ARENOSO,
    ph_suelo: 6.0,
    topografia: Topografia.PLANO,
    sistema_riego: SistemaRiego.GRAVEDAD,
    tiene_cerca: true,
    tiene_sombra: false,
    acceso_vehicular: true,
    fecha_creacion: new Date('2023-09-01'),
    notas: 'Control fitosanitario programado',
    imagenes: []
  },
  {
    id: '6',
    codigo: 'LOT-006',
    nombre: 'Lote Valle F',
    descripcion: 'Lote de tomate bajo invernadero',
    coordenadas: [
      { lat: 4.6075, lng: -74.0795 },
      { lat: 4.6083, lng: -74.0795 },
      { lat: 4.6083, lng: -74.0785 },
      { lat: 4.6075, lng: -74.0785 }
    ],
    area_hectareas: 1.8,
    perimetro_metros: 540,
    altitud_msnm: 1650,
    cultivo_id: 'cult-006',
    cultivo_nombre: 'Tomate',
    estado: EstadoLote.EN_SIEMBRA,
    fecha_ultima_actividad: new Date('2024-01-14'),
    tipo_suelo: TipoSuelo.LIMOSO,
    ph_suelo: 6.4,
    topografia: Topografia.PLANO,
    sistema_riego: SistemaRiego.GOTEO,
    tiene_cerca: true,
    tiene_sombra: false,
    acceso_vehicular: true,
    fecha_creacion: new Date('2024-01-05'),
    notas: 'Sistema de invernadero instalado',
    imagenes: []
  },
  {
    id: '7',
    codigo: 'LOT-007',
    nombre: 'Lote Montaña G',
    descripcion: 'Lote en descanso para rotación',
    coordenadas: [
      { lat: 4.6108, lng: -74.0810 },
      { lat: 4.6118, lng: -74.0810 },
      { lat: 4.6118, lng: -74.0798 },
      { lat: 4.6108, lng: -74.0798 }
    ],
    area_hectareas: 7.1,
    perimetro_metros: 1070,
    altitud_msnm: 2100,
    estado: EstadoLote.EN_DESCANSO,
    fecha_ultima_actividad: new Date('2023-11-30'),
    tipo_suelo: TipoSuelo.FRANCO,
    ph_suelo: 6.3,
    topografia: Topografia.INCLINADO,
    sistema_riego: SistemaRiego.NINGUNO,
    tiene_cerca: false,
    tiene_sombra: true,
    acceso_vehicular: false,
    fecha_creacion: new Date('2022-06-15'),
    notas: 'Rotación de cultivos programada para marzo 2024',
    imagenes: []
  },
  {
    id: '8',
    codigo: 'LOT-008',
    nombre: 'Lote Río H',
    descripcion: 'Lote inactivo por anegamiento',
    coordenadas: [
      { lat: 4.6065, lng: -74.0808 },
      { lat: 4.6072, lng: -74.0808 },
      { lat: 4.6072, lng: -74.0798 },
      { lat: 4.6065, lng: -74.0798 }
    ],
    area_hectareas: 2.9,
    perimetro_metros: 680,
    altitud_msnm: 1580,
    estado: EstadoLote.INACTIVO,
    fecha_ultima_actividad: new Date('2023-10-15'),
    tipo_suelo: TipoSuelo.ARCILLOSO,
    ph_suelo: 7.0,
    topografia: Topografia.PLANO,
    sistema_riego: SistemaRiego.NINGUNO,
    tiene_cerca: false,
    tiene_sombra: false,
    acceso_vehicular: false,
    fecha_creacion: new Date('2023-01-10'),
    notas: 'Requiere sistema de drenaje antes de uso',
    imagenes: []
  }
];

// Simular delay de red
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// ============================================================================
// FUNCIONES DEL SERVICIO
// ============================================================================

/**
 * Obtener todos los lotes con filtros opcionales
 */
export const getLotes = async (filtros?: LotesFiltros): Promise<Lote[]> => {
  await delay(500);
  
  let lotes = [...LOTES_MOCK];
  
  if (filtros) {
    if (filtros.estado) {
      lotes = lotes.filter(l => l.estado === filtros.estado);
    }
    
    if (filtros.cultivo_id) {
      lotes = lotes.filter(l => l.cultivo_id === filtros.cultivo_id);
    }
    
    if (filtros.area_min) {
      lotes = lotes.filter(l => l.area_hectareas >= filtros.area_min);
    }
    
    if (filtros.area_max) {
      lotes = lotes.filter(l => l.area_hectareas <= filtros.area_max);
    }
    
    if (filtros.tipo_suelo) {
      lotes = lotes.filter(l => l.tipo_suelo === filtros.tipo_suelo);
    }
    
    if (filtros.sistema_riego) {
      lotes = lotes.filter(l => l.sistema_riego === filtros.sistema_riego);
    }
    
    if (filtros.busqueda) {
      const busqueda = filtros.busqueda.toLowerCase();
      lotes = lotes.filter(l => 
        l.codigo.toLowerCase().includes(busqueda) ||
        l.nombre.toLowerCase().includes(busqueda) ||
        l.descripcion?.toLowerCase().includes(busqueda)
      );
    }
  }
  
  return lotes;
};

/**
 * Obtener un lote por ID
 */
export const getLoteById = async (id: string): Promise<Lote | null> => {
  await delay(300);
  return LOTES_MOCK.find(l => l.id === id) || null;
};

/**
 * Crear un nuevo lote
 */
export const createLote = async (data: CreateLoteDto): Promise<Lote> => {
  await delay(800);
  
  const nuevoLote: Lote = {
    id: `lote-${Date.now()}`,
    ...data,
    fecha_creacion: new Date(),
    fecha_ultima_modificacion: new Date(),
    tiene_cerca: data.tiene_cerca ?? false,
    tiene_sombra: data.tiene_sombra ?? false,
    acceso_vehicular: data.acceso_vehicular ?? false
  };
  
  LOTES_MOCK.push(nuevoLote);
  return nuevoLote;
};

/**
 * Actualizar un lote existente
 */
export const updateLote = async (data: UpdateLoteDto): Promise<Lote> => {
  await delay(600);
  
  const index = LOTES_MOCK.findIndex(l => l.id === data.id);
  
  if (index === -1) {
    throw new Error('Lote no encontrado');
  }
  
  const loteActualizado = {
    ...LOTES_MOCK[index],
    ...data,
    fecha_ultima_modificacion: new Date()
  };
  
  LOTES_MOCK[index] = loteActualizado;
  return loteActualizado;
};

/**
 * Eliminar un lote
 */
export const deleteLote = async (id: string): Promise<void> => {
  await delay(500);
  
  const index = LOTES_MOCK.findIndex(l => l.id === id);
  
  if (index === -1) {
    throw new Error('Lote no encontrado');
  }
  
  LOTES_MOCK.splice(index, 1);
};

/**
 * Obtener estadísticas de lotes
 */
export const getLotesEstadisticas = async (): Promise<LotesEstadisticas> => {
  await delay(400);
  
  const lotes = LOTES_MOCK;
  const total_lotes = lotes.length;
  const total_hectareas = lotes.reduce((sum, l) => sum + l.area_hectareas, 0);
  
  const por_estado: Record<EstadoLote, number> = {
    [EstadoLote.OPERATIVO]: 0,
    [EstadoLote.EN_SIEMBRA]: 0,
    [EstadoLote.EN_CRECIMIENTO]: 0,
    [EstadoLote.EN_COSECHA]: 0,
    [EstadoLote.EN_FUMIGACION]: 0,
    [EstadoLote.EN_MANTENIMIENTO]: 0,
    [EstadoLote.EN_DESCANSO]: 0,
    [EstadoLote.INACTIVO]: 0
  };
  
  lotes.forEach(l => {
    por_estado[l.estado]++;
  });
  
  const area_promedio = total_hectareas / total_lotes;
  const lotes_con_riego = lotes.filter(l => l.sistema_riego && l.sistema_riego !== SistemaRiego.NINGUNO).length;
  const lotes_activos = lotes.filter(l => l.estado !== EstadoLote.INACTIVO && l.estado !== EstadoLote.EN_DESCANSO).length;
  
  return {
    total_lotes,
    total_hectareas,
    por_estado,
    area_promedio,
    lotes_con_riego,
    lotes_activos
  };
};

/**
 * Calcular el área de un polígono usando la fórmula de Shoelace
 */
export const calcularArea = (coordenadas: Coordenada[]): number => {
  if (coordenadas.length < 3) return 0;
  
  let area = 0;
  const numPoints = coordenadas.length;
  
  for (let i = 0; i < numPoints; i++) {
    const j = (i + 1) % numPoints;
    area += coordenadas[i].lng * coordenadas[j].lat;
    area -= coordenadas[j].lng * coordenadas[i].lat;
  }
  
  area = Math.abs(area) / 2;
  
  // Convertir a hectáreas (aproximación)
  // 1 grado ≈ 111 km en el ecuador
  const hectareas = area * 111 * 111 * 100;
  
  return parseFloat(hectareas.toFixed(2));
};

/**
 * Calcular el perímetro de un polígono
 */
export const calcularPerimetro = (coordenadas: Coordenada[]): number => {
  if (coordenadas.length < 2) return 0;
  
  let perimetro = 0;
  
  for (let i = 0; i < coordenadas.length; i++) {
    const j = (i + 1) % coordenadas.length;
    const dist = calcularDistancia(coordenadas[i], coordenadas[j]);
    perimetro += dist;
  }
  
  return Math.round(perimetro);
};

/**
 * Calcular distancia entre dos coordenadas (fórmula de Haversine)
 */
const calcularDistancia = (coord1: Coordenada, coord2: Coordenada): number => {
  const R = 6371e3; // Radio de la Tierra en metros
  const φ1 = coord1.lat * Math.PI / 180;
  const φ2 = coord2.lat * Math.PI / 180;
  const Δφ = (coord2.lat - coord1.lat) * Math.PI / 180;
  const Δλ = (coord2.lng - coord1.lng) * Math.PI / 180;
  
  const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
  return R * c;
};

/**
 * Validar que las coordenadas formen un polígono válido
 */
export const validarPoligono = (coordenadas: Coordenada[]): { valido: boolean; mensaje?: string } => {
  if (coordenadas.length < 3) {
    return { valido: false, mensaje: 'Se requieren al menos 3 puntos para formar un polígono' };
  }
  
  if (coordenadas.length > 100) {
    return { valido: false, mensaje: 'Demasiados puntos. Máximo 100 permitidos' };
  }
  
  // Verificar que no haya coordenadas duplicadas consecutivas
  for (let i = 0; i < coordenadas.length - 1; i++) {
    if (coordenadas[i].lat === coordenadas[i + 1].lat && 
        coordenadas[i].lng === coordenadas[i + 1].lng) {
      return { valido: false, mensaje: 'No puede haber puntos duplicados consecutivos' };
    }
  }
  
  return { valido: true };
};

