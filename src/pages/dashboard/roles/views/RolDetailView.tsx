import { useNavigate, useParams, Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ChevronLeft, Edit, Shield, Users, Calendar } from 'lucide-react'
import { useRolQuery } from '../hooks/useRolesQuery'
import Loading from '@/components/ui/loading'

export default function RolDetailView() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const { data: rol, isLoading } = useRolQuery(Number(id))

  if (isLoading) return <Loading />
  if (!rol) return <div>Rol no encontrado</div>

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Button
            variant="ghost"
            className="gap-2 mb-4"
            onClick={() => navigate('/dashboard/roles')}
          >
            <ChevronLeft className="h-4 w-4" />
            Volver
          </Button>
          <div className="flex items-center gap-3">
            <Shield className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-3xl font-bold">{rol.nombre}</h1>
            </div>
          </div>
        </div>
        <Link to={`/dashboard/roles/${id}/editar`}>
          <Button className="gap-2">
            <Edit className="h-4 w-4" />
            Editar Rol
          </Button>
        </Link>
      </div>


      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Información Adicional
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">ID del Rol:</span>
            <span className="font-medium">{rol.id}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Fecha de Creación:</span>
            <span className="font-medium">
              {new Date(rol.created_at).toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Última Actualización:</span>
            <span className="font-medium">
              {new Date(rol.updated_at).toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

