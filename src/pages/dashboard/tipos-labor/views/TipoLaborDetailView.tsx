import { useNavigate, useParams, Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Edit, Trash2, Calendar, Tag, FileText, Loader2 } from 'lucide-react'
import { useTipoLaborQuery, useDeleteTipoLaborMutation } from '../hooks/useTiposLaborQuery'
import { useState } from 'react'
import DeleteConfirmDialog from '../components/DeleteConfirmDialog'

export default function TipoLaborDetailView() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { data: tipoLabor, isLoading } = useTipoLaborQuery(id!)
  const { mutate: deleteTipoLabor, isPending: isDeleting } = useDeleteTipoLaborMutation()
  const [deleteDialog, setDeleteDialog] = useState(false)

  const handleDelete = () => {
    if (!tipoLabor) return
    deleteTipoLabor(tipoLabor.id.toString(), {
      onSuccess: () => navigate('/dashboard/tipos-labor'),
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

  const getCategoriaColor = (categoria: string) => {
    switch (categoria) {
      case 'siembra':
        return 'bg-green-100 text-green-800'
      case 'cosecha':
        return 'bg-yellow-100 text-yellow-800'
      case 'riego':
        return 'bg-blue-100 text-blue-800'
      case 'fertilizacion':
        return 'bg-purple-100 text-purple-800'
      case 'control_plagas':
        return 'bg-red-100 text-red-800'
      case 'mantenimiento':
        return 'bg-orange-100 text-orange-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getCategoriaTexto = (categoria: string) => {
    switch (categoria) {
      case 'siembra':
        return 'Siembra'
      case 'cosecha':
        return 'Cosecha'
      case 'riego':
        return 'Riego'
      case 'fertilizacion':
        return 'Fertilización'
      case 'control_plagas':
        return 'Control de Plagas'
      case 'mantenimiento':
        return 'Mantenimiento'
      default:
        return 'Otro'
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin mx-auto text-primary" />
          <p className="text-muted-foreground">Cargando tipo de labor...</p>
        </div>
      </div>
    )
  }

  if (!tipoLabor) {
    return (
      <div className="space-y-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-12">
              <p className="text-muted-foreground">Tipo de labor no encontrado</p>
              <Button className="mt-4" onClick={() => navigate('/dashboard/tipos-labor')}>
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
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard/tipos-labor')}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">{tipoLabor.nombre}</h1>
            <p className="text-muted-foreground mt-2">Detalles del tipo de labor</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Link to={`/dashboard/tipos-labor/${tipoLabor.id}/editar`}>
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

      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div>
              <h2 className="text-2xl font-bold">{tipoLabor.nombre}</h2>
              <p className="text-muted-foreground">ID: {tipoLabor.id}</p>
            </div>

            <div>
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getCategoriaColor(
                  tipoLabor.categoria
                )}`}
              >
                {getCategoriaTexto(tipoLabor.categoria)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Descripción</CardTitle>
          <CardDescription>Detalles sobre este tipo de labor</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-start gap-3">
            <FileText className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div>
              <p className="text-base">
                {tipoLabor.descripcion || 'Sin descripción disponible'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Información Adicional</CardTitle>
          <CardDescription>Metadatos del sistema</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex items-start gap-3">
              <Tag className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Categoría</p>
                <p className="text-base">{getCategoriaTexto(tipoLabor.categoria)}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Fecha de Creación</p>
                <p className="text-base">{formatFecha(tipoLabor.fecha_creacion)}</p>
              </div>
            </div>

            {tipoLabor.ultima_modificacion && (
              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Última Modificación</p>
                  <p className="text-base">{formatFechaHora(tipoLabor.ultima_modificacion)}</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <DeleteConfirmDialog
        open={deleteDialog}
        onOpenChange={setDeleteDialog}
        onConfirm={handleDelete}
        tipoLaborName={tipoLabor.nombre}
        loading={isDeleting}
      />
    </div>
  )
}

