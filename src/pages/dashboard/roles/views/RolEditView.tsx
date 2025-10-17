import { useNavigate, useParams } from 'react-router-dom'
import RolForm from '../components/RolForm'
import { useRolQuery, useUpdateRolMutation } from '../hooks/useRolesQuery'
import type { CreateRolDTO } from '../services/rolesService'
import { ChevronLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Loading from '@/components/ui/loading'

export default function RolEditView() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const { data: rol, isLoading } = useRolQuery(Number(id))
  const updateRol = useUpdateRolMutation()

  const handleSubmit = async (data: CreateRolDTO) => {
    await updateRol.mutateAsync({ id: Number(id), data })
    navigate('/dashboard/roles')
  }

  if (isLoading) return <Loading />
  if (!rol) return <div>Rol no encontrado</div>

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
        <h1 className="text-3xl font-bold">Editar Rol</h1>
        <p className="text-gray-600 mt-2">
          Modifica la información y permisos del rol
        </p>
      </div>

      <RolForm
        initialData={rol}
        onSubmit={handleSubmit}
        isSubmitting={updateRol.isPending}
      />
    </div>
  )
}

