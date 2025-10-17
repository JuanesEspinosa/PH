import { useNavigate } from 'react-router-dom';
import { useCreateCultivo } from '../hooks/useCultivosQuery';
import { CreateCultivoDto, TipoCultivo } from '@/types/cultivos';
import { useForm } from 'react-hook-form';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Leaf } from 'lucide-react';

export const CultivoCreateView = () => {
  const navigate = useNavigate();
  const createCultivo = useCreateCultivo();
  
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<CreateCultivoDto>({
    defaultValues: {
      nombre: '',
      nombre_cientifico: '',
      tipo: TipoCultivo.HORTALIZA,
      ciclo_dias: 90,
      descripcion: '',
      activo: true
    }
  });
  
  const onSubmit = async (data: CreateCultivoDto) => {
    try {
      await createCultivo.mutateAsync(data);
      navigate('/dashboard/cultivos');
    } catch (error) {
      console.error('Error al crear cultivo:', error);
    }
  };
  
  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={() => navigate('/dashboard/cultivos')}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Leaf className="h-8 w-8 text-green-600" />
            Nuevo Cultivo
          </h1>
          <p className="text-gray-600 mt-1">Registra un nuevo tipo de cultivo</p>
        </div>
      </div>
      
      {/* Formulario */}
      <Card className="p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Información Básica */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">Información Básica</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nombre">Nombre del Cultivo *</Label>
                <Input
                  id="nombre"
                  {...register('nombre', { required: 'El nombre es requerido' })}
                  placeholder="Ej: Tomate"
                />
                {errors.nombre && (
                  <p className="text-sm text-red-600">{errors.nombre.message}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="nombre_cientifico">Nombre Científico (Opcional)</Label>
                <Input
                  id="nombre_cientifico"
                  {...register('nombre_cientifico')}
                  placeholder="Ej: Solanum lycopersicum"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="tipo">Tipo de Cultivo *</Label>
                <Select
                  value={watch('tipo')}
                  onValueChange={(value) => setValue('tipo', value as TipoCultivo)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(TipoCultivo).map((tipo) => (
                      <SelectItem key={tipo} value={tipo}>
                        {tipo}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="ciclo_dias">Ciclo de Cultivo (días) *</Label>
                <Input
                  id="ciclo_dias"
                  type="number"
                  {...register('ciclo_dias', {
                    required: 'El ciclo es requerido',
                    min: { value: 1, message: 'Debe ser mayor a 0' }
                  })}
                  placeholder="Ej: 90"
                />
                {errors.ciclo_dias && (
                  <p className="text-sm text-red-600">{errors.ciclo_dias.message}</p>
                )}
                <p className="text-xs text-gray-500">
                  Aproximadamente {Math.round((watch('ciclo_dias') || 0) / 30)} meses
                </p>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="descripcion">Descripción</Label>
              <Textarea
                id="descripcion"
                {...register('descripcion')}
                placeholder="Descripción del cultivo, características especiales, requerimientos..."
                rows={4}
              />
            </div>
          </div>
          
          {/* Botones */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/dashboard/cultivos')}
              disabled={createCultivo.isPending}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={createCultivo.isPending}
            >
              {createCultivo.isPending ? 'Guardando...' : 'Crear Cultivo'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default CultivoCreateView;

