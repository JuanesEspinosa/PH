import { useNavigate } from 'react-router-dom';
import { useActividades, useEstadisticas } from '../hooks/usePlanificacionQuery';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, AlertTriangle, TrendingUp, TrendingDown } from 'lucide-react';
import { EstadoActividad } from '@/types/planificacion';

export const MonitoreoView = () => {
  const navigate = useNavigate();
  const { data: actividades = [] } = useActividades();
  const { data: stats } = useEstadisticas();

  const actividadesConAlertas = actividades.filter(a => a.alertas_activas.length > 0);
  const actividadesAtrasadas = actividades.filter(a => a.estado === EstadoActividad.ATRASADA);
  const alertasCriticas = actividades.flatMap(a => 
    a.alertas_activas.filter(alerta => alerta.severidad === 'CRITICAL' || alerta.severidad === 'ERROR')
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={() => navigate('/dashboard/planificacion')}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <AlertTriangle className="h-8 w-8 text-red-600" />
            Centro de Monitoreo
          </h1>
          <p className="text-gray-600 mt-1">
            Seguimiento en tiempo real de actividades críticas
          </p>
        </div>
      </div>

      {/* Métricas Rápidas */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-6 border-l-4 border-l-red-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Alertas Críticas</p>
                <p className="text-3xl font-bold text-red-600">{stats.alertas_criticas}</p>
              </div>
              <AlertTriangle className="h-12 w-12 text-red-500" />
            </div>
          </Card>

          <Card className="p-6 border-l-4 border-l-orange-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Actividades Atrasadas</p>
                <p className="text-3xl font-bold text-orange-600">{stats.actividades_atrasadas}</p>
              </div>
              <TrendingDown className="h-12 w-12 text-orange-500" />
            </div>
          </Card>

          <Card className="p-6 border-l-4 border-l-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Eficiencia General</p>
                <p className="text-3xl font-bold text-green-600">
                  {stats.eficiencia_general_porcentaje.toFixed(0)}%
                </p>
              </div>
              <TrendingUp className="h-12 w-12 text-green-500" />
            </div>
          </Card>
        </div>
      )}

      {/* Alertas Críticas */}
      <Card className="p-6">
        <h2 className="text-xl font-bold mb-4 text-red-700">
          ⚠️ Alertas Críticas que Requieren Atención Inmediata
        </h2>
        {alertasCriticas.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            ✓ No hay alertas críticas en este momento
          </div>
        ) : (
          <div className="space-y-3">
            {alertasCriticas.map((alerta) => {
              const actividad = actividades.find(a => a.id === alerta.actividad_id);
              return (
                <div 
                  key={alerta.id}
                  className="p-4 bg-red-50 border-l-4 border-l-red-600 rounded-lg cursor-pointer hover:bg-red-100"
                  onClick={() => navigate(`/dashboard/planificacion/${alerta.actividad_id}`)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="destructive">{alerta.tipo}</Badge>
                        <span className="font-semibold text-red-900">{alerta.titulo}</span>
                      </div>
                      <p className="text-sm text-red-800">{alerta.mensaje}</p>
                      {actividad && (
                        <p className="text-xs text-red-600 mt-2">
                          Actividad: {actividad.nombre}
                        </p>
                      )}
                    </div>
                    <Button size="sm" variant="outline" className="ml-4">
                      Ver Detalles
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Card>

      {/* Actividades Atrasadas */}
      <Card className="p-6">
        <h2 className="text-xl font-bold mb-4">
          📅 Actividades Atrasadas
        </h2>
        {actividadesAtrasadas.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            ✓ No hay actividades atrasadas
          </div>
        ) : (
          <div className="space-y-3">
            {actividadesAtrasadas.map((actividad) => (
              <div 
                key={actividad.id}
                className="p-4 bg-orange-50 border border-orange-200 rounded-lg cursor-pointer hover:bg-orange-100"
                onClick={() => navigate(`/dashboard/planificacion/${actividad.id}`)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{actividad.nombre}</h3>
                    <p className="text-sm text-gray-600 mt-1">{actividad.descripcion}</p>
                    <div className="flex items-center gap-4 mt-2 text-sm">
                      <span className="text-orange-700 font-medium">
                        Retraso: {actividad.desviacion_tiempo_dias} días
                      </span>
                      <span className="text-gray-600">
                        Progreso: {actividad.progreso_porcentaje}%
                      </span>
                    </div>
                  </div>
                  <Button size="sm">Ver Detalles</Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Todas las Actividades con Alertas */}
      <Card className="p-6">
        <h2 className="text-xl font-bold mb-4">
          🔔 Todas las Actividades con Alertas
        </h2>
        {actividadesConAlertas.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            ✓ No hay actividades con alertas
          </div>
        ) : (
          <div className="space-y-3">
            {actividadesConAlertas.map((actividad) => (
              <div 
                key={actividad.id}
                className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg cursor-pointer hover:bg-yellow-100"
                onClick={() => navigate(`/dashboard/planificacion/${actividad.id}`)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold">{actividad.nombre}</h3>
                      <Badge variant="outline">
                        {actividad.alertas_activas.length} alerta{actividad.alertas_activas.length > 1 ? 's' : ''}
                      </Badge>
                    </div>
                    <div className="space-y-1">
                      {actividad.alertas_activas.map((alerta) => (
                        <p key={alerta.id} className="text-sm text-gray-700">
                          • {alerta.mensaje}
                        </p>
                      ))}
                    </div>
                  </div>
                  <Button size="sm">Ver Detalles</Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};

export default MonitoreoView;

