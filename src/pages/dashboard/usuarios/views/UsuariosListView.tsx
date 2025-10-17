import { Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { UserPlus, Search, RefreshCw, X } from 'lucide-react'
import { useUsuariosQuery, useDeleteUsuarioMutation, useUsuariosSearch } from '../hooks/useUsuariosQuery'
import UsuariosTable from '../components/UsuariosTable'
import DeleteConfirmDialog from '../components/DeleteConfirmDialog'
import { useState } from 'react'
import { Usuario } from '../services/usuariosService'

export default function UsuariosListView() {
  const { data: usuarios = [], isLoading, refetch } = useUsuariosQuery()
  const { mutate: deleteUsuario, isPending: isDeleting } = useDeleteUsuarioMutation()
  const { searchQuery, setSearch, clearSearch } = useUsuariosSearch()
  
  const [searchInput, setSearchInput] = useState(searchQuery)
  const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; usuario: Usuario | null }>({
    open: false,
    usuario: null,
  })

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setSearch(searchInput)
  }

  const handleClearSearch = () => {
    setSearchInput('')
    clearSearch()
  }

  const handleDeleteClick = (id: string) => {
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

      {/* Estadísticas */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Total Usuarios</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{usuarios.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Activos</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">
              {usuarios.filter((u) => u.estado === 'activo').length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Inactivos</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-500">
              {usuarios.filter((u) => u.estado === 'inactivo').length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Administradores</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-600">
              {usuarios.filter((u) => u.rol === 'admin').length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Búsqueda y Acciones */}
      <Card>
        <CardContent className="pt-6">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nombre, email o departamento..."
                className="pl-10 pr-10"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            <Button type="submit" variant="secondary">
              Buscar
            </Button>
            <Button type="button" variant="outline" onClick={() => refetch()} disabled={isLoading}>
              <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              Actualizar
            </Button>
          </form>
          {searchQuery && (
            <p className="text-sm text-muted-foreground mt-2">
              Buscando: <strong>{searchQuery}</strong>
            </p>
          )}
        </CardContent>
      </Card>

      {/* Tabla de Usuarios */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Usuarios</CardTitle>
          <CardDescription>
            {usuarios.length} usuario{usuarios.length !== 1 ? 's' : ''} encontrado
            {usuarios.length !== 1 ? 's' : ''}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <UsuariosTable usuarios={usuarios} onDelete={handleDeleteClick} loading={isLoading} />
        </CardContent>
      </Card>

      {/* Dialog de confirmación de eliminación */}
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
