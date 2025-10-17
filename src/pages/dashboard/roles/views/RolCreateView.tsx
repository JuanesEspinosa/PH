import { useNavigate } from 'react-router-dom'
import RolForm from '../components/RolForm'
import { useCreateRolMutation } from '../hooks/useRolesQuery'
import type { CreateRolDTO } from '../services/rolesService'
import { ChevronLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function RolCreateView() {
  const navigate = useNavigate()
  const createRol = useCreateRolMutation()

  const handleSubmit = async (data: CreateRolDTO) => {
    await createRol.mutateAsync(data)
    navigate('/dashboard/roles')
  }

  return (
    <div className="space-y-6">
      <div>
        <Button
          variant="ghost"
          className="gap-2 mb-4"
          onClick={() => navigate('/dashboard/roles')}
        >
          <ChevronLeft className="h-4 w-4" />
          Volver
        </Button>
        <h1 className="text-3xl font-bold">Crear Nuevo Rol</h1>
        <p className="text-gray-600 mt-2">
          Define un nuevo rol y sus permisos en el sistema
        </p>
      </div>

      <RolForm onSubmit={handleSubmit} isSubmitting={createRol.isPending} />
    </div>
  )
}

