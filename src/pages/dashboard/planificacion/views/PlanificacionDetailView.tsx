import { useNavigate, useParams } from 'react-router-dom';
import { useActividad } from '../hooks/usePlanificacionQuery';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Users, AlertCircle, Target } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { EstadoActividad } from '@/types/planificacion';

const ESTADO_COLORS = {
  [EstadoActividad.PENDIENTE]: 'bg-gray-100 text-gray-800 border-gray-300',
  [EstadoActividad.EN_PROGRESO]: 'bg-blue-100 text-blue-800 border-blue-300',
  [EstadoActividad.COMPLETADA]: 'bg-green-100 text-green-800 border-green-300',
  [EstadoActividad.ATRASADA]: 'bg-red-100 text-red-800 border-red-300',
  [EstadoActividad.CANCELADA]: 'bg-gray-100 text-gray-600 border-gray-300',
};

export const PlanificacionDetailView = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: actividad, isLoading } = useActividad(id!);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!actividad) {
    return (
      <div className="space-y-6">
        <Card className="p-12 text-center">
          <AlertCircle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-600 mb-2">
            Actividad no encontrada
          </h3>
        </Card>
        <Button onClick={() => navigate('/dashboard/planificacion')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={() => navigate('/dashboard/planificacion')}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold">{actividad.nombre}</h1>
          <p className="text-gray-600 mt-1">{actividad.descripcion}</p>
        </div>
        <Badge className={ESTADO_COLORS[actividad.estado]}>
          {actividad.estado}
        </Badge>
      </div>

      {/* Progreso */}
      <Card className="p-6">
        <h3 className="font-semibold text-lg mb-4">Progreso General</h3>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Avance</span>
            <span className="font-semibold text-2xl">{actividad.progreso_porcentaje}%</span>
          </div>
          <Progress value={actividad.progreso_porcentaje} className="h-4" />
        </div>
      </Card>

      {/* Información General */}
      <Card className="p-6">
        <h3 className="font-semibold text-lg mb-4">Información General</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-gray-600">Tipo de Actividad</p>
            <p className="font-medium text-lg">{actividad.tipo}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Prioridad</p>
            <p className="font-medium text-lg">{actividad.prioridad}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Fecha Inicio Planificada</p>
            <p className="font-medium">
              {format(new Date(actividad.fecha_inicio_planificada), 'dd MMMM yyyy', { locale: es })}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Fecha Fin Planificada</p>
            <p className="font-medium">
              {format(new Date(actividad.fecha_fin_planificada), 'dd MMMM yyyy', { locale: es })}
            </p>
          </div>
          {actividad.lote_nombre && (
            <div>
              <p className="text-sm text-gray-600">Lote Asignado</p>
              <p className="font-medium">{actividad.lote_nombre}</p>
            </div>
          )}
          {actividad.cultivo_nombre && (
            <div>
              <p className="text-sm text-gray-600">Cultivo</p>
              <p className="font-medium">{actividad.cultivo_nombre}</p>
            </div>
          )}
        </div>
      </Card>

      {/* Trabajadores */}
      {actividad.trabajadores_nombres && actividad.trabajadores_nombres.length > 0 && (
        <Card className="p-6">
          <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
            <Users className="h-5 w-5" />
            Equipo Asignado
          </h3>
          <div className="space-y-2">
            {actividad.trabajadores_nombres.map((nombre, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded">
                <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold">
                  {nombre.charAt(0)}
                </div>
                <div>
                  <p className="font-medium">{nombre}</p>
                  {actividad.responsable_nombre === nombre && (
                    <Badge variant="outline" className="text-xs mt-1">
                      Responsable
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Metas y Objetivos */}
      {actividad.metas && actividad.metas.length > 0 && (
        <Card className="p-6">
          <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
            <Target className="h-5 w-5 text-green-600" />
            Metas y Objetivos
          </h3>
          <div className="space-y-4">
            {actividad.metas.map((meta) => (
              <div key={meta.id} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h4 className="font-medium text-lg">{meta.descripcion}</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Objetivo: <strong>{meta.valor_objetivo} {meta.unidad}</strong>
                      {meta.valor_actual !== undefined && (
                        <> | Actual: <strong>{meta.valor_actual} {meta.unidad}</strong></>
                      )}
                    </p>
                  </div>
                  {meta.cumplida ? (
                    <Badge className="bg-green-100 text-green-800 border-green-300">
                      ✓ Cumplida
                    </Badge>
                  ) : (
                    <Badge variant="outline">
                      {meta.porcentaje_cumplimiento || 0}%
                    </Badge>
                  )}
                </div>
                {meta.porcentaje_cumplimiento !== undefined && (
                  <Progress value={meta.porcentaje_cumplimiento} className="h-2 mt-2" />
                )}
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Rendimiento */}
      {actividad.rendimiento_trabajadores && actividad.rendimiento_trabajadores.length > 0 && (
        <Card className="p-6">
          <h3 className="font-semibold text-lg mb-4">Rendimiento del Equipo</h3>
          <div className="space-y-4">
            {actividad.rendimiento_trabajadores.map((rendimiento) => (
              <div key={rendimiento.trabajador_id} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{rendimiento.trabajador_nombre}</span>
                  <span className={`font-semibold ${
                    rendimiento.eficiencia_porcentaje >= 90 ? 'text-green-600' :
                    rendimiento.eficiencia_porcentaje >= 70 ? 'text-yellow-600' :
                    'text-red-600'
                  }`}>
                    {rendimiento.eficiencia_porcentaje}% eficiencia
                  </span>
                </div>
                <Progress value={rendimiento.eficiencia_porcentaje} className="h-2" />
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                  <div>Horas: {rendimiento.horas_trabajadas}/{rendimiento.horas_planificadas}</div>
                  <div>Tareas: {rendimiento.tareas_completadas}/{rendimiento.tareas_asignadas}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Alertas */}
      {actividad.alertas_activas && actividad.alertas_activas.length > 0 && (
        <Card className="p-6 border-l-4 border-l-red-500">
          <h3 className="font-semibold text-lg mb-4 flex items-center gap-2 text-red-700">
            <AlertCircle className="h-5 w-5" />
            Alertas Activas
          </h3>
          <div className="space-y-3">
            {actividad.alertas_activas.map((alerta) => (
              <div key={alerta.id} className={`p-4 rounded-lg ${
                alerta.severidad === 'CRITICAL' ? 'bg-red-50 border border-red-200' :
                alerta.severidad === 'ERROR' ? 'bg-orange-50 border border-orange-200' :
                'bg-yellow-50 border border-yellow-200'
              }`}>
                <div className="flex items-start gap-3">
                  <AlertCircle className={`h-5 w-5 flex-shrink-0 ${
                    alerta.severidad === 'CRITICAL' ? 'text-red-600' :
                    alerta.severidad === 'ERROR' ? 'text-orange-600' :
                    'text-yellow-600'
                  }`} />
                  <div className="flex-1">
                    <h4 className="font-semibold">{alerta.titulo}</h4>
                    <p className="text-sm mt-1">{alerta.mensaje}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Desviaciones */}
      {actividad.desviacion_tiempo_dias !== undefined && actividad.desviacion_tiempo_dias !== 0 && (
        <Card className="p-6">
          <h3 className="font-semibold text-lg mb-4">Desviaciones</h3>
          <div className={`p-4 rounded-lg ${
            actividad.desviacion_tiempo_dias > 0 ? 'bg-red-50' : 'bg-green-50'
          }`}>
            <p className="font-medium">
              {actividad.desviacion_tiempo_dias > 0 ? '⚠️' : '✓'} Desviación de Tiempo
            </p>
            <p className={`text-2xl font-bold mt-2 ${
              actividad.desviacion_tiempo_dias > 0 ? 'text-red-700' : 'text-green-700'
            }`}>
              {Math.abs(actividad.desviacion_tiempo_dias)} días{' '}
              {actividad.desviacion_tiempo_dias > 0 ? 'de retraso' : 'de adelanto'}
            </p>
          </div>
        </Card>
      )}

      {/* Notas */}
      {actividad.notas && (
        <Card className="p-6">
          <h3 className="font-semibold text-lg mb-4">Notas</h3>
          <p className="text-gray-700 whitespace-pre-wrap">{actividad.notas}</p>
        </Card>
      )}
    </div>
  );
};

export default PlanificacionDetailView;

