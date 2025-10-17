import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Plus, Shield } from 'lucide-react'
import { useRolesQuery } from '../hooks/useRolesQuery'
import RolesTable from '../components/RolesTable'
import Loading from '@/components/ui/loading'

export default function RolesListView() {
  const { data: roles, isLoading, error } = useRolesQuery()

  if (isLoading) return <Loading />
  if (error) return <div>Error al cargar roles</div>

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Shield className="h-8 w-8 text-primary" />
            Gestión de Roles
          </h1>
          <p className="text-gray-600 mt-2">
            Administra los roles y permisos del sistema
          </p>
        </div>
        <Link to="/dashboard/roles/nuevo">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Nuevo Rol
          </Button>
        </Link>
      </div>

      <Card>
        <RolesTable roles={roles || []} />
      </Card>
    </div>
  )
}

