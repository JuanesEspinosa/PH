import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuthStore } from '@/stores/authStore'
import { 
  Sprout, 
  TrendingUp, 
  Leaf, 
  BarChart3,
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
import {
  estadisticasAgricolasMock,
  produccionMensual,
  rendimientoPorHectarea,
  distribucionCultivos,
  laboresDiarias,
  calidadProduccion,
  eficienciaPorCampo
} from '@/data/agriculturalMockData'

export default function DashboardPage() {
  const { user } = useAuthStore()

  const stats = [
    {
      title: 'Producción Total',
      value: `${(estadisticasAgricolasMock.totalProduccion / 1000).toFixed(1)}t`,
      change: `+${estadisticasAgricolasMock.variacionMensual}%`,
      icon: Sprout,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      description: 'Este mes'
    },
    {
      title: 'Rendimiento Promedio',
      value: `${estadisticasAgricolasMock.rendimientoPromedio.toFixed(1)} kg/ha`,
      change: `+${estadisticasAgricolasMock.variacionSemanal}%`,
      icon: TrendingUp,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      description: 'Última semana'
    },
    {
      title: 'Campos Activos',
      value: `${estadisticasAgricolasMock.camposActivos}`,
      change: `${estadisticasAgricolasMock.cultivosEnProceso} cultivos`,
      icon: MapPin,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      description: 'En producción'
    },
    {
      title: 'Eficiencia',
      value: `${estadisticasAgricolasMock.eficienciaPromedio}%`,
      change: '+3.2%',
      icon: BarChart3,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
      description: 'Vs. objetivo'
    },
  ]

  const COLORS = ['#8B4513', '#90EE90', '#FFD700', '#FFE135']

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
                  <p className="text-xs text-green-600 font-medium">
                    {stat.change}
                  </p>
                  <p className="text-xs text-gray-500">{stat.description}</p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Producción Mensual - Gráfico de Área */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Leaf className="h-5 w-5 text-green-600" />
            Producción Mensual por Cultivo
          </CardTitle>
          <CardDescription>
            Últimos 6 meses - Comparativa de producción en kilogramos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={produccionMensual}>
              <defs>
                <linearGradient id="colorCafe" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8B4513" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#8B4513" stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="colorCana" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#90EE90" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#90EE90" stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="colorMaiz" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FFD700" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#FFD700" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="mes" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                formatter={(value: number) => `${value.toLocaleString()} kg`}
              />
              <Legend />
              <Area type="monotone" dataKey="cafe" stroke="#8B4513" fillOpacity={1} fill="url(#colorCafe)" name="Café" />
              <Area type="monotone" dataKey="maiz" stroke="#FFD700" fillOpacity={1} fill="url(#colorMaiz)" name="Maíz" />
              <Area type="monotone" dataKey="platano" stroke="#FFE135" fillOpacity={1} fill="#FFE135" name="Plátano" />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Dos columnas */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Rendimiento por Hectárea */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              Rendimiento por Hectárea
            </CardTitle>
            <CardDescription>
              Evolución vs. objetivos establecidos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={rendimientoPorHectarea}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="mes" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                  formatter={(value: number) => `${value} kg/ha`}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="rendimiento" 
                  stroke="#10b981" 
                  strokeWidth={3}
                  dot={{ fill: '#10b981', r: 5 }}
                  name="Rendimiento Real"
                />
                <Line 
                  type="monotone" 
                  dataKey="objetivo" 
                  stroke="#94a3b8" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={{ fill: '#94a3b8', r: 4 }}
                  name="Objetivo"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Distribución de Cultivos - Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Distribución de Cultivos</CardTitle>
            <CardDescription>
              Por área cultivada y porcentaje de ocupación
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={distribucionCultivos}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ nombre, porcentaje }) => `${nombre}: ${porcentaje}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="area"
                >
                  {distribucionCultivos.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => `${value} ha`} />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-3 mt-4">
              {distribucionCultivos.map((cultivo, index) => (
                <div key={cultivo.nombre} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: COLORS[index] }}
                  />
                  <div className="text-sm">
                    <p className="font-medium">{cultivo.nombre}</p>
                    <p className="text-gray-500">{cultivo.area} ha</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Labores Diarias y Eficiencia */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Labores Diarias */}
        <Card>
          <CardHeader>
            <CardTitle>Labores Diarias (Última Semana)</CardTitle>
            <CardDescription>
              Distribución de actividades por día
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={laboresDiarias}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="dia" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                />
                <Legend />
                <Bar dataKey="cosecha" fill="#22c55e" name="Cosecha" radius={[4, 4, 0, 0]} />
                <Bar dataKey="riego" fill="#3b82f6" name="Riego" radius={[4, 4, 0, 0]} />
                <Bar dataKey="fertilizacion" fill="#f59e0b" name="Fertilización" radius={[4, 4, 0, 0]} />
                <Bar dataKey="transporte" fill="#8b5cf6" name="Transporte" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Calidad de Producción */}
        <Card>
          <CardHeader>
            <CardTitle>Calidad de Producción</CardTitle>
            <CardDescription>
              Evolución de la calidad en los últimos 6 meses (%)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={calidadProduccion}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="mes" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                />
                <Legend />
                <Area type="monotone" dataKey="excelente" stackId="1" stroke="#22c55e" fill="#22c55e" name="Excelente" />
                <Area type="monotone" dataKey="buena" stackId="1" stroke="#3b82f6" fill="#3b82f6" name="Buena" />
                <Area type="monotone" dataKey="regular" stackId="1" stroke="#f59e0b" fill="#f59e0b" name="Regular" />
                <Area type="monotone" dataKey="mala" stackId="1" stroke="#ef4444" fill="#ef4444" name="Mala" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Eficiencia por Campo */}
      <Card>
        <CardHeader>
          <CardTitle>Eficiencia por Campo vs. Meta</CardTitle>
          <CardDescription>
            Comparativa de eficiencia operacional de cada campo
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={eficienciaPorCampo} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis type="number" stroke="#666" />
              <YAxis dataKey="campo" type="category" width={120} stroke="#666" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                formatter={(value: number) => `${value}%`}
              />
              <Legend />
              <Bar dataKey="eficiencia" fill="#10b981" name="Eficiencia Actual" radius={[0, 4, 4, 0]} />
              <Bar dataKey="meta" fill="#94a3b8" name="Meta" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}

