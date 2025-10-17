import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useCreateActividad } from '../hooks/usePlanificacionQuery';
import { useLotes } from '../../lotes/hooks/useLotesQuery';
import { useCultivosActivos } from '../../cultivos/hooks/useCultivosQuery';
import { CreateActividadDto, TipoActividad, NivelPrioridad, PeriodoTiempo } from '@/types/planificacion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Calendar, Target, Users, Plus, X } from 'lucide-react';
import { useState } from 'react';

// Mock de trabajadores (en producción vendría de una API)
const TRABAJADORES_MOCK = [
  { id: '1', nombre: 'Juan Pérez', foto: '/avatars/avatar1.jpg', especialidad: 'Siembra' },
  { id: '2', nombre: 'María García', foto: '/avatars/avatar2.jpg', especialidad: 'Cosecha' },
  { id: '3', nombre: 'Carlos López', foto: '/avatars/avatar3.jpg', especialidad: 'Fumigación' },
  { id: '4', nombre: 'Ana Martínez', foto: '/avatars/avatar4.jpg', especialidad: 'Mantenimiento' },
  { id: '5', nombre: 'Pedro Rodríguez', foto: '/avatars/avatar5.jpg', especialidad: 'General' },
];

interface Meta {
  id: string;
  descripcion: string;
  valor_objetivo: number;
  unidad: string;
}

