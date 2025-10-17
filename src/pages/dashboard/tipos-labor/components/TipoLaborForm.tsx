import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { TipoLabor } from '../services/tiposLaborService'

interface TipoLaborFormProps {
  tipoLabor?: TipoLabor
  onSubmit: (data: any) => void
  onCancel: () => void
  loading?: boolean
}

export default function TipoLaborForm({ tipoLabor, onSubmit, onCancel, loading }: TipoLaborFormProps) {
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    categoria: 'siembra' as 'siembra' | 'cosecha' | 'riego' | 'fertilizacion' | 'control_plagas' | 'mantenimiento' | 'otro',
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (tipoLabor) {
      setFormData({
        nombre: tipoLabor.nombre,
        descripcion: tipoLabor.descripcion || '',
        categoria: tipoLabor.categoria,
      })
    }
  }, [tipoLabor])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es requerido'
    } else if (formData.nombre.trim().length < 3) {
      newErrors.nombre = 'El nombre debe tener al menos 3 caracteres'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validate()) {
      return
    }

    const data = {
      nombre: formData.nombre,
      descripcion: formData.descripcion || undefined,
      categoria: formData.categoria,
    }

    await onSubmit(data)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="nombre">
            Nombre de la Labor <span className="text-red-500">*</span>
          </Label>
          <Input
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            placeholder="Ej: Preparación de Terreno"
            disabled={loading}
            className={errors.nombre ? 'border-red-500' : ''}
          />
          {errors.nombre && <p className="text-sm text-red-500">{errors.nombre}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="categoria">
            Categoría <span className="text-red-500">*</span>
          </Label>
          <select
            id="categoria"
            name="categoria"
            value={formData.categoria}
            onChange={handleChange}
            disabled={loading}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <option value="siembra">Siembra</option>
            <option value="cosecha">Cosecha</option>
            <option value="riego">Riego</option>
            <option value="fertilizacion">Fertilización</option>
            <option value="control_plagas">Control de Plagas</option>
            <option value="mantenimiento">Mantenimiento</option>
            <option value="otro">Otro</option>
          </select>
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="descripcion">Descripción</Label>
          <textarea
            id="descripcion"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            placeholder="Descripción detallada de la labor agrícola..."
            disabled={loading}
            rows={4}
            className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <Button type="button" variant="outline" onClick={onCancel} disabled={loading}>
          Cancelar
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? 'Guardando...' : tipoLabor ? 'Actualizar' : 'Crear'}
        </Button>
      </div>
    </form>
  )
}

