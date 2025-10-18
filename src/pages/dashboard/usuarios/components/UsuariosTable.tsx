import { Usuario } from '../services/usuariosService'
import { Button } from '@/components/ui/button'
import { Edit, Trash2, Eye } from 'lucide-react'
import { Link } from 'react-router-dom'

interface UsuariosTableProps {
  usuarios: Usuario[]
  onDelete: (id: number) => void
}

export default function UsuariosTable({ usuarios, onDelete }: UsuariosTableProps) {
  const formatFecha = (fecha: string) => {
    return new Date(fecha).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
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
            <th className="text-left p-4 font-medium text-sm">Email</th>
            <th className="text-left p-4 font-medium text-sm">Rol</th>
            <th className="text-left p-4 font-medium text-sm">Fecha Creación</th>
            <th className="text-right p-4 font-medium text-sm">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.id} className="border-b hover:bg-muted/30 transition-colors">
              {/* Usuario */}
              <td className="p-4">
                <div className="flex items-center gap-3">
                  {usuario.avatar ? (
                    <img 
                      src={usuario.avatar} 
                      alt={usuario.nombre}
                      className="w-10 h-10 rounded-full"
                    />
                  ) : (
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
                  )}
                  <div>
                    <p className="font-medium">{usuario.nombre}</p>
                    <p className="text-xs text-muted-foreground">ID: {usuario.id}</p>
                  </div>
                </div>
              </td>

              {/* Email */}
              <td className="p-4">
                <p className="text-sm">{usuario.email}</p>
              </td>

              {/* Rol */}
              <td className="p-4">
                <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-purple-100 text-purple-800">
                  {usuario.rol}
                </span>
              </td>

              {/* Fecha Creación */}
              <td className="p-4">
                <p className="text-sm text-muted-foreground">
                  {formatFecha(usuario.created_at)}
                </p>
              </td>

              {/* Acciones */}
              <td className="p-4">
                <div className="flex items-center justify-end gap-2">
                  <Link to={`/dashboard/usuarios/${usuario.id}`}>
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link to={`/dashboard/usuarios/${usuario.id}/editar`}>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDelete(usuario.id)}
                  >
                    <Trash2 className="h-4 w-4 text-red-600" />
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
