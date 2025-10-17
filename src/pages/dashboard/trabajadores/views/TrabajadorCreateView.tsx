import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import TrabajadorForm from '../components/TrabajadorForm'
import { useCreateTrabajadorMutation } from '../hooks/useTrabajadoresQuery'
import { CreateTrabajadorDto } from '../services/trabajadoresService'

export default function TrabajadorCreateView() {
  const navigate = useNavigate()
  const { mutate: createTrabajador, isPending } = useCreateTrabajadorMutation()

  const handleSubmit = (data: CreateTrabajadorDto) => {
    createTrabajador(data)
  }

  const handleCancel = () => {
    navigate('/dashboard/trabajadores')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard/trabajadores')}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Crear Nuevo Trabajador</h1>
          <p className="text-muted-foreground mt-2">
            Complete el formulario para agregar un nuevo trabajador
          </p>
        </div>
      </div>

      {/* Formulario */}
      <Card>
        <CardHeader>
          <CardTitle>Información del Trabajador</CardTitle>
          <CardDescription>
            Los campos marcados con <span className="text-red-500">*</span> son obligatorios
          </CardDescription>
        </CardHeader>
        <CardContent>
          <TrabajadorForm onSubmit={handleSubmit} onCancel={handleCancel} loading={isPending} />
        </CardContent>
      </Card>
    </div>
  )
}

