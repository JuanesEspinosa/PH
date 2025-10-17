import { Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { UserPlus, Search, RefreshCw, X } from 'lucide-react'
import { useTrabajadoresQuery, useDeleteTrabajadorMutation, useTrabajadoresSearch } from '../hooks/useTrabajadoresQuery'
import TrabajadoresTable from '../components/TrabajadoresTable'
import DeleteConfirmDialog from '../components/DeleteConfirmDialog'
import { useState } from 'react'
import { Trabajador } from '../services/trabajadoresService'

export default function TrabajadoresListView() {
  const { data: trabajadores = [], isLoading, refetch } = useTrabajadoresQuery()
  const { mutate: deleteTrabajador, isPending: isDeleting } = useDeleteTrabajadorMutation()
  const { searchQuery, setSearch, clearSearch } = useTrabajadoresSearch()
  
  const [searchInput, setSearchInput] = useState(searchQuery)
  const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; trabajador: Trabajador | null }>({
    open: false,
    trabajador: null,
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
    const trabajador = trabajadores.find((t) => t.id === id)
    if (trabajador) {
      setDeleteDialog({ open: true, trabajador })
    }
  }

  const handleDeleteConfirm = () => {
    if (!deleteDialog.trabajador) return
    deleteTrabajador(deleteDialog.trabajador.id, {
      onSuccess: () => setDeleteDialog({ open: false, trabajador: null })
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Gestión de Trabajadores</h1>
          <p className="text-muted-foreground mt-2">
            Administra todos los trabajadores de la empresa
          </p>
        </div>
        <Link to="/dashboard/trabajadores/nuevo">
          <Button className="flex items-center gap-2">
            <UserPlus className="h-4 w-4" />
            Nuevo Trabajador
          </Button>
        </Link>
      </div>

      {/* Estadísticas */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Total Trabajadores</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{trabajadores.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Activos</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">
              {trabajadores.filter((t) => t.estado === 'activo').length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Inactivos</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-500">
              {trabajadores.filter((t) => t.estado === 'inactivo').length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>En Vacaciones</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">
              {trabajadores.filter((t) => t.estado === 'vacaciones').length}
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
                placeholder="Buscar por nombre, email, documento o cargo..."
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

      {/* Tabla de Trabajadores */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Trabajadores</CardTitle>
          <CardDescription>
            {trabajadores.length} trabajador{trabajadores.length !== 1 ? 'es' : ''} encontrado
            {trabajadores.length !== 1 ? 's' : ''}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <TrabajadoresTable trabajadores={trabajadores} onDelete={handleDeleteClick} loading={isLoading} />
        </CardContent>
      </Card>

      {/* Dialog de confirmación de eliminación */}
      <DeleteConfirmDialog
        open={deleteDialog.open}
        onOpenChange={(open) => setDeleteDialog({ open, trabajador: null })}
        onConfirm={handleDeleteConfirm}
        trabajadorName={deleteDialog.trabajador ? `${deleteDialog.trabajador.nombres} ${deleteDialog.trabajador.apellidos}` : ''}
        loading={isDeleting}
      />
    </div>
  )
}

