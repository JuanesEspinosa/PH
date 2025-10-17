import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { CreateRolDTO } from '../services/rolesService'

interface RolFormProps {
  initialData?: Partial<CreateRolDTO>
  onSubmit: (data: CreateRolDTO) => void
  isSubmitting?: boolean
}

export default function RolForm({ initialData, onSubmit, isSubmitting }: RolFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<CreateRolDTO>({
    defaultValues: {
      nombre: initialData?.nombre || '',
    },
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Información del Rol</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="nombre">Nombre del Rol *</Label>
            <Input
              id="nombre"
              {...register('nombre', { required: 'El nombre es requerido' })}
              placeholder="Ej: Administrador, Editor, Visualizador"
              className="text-lg"
            />
            {errors.nombre && (
              <p className="text-sm text-red-600 mt-1">{errors.nombre.message}</p>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-4 justify-end">
        <Button type="button" variant="outline" onClick={() => window.history.back()}>
          Cancelar
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Guardando...' : 'Guardar Rol'}
        </Button>
      </div>
    </form>
  )
}

