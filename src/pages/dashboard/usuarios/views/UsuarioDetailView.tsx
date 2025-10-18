import { useNavigate, useParams, Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  ArrowLeft,
  Edit,
  Trash2,
  Mail,
  Phone,
  Building2,
  Calendar,
  Clock,
  Loader2,
} from 'lucide-react'
import { useUsuarioQuery, useDeleteUsuarioMutation } from '../hooks/useUsuariosQuery'
import { useState } from 'react'
import DeleteConfirmDialog from '../components/DeleteConfirmDialog'

export default function UsuarioDetailView() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { data: usuario, isLoading } = useUsuarioQuery(Number(id!))
  const { mutate: deleteUsuario, isPending: isDeleting } = useDeleteUsuarioMutation()
  const [deleteDialog, setDeleteDialog] = useState(false)

  const handleDelete = () => {
    if (!usuario) return
    deleteUsuario(usuario.id, {
      onSuccess: () => navigate('/dashboard/usuarios'),
    })
  }

  const formatFecha = (fecha: string) => {
    return new Date(fecha).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    })
  }

  const formatFechaHora = (fecha?: string) => {
    if (!fecha) return 'Nunca'
    return new Date(fecha).toLocaleString('es-ES', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin mx-auto text-primary" />
          <p className="text-muted-foreground">Cargando usuario...</p>
        </div>
      </div>
    )
  }

  if (!usuario) {
    return (
      <div className="space-y-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-12">
              <p className="text-muted-foreground">Usuario no encontrado</p>
              <Button className="mt-4" onClick={() => navigate('/dashboard/usuarios')}>
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
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard/usuarios')}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">{usuario.nombre}</h1>
            <p className="text-muted-foreground mt-2">Detalles del usuario</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Link to={`/dashboard/usuarios/${usuario.id}/editar`}>
            <Button variant="outline" className="flex items-center gap-2">
              <Edit className="h-4 w-4" />
              Editar
            </Button>
          </Link>
          <Button
            variant="destructive"
            className="flex items-center gap-2"
            onClick={() => setDeleteDialog(true)}
          >
            <Trash2 className="h-4 w-4" />
            Eliminar
          </Button>
        </div>
      </div>

      {/* Avatar y Info Principal */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            {/* Avatar */}
            <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <span className="text-3xl font-bold text-primary">
                {usuario.nombre
                  .split(' ')
                  .map((n) => n[0])
                  .join('')
                  .toUpperCase()
                  .slice(0, 2)}
              </span>
            </div>

            {/* Info */}
            <div className="flex-1 space-y-4 text-center sm:text-left">
              <div>
                <h2 className="text-2xl font-bold">{usuario.nombre}</h2>
                <p className="text-muted-foreground">ID: {usuario.id}</p>
              </div>

              <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    usuario.rol === 'admin'
                      ? 'bg-purple-100 text-purple-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}
                >
                  {usuario.rol === 'admin' ? 'Administrador' : 'Usuario'}
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                  Activo
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Información de Contacto */}
      <Card>
        <CardHeader>
          <CardTitle>Información de Contacto</CardTitle>
          <CardDescription>Datos de contacto del usuario</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex items-start gap-3">
              <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Email</p>
                <p className="text-base">{usuario.email}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Información del Sistema */}
      <Card>
        <CardHeader>
          <CardTitle>Información del Sistema</CardTitle>
          <CardDescription>Datos de actividad y registro</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex items-start gap-3">
              <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Fecha de Registro</p>
                <p className="text-base">{formatFecha(usuario.created_at)}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Última Actualización</p>
                <p className="text-base">{formatFechaHora(usuario.updated_at)}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Dialog de confirmación de eliminación */}
      <DeleteConfirmDialog
        open={deleteDialog}
        onOpenChange={setDeleteDialog}
        onConfirm={handleDelete}
        userName={usuario.nombre}
        loading={isDeleting}
      />
    </div>
  )
}
