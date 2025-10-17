import { useNavigate, useParams } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Loader2 } from 'lucide-react'
import TipoLaborForm from '../components/TipoLaborForm'
import { useTipoLaborQuery, useUpdateTipoLaborMutation } from '../hooks/useTiposLaborQuery'
import { UpdateTipoLaborDto } from '../services/tiposLaborService'

export default function TipoLaborEditView() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { data: tipoLabor, isLoading } = useTipoLaborQuery(id!)
  const { mutate: updateTipoLabor, isPending } = useUpdateTipoLaborMutation()

  const handleSubmit = (data: UpdateTipoLaborDto) => {
    if (!id) return
    updateTipoLabor({ id, data })
  }

  const handleCancel = () => {
    navigate(`/dashboard/tipos-labor/${id}`)
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin mx-auto text-primary" />
          <p className="text-muted-foreground">Cargando tipo de labor...</p>
        </div>
      </div>
    )
  }

  if (!tipoLabor) {
    return (
      <div className="space-y-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-12">
              <p className="text-muted-foreground">Tipo de labor no encontrado</p>
              <Button className="mt-4" onClick={() => navigate('/dashboard/tipos-labor')}>
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
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(`/dashboard/tipos-labor/${id}`)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Editar Tipo de Labor</h1>
          <p className="text-muted-foreground mt-2">Actualiza la información de {tipoLabor.nombre}</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Información del Tipo de Labor</CardTitle>
          <CardDescription>Modifica los campos que desees actualizar</CardDescription>
        </CardHeader>
        <CardContent>
          <TipoLaborForm
            tipoLabor={tipoLabor}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            loading={isPending}
          />
        </CardContent>
      </Card>
    </div>
  )
}

