import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useLoginMutation } from '../hooks/useAuthQuery'
import { LoginCredentials } from '../services/authService'
import { Mail, Lock, Eye, EyeOff, Leaf, Loader2, CheckCircle2, XCircle, AlertCircle, ArrowLeft } from 'lucide-react'

export default function LoginForm() {
  const { mutate: login, isPending } = useLoginMutation()
  const [formData, setFormData] = useState<LoginCredentials>({
    email: '',
    password: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [emailError, setEmailError] = useState('')
  const [passwordStrength, setPasswordStrength] = useState<'weak' | 'medium' | 'strong' | null>(null)
  const [focusedField, setFocusedField] = useState<string | null>(null)

  // Validación de email en tiempo real
  const validateEmail = (email: string) => {
    if (!email) {
      setEmailError('')
      return
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setEmailError('Formato de email inválido')
    } else {
      setEmailError('')
    }
  }

  // Evaluar fortaleza de contraseña
  const evaluatePasswordStrength = (password: string) => {
    if (!password) {
      setPasswordStrength(null)
      return
    }
    
    let strength = 0
    if (password.length >= 8) strength++
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++
    if (/\d/.test(password)) strength++
    if (/[^a-zA-Z0-9]/.test(password)) strength++

    if (strength <= 1) setPasswordStrength('weak')
    else if (strength <= 3) setPasswordStrength('medium')
    else setPasswordStrength('strong')
  }

  useEffect(() => {
    validateEmail(formData.email)
  }, [formData.email])

  useEffect(() => {
    evaluatePasswordStrength(formData.password)
  }, [formData.password])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!emailError && formData.email && formData.password) {
      login(formData)
    }
  }

  const getPasswordStrengthColor = () => {
    switch (passwordStrength) {
      case 'weak':
        return 'bg-red-500'
      case 'medium':
        return 'bg-yellow-500'
      case 'strong':
        return 'bg-green-500'
      default:
        return 'bg-gray-300'
    }
  }

  const getPasswordStrengthText = () => {
    switch (passwordStrength) {
      case 'weak':
        return 'Débil'
      case 'medium':
        return 'Media'
      case 'strong':
        return 'Fuerte'
      default:
        return ''
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Campo Email */}
        <div className="space-y-2">
          <Label 
            htmlFor="email" 
            className="text-sm font-semibold text-gray-700 flex items-center gap-2"
          >
            <Mail className="h-4 w-4 text-green-600" />
            Correo Electrónico
          </Label>
          <div className="relative group">
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="agricultor@ejemplo.com"
              value={formData.email}
              onChange={handleChange}
              onFocus={() => setFocusedField('email')}
              onBlur={() => setFocusedField(null)}
              required
              disabled={isPending}
              className={`pl-10 h-12 transition-all duration-300 ${
                focusedField === 'email' 
                  ? 'border-green-500 ring-2 ring-green-200 shadow-lg shadow-green-100' 
                  : 'border-gray-300'
              } ${emailError ? 'border-red-500' : ''} hover:border-green-400 bg-white`}
            />
            <Mail className={`absolute left-3 top-3.5 h-5 w-5 transition-colors duration-300 ${
              focusedField === 'email' ? 'text-green-600' : 'text-gray-400'
            }`} />
            
            {/* Indicador de validación */}
            {formData.email && (
              <div className="absolute right-3 top-3.5">
                {emailError ? (
                  <XCircle className="h-5 w-5 text-red-500 animate-pulse" />
                ) : (
                  <CheckCircle2 className="h-5 w-5 text-green-500 animate-scale-in" />
                )}
              </div>
            )}
          </div>
          {emailError && (
            <p className="text-xs text-red-600 flex items-center gap-1 animate-slide-down">
              <AlertCircle className="h-3 w-3" />
              {emailError}
            </p>
          )}
          <p className="text-xs text-gray-500 flex items-center gap-1">
            <Leaf className="h-3 w-3 text-green-500" />
            Usa tu email registrado en el sistema
          </p>
        </div>

        {/* Campo Contraseña */}
        <div className="space-y-2">
          <Label 
            htmlFor="password" 
            className="text-sm font-semibold text-gray-700 flex items-center gap-2"
          >
            <Lock className="h-4 w-4 text-green-600" />
            Contraseña
          </Label>
          <div className="relative group">
            <Input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              onFocus={() => setFocusedField('password')}
              onBlur={() => setFocusedField(null)}
              required
              disabled={isPending}
              className={`pl-10 pr-12 h-12 transition-all duration-300 ${
                focusedField === 'password' 
                  ? 'border-green-500 ring-2 ring-green-200 shadow-lg shadow-green-100' 
                  : 'border-gray-300'
              } hover:border-green-400 bg-white`}
            />
            <Lock className={`absolute left-3 top-3.5 h-5 w-5 transition-colors duration-300 ${
              focusedField === 'password' ? 'text-green-600' : 'text-gray-400'
            }`} />
            
            {/* Botón mostrar/ocultar contraseña */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3.5 text-gray-400 hover:text-green-600 transition-colors focus:outline-none"
              disabled={isPending}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>

          {/* Indicador de fortaleza */}
          {passwordStrength && (
            <div className="space-y-1 animate-slide-down">
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-600">Seguridad:</span>
                <span className={`font-semibold ${
                  passwordStrength === 'weak' ? 'text-red-600' :
                  passwordStrength === 'medium' ? 'text-yellow-600' :
                  'text-green-600'
                }`}>
                  {getPasswordStrengthText()}
                </span>
              </div>
              <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-500 ${getPasswordStrengthColor()}`}
                  style={{ 
                    width: passwordStrength === 'weak' ? '33%' : 
                           passwordStrength === 'medium' ? '66%' : '100%' 
                  }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Botón de Login */}
        <Button 
          type="submit" 
          className="w-full h-12 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold shadow-lg hover:shadow-xl hover:shadow-green-300/50 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] mt-6"
          disabled={isPending || !!emailError || !formData.email || !formData.password}
        >
          {isPending ? (
            <span className="flex items-center gap-2">
              <Loader2 className="h-5 w-5 animate-spin" />
              Accediendo al sistema...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Leaf className="h-5 w-5" />
              Iniciar Sesión
            </span>
          )}
        </Button>
      </form>

      {/* Links adicionales */}
      <div className="space-y-3 pt-2">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-white px-2 text-gray-500">Opciones</span>
          </div>
        </div>

        <div className="flex flex-col gap-2 text-sm">
          <Link 
            to="/forgot-password" 
            className="text-center text-green-600 hover:text-green-700 font-medium hover:underline transition-colors"
          >
            ¿Olvidaste tu contraseña?
          </Link>
          <Link 
            to="/" 
            className="text-center text-gray-600 hover:text-gray-700 font-medium flex items-center justify-center gap-1 hover:gap-2 transition-all group"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Volver al inicio
          </Link>
        </div>
      </div>

      <style>{`
        @keyframes scale-in {
          from {
            transform: scale(0);
          }
          to {
            transform: scale(1);
          }
        }
        
        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }
        
        .animate-slide-down {
          animation: slide-down 0.3s ease-out;
        }
      `}</style>
    </>
  )
}
