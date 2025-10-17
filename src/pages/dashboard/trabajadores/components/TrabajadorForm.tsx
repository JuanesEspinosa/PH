import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Trabajador } from '../services/trabajadoresService'

interface TrabajadorFormProps {
  trabajador?: Trabajador
  onSubmit: (data: any) => void
  onCancel: () => void
  loading?: boolean
}

export default function TrabajadorForm({ trabajador, onSubmit, onCancel, loading }: TrabajadorFormProps) {
  const [formData, setFormData] = useState({
    nombres: '',
    apellidos: '',
    documento: '',
    tipoDocumento: 'DNI' as 'DNI' | 'Pasaporte' | 'Cédula' | 'Otro',
    telefono: '',
    email: '',
    cargo: '',
    fechaIngreso: '',
    direccion: '',
    estado: 'activo' as 'activo' | 'inactivo' | 'vacaciones' | 'licencia',
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (trabajador) {
      setFormData({
        nombres: trabajador.nombres,
        apellidos: trabajador.apellidos,
        documento: trabajador.documento,
        tipoDocumento: trabajador.tipoDocumento,
        telefono: trabajador.telefono,
        email: trabajador.email,
        cargo: trabajador.cargo,
        fechaIngreso: trabajador.fechaIngreso,
        direccion: trabajador.direccion,
        estado: trabajador.estado,
      })
    }
  }, [trabajador])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Limpiar error al escribir
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {}

    // Nombres
    if (!formData.nombres.trim()) {
      newErrors.nombres = 'Los nombres son requeridos'
    } else if (formData.nombres.trim().length < 2) {
      newErrors.nombres = 'Los nombres deben tener al menos 2 caracteres'
    }

    // Apellidos
    if (!formData.apellidos.trim()) {
      newErrors.apellidos = 'Los apellidos son requeridos'
    } else if (formData.apellidos.trim().length < 2) {
      newErrors.apellidos = 'Los apellidos deben tener al menos 2 caracteres'
    }

    // Documento
    if (!formData.documento.trim()) {
      newErrors.documento = 'El documento es requerido'
    } else if (formData.documento.trim().length < 5) {
      newErrors.documento = 'El documento debe tener al menos 5 caracteres'
    }

    // Teléfono
    if (!formData.telefono.trim()) {
      newErrors.telefono = 'El teléfono es requerido'
    } else if (!/^[+]?[\d\s\-()]+$/.test(formData.telefono)) {
      newErrors.telefono = 'Formato de teléfono inválido'
    }

    // Email
    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Formato de email inválido'
    }

    // Cargo
    if (!formData.cargo.trim()) {
      newErrors.cargo = 'El cargo es requerido'
    } else if (formData.cargo.trim().length < 3) {
      newErrors.cargo = 'El cargo debe tener al menos 3 caracteres'
    }

    // Fecha de ingreso
    if (!formData.fechaIngreso) {
      newErrors.fechaIngreso = 'La fecha de ingreso es requerida'
    } else {
      const fechaIngreso = new Date(formData.fechaIngreso)
      const hoy = new Date()
      hoy.setHours(0, 0, 0, 0)
      
      if (fechaIngreso > hoy) {
        newErrors.fechaIngreso = 'La fecha de ingreso no puede ser futura'
      }
      
      // Validar formato YYYY-MM-DD
      if (!/^\d{4}-\d{2}-\d{2}$/.test(formData.fechaIngreso)) {
        newErrors.fechaIngreso = 'Formato de fecha inválido (debe ser YYYY-MM-DD)'
      }
    }

    // Dirección
    if (!formData.direccion.trim()) {
      newErrors.direccion = 'La dirección es requerida'
    } else if (formData.direccion.trim().length < 10) {
      newErrors.direccion = 'La dirección debe tener al menos 10 caracteres'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validate()) {
      return
    }

    const data = trabajador
      ? {
          // Update
          nombres: formData.nombres,
          apellidos: formData.apellidos,
          documento: formData.documento,
          tipoDocumento: formData.tipoDocumento,
          telefono: formData.telefono,
          email: formData.email,
          cargo: formData.cargo,
          fechaIngreso: formData.fechaIngreso,
          direccion: formData.direccion,
          estado: formData.estado,
        }
      : {
          // Create
          nombres: formData.nombres,
          apellidos: formData.apellidos,
          documento: formData.documento,
          tipoDocumento: formData.tipoDocumento,
          telefono: formData.telefono,
          email: formData.email,
          cargo: formData.cargo,
          fechaIngreso: formData.fechaIngreso,
          direccion: formData.direccion,
        }

    await onSubmit(data)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Nombres */}
        <div className="space-y-2">
          <Label htmlFor="nombres">
            Nombres <span className="text-red-500">*</span>
          </Label>
          <Input
            id="nombres"
            name="nombres"
            value={formData.nombres}
            onChange={handleChange}
            placeholder="Juan Carlos"
            disabled={loading}
            className={errors.nombres ? 'border-red-500' : ''}
          />
          {errors.nombres && <p className="text-sm text-red-500">{errors.nombres}</p>}
        </div>

        {/* Apellidos */}
        <div className="space-y-2">
          <Label htmlFor="apellidos">
            Apellidos <span className="text-red-500">*</span>
          </Label>
          <Input
            id="apellidos"
            name="apellidos"
            value={formData.apellidos}
            onChange={handleChange}
            placeholder="Pérez González"
            disabled={loading}
            className={errors.apellidos ? 'border-red-500' : ''}
          />
          {errors.apellidos && <p className="text-sm text-red-500">{errors.apellidos}</p>}
        </div>

        {/* Tipo de Documento */}
        <div className="space-y-2">
          <Label htmlFor="tipoDocumento">
            Tipo de Documento <span className="text-red-500">*</span>
          </Label>
          <select
            id="tipoDocumento"
            name="tipoDocumento"
            value={formData.tipoDocumento}
            onChange={handleChange}
            disabled={loading}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <option value="DNI">DNI</option>
            <option value="Pasaporte">Pasaporte</option>
            <option value="Cédula">Cédula</option>
            <option value="Otro">Otro</option>
          </select>
        </div>

        {/* Documento */}
        <div className="space-y-2">
          <Label htmlFor="documento">
            Número de Documento <span className="text-red-500">*</span>
          </Label>
          <Input
            id="documento"
            name="documento"
            value={formData.documento}
            onChange={handleChange}
            placeholder="12345678A"
            disabled={loading}
            className={errors.documento ? 'border-red-500' : ''}
          />
          {errors.documento && <p className="text-sm text-red-500">{errors.documento}</p>}
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email">
            Email <span className="text-red-500">*</span>
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="trabajador@empresa.com"
            disabled={loading}
            className={errors.email ? 'border-red-500' : ''}
          />
          {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
        </div>

        {/* Teléfono */}
        <div className="space-y-2">
          <Label htmlFor="telefono">
            Teléfono <span className="text-red-500">*</span>
          </Label>
          <Input
            id="telefono"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            placeholder="+34 600 000 000"
            disabled={loading}
            className={errors.telefono ? 'border-red-500' : ''}
          />
          {errors.telefono && <p className="text-sm text-red-500">{errors.telefono}</p>}
        </div>

        {/* Cargo */}
        <div className="space-y-2">
          <Label htmlFor="cargo">
            Cargo <span className="text-red-500">*</span>
          </Label>
          <Input
            id="cargo"
            name="cargo"
            value={formData.cargo}
            onChange={handleChange}
            placeholder="Desarrollador Senior"
            disabled={loading}
            className={errors.cargo ? 'border-red-500' : ''}
          />
          {errors.cargo && <p className="text-sm text-red-500">{errors.cargo}</p>}
        </div>

        {/* Fecha de Ingreso */}
        <div className="space-y-2">
          <Label htmlFor="fechaIngreso">
            Fecha de Ingreso <span className="text-red-500">*</span>
          </Label>
          <Input
            id="fechaIngreso"
            name="fechaIngreso"
            type="date"
            value={formData.fechaIngreso}
            onChange={handleChange}
            disabled={loading}
            className={errors.fechaIngreso ? 'border-red-500' : ''}
          />
          {errors.fechaIngreso && <p className="text-sm text-red-500">{errors.fechaIngreso}</p>}
        </div>

        {/* Estado (solo en editar) */}
        {trabajador && (
          <div className="space-y-2">
            <Label htmlFor="estado">
              Estado <span className="text-red-500">*</span>
            </Label>
            <select
              id="estado"
              name="estado"
              value={formData.estado}
              onChange={handleChange}
              disabled={loading}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <option value="activo">Activo</option>
              <option value="inactivo">Inactivo</option>
              <option value="vacaciones">Vacaciones</option>
              <option value="licencia">Licencia</option>
            </select>
          </div>
        )}

        {/* Dirección - Campo completo */}
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="direccion">
            Dirección Completa <span className="text-red-500">*</span>
          </Label>
          <textarea
            id="direccion"
            name="direccion"
            value={formData.direccion}
            onChange={handleChange}
            placeholder="Calle, número, código postal, ciudad, país"
            disabled={loading}
            rows={3}
            className={`flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
              errors.direccion ? 'border-red-500' : ''
            }`}
          />
          {errors.direccion && <p className="text-sm text-red-500">{errors.direccion}</p>}
        </div>
      </div>

      {/* Botones */}
      <div className="flex justify-end gap-3">
        <Button type="button" variant="outline" onClick={onCancel} disabled={loading}>
          Cancelar
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? 'Guardando...' : trabajador ? 'Actualizar' : 'Crear'}
        </Button>
      </div>
    </form>
  )
}

