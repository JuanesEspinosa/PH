import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useActividades, useEstadisticas } from '../hooks/usePlanificacionQuery';
import { EstadoActividad, NivelPrioridad, TipoActividad } from '@/types/planificacion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Plus, Calendar, AlertCircle, TrendingUp, CheckCircle2, 
  Clock, Users, AlertTriangle 
} from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

const ESTADO_COLORS = {
  [EstadoActividad.PENDIENTE]: 'bg-gray-100 text-gray-800 border-gray-300',
  [EstadoActividad.EN_PROGRESO]: 'bg-blue-100 text-blue-800 border-blue-300',
  [EstadoActividad.COMPLETADA]: 'bg-green-100 text-green-800 border-green-300',
  [EstadoActividad.ATRASADA]: 'bg-red-100 text-red-800 border-red-300',
  [EstadoActividad.CANCELADA]: 'bg-gray-100 text-gray-600 border-gray-300',
};

const PRIORIDAD_COLORS = {
  [NivelPrioridad.BAJA]: 'bg-blue-500',
  [NivelPrioridad.MEDIA]: 'bg-yellow-500',
  [NivelPrioridad.ALTA]: 'bg-orange-500',
  [NivelPrioridad.URGENTE]: 'bg-red-500',
};

export const PlanificacionListView = () => {
  const navigate = useNavigate();
  const { data: actividades = [], isLoading } = useActividades();
  const { data: stats } = useEstadisticas();
  const [filtroEstado, setFiltroEstado] = useState<EstadoActividad | 'TODAS'>('TODAS');

  const actividadesFiltradas = filtroEstado === 'TODAS' 
    ? actividades 
    : actividades.filter(a => a.estado === filtroEstado);

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
            <Calendar className="h-8 w-8 text-blue-600" />
            Planificación y Monitoreo
          </h1>
          <p className="text-gray-600 mt-1">
            Gestiona y monitorea actividades agrícolas en tiempo real
          </p>
        </div>
        <Button onClick={() => navigate('/dashboard/planificacion/nueva')}>
          <Plus className="h-4 w-4 mr-2" />
          Nueva Actividad
        </Button>
      </div>

      {/* Estadísticas */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Actividades</p>
                <p className="text-2xl font-bold">{stats.total_actividades}</p>
              </div>
              <Calendar className="h-8 w-8 text-blue-500" />
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">En Progreso</p>
                <p className="text-2xl font-bold text-blue-600">{stats.actividades_en_progreso}</p>
              </div>
              <Clock className="h-8 w-8 text-blue-500" />
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Atrasadas</p>
                <p className="text-2xl font-bold text-red-600">{stats.actividades_atrasadas}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-500" />
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Tasa Cumplimiento</p>
                <p className="text-2xl font-bold text-green-600">{stats.tasa_cumplimiento_porcentaje.toFixed(1)}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
          </Card>
        </div>
      )}

      {/* Alertas Críticas */}
      {stats && stats.alertas_criticas > 0 && (
        <Card className="p-4 bg-red-50 border-red-200">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-6 w-6 text-red-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h3 className="font-semibold text-red-900">Atención Requerida</h3>
              <p className="text-sm text-red-800 mt-1">
                Hay {stats.alertas_criticas} alerta{stats.alertas_criticas > 1 ? 's' : ''} crítica{stats.alertas_criticas > 1 ? 's' : ''} que requieren atención inmediata
              </p>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              className="border-red-300 text-red-700 hover:bg-red-100"
              onClick={() => navigate('/dashboard/planificacion/monitoreo')}
            >
              Ver Alertas
            </Button>
          </div>
        </Card>
      )}

      {/* Filtros */}
      <Card className="p-4">
        <div className="flex gap-2 flex-wrap">
          <Button
            variant={filtroEstado === 'TODAS' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFiltroEstado('TODAS')}
          >
            Todas ({actividades.length})
          </Button>
          <Button
            variant={filtroEstado === EstadoActividad.PENDIENTE ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFiltroEstado(EstadoActividad.PENDIENTE)}
          >
            Pendientes ({stats?.actividades_pendientes || 0})
          </Button>
          <Button
            variant={filtroEstado === EstadoActividad.EN_PROGRESO ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFiltroEstado(EstadoActividad.EN_PROGRESO)}
          >
            En Progreso ({stats?.actividades_en_progreso || 0})
          </Button>
          <Button
            variant={filtroEstado === EstadoActividad.ATRASADA ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFiltroEstado(EstadoActividad.ATRASADA)}
          >
            Atrasadas ({stats?.actividades_atrasadas || 0})
          </Button>
          <Button
            variant={filtroEstado === EstadoActividad.COMPLETADA ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFiltroEstado(EstadoActividad.COMPLETADA)}
          >
            Completadas ({stats?.actividades_completadas || 0})
          </Button>
        </div>
      </Card>

      {/* Lista de Actividades */}
      <div className="space-y-4">
        {actividadesFiltradas.map((actividad) => (
          <Card 
            key={actividad.id} 
            className={`p-4 hover:shadow-lg transition-shadow cursor-pointer ${
              actividad.requiere_atencion ? 'border-l-4 border-l-red-500' : ''
            }`}
            onClick={() => navigate(`/dashboard/planificacion/${actividad.id}`)}
          >
            <div className="space-y-3">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <div 
                      className={`w-1 h-12 rounded ${PRIORIDAD_COLORS[actividad.prioridad]}`}
                    />
                    <div>
                      <h3 className="font-bold text-lg">{actividad.nombre}</h3>
                      <p className="text-sm text-gray-600">{actividad.descripcion}</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <Badge className={ESTADO_COLORS[actividad.estado]}>
                    {actividad.estado}
                  </Badge>
                  {actividad.alertas_activas.length > 0 && (
                    <Badge variant="destructive" className="text-xs">
                      {actividad.alertas_activas.length} alerta{actividad.alertas_activas.length > 1 ? 's' : ''}
                    </Badge>
                  )}
                </div>
              </div>

              {/* Progreso */}
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Progreso</span>
                  <span className="font-semibold">{actividad.progreso_porcentaje}%</span>
                </div>
                <Progress value={actividad.progreso_porcentaje} className="h-2" />
              </div>

              {/* Info */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Fecha Inicio</p>
                  <p className="font-medium">
                    {format(new Date(actividad.fecha_inicio_planificada), 'dd MMM yyyy', { locale: es })}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">Fecha Fin</p>
                  <p className="font-medium">
                    {format(new Date(actividad.fecha_fin_planificada), 'dd MMM yyyy', { locale: es })}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">Lote</p>
                  <p className="font-medium">{actividad.lote_nombre || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-gray-600">Trabajadores</p>
                  <p className="font-medium flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {actividad.trabajadores_asignados.length}
                  </p>
                </div>
              </div>

              {/* Desviaciones */}
              {actividad.desviacion_tiempo_dias !== undefined && actividad.desviacion_tiempo_dias !== 0 && (
                <div className={`flex items-center gap-2 text-sm p-2 rounded ${
                  actividad.desviacion_tiempo_dias > 0 ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'
                }`}>
                  {actividad.desviacion_tiempo_dias > 0 ? (
                    <AlertTriangle className="h-4 w-4" />
                  ) : (
                    <CheckCircle2 className="h-4 w-4" />
                  )}
                  <span>
                    {Math.abs(actividad.desviacion_tiempo_dias)} días{' '}
                    {actividad.desviacion_tiempo_dias > 0 ? 'de retraso' : 'de adelanto'}
                  </span>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>

      {actividadesFiltradas.length === 0 && (
        <Card className="p-12 text-center">
          <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-600 mb-2">
            No hay actividades
          </h3>
          <p className="text-gray-500">
            {filtroEstado === 'TODAS' 
              ? 'Comienza creando tu primera actividad planificada'
              : `No hay actividades con estado: ${filtroEstado}`
            }
          </p>
        </Card>
      )}
    </div>
  );
};

export default PlanificacionListView;

