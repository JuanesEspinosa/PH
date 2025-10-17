import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import UsuarioForm from '../components/UsuarioForm'
import { useCreateUsuarioMutation } from '../hooks/useUsuariosQuery'
import { CreateUsuarioDto } from '../services/usuariosService'

export default function UsuarioCreateView() {
  const navigate = useNavigate()
  const { mutate: createUsuario, isPending } = useCreateUsuarioMutation()

  const handleSubmit = (data: CreateUsuarioDto) => {
    createUsuario(data)
  }

  const handleCancel = () => {
    navigate('/dashboard/usuarios')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard/usuarios')}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Crear Nuevo Usuario</h1>
          <p className="text-muted-foreground mt-2">
            Complete el formulario para agregar un nuevo usuario
          </p>
        </div>
      </div>

      {/* Formulario */}
      <Card>
        <CardHeader>
          <CardTitle>Información del Usuario</CardTitle>
          <CardDescription>
            Los campos marcados con <span className="text-red-500">*</span> son obligatorios
          </CardDescription>
        </CardHeader>
        <CardContent>
          <UsuarioForm onSubmit={handleSubmit} onCancel={handleCancel} loading={isPending} />
        </CardContent>
      </Card>
    </div>
  )
}
