import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import LaborForm from '../components/LaborForm'
import { useCreateLaborMutation } from '../hooks/useLaboresQuery'
import { useLotes } from '../../lotes/hooks/useLotesQuery'
import { useActividades } from '../../planificacion/hooks/usePlanificacionQuery'
import { CreateLaborDto } from '../services/laboresService'

export default function LaborCreateView() {
  const navigate = useNavigate()
  const { mutate: createLabor, isPending } = useCreateLaborMutation()
  const { data: lotes = [] } = useLotes()
  const { data: actividades = [] } = useActividades()

  const handleSubmit = (data: CreateLaborDto) => {
    createLabor(data)
  }

  const handleCancel = () => {
    navigate('/dashboard/labores')
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard/labores')}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Registrar Nueva Labor Agrícola</h1>
          <p className="text-muted-foreground mt-2">
            Captura completa de información de actividades de campo
          </p>
        </div>
      </div>

      <LaborForm 
        onSubmit={handleSubmit} 
        onCancel={handleCancel} 
        loading={isPending}
        lotes={lotes}
        actividades={actividades}
      />
    </div>
  )
}

