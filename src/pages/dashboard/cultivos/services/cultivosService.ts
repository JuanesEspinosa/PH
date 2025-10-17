import { Cultivo, CreateCultivoDto, UpdateCultivoDto, TipoCultivo } from '@/types/cultivos';

// ============================================================================
// DATOS MOCK DE CULTIVOS
// ============================================================================

let CULTIVOS_MOCK: Cultivo[] = [
  {
    id: '1',
    nombre: 'Café',
    nombre_cientifico: 'Coffea arabica',
    tipo: TipoCultivo.OTRO,
    ciclo_dias: 1825, // ~5 años
    descripcion: 'Café arábigo de alta calidad para exportación',
    activo: true,
    fecha_creacion: new Date('2024-01-15')
  },
  {
    id: '2',
    nombre: 'Banano',
    nombre_cientifico: 'Musa paradisiaca',
    tipo: TipoCultivo.FRUTA,
    ciclo_dias: 365,
    descripcion: 'Banano tipo exportación',
    activo: true,
    fecha_creacion: new Date('2024-01-20')
  },
  {
    id: '3',
    nombre: 'Maíz',
    nombre_cientifico: 'Zea mays',
    tipo: TipoCultivo.CEREAL,
    ciclo_dias: 120,
    descripcion: 'Maíz amarillo para consumo',
    activo: true,
    fecha_creacion: new Date('2024-02-01')
  },
  {
    id: '4',
    nombre: 'Papa',
    nombre_cientifico: 'Solanum tuberosum',
    tipo: TipoCultivo.TUBERCULO,
    ciclo_dias: 150,
    descripcion: 'Papa criolla',
    activo: true,
    fecha_creacion: new Date('2024-02-10')
  },
  {
    id: '5',
    nombre: 'Tomate',
    nombre_cientifico: 'Solanum lycopersicum',
    tipo: TipoCultivo.HORTALIZA,
    ciclo_dias: 90,
    descripcion: 'Tomate chonto para mesa',
    activo: true,
    fecha_creacion: new Date('2024-03-01')
  }
];

// Simular delay de red
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// ============================================================================
// SERVICIOS
// ============================================================================

export const cultivosService = {
  // Obtener todos los cultivos
  getAll: async (): Promise<Cultivo[]> => {
    await delay(300);
    return [...CULTIVOS_MOCK];
  },
  
  // Obtener solo cultivos activos
  getActivos: async (): Promise<Cultivo[]> => {
    await delay(200);
    return CULTIVOS_MOCK.filter(c => c.activo);
  },
  
  // Obtener por ID
  getById: async (id: string): Promise<Cultivo> => {
    await delay(200);
    const cultivo = CULTIVOS_MOCK.find(c => c.id === id);
    if (!cultivo) throw new Error('Cultivo no encontrado');
    return cultivo;
  },
  
  // Crear
  create: async (data: CreateCultivoDto): Promise<Cultivo> => {
    await delay(400);
    const nuevo: Cultivo = {
      ...data,
      id: Date.now().toString(),
      fecha_creacion: new Date()
    };
    CULTIVOS_MOCK.push(nuevo);
    return nuevo;
  },
  
  // Actualizar
  update: async (id: string, data: UpdateCultivoDto): Promise<Cultivo> => {
    await delay(400);
    const index = CULTIVOS_MOCK.findIndex(c => c.id === id);
    if (index === -1) throw new Error('Cultivo no encontrado');
    
    CULTIVOS_MOCK[index] = {
      ...CULTIVOS_MOCK[index],
      ...data
    };
    return CULTIVOS_MOCK[index];
  },
  
  // Eliminar (soft delete - marcar como inactivo)
  delete: async (id: string): Promise<void> => {
    await delay(300);
    const index = CULTIVOS_MOCK.findIndex(c => c.id === id);
    if (index === -1) throw new Error('Cultivo no encontrado');
    CULTIVOS_MOCK[index].activo = false;
  }
};

export default cultivosService;

