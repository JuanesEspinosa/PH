import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Edit, Eye, Trash2 } from 'lucide-react'
import type { Rol } from '../services/rolesService'
import { useState } from 'react'
import DeleteRolDialog from './DeleteRolDialog'

interface RolesTableProps {
  roles: Rol[]
}

export default function RolesTable({ roles }: RolesTableProps) {
  const [rolToDelete, setRolToDelete] = useState<Rol | null>(null)

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 w-20">
                #
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                Nombre del Rol
              </th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900 w-32">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {roles.map((rol, index) => (
              <tr key={rol.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <span className="text-gray-500 font-medium">{index + 1}</span>
                </td>
                <td className="px-6 py-4">
                  <p className="font-medium text-gray-900 text-lg">{rol.nombre}</p>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <Link to={`/dashboard/roles/${rol.id}`}>
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Link to={`/dashboard/roles/${rol.id}/editar`}>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setRolToDelete(rol)}
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

      {rolToDelete && (
        <DeleteRolDialog
          rol={rolToDelete}
          open={!!rolToDelete}
          onOpenChange={(open) => !open && setRolToDelete(null)}
        />
      )}
    </>
  )
}

