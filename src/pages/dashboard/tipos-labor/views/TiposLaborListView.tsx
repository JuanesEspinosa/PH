import { Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus, Search, RefreshCw, X } from 'lucide-react'
import { useTiposLaborQuery, useDeleteTipoLaborMutation, useTiposLaborSearch } from '../hooks/useTiposLaborQuery'
import TiposLaborTable from '../components/TiposLaborTable'
import DeleteConfirmDialog from '../components/DeleteConfirmDialog'
import { useState } from 'react'
import { TipoLabor } from '../services/tiposLaborService'

export default function TiposLaborListView() {
  const { data: tiposLabor = [], isLoading, refetch } = useTiposLaborQuery()
  const { mutate: deleteTipoLabor, isPending: isDeleting } = useDeleteTipoLaborMutation()
  const { searchQuery, setSearch, clearSearch } = useTiposLaborSearch()
  
  const [searchInput, setSearchInput] = useState(searchQuery)
  const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; tipoLabor: TipoLabor | null }>({
    open: false,
    tipoLabor: null,
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
    const tipoLabor = tiposLabor.find((t) => t.id === id)
    if (tipoLabor) {
      setDeleteDialog({ open: true, tipoLabor })
    }
  }

  const handleDeleteConfirm = () => {
    if (!deleteDialog.tipoLabor) return
    deleteTipoLabor(deleteDialog.tipoLabor.id, {
      onSuccess: () => setDeleteDialog({ open: false, tipoLabor: null })
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Tipos de Labor Agrícola</h1>
          <p className="text-muted-foreground mt-2">
            Gestiona los tipos de labor para tu sistema agrícola
          </p>
        </div>
        <Link to="/dashboard/tipos-labor/nuevo">
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Nuevo Tipo de Labor
          </Button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Total Tipos</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{tiposLabor.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Siembra</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">
              {tiposLabor.filter((t) => t.categoria === 'siembra').length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Cosecha</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-600">
              {tiposLabor.filter((t) => t.categoria === 'cosecha').length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Riego</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">
              {tiposLabor.filter((t) => t.categoria === 'riego').length}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="pt-6">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nombre, descripción o categoría..."
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

      <Card>
        <CardHeader>
          <CardTitle>Lista de Tipos de Labor</CardTitle>
          <CardDescription>
            {tiposLabor.length} tipo{tiposLabor.length !== 1 ? 's' : ''} de labor encontrado
            {tiposLabor.length !== 1 ? 's' : ''}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <TiposLaborTable tiposLabor={tiposLabor} onDelete={handleDeleteClick} loading={isLoading} />
        </CardContent>
      </Card>

      <DeleteConfirmDialog
        open={deleteDialog.open}
        onOpenChange={(open) => setDeleteDialog({ open, tipoLabor: null })}
        onConfirm={handleDeleteConfirm}
        tipoLaborName={deleteDialog.tipoLabor?.nombre || ''}
        loading={isDeleting}
      />
    </div>
  )
}

