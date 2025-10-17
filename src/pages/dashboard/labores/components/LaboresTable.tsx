import { Labor } from '../services/laboresService'
import { Button } from '@/components/ui/button'
import { Edit, Trash2, Eye, MapPin, Clock } from 'lucide-react'
import { Link } from 'react-router-dom'

interface LaboresTableProps {
  labores: Labor[]
  onDelete: (id: string) => void
  loading?: boolean
}

export default function LaboresTable({ labores, onDelete, loading }: LaboresTableProps) {
  const formatFecha = (fecha: string) => {
    return new Date(fecha).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'short',
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

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (labores.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No se encontraron labores registradas</p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b bg-muted/50">
            <th className="text-left p-4 font-medium text-sm">Fecha</th>
            <th className="text-left p-4 font-medium text-sm">Cultivo/Lote</th>
            <th className="text-left p-4 font-medium text-sm">Trabajador</th>
            <th className="text-left p-4 font-medium text-sm">Tipo Labor</th>
            <th className="text-left p-4 font-medium text-sm">Cantidad</th>
            <th className="text-left p-4 font-medium text-sm">Duración</th>
            <th className="text-left p-4 font-medium text-sm">Estado</th>
            <th className="text-right p-4 font-medium text-sm">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {labores.map((labor) => (
            <tr key={labor.id} className="border-b hover:bg-muted/30 transition-colors">
              <td className="p-4">
                <div className="flex flex-col">
                  <span className="font-medium">{formatFecha(labor.fecha)}</span>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {labor.horaInicio} - {labor.horaFin}
                  </span>
                </div>
              </td>

              <td className="p-4">
                <div className="flex flex-col">
                  <span className="font-medium">{labor.cultivo}</span>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {labor.lote}
                  </span>
                </div>
              </td>

              <td className="p-4">
                <span className="text-sm">{labor.trabajadorNombre}</span>
              </td>

              <td className="p-4">
                <span className="text-sm">{labor.tipoLaborNombre}</span>
              </td>

              <td className="p-4">
                <div className="flex flex-col">
                  <span className="font-medium">{labor.cantidadRecolectada} {labor.unidadMedida}</span>
                  <span className="text-xs text-muted-foreground">Peso: {labor.pesoTotal} kg</span>
                </div>
              </td>

              <td className="p-4">
                <div className="flex flex-col">
                  <span className="text-sm">{labor.duracionMinutos} min</span>
                  {labor.rendimientoPorHora > 0 && (
                    <span className="text-xs text-muted-foreground">
                      {labor.rendimientoPorHora} {labor.unidadMedida}/h
                    </span>
                  )}
                </div>
              </td>

              <td className="p-4">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getEstadoColor(
                    labor.estado
                  )}`}
                >
                  {getEstadoTexto(labor.estado)}
                </span>
              </td>

              <td className="p-4">
                <div className="flex justify-end gap-1">
                  <Link to={`/dashboard/labores/${labor.id}`}>
                    <Button variant="ghost" size="sm" title="Ver detalles">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link to={`/dashboard/labores/${labor.id}/editar`}>
                    <Button variant="ghost" size="sm" title="Editar">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    onClick={() => onDelete(labor.id)}
                    title="Eliminar"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

