import { Trabajador } from '../services/trabajadoresService'
import { Button } from '@/components/ui/button'
import { Edit, Trash2, Eye, Mail, Phone, FileText } from 'lucide-react'
import { Link } from 'react-router-dom'

interface TrabajadoresTableProps {
  trabajadores: Trabajador[]
  onDelete: (id: string) => void
  loading?: boolean
}

export default function TrabajadoresTable({ trabajadores, onDelete, loading }: TrabajadoresTableProps) {
  const formatFecha = (fecha: string) => {
    return new Date(fecha).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
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

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (trabajadores.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No se encontraron trabajadores</p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b bg-muted/50">
            <th className="text-left p-4 font-medium text-sm">Trabajador</th>
            <th className="text-left p-4 font-medium text-sm">Documento</th>
            <th className="text-left p-4 font-medium text-sm">Contacto</th>
            <th className="text-left p-4 font-medium text-sm">Cargo</th>
            <th className="text-left p-4 font-medium text-sm">Fecha Ingreso</th>
            <th className="text-left p-4 font-medium text-sm">Estado</th>
            <th className="text-right p-4 font-medium text-sm">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {trabajadores.map((trabajador) => (
            <tr key={trabajador.id} className="border-b hover:bg-muted/30 transition-colors">
              {/* Trabajador */}
              <td className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-semibold text-primary">
                      {trabajador.nombres[0]}
                      {trabajador.apellidos[0]}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium">
                      {trabajador.nombres} {trabajador.apellidos}
                    </p>
                    <p className="text-xs text-muted-foreground">ID: {trabajador.id}</p>
                  </div>
                </div>
              </td>

              {/* Documento */}
              <td className="p-4">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">{trabajador.documento}</p>
                    <p className="text-xs text-muted-foreground">{trabajador.tipoDocumento}</p>
                  </div>
                </div>
              </td>

              {/* Contacto */}
              <td className="p-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-3 w-3 text-muted-foreground" />
                    <span className="text-muted-foreground text-xs">{trabajador.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-3 w-3 text-muted-foreground" />
                    <span className="text-muted-foreground text-xs">{trabajador.telefono}</span>
                  </div>
                </div>
              </td>

              {/* Cargo */}
              <td className="p-4">
                <span className="text-sm font-medium">{trabajador.cargo}</span>
              </td>

              {/* Fecha Ingreso */}
              <td className="p-4">
                <span className="text-sm text-muted-foreground">
                  {formatFecha(trabajador.fechaIngreso)}
                </span>
              </td>

              {/* Estado */}
              <td className="p-4">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getEstadoColor(
                    trabajador.estado
                  )}`}
                >
                  {getEstadoTexto(trabajador.estado)}
                </span>
              </td>

              {/* Acciones */}
              <td className="p-4">
                <div className="flex justify-end gap-1">
                  <Link to={`/dashboard/trabajadores/${trabajador.id}`}>
                    <Button variant="ghost" size="sm" title="Ver detalles">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link to={`/dashboard/trabajadores/${trabajador.id}/editar`}>
                    <Button variant="ghost" size="sm" title="Editar">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    onClick={() => onDelete(trabajador.id)}
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

