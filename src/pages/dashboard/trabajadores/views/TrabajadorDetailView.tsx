import { useNavigate, useParams, Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  ArrowLeft,
  Edit,
  Trash2,
  Mail,
  Phone,
  Briefcase,
  Calendar,
  MapPin,
  FileText,
  Loader2,
} from 'lucide-react'
import { useTrabajadorQuery, useDeleteTrabajadorMutation } from '../hooks/useTrabajadoresQuery'
import { useState } from 'react'
import DeleteConfirmDialog from '../components/DeleteConfirmDialog'

export default function TrabajadorDetailView() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { data: trabajador, isLoading } = useTrabajadorQuery(id!)
  const { mutate: deleteTrabajador, isPending: isDeleting } = useDeleteTrabajadorMutation()
  const [deleteDialog, setDeleteDialog] = useState(false)

  const handleDelete = () => {
    if (!trabajador) return
    deleteTrabajador(trabajador.id.toString(), {
      onSuccess: () => navigate('/dashboard/trabajadores'),
    })
  }

  const formatFecha = (fecha: string) => {
    if (!fecha) return 'N/A'
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

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'activo':
        return 'bg-green-100 text-green-800'
      case 'inactivo':
        return 'bg-gray-100 text-gray-800'
      case 'vacaciones':
        return 'bg-blue-100 text-blue-800'
      case 'licencia':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getEstadoTexto = (estado: string) => {
    switch (estado) {
      case 'activo':
        return 'Activo'
      case 'inactivo':
        return 'Inactivo'
      case 'vacaciones':
        return 'Vacaciones'
      case 'licencia':
        return 'Licencia'
      default:
        return estado
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin mx-auto text-primary" />
          <p className="text-muted-foreground">Cargando trabajador...</p>
        </div>
      </div>
    )
  }

  if (!trabajador) {
    return (
      <div className="space-y-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-12">
              <p className="text-muted-foreground">Trabajador no encontrado</p>
              <Button className="mt-4" onClick={() => navigate('/dashboard/trabajadores')}>
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
          <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard/trabajadores')}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">
              {trabajador.nombres} {trabajador.apellidos}
            </h1>
            <p className="text-muted-foreground mt-2">Detalles del trabajador</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Link to={`/dashboard/trabajadores/${trabajador.id}/editar`}>
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
                {trabajador.nombres[0]}
                {trabajador.apellidos[0]}
              </span>
            </div>

            {/* Info */}
            <div className="flex-1 space-y-4 text-center sm:text-left">
              <div>
                <h2 className="text-2xl font-bold">
                  {trabajador.nombres} {trabajador.apellidos}
                </h2>
                <p className="text-muted-foreground">ID: {trabajador.id}</p>
              </div>

              <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                  {trabajador.cargo}
                </span>
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getEstadoColor(
                    trabajador.estado
                  )}`}
                >
                  {getEstadoTexto(trabajador.estado)}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Información Personal */}
      <Card>
        <CardHeader>
          <CardTitle>Información Personal</CardTitle>
          <CardDescription>Datos personales del trabajador</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex items-start gap-3">
              <FileText className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Documento</p>
                <p className="text-base">
                  {trabajador.documento} ({trabajador.tipo_documento})
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Fecha de Ingreso</p>
                <p className="text-base">{formatFecha(trabajador.fecha_ingreso)}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Información de Contacto */}
      <Card>
        <CardHeader>
          <CardTitle>Información de Contacto</CardTitle>
          <CardDescription>Datos de contacto del trabajador</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex items-start gap-3">
              <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Email</p>
                <p className="text-base">{trabajador.email}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Teléfono</p>
                <p className="text-base">{trabajador.telefono}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 sm:col-span-2">
              <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Dirección</p>
                <p className="text-base">{trabajador.direccion}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Información Laboral */}
      <Card>
        <CardHeader>
          <CardTitle>Información Laboral</CardTitle>
          <CardDescription>Datos profesionales y de cargo</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex items-start gap-3">
              <Briefcase className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Cargo</p>
                <p className="text-base">{trabajador.cargo}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Fecha de Creación</p>
                <p className="text-base">{formatFecha(trabajador.fecha_creacion)}</p>
              </div>
            </div>

            {trabajador.ultima_modificacion && (
              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Última Modificación</p>
                  <p className="text-base">{formatFechaHora(trabajador.ultima_modificacion)}</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Dialog de confirmación de eliminación */}
      <DeleteConfirmDialog
        open={deleteDialog}
        onOpenChange={setDeleteDialog}
        onConfirm={handleDelete}
        trabajadorName={`${trabajador.nombres} ${trabajador.apellidos}`}
        loading={isDeleting}
      />
    </div>
  )
}

