import { useForm } from 'react-hook-form';
import { CreateLoteDto, EstadoLote } from '@/types/lotes';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import SelectorMapaInteractivo from './SelectorMapaInteractivo';
import { useCultivosActivos } from '../../cultivos/hooks/useCultivosQuery';
import { Leaf, AlertCircle } from 'lucide-react';

// ============================================================================
// FORMULARIO SIMPLE DE LOTE (1 PASO)
// ============================================================================

interface LoteFormSimpleProps {
  initialData?: Partial<CreateLoteDto>;
  onSubmit: (data: CreateLoteDto) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export const LoteFormSimple = ({
  initialData,
  onSubmit,
  onCancel,
  isLoading = false
}: LoteFormSimpleProps) => {
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<CreateLoteDto>({
    defaultValues: {
      nombre: initialData?.nombre || '',
      codigo: initialData?.codigo || `LOT-${Date.now()}`,
      area_hectareas: initialData?.area_hectareas || 0,
      estado: initialData?.estado || EstadoLote.OPERATIVO,
      coordenadas: initialData?.coordenadas || [],
      cultivo_id: initialData?.cultivo_id || '',
      descripcion: initialData?.descripcion || '',
      notas: initialData?.notas || '',
    }
  });
  
  const { data: cultivos = [] } = useCultivosActivos();
  const coordenadas = watch('coordenadas');
  
  const handleFormSubmit = (data: CreateLoteDto) => {
    if (data.coordenadas.length < 3) {
      alert('Debes marcar al menos 3 puntos en el mapa para delimitar el lote');
      return;
    }
    onSubmit(data);
  };
  
  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      {/* Información Básica */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          📝 Información del Lote
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="nombre">Nombre del Lote *</Label>
            <Input
              id="nombre"
              {...register('nombre', { required: 'El nombre es requerido' })}
              placeholder="Ej: Lote Norte"
            />
            {errors.nombre && (
              <p className="text-sm text-red-600">{errors.nombre.message}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="codigo">Código</Label>
            <Input
              id="codigo"
              {...register('codigo')}
              placeholder="Ej: LOT-001"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="estado">Estado Operativo *</Label>
            <Select
              value={watch('estado')}
              onValueChange={(value) => setValue('estado', value as EstadoLote)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={EstadoLote.OPERATIVO}>🟢 Operativo</SelectItem>
                <SelectItem value={EstadoLote.EN_SIEMBRA}>🟣 En Siembra</SelectItem>
                <SelectItem value={EstadoLote.EN_CRECIMIENTO}>🟢 En Crecimiento</SelectItem>
                <SelectItem value={EstadoLote.EN_COSECHA}>🟡 En Cosecha</SelectItem>
                <SelectItem value={EstadoLote.EN_FUMIGACION}>🔴 En Fumigación</SelectItem>
                <SelectItem value={EstadoLote.EN_MANTENIMIENTO}>🟠 En Mantenimiento</SelectItem>
                <SelectItem value={EstadoLote.EN_DESCANSO}>⚪ En Descanso</SelectItem>
                <SelectItem value={EstadoLote.INACTIVO}>⚫ Inactivo</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="cultivo_id">
              <Leaf className="h-4 w-4 inline mr-1" />
              Cultivo (Opcional)
            </Label>
            <Select
              value={watch('cultivo_id') || 'ninguno'}
              onValueChange={(value) => setValue('cultivo_id', value === 'ninguno' ? undefined : value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar cultivo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ninguno">Sin cultivo asignado</SelectItem>
                {cultivos.map((cultivo) => (
                  <SelectItem key={cultivo.id} value={cultivo.id}>
                    {cultivo.nombre} ({cultivo.tipo})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="descripcion">Descripción</Label>
            <Textarea
              id="descripcion"
              {...register('descripcion')}
              placeholder="Descripción del lote..."
              rows={2}
            />
          </div>
        </div>
      </Card>
      
      {/* Delimitación en Mapa */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          🗺️ Delimitación del Lote
        </h3>
        
        <SelectorMapaInteractivo
          value={coordenadas}
          onChange={(coords) => setValue('coordenadas', coords)}
          height="450px"
        />
        
        {coordenadas.length > 0 && coordenadas.length < 3 && (
          <div className="mt-4 p-3 bg-orange-50 border border-orange-200 rounded-lg flex items-start gap-2">
            <AlertCircle className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-orange-900">
              <strong>Atención:</strong> Necesitas marcar al menos 3 puntos para crear un lote válido.
              Actualmente tienes {coordenadas.length} punto{coordenadas.length !== 1 ? 's' : ''}.
            </div>
          </div>
        )}
      </Card>
      
      {/* Notas Adicionales */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">📋 Notas Adicionales (Opcional)</h3>
        
        <Textarea
          {...register('notas')}
          placeholder="Notas, observaciones o comentarios adicionales sobre el lote..."
          rows={3}
        />
      </Card>
      
      {/* Botones */}
      <div className="flex justify-end gap-3 pt-4 border-t">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isLoading}
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          disabled={isLoading || coordenadas.length < 3}
        >
          {isLoading ? 'Guardando...' : initialData ? 'Actualizar Lote' : 'Crear Lote'}
        </Button>
      </div>
    </form>
  );
};

export default LoteFormSimple;

