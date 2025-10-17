import { Usuario } from '../services/usuariosService'
import { Button } from '@/components/ui/button'
import { Edit, Trash2, Eye, Mail, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'

interface UsuariosTableProps {
  usuarios: Usuario[]
  onDelete: (id: string, nombre: string) => void
  loading?: boolean
}

export default function UsuariosTable({ usuarios, onDelete, loading }: UsuariosTableProps) {
  // const formatFecha = (fecha: string) => {
  //   return new Date(fecha).toLocaleDateString('es-ES', {
  //     day: '2-digit',
  //     month: '2-digit',
  //     year: 'numeric',
  //     })
  // }

  const formatFechaHora = (fecha?: string) => {
    if (!fecha) return 'Nunca'
    return new Date(fecha).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (usuarios.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No se encontraron usuarios</p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b bg-muted/50">
            <th className="text-left p-4 font-medium text-sm">Usuario</th>
            <th className="text-left p-4 font-medium text-sm">Contacto</th>
            <th className="text-left p-4 font-medium text-sm">Rol</th>
            <th className="text-left p-4 font-medium text-sm">Departamento</th>
            <th className="text-left p-4 font-medium text-sm">Estado</th>
            <th className="text-left p-4 font-medium text-sm">Último Acceso</th>
            <th className="text-right p-4 font-medium text-sm">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.id} className="border-b hover:bg-muted/30 transition-colors">
              {/* Usuario */}
              <td className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-semibold text-primary">
                      {usuario.nombre
                        .split(' ')
                        .map((n) => n[0])
                        .join('')
                        .toUpperCase()
                        .slice(0, 2)}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium">{usuario.nombre}</p>
                    <p className="text-xs text-muted-foreground">
                      ID: {usuario.id}
                    </p>
                  </div>
                </div>
              </td>

              {/* Contacto */}
              <td className="p-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-3 w-3 text-muted-foreground" />
                    <span className="text-muted-foreground">{usuario.email}</span>
                  </div>
                  {usuario.telefono && (
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-3 w-3 text-muted-foreground" />
                      <span className="text-muted-foreground">{usuario.telefono}</span>
                    </div>
                  )}
                </div>
              </td>

              {/* Rol */}
              <td className="p-4">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    usuario.rol === 'admin'
                      ? 'bg-purple-100 text-purple-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}
                >
                  {usuario.rol === 'admin' ? 'Administrador' : 'Usuario'}
                </span>
              </td>

              {/* Departamento */}
              <td className="p-4">
                <span className="text-sm text-muted-foreground">
                  {usuario.departamento || '-'}
                </span>
              </td>

              {/* Estado */}
              <td className="p-4">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    usuario.estado === 'activo'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {usuario.estado === 'activo' ? 'Activo' : 'Inactivo'}
                </span>
              </td>

              {/* Último acceso */}
              <td className="p-4">
                <span className="text-sm text-muted-foreground">
                  {formatFechaHora(usuario.ultimoAcceso)}
                </span>
              </td>

              {/* Acciones */}
              <td className="p-4">
                <div className="flex justify-end gap-1">
                  <Link to={`/dashboard/usuarios/${usuario.id}`}>
                    <Button variant="ghost" size="sm" title="Ver detalles">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link to={`/dashboard/usuarios/${usuario.id}/editar`}>
                    <Button variant="ghost" size="sm" title="Editar">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    onClick={() => onDelete(usuario.id, usuario.nombre)}
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

