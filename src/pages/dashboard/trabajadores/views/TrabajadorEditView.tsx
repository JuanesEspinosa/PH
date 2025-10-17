import { useNavigate, useParams } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Loader2 } from 'lucide-react'
import TrabajadorForm from '../components/TrabajadorForm'
import { useTrabajadorQuery, useUpdateTrabajadorMutation } from '../hooks/useTrabajadoresQuery'
import { UpdateTrabajadorDto } from '../services/trabajadoresService'

export default function TrabajadorEditView() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { data: trabajador, isLoading } = useTrabajadorQuery(id!)
  const { mutate: updateTrabajador, isPending } = useUpdateTrabajadorMutation()

  const handleSubmit = (data: UpdateTrabajadorDto) => {
    if (!id) return
    updateTrabajador({ id, data })
  }

  const handleCancel = () => {
    navigate(`/dashboard/trabajadores/${id}`)
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin mx-auto text-primary" />
          <p className="text-muted-foreground">Cargando trabajador...</p>
        </div>
      </div>
    )
  }

  if (!trabajador) {
    return (
      <div className="space-y-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-12">
              <p className="text-muted-foreground">Trabajador no encontrado</p>
              <Button className="mt-4" onClick={() => navigate('/dashboard/trabajadores')}>
                Volver a la lista
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(`/dashboard/trabajadores/${id}`)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Editar Trabajador</h1>
          <p className="text-muted-foreground mt-2">
            Actualiza la información de {trabajador.nombres} {trabajador.apellidos}
          </p>
        </div>
      </div>

      {/* Formulario */}
      <Card>
        <CardHeader>
          <CardTitle>Información del Trabajador</CardTitle>
          <CardDescription>Modifica los campos que desees actualizar</CardDescription>
        </CardHeader>
        <CardContent>
          <TrabajadorForm
            trabajador={trabajador}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            loading={isPending}
          />
        </CardContent>
      </Card>
    </div>
  )
}

