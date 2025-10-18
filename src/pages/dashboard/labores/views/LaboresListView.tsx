import { Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus, Search, RefreshCw, X, TrendingUp } from 'lucide-react'
import { useLaboresQuery, useDeleteLaborMutation, useLaboresSearch, useEstadisticasLaboresQuery } from '../hooks/useLaboresQuery'
import LaboresTable from '../components/LaboresTable'
import DeleteConfirmDialog from '../components/DeleteConfirmDialog'
import { useState } from 'react'
import { Labor } from '../services/laboresService'

export default function LaboresListView() {
  const { data: labores = [], isLoading, refetch } = useLaboresQuery()
  const { data: estadisticas } = useEstadisticasLaboresQuery()
  const { mutate: deleteLabor, isPending: isDeleting } = useDeleteLaborMutation()
  const { searchQuery, setSearch, clearSearch } = useLaboresSearch()
  
  // Helper function to safely convert string to number and format
  const safeToFixed = (value: any, decimals: number = 0): string => {
    if (value === null || value === undefined) return '0'
    const num = typeof value === 'string' ? parseFloat(value) : value
    return isNaN(num) ? '0' : num.toFixed(decimals)
  }
  
  const [searchInput, setSearchInput] = useState(searchQuery)
  const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; labor: Labor | null }>({
    open: false,
    labor: null,
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
    const labor = labores.find((l) => l.id.toString() === id)
    if (labor) {
      setDeleteDialog({ open: true, labor })
    }
  }

  const handleDeleteConfirm = () => {
    if (!deleteDialog.labor) return
    deleteLabor(deleteDialog.labor.id.toString(), {
      onSuccess: () => setDeleteDialog({ open: false, labor: null })
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Registro de Labores Agrícolas</h1>
          <p className="text-muted-foreground mt-2">
            Sistema integral de captura y gestión de actividades de campo
          </p>
        </div>
        <Link to="/dashboard/labores/nuevo">
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Registrar Nueva Labor
          </Button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Total Labores</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{estadisticas?.total_labores || 0}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Completadas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">
              {estadisticas?.completadas || 0}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Total Recolectado</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">
              {safeToFixed(estadisticas?.total_recolectado, 0)} kg
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Costo Total</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-600">
              ${safeToFixed(estadisticas?.costo_total, 2)}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Métricas de Rendimiento
              </CardTitle>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <p className="text-sm text-muted-foreground">Promedio Rendimiento</p>
              <p className="text-2xl font-bold">{safeToFixed(estadisticas?.promedio_rendimiento, 1)} kg/h</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">En Proceso</p>
              <p className="text-2xl font-bold text-blue-600">{estadisticas?.en_proceso || 0}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Eficiencia</p>
              <p className="text-2xl font-bold text-green-600">
                {estadisticas?.total_labores && estadisticas?.completadas ? 
                  safeToFixed((estadisticas.completadas / estadisticas.total_labores) * 100, 0) : 0}%
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por cultivo, lote, trabajador, tipo de labor..."
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
          <CardTitle>Registro de Labores</CardTitle>
          <CardDescription>
            {labores.length} labor{labores.length !== 1 ? 'es' : ''} registrada{labores.length !== 1 ? 's' : ''}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LaboresTable labores={labores} onDelete={handleDeleteClick} loading={isLoading} />
        </CardContent>
      </Card>

      <DeleteConfirmDialog
        open={deleteDialog.open}
        onOpenChange={(open) => setDeleteDialog({ open, labor: null })}
        onConfirm={handleDeleteConfirm}
        laborInfo={deleteDialog.labor ? `${deleteDialog.labor.cultivo} - ${deleteDialog.labor.fecha}` : ''}
        loading={isDeleting}
      />
    </div>
  )
}

