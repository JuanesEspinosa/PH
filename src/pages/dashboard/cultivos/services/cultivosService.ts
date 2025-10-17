import api from '@/lib/axios';
import { Cultivo, CreateCultivoDto, UpdateCultivoDto } from '@/types/cultivos';

// ============================================================================
// SERVICIOS - API REAL
// ============================================================================

export const cultivosService = {
  // Obtener todos los cultivos
  getAll: async (): Promise<Cultivo[]> => {
    const { data } = await api.get<Cultivo[]>('/cultivos');
    return data.map(cultivo => ({
      ...cultivo,
      id: cultivo.id.toString(),
      fecha_creacion: new Date(cultivo.fecha_creacion)
    }));
  },
  
  // Obtener solo cultivos activos
  getActivos: async (): Promise<Cultivo[]> => {
    const { data } = await api.get<Cultivo[]>('/cultivos/activos');
    return data.map(cultivo => ({
      ...cultivo,
      id: cultivo.id.toString(),
      fecha_creacion: new Date(cultivo.fecha_creacion)
    }));
  },
  
  // Obtener por ID
  getById: async (id: string): Promise<Cultivo> => {
    const { data } = await api.get<Cultivo>(`/cultivos/${id}`);
    return {
      ...data,
      id: data.id.toString(),
      fecha_creacion: new Date(data.fecha_creacion)
    };
  },
  
  // Crear
  create: async (createData: CreateCultivoDto): Promise<Cultivo> => {
    const { data } = await api.post<Cultivo>('/cultivos', createData);
    return {
      ...data,
      id: data.id.toString(),
      fecha_creacion: new Date(data.fecha_creacion)
    };
  },
  
  // Actualizar
  update: async (id: string, updateData: UpdateCultivoDto): Promise<Cultivo> => {
    const { data } = await api.put<Cultivo>(`/cultivos/${id}`, updateData);
    return {
      ...data,
      id: data.id.toString(),
      fecha_creacion: new Date(data.fecha_creacion)
    };
  },
  
  // Eliminar (soft delete - marcar como inactivo)
  delete: async (id: string): Promise<void> => {
    await api.delete(`/cultivos/${id}`);
  }
};

export default cultivosService;

