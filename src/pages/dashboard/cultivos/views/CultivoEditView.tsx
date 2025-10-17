import { useNavigate, useParams } from 'react-router-dom';
import { useCultivo, useUpdateCultivo } from '../hooks/useCultivosQuery';
import { UpdateCultivoDto, TipoCultivo } from '@/types/cultivos';
import { useForm } from 'react-hook-form';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ArrowLeft, Leaf, AlertCircle } from 'lucide-react';

export const CultivoEditView = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: cultivo, isLoading } = useCultivo(id!);
  const updateCultivo = useUpdateCultivo();
  
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<UpdateCultivoDto>({
    values: cultivo ? {
      nombre: cultivo.nombre,
      nombre_cientifico: cultivo.nombre_cientifico,
      tipo: cultivo.tipo,
      ciclo_dias: cultivo.ciclo_dias,
      descripcion: cultivo.descripcion,
      activo: cultivo.activo
    } : undefined
  });
  
  const onSubmit = async (data: UpdateCultivoDto) => {
    if (!id) return;
    
    try {
      await updateCultivo.mutateAsync({ id, data });
      navigate('/dashboard/cultivos');
    } catch (error) {
      console.error('Error al actualizar cultivo:', error);
    }
  };
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando cultivo...</p>
        </div>
      </div>
    );
  }
  
  if (!cultivo) {
    return (
      <div className="space-y-6">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Cultivo no encontrado
          </AlertDescription>
        </Alert>
        <Button onClick={() => navigate('/dashboard/cultivos')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver a Cultivos
        </Button>
      </div>
    );
  }
  
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
            Editar Cultivo
          </h1>
          <p className="text-gray-600 mt-1">Modifica la información de "{cultivo.nombre}"</p>
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
              disabled={updateCultivo.isPending}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={updateCultivo.isPending}
            >
              {updateCultivo.isPending ? 'Guardando...' : 'Actualizar Cultivo'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default CultivoEditView;

