import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCultivos, useDeleteCultivo } from '../hooks/useCultivosQuery';
import { TipoCultivo } from '@/types/cultivos';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Edit, Trash2, Leaf } from 'lucide-react';

export const CultivosListView = () => {
  const navigate = useNavigate();
  const { data: cultivos = [], isLoading } = useCultivos();
  const deleteCultivo = useDeleteCultivo();
  const [busqueda, setBusqueda] = useState('');
  
  // Filtrar cultivos
  const cultivosFiltrados = cultivos.filter(cultivo =>
    cultivo.activo && (
      cultivo.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      cultivo.tipo.toLowerCase().includes(busqueda.toLowerCase())
    )
  );
  
  const handleDelete = async (id: string, nombre: string) => {
    if (confirm(`¿Estás seguro de eliminar el cultivo "${nombre}"?`)) {
      await deleteCultivo.mutateAsync(id);
    }
  };
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Leaf className="h-8 w-8 text-green-600" />
            Gestión de Cultivos
          </h1>
          <p className="text-gray-600 mt-1">
            Administra los tipos de cultivos de tu finca
          </p>
        </div>
        <Button onClick={() => navigate('/dashboard/cultivos/nuevo')}>
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Cultivo
        </Button>
      </div>
      
      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="text-sm text-gray-600">Total Cultivos</div>
          <div className="text-2xl font-bold">{cultivos.filter(c => c.activo).length}</div>
        </Card>
        
        {Object.values(TipoCultivo).slice(0, 3).map((tipo) => {
          const count = cultivos.filter(c => c.activo && c.tipo === tipo).length;
          return (
            <Card key={tipo} className="p-4">
              <div className="text-sm text-gray-600">{tipo}s</div>
              <div className="text-2xl font-bold">{count}</div>
            </Card>
          );
        })}
      </div>
      
      {/* Búsqueda */}
      <Card className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text"
            placeholder="Buscar cultivos por nombre o tipo..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="pl-10"
          />
        </div>
      </Card>
      
      {/* Lista de Cultivos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cultivosFiltrados.map((cultivo) => (
          <Card key={cultivo.id} className="p-4 hover:shadow-lg transition-shadow">
            <div className="space-y-3">
              {/* Header */}
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-bold text-lg">{cultivo.nombre}</h3>
                  {cultivo.nombre_cientifico && (
                    <p className="text-sm text-gray-500 italic">{cultivo.nombre_cientifico}</p>
                  )}
                </div>
                <Badge className="bg-green-100 text-green-800 border-green-300">
                  {cultivo.tipo}
                </Badge>
              </div>
              
              {/* Info */}
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Ciclo de cultivo:</span>
                  <span className="font-medium">{cultivo.ciclo_dias} días</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Meses aproximados:</span>
                  <span className="font-medium">{Math.round(cultivo.ciclo_dias / 30)} meses</span>
                </div>
              </div>
              
              {cultivo.descripcion && (
                <p className="text-sm text-gray-600 line-clamp-2">
                  {cultivo.descripcion}
                </p>
              )}
              
              {/* Acciones */}
              <div className="flex gap-2 pt-2 border-t">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => navigate(`/dashboard/cultivos/${cultivo.id}/editar`)}
                >
                  <Edit className="h-4 w-4 mr-1" />
                  Editar
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-600 hover:text-red-700"
                  onClick={() => handleDelete(cultivo.id, cultivo.nombre)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
      
      {cultivosFiltrados.length === 0 && (
        <Card className="p-12 text-center">
          <Leaf className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-600 mb-2">
            No se encontraron cultivos
          </h3>
          <p className="text-gray-500">
            {busqueda ? 'Intenta con otros términos de búsqueda' : 'Comienza agregando tu primer cultivo'}
          </p>
        </Card>
      )}
    </div>
  );
};

export default CultivosListView;

