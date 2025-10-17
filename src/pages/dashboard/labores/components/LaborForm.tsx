import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { MapPin, Clock, Loader2 } from 'lucide-react'
import { Labor, CULTIVOS_DISPONIBLES, LOTES_DISPONIBLES, HERRAMIENTAS_DISPONIBLES } from '../services/laboresService'
import { useTrabajadoresQuery } from '../../trabajadores/hooks/useTrabajadoresQuery'
import { useTiposLaborQuery } from '../../tipos-labor/hooks/useTiposLaborQuery'

interface LaborFormProps {
  labor?: Labor
  onSubmit: (data: any) => void
  onCancel: () => void
  loading?: boolean
}

export default function LaborForm({ labor, onSubmit, onCancel, loading }: LaborFormProps) {
  const { data: trabajadores = [] } = useTrabajadoresQuery()
  const { data: tiposLabor = [] } = useTiposLaborQuery()
  
  const [formData, setFormData] = useState({
    fecha: '',
    cultivo: '',
    lote: '',
    trabajadorId: '',
    tipoLaborId: '',
    cantidadRecolectada: '',
    unidadMedida: 'kg' as 'kg' | 'litros' | 'unidades' | 'toneladas' | 'quintales',
    pesoTotal: '',
    horaInicio: '',
    horaFin: '',
    latitud: '',
    longitud: '',
    temperatura: '',
    humedad: '',
    lluvia: false,
    herramientasInsumos: [] as string[],
    observaciones: '',
    estado: 'completada' as 'en_proceso' | 'completada' | 'pausada' | 'cancelada',
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [captandoUbicacion, setCaptandoUbicacion] = useState(false)
  const [paso, setPaso] = useState(1)

  useEffect(() => {
    if (labor) {
      setFormData({
        fecha: labor.fecha,
        cultivo: labor.cultivo,
        lote: labor.lote,
        trabajadorId: labor.trabajadorId,
        tipoLaborId: labor.tipoLaborId,
        cantidadRecolectada: labor.cantidadRecolectada.toString(),
        unidadMedida: labor.unidadMedida,
        pesoTotal: labor.pesoTotal.toString(),
        horaInicio: labor.horaInicio,
        horaFin: labor.horaFin,
        latitud: labor.ubicacionGPS.latitud.toString(),
        longitud: labor.ubicacionGPS.longitud.toString(),
        temperatura: labor.condicionesClimaticas?.temperatura?.toString() || '',
        humedad: labor.condicionesClimaticas?.humedad?.toString() || '',
        lluvia: labor.condicionesClimaticas?.lluvia || false,
        herramientasInsumos: labor.herramientasInsumos || [],
        observaciones: labor.observaciones || '',
        estado: labor.estado,
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

  const handleHerramientaToggle = (herramienta: string) => {
    setFormData((prev) => ({
      ...prev,
      herramientasInsumos: prev.herramientasInsumos.includes(herramienta)
        ? prev.herramientasInsumos.filter((h) => h !== herramienta)
        : [...prev.herramientasInsumos, herramienta],
    }))
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
      if (!formData.trabajadorId) newErrors.trabajadorId = 'El trabajador es requerido'
      if (!formData.tipoLaborId) newErrors.tipoLaborId = 'El tipo de labor es requerido'
    }

    if (currentPaso === 2) {
      if (!formData.cantidadRecolectada) newErrors.cantidadRecolectada = 'La cantidad es requerida'
      else if (parseFloat(formData.cantidadRecolectada) < 0) newErrors.cantidadRecolectada = 'La cantidad no puede ser negativa'
      
      if (!formData.pesoTotal) newErrors.pesoTotal = 'El peso total es requerido'
      else if (parseFloat(formData.pesoTotal) < 0) newErrors.pesoTotal = 'El peso no puede ser negativo'
      
      if (!formData.horaInicio) newErrors.horaInicio = 'La hora de inicio es requerida'
      if (!formData.horaFin) newErrors.horaFin = 'La hora de fin es requerida'
      
      if (formData.horaInicio && formData.horaFin && formData.horaInicio >= formData.horaFin) {
        newErrors.horaFin = 'La hora de fin debe ser posterior a la de inicio'
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validate(paso)) return

    const data = {
      fecha: formData.fecha,
      cultivo: formData.cultivo,
      lote: formData.lote,
      trabajadorId: formData.trabajadorId,
      tipoLaborId: formData.tipoLaborId,
      cantidadRecolectada: parseFloat(formData.cantidadRecolectada),
      unidadMedida: formData.unidadMedida,
      pesoTotal: parseFloat(formData.pesoTotal),
      horaInicio: formData.horaInicio,
      horaFin: formData.horaFin,
      ubicacionGPS: {
        latitud: parseFloat(formData.latitud),
        longitud: parseFloat(formData.longitud),
      },
      condicionesClimaticas: formData.temperatura || formData.humedad ? {
        temperatura: formData.temperatura ? parseFloat(formData.temperatura) : undefined,
        humedad: formData.humedad ? parseFloat(formData.humedad) : undefined,
        lluvia: formData.lluvia,
      } : undefined,
      herramientasInsumos: formData.herramientasInsumos.length > 0 ? formData.herramientasInsumos : undefined,
      observaciones: formData.observaciones || undefined,
      ...(labor && { estado: formData.estado }),
    }

    await onSubmit(data)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex justify-center mb-6">
        <div className="flex items-center space-x-2">
          {[1, 2, 3, 4].map((num) => (
            <div key={num} className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                  paso >= num ? 'bg-primary text-white' : 'bg-gray-200 text-gray-600'
                }`}
              >
                {num}
              </div>
              {num < 4 && <div className={`w-12 h-1 ${paso > num ? 'bg-primary' : 'bg-gray-200'}`} />}
            </div>
          ))}
        </div>
      </div>

      {paso === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Información Básica</CardTitle>
            <CardDescription>Datos fundamentales de la labor</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fecha">Fecha <span className="text-red-500">*</span></Label>
                <Input
                  id="fecha"
                  name="fecha"
                  type="date"
                  value={formData.fecha}
                  onChange={handleChange}
                  disabled={loading}
                  className={errors.fecha ? 'border-red-500' : ''}
                />
                {errors.fecha && <p className="text-sm text-red-500">{errors.fecha}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="cultivo">Cultivo <span className="text-red-500">*</span></Label>
                <select
                  id="cultivo"
                  name="cultivo"
                  value={formData.cultivo}
                  onChange={handleChange}
                  disabled={loading}
                  className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ${errors.cultivo ? 'border-red-500' : ''}`}
                >
                  <option value="">Seleccionar cultivo</option>
                  {CULTIVOS_DISPONIBLES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
                {errors.cultivo && <p className="text-sm text-red-500">{errors.cultivo}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="lote">Lote/Parcela <span className="text-red-500">*</span></Label>
                <select
                  id="lote"
                  name="lote"
                  value={formData.lote}
                  onChange={handleChange}
                  disabled={loading}
                  className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ${errors.lote ? 'border-red-500' : ''}`}
                >
                  <option value="">Seleccionar lote</option>
                  {LOTES_DISPONIBLES.map((l) => (
                    <option key={l} value={l}>{l}</option>
                  ))}
                </select>
                {errors.lote && <p className="text-sm text-red-500">{errors.lote}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="trabajadorId">Trabajador <span className="text-red-500">*</span></Label>
                <select
                  id="trabajadorId"
                  name="trabajadorId"
                  value={formData.trabajadorId}
                  onChange={handleChange}
                  disabled={loading}
                  className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ${errors.trabajadorId ? 'border-red-500' : ''}`}
                >
                  <option value="">Seleccionar trabajador</option>
                  {trabajadores.filter(t => t.estado === 'activo').map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.nombres} {t.apellidos} - {t.documento}
                    </option>
                  ))}
                </select>
                {errors.trabajadorId && <p className="text-sm text-red-500">{errors.trabajadorId}</p>}
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="tipoLaborId">Tipo de Labor <span className="text-red-500">*</span></Label>
                <select
                  id="tipoLaborId"
                  name="tipoLaborId"
                  value={formData.tipoLaborId}
                  onChange={handleChange}
                  disabled={loading}
                  className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ${errors.tipoLaborId ? 'border-red-500' : ''}`}
                >
                  <option value="">Seleccionar tipo de labor</option>
                  {tiposLabor.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.nombre} - {t.categoria}
                    </option>
                  ))}
                </select>
                {errors.tipoLaborId && <p className="text-sm text-red-500">{errors.tipoLaborId}</p>}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {paso === 2 && (
        <Card>
          <CardHeader>
            <CardTitle>Métricas y Tiempo</CardTitle>
            <CardDescription>Cantidades y horarios de trabajo</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="cantidadRecolectada">Cantidad Recolectada <span className="text-red-500">*</span></Label>
                <Input
                  id="cantidadRecolectada"
                  name="cantidadRecolectada"
                  type="number"
                  step="0.01"
                  value={formData.cantidadRecolectada}
                  onChange={handleChange}
                  disabled={loading}
                  className={errors.cantidadRecolectada ? 'border-red-500' : ''}
                />
                {errors.cantidadRecolectada && <p className="text-sm text-red-500">{errors.cantidadRecolectada}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="unidadMedida">Unidad de Medida <span className="text-red-500">*</span></Label>
                <select
                  id="unidadMedida"
                  name="unidadMedida"
                  value={formData.unidadMedida}
                  onChange={handleChange}
                  disabled={loading}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="kg">Kilogramos (kg)</option>
                  <option value="litros">Litros</option>
                  <option value="unidades">Unidades</option>
                  <option value="toneladas">Toneladas</option>
                  <option value="quintales">Quintales</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="pesoTotal">Peso Total (kg) <span className="text-red-500">*</span></Label>
                <Input
                  id="pesoTotal"
                  name="pesoTotal"
                  type="number"
                  step="0.01"
                  value={formData.pesoTotal}
                  onChange={handleChange}
                  disabled={loading}
                  className={errors.pesoTotal ? 'border-red-500' : ''}
                />
                {errors.pesoTotal && <p className="text-sm text-red-500">{errors.pesoTotal}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="horaInicio">
                  <Clock className="inline h-4 w-4 mr-1" />
                  Hora Inicio <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="horaInicio"
                  name="horaInicio"
                  type="time"
                  value={formData.horaInicio}
                  onChange={handleChange}
                  disabled={loading}
                  className={errors.horaInicio ? 'border-red-500' : ''}
                />
                {errors.horaInicio && <p className="text-sm text-red-500">{errors.horaInicio}</p>}
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="horaFin">
                  <Clock className="inline h-4 w-4 mr-1" />
                  Hora Fin <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="horaFin"
                  name="horaFin"
                  type="time"
                  value={formData.horaFin}
                  onChange={handleChange}
                  disabled={loading}
                  className={errors.horaFin ? 'border-red-500' : ''}
                />
                {errors.horaFin && <p className="text-sm text-red-500">{errors.horaFin}</p>}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {paso === 3 && (
        <Card>
          <CardHeader>
            <CardTitle>Ubicación GPS</CardTitle>
            <CardDescription>Geolocalización del trabajo</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-end mb-4">
              <Button
                type="button"
                variant="outline"
                onClick={capturarUbicacion}
                disabled={captandoUbicacion || loading}
              >
                {captandoUbicacion ? (
                  <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Capturando...</>
                ) : (
                  <><MapPin className="h-4 w-4 mr-2" /> Capturar Ubicación Actual</>
                )}
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="latitud">Latitud <span className="text-red-500">*</span></Label>
                <Input
                  id="latitud"
                  name="latitud"
                  type="number"
                  step="0.000001"
                  value={formData.latitud}
                  onChange={handleChange}
                  disabled={loading}
                  placeholder="-12.046374"
                  className={errors.latitud ? 'border-red-500' : ''}
                />
                {errors.latitud && <p className="text-sm text-red-500">{errors.latitud}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="longitud">Longitud <span className="text-red-500">*</span></Label>
                <Input
                  id="longitud"
                  name="longitud"
                  type="number"
                  step="0.000001"
                  value={formData.longitud}
                  onChange={handleChange}
                  disabled={loading}
                  placeholder="-77.042793"
                  className={errors.longitud ? 'border-red-500' : ''}
                />
                {errors.longitud && <p className="text-sm text-red-500">{errors.longitud}</p>}
              </div>
            </div>

            {formData.latitud && formData.longitud && (
              <div className="mt-4 p-4 bg-gray-50 rounded-md">
                <p className="text-sm text-gray-600">
                  <MapPin className="inline h-4 w-4 mr-1" />
                  Ubicación: {formData.latitud}, {formData.longitud}
                </p>
                <a
                  href={`https://www.google.com/maps?q=${formData.latitud},${formData.longitud}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:underline"
                >
                  Ver en Google Maps
                </a>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {paso === 4 && (
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Condiciones Climáticas</CardTitle>
              <CardDescription>Información ambiental (opcional)</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="temperatura">Temperatura (°C)</Label>
                  <Input
                    id="temperatura"
                    name="temperatura"
                    type="number"
                    step="0.1"
                    value={formData.temperatura}
                    onChange={handleChange}
                    disabled={loading}
                    placeholder="25"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="humedad">Humedad (%)</Label>
                  <Input
                    id="humedad"
                    name="humedad"
                    type="number"
                    step="1"
                    value={formData.humedad}
                    onChange={handleChange}
                    disabled={loading}
                    placeholder="65"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lluvia">Lluvia</Label>
                  <div className="flex items-center space-x-2 mt-2">
                    <input
                      id="lluvia"
                      name="lluvia"
                      type="checkbox"
                      checked={formData.lluvia}
                      onChange={handleChange}
                      disabled={loading}
                      className="w-4 h-4"
                    />
                    <Label htmlFor="lluvia" className="cursor-pointer">¿Hubo lluvia?</Label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Herramientas e Insumos</CardTitle>
              <CardDescription>Selecciona los utilizados</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {HERRAMIENTAS_DISPONIBLES.map((herramienta) => (
                  <div key={herramienta} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={`herramienta-${herramienta}`}
                      checked={formData.herramientasInsumos.includes(herramienta)}
                      onChange={() => handleHerramientaToggle(herramienta)}
                      disabled={loading}
                      className="w-4 h-4"
                    />
                    <Label htmlFor={`herramienta-${herramienta}`} className="cursor-pointer text-sm">
                      {herramienta}
                    </Label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Observaciones</CardTitle>
              <CardDescription>Notas adicionales sobre la labor</CardDescription>
            </CardHeader>
            <CardContent>
              <textarea
                id="observaciones"
                name="observaciones"
                value={formData.observaciones}
                onChange={handleChange}
                disabled={loading}
                rows={4}
                placeholder="Ingresa cualquier observación relevante sobre la labor realizada..."
                className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              />
            </CardContent>
          </Card>

          {labor && (
            <Card>
              <CardHeader>
                <CardTitle>Estado de la Labor</CardTitle>
              </CardHeader>
              <CardContent>
                <select
                  id="estado"
                  name="estado"
                  value={formData.estado}
                  onChange={handleChange}
                  disabled={loading}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="en_proceso">En Proceso</option>
                  <option value="completada">Completada</option>
                  <option value="pausada">Pausada</option>
                  <option value="cancelada">Cancelada</option>
                </select>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      <div className="flex justify-between gap-3 pt-6 border-t">
        <div>
          {paso > 1 && (
            <Button type="button" variant="outline" onClick={handleAnterior} disabled={loading}>
              Anterior
            </Button>
          )}
        </div>
        <div className="flex gap-3">
          <Button type="button" variant="outline" onClick={onCancel} disabled={loading}>
            Cancelar
          </Button>
          {paso < 4 ? (
            <Button type="button" onClick={handleSiguiente} disabled={loading}>
              Siguiente
            </Button>
          ) : (
            <Button type="submit" disabled={loading}>
              {loading ? 'Guardando...' : labor ? 'Actualizar Labor' : 'Registrar Labor'}
            </Button>
          )}
        </div>
      </div>
    </form>
  )
}

