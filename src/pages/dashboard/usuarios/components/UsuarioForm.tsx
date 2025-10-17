import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Usuario } from '../services/usuariosService'

interface UsuarioFormProps {
  usuario?: Usuario
  onSubmit: (data: any) => void
  onCancel: () => void
  loading?: boolean
}

export default function UsuarioForm({ usuario, onSubmit, onCancel, loading }: UsuarioFormProps) {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    rol: 'usuario' as 'admin' | 'usuario',
    telefono: '',
    departamento: '',
    estado: 'activo' as 'activo' | 'inactivo',
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (usuario) {
      setFormData({
        nombre: usuario.nombre,
        email: usuario.email,
        password: '', // No mostramos la contraseña
        rol: usuario.rol,
        telefono: usuario.telefono || '',
        departamento: usuario.departamento || '',
        estado: usuario.estado,
      })
    }
  }, [usuario])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Limpiar error al escribir
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es requerido'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email inválido'
    }

    if (!usuario && !formData.password) {
      newErrors.password = 'La contraseña es requerida'
    } else if (!usuario && formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validate()) {
      return
    }

    const data = usuario
      ? {
          // Update
          nombre: formData.nombre,
          email: formData.email,
          rol: formData.rol,
          telefono: formData.telefono || undefined,
          departamento: formData.departamento || undefined,
          estado: formData.estado,
        }
      : {
          // Create
          nombre: formData.nombre,
          email: formData.email,
          password: formData.password,
          rol: formData.rol,
          telefono: formData.telefono || undefined,
          departamento: formData.departamento || undefined,
        }

    await onSubmit(data)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Nombre */}
        <div className="space-y-2">
          <Label htmlFor="nombre">
            Nombre completo <span className="text-red-500">*</span>
          </Label>
          <Input
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            placeholder="Juan Pérez"
            disabled={loading}
            className={errors.nombre ? 'border-red-500' : ''}
          />
          {errors.nombre && <p className="text-sm text-red-500">{errors.nombre}</p>}
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
            placeholder="usuario@example.com"
            disabled={loading}
            className={errors.email ? 'border-red-500' : ''}
          />
          {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
        </div>

        {/* Contraseña (solo en crear) */}
        {!usuario && (
          <div className="space-y-2">
            <Label htmlFor="password">
              Contraseña <span className="text-red-500">*</span>
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              disabled={loading}
              className={errors.password ? 'border-red-500' : ''}
            />
            {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
          </div>
        )}

        {/* Teléfono */}
        <div className="space-y-2">
          <Label htmlFor="telefono">Teléfono</Label>
          <Input
            id="telefono"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            placeholder="+34 600 000 000"
            disabled={loading}
          />
        </div>

        {/* Departamento */}
        <div className="space-y-2">
          <Label htmlFor="departamento">Departamento</Label>
          <Input
            id="departamento"
            name="departamento"
            value={formData.departamento}
            onChange={handleChange}
            placeholder="Tecnología"
            disabled={loading}
          />
        </div>

        {/* Rol */}
        <div className="space-y-2">
          <Label htmlFor="rol">
            Rol <span className="text-red-500">*</span>
          </Label>
          <select
            id="rol"
            name="rol"
            value={formData.rol}
            onChange={handleChange}
            disabled={loading}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <option value="usuario">Usuario</option>
            <option value="admin">Administrador</option>
          </select>
        </div>

        {/* Estado (solo en editar) */}
        {usuario && (
          <div className="space-y-2">
            <Label htmlFor="estado">Estado</Label>
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
            </select>
          </div>
        )}
      </div>

      {/* Botones */}
      <div className="flex justify-end gap-3">
        <Button type="button" variant="outline" onClick={onCancel} disabled={loading}>
          Cancelar
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? 'Guardando...' : usuario ? 'Actualizar' : 'Crear'}
        </Button>
      </div>
    </form>
  )
}

