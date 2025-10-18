import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { useRolesQuery } from '../../roles/hooks/useRolesQuery'
import type { Usuario } from '../services/usuariosService'
import Loading from '@/components/ui/loading'

interface UsuarioFormProps {
  usuario?: Usuario
  onSubmit: (data: any) => void
  onCancel: () => void
  loading?: boolean
}

export default function UsuarioForm({ usuario, onSubmit, onCancel, loading }: UsuarioFormProps) {
  const { data: roles, isLoading: rolesLoading } = useRolesQuery()
  
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    rol: '',
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (usuario) {
      setFormData({
        nombre: usuario.nombre,
        email: usuario.email,
        password: '', // No mostramos la contraseña
        rol: usuario.rol,
      })
    }
  }, [usuario])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const finalValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    
    setFormData((prev) => ({ ...prev, [name]: finalValue }))
    
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

    if (!formData.rol) {
      newErrors.rol = 'El rol es requerido'
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
          nombre: formData.nombre,
          email: formData.email,
          ...(formData.password && { password: formData.password }),
          rol: formData.rol,
        }
      : {
          nombre: formData.nombre,
          email: formData.email,
          password: formData.password,
          rol: formData.rol,
        }

    onSubmit(data)
  }

  if (rolesLoading) {
    return <Loading text="Cargando formulario..." />
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            placeholder="Ej: Juan Pérez"
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
            placeholder="juan@example.com"
            className={errors.email ? 'border-red-500' : ''}
          />
          {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
        </div>

        {/* Contraseña */}
        <div className="space-y-2">
          <Label htmlFor="password">
            Contraseña {!usuario && <span className="text-red-500">*</span>}
            {usuario && <span className="text-gray-500 text-xs">(Dejar vacío para no cambiar)</span>}
          </Label>
          <Input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            className={errors.password ? 'border-red-500' : ''}
          />
          {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
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
            className={`flex h-10 w-full rounded-md border ${
              errors.rol ? 'border-red-500' : 'border-input'
            } bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`}
          >
            <option value="">Seleccionar rol</option>
            {roles && roles.length > 0 ? (
              roles.map((rol) => (
                <option key={rol.id} value={rol.nombre}>
                  {rol.nombre}
                </option>
              ))
            ) : (
              <option value="" disabled>No hay roles disponibles</option>
            )}
          </select>
          {errors.rol && <p className="text-sm text-red-500">{errors.rol}</p>}
          {roles && roles.length === 0 && (
            <p className="text-sm text-amber-600">
              ⚠️ No hay roles creados. Por favor, crea un rol primero en la sección de Roles.
            </p>
          )}
        </div>

      </div>

      {/* Botones */}
      <div className="flex items-center justify-end gap-4 pt-4 border-t">
        <Button type="button" variant="outline" onClick={onCancel} disabled={loading}>
          Cancelar
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? 'Guardando...' : usuario ? 'Actualizar Usuario' : 'Crear Usuario'}
        </Button>
      </div>
    </form>
  )
}
