// ============================================================================
// TIPOS PARA CULTIVOS
// ============================================================================

export interface Cultivo {
  id: string;
  nombre: string;
  nombre_cientifico?: string;
  tipo: TipoCultivo;
  ciclo_dias: number; // Duración del ciclo de cultivo en días
  descripcion?: string;
  activo: boolean;
  fecha_creacion: Date;
}

export enum TipoCultivo {
  HORTALIZA = 'Hortaliza',
  FRUTA = 'Fruta',
  CEREAL = 'Cereal',
  LEGUMINOSA = 'Leguminosa',
  TUBERCULO = 'Tubérculo',
  FLOR = 'Flor',
  OTRO = 'Otro'
}

export interface CreateCultivoDto extends Omit<Cultivo, 'id' | 'fecha_creacion'> {}
export interface UpdateCultivoDto extends Partial<CreateCultivoDto> {}

