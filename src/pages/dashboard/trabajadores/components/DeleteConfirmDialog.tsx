import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

interface DeleteConfirmDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
  trabajadorName: string
  loading?: boolean
}

export default function DeleteConfirmDialog({
  open,
  onOpenChange,
  onConfirm,
  trabajadorName,
  loading,
}: DeleteConfirmDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>¿Estás seguro?</DialogTitle>
          <DialogDescription>
            Esta acción marcará al trabajador{' '}
            <span className="font-semibold text-foreground">{trabajadorName}</span> como inactivo.
            Sus datos se mantendrán en el sistema para el historial, pero no aparecerá en las listas activas.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>
            Cancelar
          </Button>
          <Button variant="destructive" onClick={onConfirm} disabled={loading}>
            {loading ? 'Marcando como inactivo...' : 'Marcar como Inactivo'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

