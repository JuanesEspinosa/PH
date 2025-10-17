import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import TipoLaborForm from '../components/TipoLaborForm'
import { useCreateTipoLaborMutation } from '../hooks/useTiposLaborQuery'
import { CreateTipoLaborDto } from '../services/tiposLaborService'

export default function TipoLaborCreateView() {
  const navigate = useNavigate()
  const { mutate: createTipoLabor, isPending } = useCreateTipoLaborMutation()

  const handleSubmit = (data: CreateTipoLaborDto) => {
    createTipoLabor(data)
  }

  const handleCancel = () => {
    navigate('/dashboard/tipos-labor')
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard/tipos-labor')}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Crear Nuevo Tipo de Labor</h1>
          <p className="text-muted-foreground mt-2">
            Define un nuevo tipo de labor agrícola
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Información del Tipo de Labor</CardTitle>
          <CardDescription>
            Los campos marcados con <span className="text-red-500">*</span> son obligatorios
          </CardDescription>
        </CardHeader>
        <CardContent>
          <TipoLaborForm onSubmit={handleSubmit} onCancel={handleCancel} loading={isPending} />
        </CardContent>
      </Card>
    </div>
  )
}

