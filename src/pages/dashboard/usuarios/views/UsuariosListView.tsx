import { Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { UserPlus, RefreshCw } from 'lucide-react'
import { useUsuariosQuery, useDeleteUsuarioMutation, useEstadisticasQuery } from '../hooks/useUsuariosQuery'
import UsuariosTable from '../components/UsuariosTable'
import DeleteConfirmDialog from '../components/DeleteConfirmDialog'
import { useState } from 'react'
import Loading from '@/components/ui/loading'
import type { Usuario } from '../services/usuariosService'

export default function UsuariosListView() {
  const { data: usuarios = [], isLoading, refetch } = useUsuariosQuery()
  const { data: estadisticas } = useEstadisticasQuery()
  const { mutate: deleteUsuario, isPending: isDeleting } = useDeleteUsuarioMutation()
  
  const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; usuario: Usuario | null }>({
    open: false,
    usuario: null,
  })

  const handleDeleteClick = (id: number) => {
    const usuario = usuarios.find((u) => u.id === id)
    if (usuario) {
      setDeleteDialog({ open: true, usuario })
    }
  }

  const handleDeleteConfirm = () => {
    if (!deleteDialog.usuario) return
    deleteUsuario(deleteDialog.usuario.id, {
      onSuccess: () => setDeleteDialog({ open: false, usuario: null })
    })
  }

  if (isLoading) {
    return <Loading text="Cargando usuarios..." />
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Gestión de Usuarios</h1>
          <p className="text-muted-foreground mt-2">
            Administra todos los usuarios de la plataforma
          </p>
        </div>
        <Link to="/dashboard/usuarios/nuevo">
          <Button className="flex items-center gap-2">
            <UserPlus className="h-4 w-4" />
            Nuevo Usuario
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Total Usuarios</CardDescription>
            <CardTitle className="text-3xl">{estadisticas?.total || 0}</CardTitle>
          </CardHeader>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Activos</CardDescription>
            <CardTitle className="text-3xl text-green-600">
              {estadisticas?.activos || 0}
            </CardTitle>
          </CardHeader>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Inactivos</CardDescription>
            <CardTitle className="text-3xl text-gray-500">
              {estadisticas?.inactivos || 0}
            </CardTitle>
          </CardHeader>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Administradores</CardDescription>
            <CardTitle className="text-3xl text-purple-600">
              {estadisticas?.administradores || 0}
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Actions Bar */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-2 justify-between items-center">
            <p className="text-sm text-muted-foreground">
              {usuarios.length} usuario{usuarios.length !== 1 ? 's' : ''} en el sistema
            </p>
            <Button type="button" variant="outline" onClick={() => refetch()}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Actualizar
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Usuarios</CardTitle>
          <CardDescription>
            Gestiona y administra todos los usuarios del sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          {usuarios.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-muted-foreground mb-4">No hay usuarios registrados</p>
              <Link to="/dashboard/usuarios/nuevo">
                <Button>
                  <UserPlus className="h-4 w-4 mr-2" />
                  Crear primer usuario
                </Button>
              </Link>
            </div>
          ) : (
            <UsuariosTable usuarios={usuarios} onDelete={handleDeleteClick} />
          )}
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmDialog
        open={deleteDialog.open}
        onOpenChange={(open) => setDeleteDialog({ open, usuario: null })}
        onConfirm={handleDeleteConfirm}
        userName={deleteDialog.usuario?.nombre || ''}
        loading={isDeleting}
      />
    </div>
  )
}
