import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useDeleteRolMutation } from '../hooks/useRolesQuery'
import type { Rol } from '../services/rolesService'
import { AlertTriangle } from 'lucide-react'

interface DeleteRolDialogProps {
  rol: Rol
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function DeleteRolDialog({ rol, open, onOpenChange }: DeleteRolDialogProps) {
  const deleteRol = useDeleteRolMutation()

  const handleDelete = async () => {
    await deleteRol.mutateAsync(rol.id)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-red-100 rounded-full">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <DialogTitle>¿Eliminar rol?</DialogTitle>
              <DialogDescription>
                Esta acción no se puede deshacer
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="py-4">
          <p className="text-sm text-gray-600">
            ¿Estás seguro de que deseas eliminar el rol <strong>{rol.nombre}</strong>?
          </p>
          {rol.usuariosAsignados > 0 && (
            <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
              <p className="text-sm text-amber-800">
                ⚠️ Este rol tiene {rol.usuariosAsignados} usuario(s) asignado(s). 
                Asegúrate de reasignar esos usuarios antes de continuar.
              </p>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={deleteRol.isPending}
          >
            {deleteRol.isPending ? 'Eliminando...' : 'Eliminar'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

