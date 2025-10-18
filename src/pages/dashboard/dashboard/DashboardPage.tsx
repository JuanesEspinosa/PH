import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuthStore } from '@/stores/authStore'
import Loading from '@/components/ui/loading'
import { 
  Sprout, 
  TrendingUp, 
  Leaf,
  Activity,
  MapPin
} from 'lucide-react'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'
import { useDashboardQuery } from './hooks/useDashboardQuery'

export default function DashboardPage() {
  const { user } = useAuthStore()
  const {
    estadisticas,
    produccionMensual,
    rendimientoHectarea,
    distribucionCultivos,
    eficienciaCampos,
    laboresDiarias,
    calidadProduccion,
    actividadesPlanificadas,
    trabajadoresPorCargo,
    tiposLaborFrecuentes,
    estadoLotes,
    rendimientoPorTrabajador,
    costosPorActividad,
    isLoading,
    isError
  } = useDashboardQuery()

  if (isLoading) {
    return <Loading text="Cargando dashboard..." />
  }

  if (isError || !estadisticas) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-200px)]">
        <div className="text-center">
          <p className="text-red-600 font-semibold mb-2">Error al cargar los datos del dashboard</p>
          <p className="text-gray-600">Por favor, intenta recargar la página</p>
        </div>
      </div>
    )
  }

  const stats = [
    {
      title: 'Producción Total',
      value: `${(estadisticas.totalProduccion / 1000).toFixed(1)}t`,
      change: `${estadisticas.variacionMensual >= 0 ? '+' : ''}${estadisticas.variacionMensual.toFixed(1)}%`,
      icon: Sprout,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      description: 'Este mes'
    },
    {
      title: 'Área Total',
      value: `${estadisticas.totalArea} ha`,
      change: `${estadisticas.camposActivos} campos activos`,
      icon: MapPin,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      description: 'Gestionadas'
    },
    {
      title: 'Rendimiento Promedio',
      value: `${estadisticas.rendimientoPromedio} kg/ha`,
      change: `${estadisticas.variacionSemanal >= 0 ? '+' : ''}${estadisticas.variacionSemanal.toFixed(1)}%`,
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      description: 'Esta semana'
    },
    {
      title: 'Eficiencia Operacional',
      value: `${estadisticas.eficienciaPromedio}%`,
      change: `${estadisticas.cultivosEnProceso} cultivos`,
      icon: Activity,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
      description: 'En proceso'
    },
  ]

  // Los colores ahora vienen del backend en distribucionCultivos

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            ¡Bienvenido, {user?.name}!
          </h1>
          <p className="text-gray-600 mt-1 flex items-center gap-2">
            <Activity className="h-4 w-4" />
            Panel de Control Agrícola - Gestión en Tiempo Real
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Última actualización</p>
          <p className="text-sm font-medium">{new Date().toLocaleString('es-ES')}</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title} className="border-l-4 border-l-green-600 hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <div className={`p-2.5 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`h-5 w-5 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                <div className="flex items-center justify-between mt-2">
                  <p className={`text-xs font-medium ${
                    stat.title === 'Producción Total' || stat.title === 'Rendimiento Promedio' 
                      ? (estadisticas.variacionMensual >= 0 ? 'text-green-600' : 'text-red-600')
                      : 'text-gray-600'
                  }`}>
                    {stat.change}
                  </p>
                  <p className="text-xs text-gray-500">{stat.description}</p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Nuevas gráficas adicionales */}
      <div className="grid gap-6 ">

        {/* Trabajadores por Cargo */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sprout className="h-5 w-5 text-green-600" />
              Distribución de Trabajadores por Cargo
            </CardTitle>
            <CardDescription>
              Personal activo e inactivo por posición
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={trabajadoresPorCargo || []} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis type="number" stroke="#666" />
                <YAxis dataKey="cargo" type="category" width={120} stroke="#666" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                  formatter={(value: number, name: string) => [`${value} trabajadores`, name]}
                />
                <Legend />
                <Bar dataKey="activos" fill="#10B981" name="Activos" radius={[0, 4, 4, 0]} />
                <Bar dataKey="inactivos" fill="#6B7280" name="Inactivos" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Segunda fila de nuevas gráficas */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Tipos de Labor más Frecuentes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Leaf className="h-5 w-5 text-purple-600" />
              Tipos de Labor más Frecuentes
            </CardTitle>
            <CardDescription>
              Actividades más realizadas en los últimos 6 meses
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={(tiposLaborFrecuentes || []) as any[]}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ tipo, porcentaje }: any) => `${tipo}: ${porcentaje}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="cantidad"
                >
                  {(tiposLaborFrecuentes || []).map((tipo: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={tipo.color || '#8884d8'} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => `${value} labores`} />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-3 mt-4">
              {(tiposLaborFrecuentes || []).map((tipo: any) => (
                <div key={tipo.tipo} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: tipo.color || '#8884d8' }}
                  />
                  <div className="text-sm">
                    <p className="font-medium">{tipo.tipo}</p>
                    <p className="text-gray-500">{tipo.cantidad} labores ({tipo.porcentaje}%)</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Estado de Lotes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-orange-600" />
              Estado de Lotes
            </CardTitle>
            <CardDescription>
              Distribución por estado y área total
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={(estadoLotes || []) as any[]}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ estado, porcentaje }: any) => `${estado}: ${porcentaje}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="area_total"
                >
                  {(estadoLotes || []).map((lote: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={lote.color || '#8884d8'} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => `${value} ha`} />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-3 mt-4">
              {(estadoLotes || []).map((lote: any) => (
                <div key={lote.estado} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: lote.color || '#8884d8' }}
                  />
                  <div className="text-sm">
                    <p className="font-medium">{lote.estado}</p>
                    <p className="text-gray-500">{lote.area_total} ha ({lote.porcentaje}%)</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tercera fila de nuevas gráficas */}
      <div className="grid gap-6 ">
        {/* Rendimiento por Trabajador */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-indigo-600" />
              Rendimiento por Trabajador
            </CardTitle>
            <CardDescription>
              Top 10 trabajadores por rendimiento promedio (últimos 3 meses)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={rendimientoPorTrabajador || []} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis type="number" stroke="#666" />
                <YAxis dataKey="trabajador" type="category" width={150} stroke="#666" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                  formatter={(value: number, name: string) => [`${value} kg/h`, name]}
                />
                <Legend />
                <Bar dataKey="rendimiento_promedio" fill="#8B5CF6" name="Rendimiento (kg/h)" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

      </div>
    </div>
  )
}

