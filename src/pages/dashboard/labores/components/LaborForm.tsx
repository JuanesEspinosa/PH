import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { 
  Clock, 
  Loader2, 
  CheckCircle, 
  Circle, 
  ArrowRight, 
  ArrowLeft,
  Calendar,
  User,
  Wrench,
  MapPin,
  Navigation,
  Target
} from 'lucide-react'
import { Labor, CULTIVOS_DISPONIBLES } from '../services/laboresService'
import { useTrabajadoresQuery } from '../../trabajadores/hooks/useTrabajadoresQuery'
import { useTiposLaborQuery } from '../../tipos-labor/hooks/useTiposLaborQuery'
import { Lote } from '@/types/lotes'
import { ActividadPlanificada } from '@/types/planificacion'
import SelectorMapaInteractivo from '../../lotes/components/SelectorMapaInteractivo'

interface LaborFormProps {
  labor?: Labor
  onSubmit: (data: any) => void
  onCancel: () => void
  loading?: boolean
  lotes?: Lote[]
  actividades?: ActividadPlanificada[]
}

export default function LaborForm({ labor, onSubmit, onCancel, loading, lotes = [], actividades = [] }: LaborFormProps) {
  const { data: trabajadores = [] } = useTrabajadoresQuery()
  const { data: tiposLabor = [] } = useTiposLaborQuery()
  
  const [formData, setFormData] = useState({
    fecha: '',
    cultivo: '',
    lote: '',
    trabajador_id: '',
    tipo_labor_id: '',
    cantidad_recolectada: '',
    unidad_medida: 'kg' as 'kg' | 'litros' | 'unidades' | 'toneladas' | 'quintales',
    peso_total: '',
    hora_inicio: '',
    hora_fin: '',
    latitud: '',
    longitud: '',
    estado: 'completada' as 'en_proceso' | 'completada' | 'pausada' | 'cancelada',
    actividad_planificada_id: '',
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [captandoUbicacion, setCaptandoUbicacion] = useState(false)
  const [paso, setPaso] = useState(1)

  // Filtrar actividades por lote seleccionado
  const actividadesFiltradas = actividades.filter(actividad => {
    if (!formData.lote) return true
    const loteSeleccionado = lotes.find(l => l.nombre === formData.lote)
    return loteSeleccionado && actividad.lote_id === loteSeleccionado.id
  })

  useEffect(() => {
    if (labor) {
      // Convertir fecha ISO a YYYY-MM-DD para el input type="date"
      const fechaFormateada = labor.fecha.includes('T') 
        ? labor.fecha.split('T')[0] 
        : labor.fecha;
      
      setFormData({
        fecha: fechaFormateada,
        cultivo: labor.cultivo,
        lote: labor.lote,
        trabajador_id: labor.trabajador_id.toString(),
        tipo_labor_id: labor.tipo_labor_id.toString(),
        cantidad_recolectada: labor.cantidad_recolectada.toString(),
        unidad_medida: labor.unidad_medida,
        peso_total: labor.peso_total.toString(),
        hora_inicio: labor.hora_inicio.substring(0, 5), // Convertir HH:mm:ss a HH:mm para el input
        hora_fin: labor.hora_fin.substring(0, 5), // Convertir HH:mm:ss a HH:mm para el input
        latitud: labor.ubicacion_gps.latitud.toString(),
        longitud: labor.ubicacion_gps.longitud.toString(),
        estado: labor.estado,
        actividad_planificada_id: labor.actividad_planificada_id?.toString() || '',
      })
    }
  }, [labor])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked
    
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
    
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }


  const capturarUbicacion = () => {
    setCaptandoUbicacion(true)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData((prev) => ({
            ...prev,
            latitud: position.coords.latitude.toFixed(6),
            longitud: position.coords.longitude.toFixed(6),
          }))
          setCaptandoUbicacion(false)
        },
        () => {
          setCaptandoUbicacion(false)
          alert('No se pudo obtener la ubicación')
        }
      )
    } else {
      setCaptandoUbicacion(false)
      alert('Geolocalización no soportada')
    }
  }


  const validate = (currentPaso: number): boolean => {
    const newErrors: Record<string, string> = {}

    if (currentPaso === 1) {
      if (!formData.fecha) newErrors.fecha = 'La fecha es requerida'
      else if (new Date(formData.fecha) > new Date()) newErrors.fecha = 'La fecha no puede ser futura'
      
      if (!formData.cultivo) newErrors.cultivo = 'El cultivo es requerido'
      if (!formData.lote) newErrors.lote = 'El lote es requerido'
      if (!formData.trabajador_id) newErrors.trabajador_id = 'El trabajador es requerido'
      if (!formData.tipo_labor_id) newErrors.tipo_labor_id = 'El tipo de labor es requerido'
    }

    if (currentPaso === 2) {
      if (!formData.cantidad_recolectada) newErrors.cantidad_recolectada = 'La cantidad es requerida'
      else if (parseFloat(formData.cantidad_recolectada) < 0) newErrors.cantidad_recolectada = 'La cantidad no puede ser negativa'
      
      if (!formData.peso_total) newErrors.peso_total = 'El peso total es requerido'
      else if (parseFloat(formData.peso_total) < 0) newErrors.peso_total = 'El peso no puede ser negativo'
      
      if (!formData.hora_inicio) newErrors.hora_inicio = 'La hora de inicio es requerida'
      if (!formData.hora_fin) newErrors.hora_fin = 'La hora de fin es requerida'
      
      if (formData.hora_inicio && formData.hora_fin && formData.hora_inicio >= formData.hora_fin) {
        newErrors.hora_fin = 'La hora de fin debe ser posterior a la de inicio'
      }
    }

    if (currentPaso === 3) {
      if (!formData.latitud) newErrors.latitud = 'La latitud es requerida'
      if (!formData.longitud) newErrors.longitud = 'La longitud es requerida'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSiguiente = () => {
    if (validate(paso)) {
      setPaso(paso + 1)
    }
  }

  const handleAnterior = () => {
    setPaso(paso - 1)
  }

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    
    // Solo procesar si estamos en el último paso
    if (paso !== 3) return

    if (!validate(paso)) return

    const data = {
      fecha: formData.fecha, // Ya está en formato YYYY-MM-DD del input type="date"
      cultivo: formData.cultivo,
      lote: formData.lote,
      trabajador_id: parseInt(formData.trabajador_id),
      tipo_labor_id: parseInt(formData.tipo_labor_id),
      cantidad_recolectada: parseFloat(formData.cantidad_recolectada),
      unidad_medida: formData.unidad_medida,
      peso_total: parseFloat(formData.peso_total),
      hora_inicio: formData.hora_inicio.substring(0, 5), // Convertir HH:mm:ss a HH:mm
      hora_fin: formData.hora_fin.substring(0, 5), // Convertir HH:mm:ss a HH:mm
      ubicacion_gps: {
        latitud: parseFloat(formData.latitud),
        longitud: parseFloat(formData.longitud),
      },
      ...(formData.actividad_planificada_id && { actividad_planificada_id: parseInt(formData.actividad_planificada_id) }),
      ...(labor && { estado: formData.estado }),
    }

    await onSubmit(data)
  }

  const pasos = [
    { numero: 1, titulo: 'Información Básica', icono: Calendar, descripcion: 'Datos fundamentales' },
    { numero: 2, titulo: 'Métricas y Tiempo', icono: Clock, descripcion: 'Cantidades y horarios' },
    { numero: 3, titulo: 'Ubicación GPS', icono: MapPin, descripcion: 'Geolocalización' }
  ]

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Header con progreso mejorado */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6 border border-green-200">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {pasos[paso - 1]?.titulo}
            </h2>
            <p className="text-gray-600 mt-1">
              {pasos[paso - 1]?.descripcion}
            </p>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500">Paso {paso} de 3</div>
            <div className="text-2xl font-bold text-primary">{Math.round((paso / 3) * 100)}%</div>
          </div>
        </div>
        
        <Progress value={(paso / 3) * 100} className="h-2" />
        
        <div className="flex justify-between mt-4">
          {pasos.map((pasoItem) => {
            const Icon = pasoItem.icono
            const isActive = paso >= pasoItem.numero
            const isCurrent = paso === pasoItem.numero
            
            return (
              <div key={pasoItem.numero} className="flex flex-col items-center space-y-2">
                <div className={`
                  w-12 h-12 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-200
                  ${isActive 
                    ? 'bg-primary text-white shadow-lg' 
                    : 'bg-gray-200 text-gray-500'
                  }
                  ${isCurrent ? 'ring-4 ring-primary/20 scale-110' : ''}
                `}>
                  {isActive && paso > pasoItem.numero ? (
                    <CheckCircle className="h-6 w-6" />
                  ) : (
                    <Icon className="h-6 w-6" />
                  )}
                </div>
                <div className="text-center">
                  <div className={`text-xs font-medium ${isActive ? 'text-primary' : 'text-gray-500'}`}>
                    {pasoItem.titulo}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {paso === 1 && (
        <Card className="border-0 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
            <CardTitle className="flex items-center gap-2 text-xl">
              <Calendar className="h-6 w-6 text-blue-600" />
              Información Básica
            </CardTitle>
            <CardDescription>Datos fundamentales de la labor agrícola</CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="fecha" className="text-sm font-semibold flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Fecha de Labor <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="fecha"
                  name="fecha"
                  type="date"
                  value={formData.fecha}
                  onChange={handleChange}
                  disabled={loading}
                  className={`h-12 ${errors.fecha ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'}`}
                />
                {errors.fecha && <p className="text-sm text-red-500 flex items-center gap-1">
                  <Circle className="h-3 w-3 fill-current" />
                  {errors.fecha}
                </p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="cultivo" className="text-sm font-semibold flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  Cultivo <span className="text-red-500">*</span>
                </Label>
                <select
                  id="cultivo"
                  name="cultivo"
                  value={formData.cultivo}
                  onChange={handleChange}
                  disabled={loading}
                  className={`flex h-12 w-full rounded-md border px-4 py-3 text-sm transition-colors ${
                    errors.cultivo 
                      ? 'border-red-500 focus:ring-red-500' 
                      : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                  }`}
                >
                  <option value="">Seleccionar cultivo</option>
                  {CULTIVOS_DISPONIBLES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
                {errors.cultivo && <p className="text-sm text-red-500 flex items-center gap-1">
                  <Circle className="h-3 w-3 fill-current" />
                  {errors.cultivo}
                </p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="lote" className="text-sm font-semibold flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  Lote/Parcela <span className="text-red-500">*</span>
                </Label>
                <select
                  id="lote"
                  name="lote"
                  value={formData.lote}
                  onChange={handleChange}
                  disabled={loading}
                  className={`flex h-12 w-full rounded-md border px-4 py-3 text-sm transition-colors ${
                    errors.lote 
                      ? 'border-red-500 focus:ring-red-500' 
                      : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                  }`}
                >
                  <option value="">Seleccionar lote</option>
                  {lotes.map((lote) => (
                    <option key={lote.id} value={lote.nombre}>
                      {lote.nombre} - {lote.area_hectareas} ha
                    </option>
                  ))}
                </select>
                {errors.lote && <p className="text-sm text-red-500 flex items-center gap-1">
                  <Circle className="h-3 w-3 fill-current" />
                  {errors.lote}
                </p>}
              </div>

              {/* Selector de Actividad Planificada */}
              {formData.lote && (
                <div className="space-y-2">
                  <Label htmlFor="actividad_planificada_id" className="text-sm font-semibold flex items-center gap-2">
                    <Target className="h-4 w-4" />
                    Actividad Planificada (Opcional)
                  </Label>
                  <select
                    id="actividad_planificada_id"
                    name="actividad_planificada_id"
                    value={formData.actividad_planificada_id}
                    onChange={handleChange}
                    disabled={loading}
                    className="flex h-12 w-full rounded-md border px-4 py-3 text-sm transition-colors border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Sin actividad planificada</option>
                    {actividadesFiltradas.map((actividad) => (
                      <option key={actividad.id} value={actividad.id}>
                        {actividad.nombre} - {actividad.tipo} ({actividad.estado})
                      </option>
                    ))}
                  </select>
                  {actividadesFiltradas.length === 0 && formData.lote && (
                    <p className="text-sm text-amber-600 flex items-center gap-1">
                      <Circle className="h-3 w-3 fill-current" />
                      No hay actividades planificadas para este lote
                    </p>
                  )}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="trabajador_id" className="text-sm font-semibold flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Trabajador <span className="text-red-500">*</span>
                </Label>
                <select
                  id="trabajador_id"
                  name="trabajador_id"
                  value={formData.trabajador_id}
                  onChange={handleChange}
                  disabled={loading}
                  className={`flex h-12 w-full rounded-md border px-4 py-3 text-sm transition-colors ${
                    errors.trabajador_id 
                      ? 'border-red-500 focus:ring-red-500' 
                      : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                  }`}
                >
                  <option value="">Seleccionar trabajador</option>
                  {trabajadores.filter(t => t.estado === 'activo').map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.nombres} {t.apellidos} - {t.documento}
                    </option>
                  ))}
                </select>
                {errors.trabajador_id && <p className="text-sm text-red-500 flex items-center gap-1">
                  <Circle className="h-3 w-3 fill-current" />
                  {errors.trabajador_id}
                </p>}
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="tipo_labor_id" className="text-sm font-semibold flex items-center gap-2">
                  <Wrench className="h-4 w-4" />
                  Tipo de Labor <span className="text-red-500">*</span>
                </Label>
                <select
                  id="tipo_labor_id"
                  name="tipo_labor_id"
                  value={formData.tipo_labor_id}
                  onChange={handleChange}
                  disabled={loading}
                  className={`flex h-12 w-full rounded-md border px-4 py-3 text-sm transition-colors ${
                    errors.tipo_labor_id 
                      ? 'border-red-500 focus:ring-red-500' 
                      : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                  }`}
                >
                  <option value="">Seleccionar tipo de labor</option>
                  {tiposLabor.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.nombre} - {t.categoria}
                    </option>
                  ))}
                </select>
                {errors.tipo_labor_id && <p className="text-sm text-red-500 flex items-center gap-1">
                  <Circle className="h-3 w-3 fill-current" />
                  {errors.tipo_labor_id}
                </p>}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {paso === 2 && (
        <Card className="border-0 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b">
            <CardTitle className="flex items-center gap-2 text-xl">
              <Clock className="h-6 w-6 text-green-600" />
              Métricas y Tiempo
            </CardTitle>
            <CardDescription>Cantidades recolectadas y horarios de trabajo</CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="cantidad_recolectada" className="text-sm font-semibold flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  Cantidad Recolectada <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="cantidad_recolectada"
                  name="cantidad_recolectada"
                  type="number"
                  step="0.01"
                  value={formData.cantidad_recolectada}
                  onChange={handleChange}
                  disabled={loading}
                  placeholder="0.00"
                  className={`h-12 ${errors.cantidad_recolectada ? 'border-red-500 focus:ring-red-500' : 'focus:ring-green-500'}`}
                />
                {errors.cantidad_recolectada && <p className="text-sm text-red-500 flex items-center gap-1">
                  <Circle className="h-3 w-3 fill-current" />
                  {errors.cantidad_recolectada}
                </p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="unidad_medida" className="text-sm font-semibold flex items-center gap-2">
                  <Wrench className="h-4 w-4" />
                  Unidad de Medida <span className="text-red-500">*</span>
                </Label>
                <select
                  id="unidad_medida"
                  name="unidad_medida"
                  value={formData.unidad_medida}
                  onChange={handleChange}
                  disabled={loading}
                  className="flex h-12 w-full rounded-md border border-gray-300 px-4 py-3 text-sm transition-colors focus:ring-green-500 focus:border-green-500"
                >
                  <option value="kg">Kilogramos (kg)</option>
                  <option value="litros">Litros</option>
                  <option value="unidades">Unidades</option>
                  <option value="toneladas">Toneladas</option>
                  <option value="quintales">Quintales</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="peso_total" className="text-sm font-semibold flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  Peso Total (kg) <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="peso_total"
                  name="peso_total"
                  type="number"
                  step="0.01"
                  value={formData.peso_total}
                  onChange={handleChange}
                  disabled={loading}
                  placeholder="0.00"
                  className={`h-12 ${errors.peso_total ? 'border-red-500 focus:ring-red-500' : 'focus:ring-green-500'}`}
                />
                {errors.peso_total && <p className="text-sm text-red-500 flex items-center gap-1">
                  <Circle className="h-3 w-3 fill-current" />
                  {errors.peso_total}
                </p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="hora_inicio" className="text-sm font-semibold flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Hora Inicio <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="hora_inicio"
                  name="hora_inicio"
                  type="time"
                  value={formData.hora_inicio}
                  onChange={handleChange}
                  disabled={loading}
                  className={`h-12 ${errors.hora_inicio ? 'border-red-500 focus:ring-red-500' : 'focus:ring-green-500'}`}
                />
                {errors.hora_inicio && <p className="text-sm text-red-500 flex items-center gap-1">
                  <Circle className="h-3 w-3 fill-current" />
                  {errors.hora_inicio}
                </p>}
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="hora_fin" className="text-sm font-semibold flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Hora Fin <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="hora_fin"
                  name="hora_fin"
                  type="time"
                  value={formData.hora_fin}
                  onChange={handleChange}
                  disabled={loading}
                  className={`h-12 ${errors.hora_fin ? 'border-red-500 focus:ring-red-500' : 'focus:ring-green-500'}`}
                />
                {errors.hora_fin && <p className="text-sm text-red-500 flex items-center gap-1">
                  <Circle className="h-3 w-3 fill-current" />
                  {errors.hora_fin}
                </p>}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {paso === 3 && (
        <Card className="border-0 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b">
            <CardTitle className="flex items-center gap-2 text-xl">
              <MapPin className="h-6 w-6 text-purple-600" />
              Ubicación GPS
            </CardTitle>
            <CardDescription>Geolocalización precisa del trabajo realizado</CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Selección de Ubicación</h3>
                <p className="text-sm text-gray-600">
                  {formData.lote 
                    ? `Selecciona la ubicación exacta en el lote: ${formData.lote}`
                    : 'Primero selecciona un lote para ver el mapa'
                  }
                </p>
              </div>
              <Button
                type="button"
                variant="outline"
                onClick={capturarUbicacion}
                disabled={captandoUbicacion || loading}
                className="flex items-center gap-2 px-6 py-3 border-purple-300 text-purple-700 hover:bg-purple-50"
              >
                {captandoUbicacion ? (
                  <><Loader2 className="h-4 w-4 animate-spin" /> Capturando...</>
                ) : (
                  <><MapPin className="h-4 w-4" /> Capturar Ubicación Actual</>
                )}
              </Button>
            </div>

            {/* Mapa del lote específico */}
            {formData.lote && (
              <div className="mb-6">
                <div className="h-96 rounded-lg border border-gray-200 overflow-hidden">
                  <SelectorMapaInteractivo
                    onCoordenadasChange={(coordenadas) => {
                      setFormData(prev => ({
                        ...prev,
                        latitud: coordenadas.latitud.toString(),
                        longitud: coordenadas.longitud.toString()
                      }))
                    }}
                    lotesExistentes={lotes.filter(l => l.nombre === formData.lote)}
                    loteSeleccionado={lotes.find(l => l.nombre === formData.lote)}
                  />
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  💡 Haz clic en el mapa para seleccionar la ubicación exacta donde se realizó la labor
                </p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="latitud" className="text-sm font-semibold flex items-center gap-2">
                  <Navigation className="h-4 w-4" />
                  Latitud <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="latitud"
                  name="latitud"
                  type="number"
                  step="0.000001"
                  value={formData.latitud}
                  onChange={handleChange}
                  disabled={loading}
                  placeholder="-12.046374"
                  className={`h-12 ${errors.latitud ? 'border-red-500 focus:ring-red-500' : 'focus:ring-purple-500'}`}
                />
                {errors.latitud && <p className="text-sm text-red-500 flex items-center gap-1">
                  <Circle className="h-3 w-3 fill-current" />
                  {errors.latitud}
                </p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="longitud" className="text-sm font-semibold flex items-center gap-2">
                  <Navigation className="h-4 w-4" />
                  Longitud <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="longitud"
                  name="longitud"
                  type="number"
                  step="0.000001"
                  value={formData.longitud}
                  onChange={handleChange}
                  disabled={loading}
                  placeholder="-77.042793"
                  className={`h-12 ${errors.longitud ? 'border-red-500 focus:ring-red-500' : 'focus:ring-purple-500'}`}
                />
                {errors.longitud && <p className="text-sm text-red-500 flex items-center gap-1">
                  <Circle className="h-3 w-3 fill-current" />
                  {errors.longitud}
                </p>}
              </div>
            </div>

            {formData.latitud && formData.longitud && (
              <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="h-5 w-5 text-purple-600" />
                  <p className="text-sm font-semibold text-gray-700">Ubicación Capturada</p>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  Coordenadas: {formData.latitud}, {formData.longitud}
                </p>
                <a
                  href={`https://www.google.com/maps?q=${formData.latitud},${formData.longitud}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-purple-600 hover:text-purple-700 hover:underline font-medium"
                >
                  <MapPin className="h-4 w-4" />
                  Ver en Google Maps
                </a>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Botones de navegación mejorados */}
      <div className="bg-gradient-to-r from-gray-50 to-slate-50 rounded-lg p-6 border border-gray-200">
        <div className="flex justify-between items-center">
          <div>
            {paso > 1 && (
              <Button 
                type="button" 
                variant="outline" 
                onClick={handleAnterior} 
                disabled={loading}
                className="flex items-center gap-2 px-6 py-3 border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                <ArrowLeft className="h-4 w-4" />
                Anterior
              </Button>
            )}
          </div>
          
          <div className="flex gap-3">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onCancel} 
              disabled={loading}
              className="px-6 py-3 border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Cancelar
            </Button>
            
            {paso < 3 ? (
              <Button 
                type="button" 
                onClick={handleSiguiente} 
                disabled={loading}
                className="flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-white"
              >
                Siguiente
                <ArrowRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button 
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className="flex items-center gap-2 px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Guardando...
                  </>
                ) : (
                  <>
                    <CheckCircle className="h-4 w-4" />
                    {labor ? 'Actualizar Labor' : 'Registrar Labor'}
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </div>
    </form>
  )
}