export const PlanificacionCreateView = () => {
  const navigate = useNavigate();
  const createActividad = useCreateActividad();
  const { data: lotes = [] } = useLotes();
  const { data: cultivos = [] } = useCultivosActivos();
  
  const [trabajadoresSeleccionados, setTrabajadoresSeleccionados] = useState<string[]>([]);
  const [metas, setMetas] = useState<Meta[]>([]);
  const [nuevaMeta, setNuevaMeta] = useState({ descripcion: '', valor_objetivo: 0, unidad: '' });
  
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<CreateActividadDto>({
    defaultValues: {
      nombre: '',
      descripcion: '',
      tipo: TipoActividad.SIEMBRA,
      prioridad: NivelPrioridad.MEDIA,
      fecha_inicio_planificada: new Date(),
      fecha_fin_planificada: new Date(),
      duracion_estimada_horas: 8,
      periodo: PeriodoTiempo.DIA,
      progreso_porcentaje: 0,
      trabajadores_asignados: [],
    }
  });
  
  const toggleTrabajador = (trabajadorId: string) => {
    setTrabajadoresSeleccionados(prev => {
      const nuevos = prev.includes(trabajadorId)
        ? prev.filter(id => id !== trabajadorId)
        : [...prev, trabajadorId];
      return nuevos;
    });
  };
  
  const agregarMeta = () => {
    if (nuevaMeta.descripcion && nuevaMeta.valor_objetivo > 0 && nuevaMeta.unidad) {
      setMetas([...metas, { ...nuevaMeta, id: Date.now().toString() }]);
      setNuevaMeta({ descripcion: '', valor_objetivo: 0, unidad: '' });
    }
  };
  
  const eliminarMeta = (id: string) => {
    setMetas(metas.filter(m => m.id !== id));
  };
  
  const onSubmit = async (data: CreateActividadDto) => {
    try {
      const actividadConMetas = {
        ...data,
        trabajadores_asignados: trabajadoresSeleccionados,
        // Agregar metas como metadata
        metadata: {
          metas: metas
        }
      };
      
      await createActividad.mutateAsync(actividadConMetas as any);
      navigate('/dashboard/planificacion');
    } catch (error) {
      console.error('Error al crear actividad:', error);
    }
  };
  
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={() => navigate('/dashboard/planificacion')}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Calendar className="h-8 w-8 text-blue-600" />
            Nueva Actividad Planificada
          </h1>
          <p className="text-gray-600 mt-1">Define la actividad, metas y equipo de trabajo</p>
        </div>
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Información Básica */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">📝 Información Básica</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="nombre">Nombre de la Actividad *</Label>
              <Input
                id="nombre"
                {...register('nombre', { required: 'El nombre es requerido' })}
                placeholder="Ej: Cosecha de Banano - Lote Sur"
              />
              {errors.nombre && (
                <p className="text-sm text-red-600">{errors.nombre.message}</p>
              )}
            </div>
            
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="descripcion">Descripción Detallada *</Label>
              <Textarea
                id="descripcion"
                {...register('descripcion', { required: 'La descripción es requerida' })}
                placeholder="Describe en detalle qué se va a realizar, cómo y consideraciones especiales..."
                rows={4}
              />
              {errors.descripcion && (
                <p className="text-sm text-red-600">{errors.descripcion.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="tipo">Tipo de Actividad *</Label>
              <Select
                value={watch('tipo')}
                onValueChange={(value) => setValue('tipo', value as TipoActividad)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(TipoActividad).map((tipo) => (
                    <SelectItem key={tipo} value={tipo}>
                      {tipo}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="prioridad">Prioridad *</Label>
              <Select
                value={watch('prioridad')}
                onValueChange={(value) => setValue('prioridad', value as NivelPrioridad)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={NivelPrioridad.BAJA}>🟢 Baja</SelectItem>
                  <SelectItem value={NivelPrioridad.MEDIA}>🟡 Media</SelectItem>
                  <SelectItem value={NivelPrioridad.ALTA}>🟠 Alta</SelectItem>
                  <SelectItem value={NivelPrioridad.URGENTE}>🔴 Urgente</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>
        
        {/* Ubicación y Cultivo */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">📍 Ubicación y Cultivo</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="lote_id">Lote</Label>
              <Select
                value={watch('lote_id') || 'ninguno'}
                onValueChange={(value) => setValue('lote_id', value === 'ninguno' ? undefined : value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar lote" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ninguno">Sin lote específico</SelectItem>
                  {lotes.map((lote) => (
                    <SelectItem key={lote.id} value={lote.id}>
                      {lote.nombre} - {lote.area_hectareas} ha
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="cultivo_id">Cultivo</Label>
              <Select
                value={watch('cultivo_id') || 'ninguno'}
                onValueChange={(value) => setValue('cultivo_id', value === 'ninguno' ? undefined : value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar cultivo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ninguno">Sin cultivo específico</SelectItem>
                  {cultivos.map((cultivo) => (
                    <SelectItem key={cultivo.id} value={cultivo.id}>
                      {cultivo.nombre} ({cultivo.tipo})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>
        
        {/* Programación */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">📅 Programación</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fecha_inicio_planificada">Fecha de Inicio *</Label>
              <Input
                id="fecha_inicio_planificada"
                type="date"
                {...register('fecha_inicio_planificada', { required: true })}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="fecha_fin_planificada">Fecha de Fin *</Label>
              <Input
                id="fecha_fin_planificada"
                type="date"
                {...register('fecha_fin_planificada', { required: true })}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="duracion_estimada_horas">Duración Estimada (horas) *</Label>
              <Input
                id="duracion_estimada_horas"
                type="number"
                {...register('duracion_estimada_horas', { required: true, min: 1 })}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="periodo">Período de Revisión</Label>
              <Select
                value={watch('periodo')}
                onValueChange={(value) => setValue('periodo', value as PeriodoTiempo)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={PeriodoTiempo.DIA}>Diario</SelectItem>
                  <SelectItem value={PeriodoTiempo.SEMANA}>Semanal</SelectItem>
                  <SelectItem value={PeriodoTiempo.QUINCENAL}>Quincenal</SelectItem>
                  <SelectItem value={PeriodoTiempo.MES}>Mensual</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>
        
        {/* Metas y Objetivos */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Target className="h-5 w-5 text-green-600" />
            Metas y Objetivos Cuantificables
          </h3>
          
          <div className="space-y-4">
            {/* Agregar nueva meta */}
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-900 mb-3">
                <strong>💡 Tip:</strong> Define metas específicas y medibles para esta actividad. 
                Esto permitirá comparar con los registros reales de labores.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
                <div className="md:col-span-5">
                  <Input
                    placeholder="Descripción de la meta (ej: Plantas sembradas)"
                    value={nuevaMeta.descripcion}
                    onChange={(e) => setNuevaMeta({ ...nuevaMeta, descripcion: e.target.value })}
                  />
                </div>
                <div className="md:col-span-3">
                  <Input
                    type="number"
                    placeholder="Valor objetivo"
                    value={nuevaMeta.valor_objetivo || ''}
                    onChange={(e) => setNuevaMeta({ ...nuevaMeta, valor_objetivo: Number(e.target.value) })}
                  />
                </div>
                <div className="md:col-span-2">
                  <Input
                    placeholder="Unidad"
                    value={nuevaMeta.unidad}
                    onChange={(e) => setNuevaMeta({ ...nuevaMeta, unidad: e.target.value })}
                  />
                </div>
                <div className="md:col-span-2">
                  <Button
                    type="button"
                    onClick={agregarMeta}
                    className="w-full"
                    disabled={!nuevaMeta.descripcion || !nuevaMeta.valor_objetivo || !nuevaMeta.unidad}
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Agregar
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Lista de metas */}
            {metas.length > 0 && (
              <div className="space-y-2">
                <Label>Metas Definidas ({metas.length})</Label>
                {metas.map((meta) => (
                  <div key={meta.id} className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                    <Target className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="font-medium">{meta.descripcion}</p>
                      <p className="text-sm text-gray-600">
                        Objetivo: <strong>{meta.valor_objetivo} {meta.unidad}</strong>
                      </p>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => eliminarMeta(meta.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
            
            {metas.length === 0 && (
              <div className="text-center py-6 text-gray-500 bg-gray-50 rounded-lg">
                <Target className="h-12 w-12 text-gray-300 mx-auto mb-2" />
                <p>No hay metas definidas aún</p>
                <p className="text-sm">Agrega al menos una meta para poder hacer seguimiento</p>
              </div>
            )}
          </div>
        </Card>
        
        {/* Equipo de Trabajo */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Users className="h-5 w-5 text-blue-600" />
            Equipo de Trabajo
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {TRABAJADORES_MOCK.map((trabajador) => (
              <div
                key={trabajador.id}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  trabajadoresSeleccionados.includes(trabajador.id)
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
                onClick={() => toggleTrabajador(trabajador.id)}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                    trabajadoresSeleccionados.includes(trabajador.id)
                      ? 'bg-blue-600 border-blue-600'
                      : 'border-gray-300'
                  }`}>
                    {trabajadoresSeleccionados.includes(trabajador.id) && (
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 text-white flex items-center justify-center text-xl font-bold">
                    {trabajador.nombre.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{trabajador.nombre}</p>
                    <p className="text-xs text-gray-600">{trabajador.especialidad}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {trabajadoresSeleccionados.length > 0 && (
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-900">
                <strong>{trabajadoresSeleccionados.length}</strong> trabajador{trabajadoresSeleccionados.length > 1 ? 'es' : ''} seleccionado{trabajadoresSeleccionados.length > 1 ? 's' : ''}
              </p>
            </div>
          )}
        </Card>
        
        {/* Botones */}
        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate('/dashboard/planificacion')}
            disabled={createActividad.isPending}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            disabled={createActividad.isPending || trabajadoresSeleccionados.length === 0}
          >
            {createActividad.isPending ? 'Creando...' : 'Crear Actividad'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PlanificacionCreateView;

