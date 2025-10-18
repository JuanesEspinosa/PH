import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLotes, useLotesEstadisticas } from '../hooks/useLotesQuery';
import { EstadoLote, COLORES_ESTADO, LotesFiltros } from '@/types/lotes';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import MapaReal from '../components/MapaReal';
import { Plus, Map, List, Search } from 'lucide-react';

export const LotesListView = () => {
  const navigate = useNavigate();
  const [vistaActiva, setVistaActiva] = useState<'lista' | 'mapa'>('mapa');
  const [filtros, setFiltros] = useState<LotesFiltros>({});
  
  const { data: lotes = [], isLoading } = useLotes(filtros);
  const { data: estadisticas } = useLotesEstadisticas();
  
  const handleFiltroChange = (campo: keyof LotesFiltros, valor: any) => {
    setFiltros(prev => ({
      ...prev,
      [campo]: valor || undefined
    }));
  };
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando lotes...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Gestión de Lotes</h1>
          <p className="text-gray-600 mt-1">
            Administra y visualiza todos los lotes agrícolas
          </p>
        </div>
        
        <Button onClick={() => navigate('/dashboard/lotes/nuevo')}>
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Lote
        </Button>
      </div>
      
      {/* Estadísticas */}
      {estadisticas && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-4">
            <div className="text-sm text-gray-600">Total de Lotes</div>
            <div className="text-2xl font-bold">{estadisticas.total_lotes}</div>
          </Card>
          
          <Card className="p-4">
            <div className="text-sm text-gray-600">Área Total</div>
            <div className="text-2xl font-bold">{Number(estadisticas.total_hectareas).toFixed(1)} ha</div>
          </Card>
          
        
        </div>
      )}
      
      {/* Filtros */}
      <Card className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div className="space-y-2">
            <label className="text-sm font-medium">Buscar</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Código, nombre..."
                value={filtros.busqueda || ''}
                onChange={(e) => handleFiltroChange('busqueda', e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Estado</label>
            <Select
              value={filtros.estado || 'todos'}
              onValueChange={(value) => handleFiltroChange('estado', value === 'todos' ? undefined : value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Todos los estados" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos los estados</SelectItem>
                <SelectItem value={EstadoLote.EN_CRECIMIENTO}>En Crecimiento</SelectItem>
                <SelectItem value={EstadoLote.EN_COSECHA}>En Cosecha</SelectItem>
                <SelectItem value={EstadoLote.EN_MANTENIMIENTO}>En Mantenimiento</SelectItem>
                <SelectItem value={EstadoLote.INACTIVO}>Inactivo</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Área Mínima (ha)</label>
            <Input
              type="number"
              step="0.1"
              placeholder="0"
              value={filtros.area_min || ''}
              onChange={(e) => handleFiltroChange('area_min', e.target.value ? parseFloat(e.target.value) : undefined)}
            />
          </div>
          
          <div className="flex gap-2">
            <Button
              variant={vistaActiva === 'mapa' ? 'default' : 'outline'}
              onClick={() => setVistaActiva('mapa')}
              className="flex-1"
            >
              <Map className="h-4 w-4 mr-2" />
              Mapa
            </Button>
            <Button
              variant={vistaActiva === 'lista' ? 'default' : 'outline'}
              onClick={() => setVistaActiva('lista')}
              className="flex-1"
            >
              <List className="h-4 w-4 mr-2" />
              Lista
            </Button>
          </div>
        </div>
      </Card>
      
      {/* Contenido */}
      {vistaActiva === 'mapa' ? (
        <MapaReal
          lotes={lotes}
          height="600px"
          onLoteClick={(lote) => navigate(`/dashboard/lotes/${lote.id}`)}
          mostrarLeyenda={true}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {lotes.map((lote) => {
            const colors = COLORES_ESTADO[lote.estado];
            
            return (
              <Card
                key={lote.id}
                className="p-4 cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => navigate(`/dashboard/lotes/${lote.id}`)}
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold text-lg">{lote.nombre}</h3>
                    <p className="text-sm text-gray-500">{lote.codigo}</p>
                  </div>
                  <Badge
                    style={{
                      backgroundColor: colors.color + '20',
                      color: colors.color,
                      border: `1px solid ${colors.color}`
                    }}
                  >
                    {colors.label}
                  </Badge>
                </div>
                
                {lote.descripcion && (
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {lote.descripcion}
                  </p>
                )}
                
                <div className="space-y-2 text-sm">
                  {lote.cultivo_nombre && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Cultivo:</span>
                      <span className="font-medium">{lote.cultivo_nombre}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Área:</span>
                    <span className="font-medium">{lote.area_hectareas} ha</span>
                  </div>
                  
                  {lote.sistema_riego && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Riego:</span>
                      <span className="font-medium">{lote.sistema_riego}</span>
                    </div>
                  )}
                  
                  {lote.tipo_suelo && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Suelo:</span>
                      <span className="font-medium">{lote.tipo_suelo}</span>
                    </div>
                  )}
                </div>
                
                <div className="flex gap-2 mt-3 pt-3 border-t">
                  {lote.tiene_cerca && (
                    <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded">
                      ✓ Cerca
                    </span>
                  )}
                  {lote.tiene_sombra && (
                    <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded">
                      ☀️ Sombra
                    </span>
                  )}
                  {lote.acceso_vehicular && (
                    <span className="text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded">
                      🚗 Acceso
                    </span>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      )}
      
      {lotes.length === 0 && (
        <Card className="p-12 text-center">
          <div className="text-gray-400 text-6xl mb-4">📍</div>
          <h3 className="text-xl font-semibold mb-2">No hay lotes registrados</h3>
          <p className="text-gray-600 mb-4">
            Comienza creando tu primer lote para gestionar tus cultivos
          </p>
          <Button onClick={() => navigate('/dashboard/lotes/nuevo')}>
            <Plus className="h-4 w-4 mr-2" />
            Crear Primer Lote
          </Button>
        </Card>
      )}
    </div>
  );
};

export default LotesListView;

