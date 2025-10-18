import { useNavigate, useParams, Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  ArrowLeft,
  Edit,
  Trash2,
  Calendar,
  MapPin,
  Clock,
  TrendingUp,
  Thermometer,
  Droplets,
  Cloud,
  Wrench,
  FileText,
  Loader2,
  User,
  Wheat,
} from 'lucide-react'
import { useLaborQuery, useDeleteLaborMutation } from '../hooks/useLaboresQuery'
import { useState } from 'react'
import DeleteConfirmDialog from '../components/DeleteConfirmDialog'

export default function LaborDetailView() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { data: labor, isLoading } = useLaborQuery(id!)
  const { mutate: deleteLabor, isPending: isDeleting } = useDeleteLaborMutation()
  const [deleteDialog, setDeleteDialog] = useState(false)

  // Helper function to safely convert string to number and format
  const safeToFixed = (value: any, decimals: number = 1): string => {
    if (value === null || value === undefined) return '0'
    const num = typeof value === 'string' ? parseFloat(value) : value
    return isNaN(num) ? '0' : num.toFixed(decimals)
  }

  const handleDelete = () => {
    if (!labor) return
    deleteLabor(labor.id.toString(), {
      onSuccess: () => navigate('/dashboard/labores'),
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

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'completada':
        return 'bg-green-100 text-green-800'
      case 'en_proceso':
        return 'bg-blue-100 text-blue-800'
      case 'pausada':
        return 'bg-yellow-100 text-yellow-800'
      case 'cancelada':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getEstadoTexto = (estado: string) => {
    switch (estado) {
      case 'completada':
        return 'Completada'
      case 'en_proceso':
        return 'En Proceso'
      case 'pausada':
        return 'Pausada'
      case 'cancelada':
        return 'Cancelada'
      default:
        return estado
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin mx-auto text-primary" />
          <p className="text-muted-foreground">Cargando labor...</p>
        </div>
      </div>
    )
  }

  if (!labor) {
    return (
      <div className="space-y-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-12">
              <p className="text-muted-foreground">Labor no encontrada</p>
              <Button className="mt-4" onClick={() => navigate('/dashboard/labores')}>
                Volver al registro
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
          <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard/labores')}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">{labor.cultivo} - {labor.lote}</h1>
            <p className="text-muted-foreground mt-2">Detalles de la labor agrícola</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Link to={`/dashboard/labores/${labor.id}/editar`}>
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
          <div className="flex flex-col sm:flex-row items-start gap-6">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Wheat className="h-10 w-10 text-primary" />
            </div>

            <div className="flex-1 space-y-4">
              <div>
                <h2 className="text-2xl font-bold">{labor.cultivo}</h2>
                <p className="text-muted-foreground">{labor.lote} • ID: {labor.id}</p>
              </div>

              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  {labor.tipo_labor_nombre}
                </span>
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getEstadoColor(
                    labor.estado
                  )}`}
                >
                  {getEstadoTexto(labor.estado)}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Información General
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm text-muted-foreground">Fecha de Labor</p>
              <p className="font-medium">{formatFecha(labor.fecha)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <User className="h-4 w-4" />
                Trabajador
              </p>
              <p className="font-medium">{labor.trabajador_nombre}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <Clock className="h-4 w-4" />
                Horario
              </p>
              <p className="font-medium">{labor.hora_inicio} - {labor.hora_fin} ({labor.duracion_minutos} min)</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Métricas de Producción
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm text-muted-foreground">Cantidad Recolectada</p>
              <p className="text-2xl font-bold text-green-600">{safeToFixed(labor.cantidad_recolectada, 1)} {labor.unidad_medida}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Peso Total</p>
              <p className="font-medium">{safeToFixed(labor.peso_total, 1)} kg</p>
            </div>
            {labor.rendimiento_por_hora && parseFloat(labor.rendimiento_por_hora.toString()) > 0 && (
              <div>
                <p className="text-sm text-muted-foreground">Rendimiento por Hora</p>
                <p className="font-medium text-blue-600">{safeToFixed(labor.rendimiento_por_hora, 1)} {labor.unidad_medida}/h</p>
              </div>
            )}
            {labor.costo_estimado && (
              <div>
                <p className="text-sm text-muted-foreground">Costo Estimado</p>
                <p className="font-medium text-purple-600">${safeToFixed(labor.costo_estimado, 2)}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Ubicación GPS
          </CardTitle>
          <CardDescription>Geolocalización del trabajo</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-muted-foreground">Coordenadas</p>
              <p className="font-medium">
                Lat: {labor.ubicacion_gps.latitud}, Lon: {labor.ubicacion_gps.longitud}
              </p>
            </div>
            <a
              href={`https://www.google.com/maps?q=${labor.ubicacion_gps.latitud},${labor.ubicacion_gps.longitud}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-blue-600 hover:underline"
            >
              <MapPin className="h-4 w-4" />
              Ver ubicación en Google Maps
            </a>
          </div>
        </CardContent>
      </Card>

      {labor.condiciones_climaticas && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Cloud className="h-5 w-5" />
              Condiciones Climáticas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-3">
              {labor.condiciones_climaticas.temperatura && (
                <div className="flex items-start gap-3">
                  <Thermometer className="h-5 w-5 text-orange-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Temperatura</p>
                    <p className="text-base font-semibold">{labor.condiciones_climaticas.temperatura}°C</p>
                  </div>
                </div>
              )}

              {labor.condiciones_climaticas.humedad && (
                <div className="flex items-start gap-3">
                  <Droplets className="h-5 w-5 text-blue-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Humedad</p>
                    <p className="text-base font-semibold">{labor.condiciones_climaticas.humedad}%</p>
                  </div>
                </div>
              )}

              <div className="flex items-start gap-3">
                <Cloud className="h-5 w-5 text-gray-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Lluvia</p>
                  <p className="text-base font-semibold">
                    {labor.condiciones_climaticas.lluvia ? 'Sí' : 'No'}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {labor.herramientas_insumos && labor.herramientas_insumos.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wrench className="h-5 w-5" />
              Herramientas e Insumos Utilizados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {labor.herramientas_insumos.map((herramienta, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-800"
                >
                  {herramienta}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {labor.observaciones && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Observaciones
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-base whitespace-pre-wrap">{labor.observaciones}</p>
          </CardContent>
        </Card>
      )}

      <DeleteConfirmDialog
        open={deleteDialog}
        onOpenChange={setDeleteDialog}
        onConfirm={handleDelete}
        laborInfo={`${labor.cultivo} - ${labor.fecha}`}
        loading={isDeleting}
      />
    </div>
  )
}

