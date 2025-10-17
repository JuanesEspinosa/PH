import { TipoLabor } from '../services/tiposLaborService'
import { Button } from '@/components/ui/button'
import { Edit, Trash2, Eye } from 'lucide-react'
import { Link } from 'react-router-dom'

interface TiposLaborTableProps {
  tiposLabor: TipoLabor[]
  onDelete: (id: string) => void
  loading?: boolean
}

export default function TiposLaborTable({ tiposLabor, onDelete, loading }: TiposLaborTableProps) {
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

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (tiposLabor.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No se encontraron tipos de labor</p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b bg-muted/50">
            <th className="text-left p-4 font-medium text-sm">ID</th>
            <th className="text-left p-4 font-medium text-sm">Nombre de Labor</th>
            <th className="text-left p-4 font-medium text-sm">Descripción</th>
            <th className="text-left p-4 font-medium text-sm">Categoría</th>
            <th className="text-right p-4 font-medium text-sm">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {tiposLabor.map((tipo) => (
            <tr key={tipo.id} className="border-b hover:bg-muted/30 transition-colors">
              <td className="p-4">
                <span className="text-sm font-mono text-muted-foreground">{tipo.id}</span>
              </td>

              <td className="p-4">
                <p className="font-medium">{tipo.nombre}</p>
              </td>

              <td className="p-4">
                <p className="text-sm text-muted-foreground max-w-md truncate">
                  {tipo.descripcion || '-'}
                </p>
              </td>

              <td className="p-4">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoriaColor(
                    tipo.categoria
                  )}`}
                >
                  {getCategoriaTexto(tipo.categoria)}
                </span>
              </td>

              <td className="p-4">
                <div className="flex justify-end gap-1">
                  <Link to={`/dashboard/tipos-labor/${tipo.id}`}>
                    <Button variant="ghost" size="sm" title="Ver detalles">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link to={`/dashboard/tipos-labor/${tipo.id}/editar`}>
                    <Button variant="ghost" size="sm" title="Editar">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    onClick={() => onDelete(tipo.id)}
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

