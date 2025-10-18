import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowLeft, Loader2 } from 'lucide-react'
import LaborForm from '../components/LaborForm'
import { useLaborQuery, useUpdateLaborMutation } from '../hooks/useLaboresQuery'
import { useLotes } from '../../lotes/hooks/useLotesQuery'
import { useActividades } from '../../planificacion/hooks/usePlanificacionQuery'
import { UpdateLaborDto } from '../services/laboresService'

export default function LaborEditView() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { data: labor, isLoading } = useLaborQuery(id!)
  const { mutate: updateLabor, isPending } = useUpdateLaborMutation()
  const { data: lotes = [] } = useLotes()
  const { data: actividades = [] } = useActividades()

  const handleSubmit = (data: UpdateLaborDto) => {
    if (!id) return
    updateLabor({ id, data })
  }

  const handleCancel = () => {
    navigate(`/dashboard/labores/${id}`)
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin mx-auto text-primary" />
          <p className="text-muted-foreground">Cargando labor...</p>
        </div>
      </div>
    )
  }

  if (!labor) {
    return (
      <div className="space-y-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-12">
              <p className="text-muted-foreground">Labor no encontrada</p>
              <Button className="mt-4" onClick={() => navigate('/dashboard/labores')}>
                Volver al registro
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
        <Button variant="ghost" size="icon" onClick={() => navigate(`/dashboard/labores/${id}`)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Editar Labor Agrícola</h1>
          <p className="text-muted-foreground mt-2">
            {labor.cultivo} - {labor.lote} - {labor.fecha}
          </p>
        </div>
      </div>

      <LaborForm
        labor={labor}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        loading={isPending}
        lotes={lotes}
        actividades={actividades}
      />
    </div>
  )
}

