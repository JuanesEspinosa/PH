import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Mail } from 'lucide-react'
import { useForgotPasswordMutation } from '../hooks/useAuthQuery'

export default function ForgotPasswordForm() {
  const { mutate: forgotPassword, isPending, isSuccess } = useForgotPasswordMutation()
  const [email, setEmail] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    forgotPassword({ email })
  }

  if (isSuccess) {
    return (
      <>
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <Mail className="h-8 w-8 text-green-600" />
          </div>
          <p className="text-sm text-muted-foreground">
            Hemos enviado un enlace de recuperación a <strong>{email}</strong>. Por favor,
            revisa tu bandeja de entrada y sigue las instrucciones.
          </p>
          <p className="text-xs text-muted-foreground">
            Si no recibes el correo en unos minutos, revisa tu carpeta de spam.
          </p>
        </div>
        <div className="pt-4">
          <Link to="/login">
            <Button variant="outline" className="w-full">
              Volver al inicio de sesión
            </Button>
          </Link>
        </div>
      </>
    )
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Correo electrónico</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="tu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isPending}
          />
        </div>
        <p className="text-sm text-muted-foreground">
          Te enviaremos un enlace a tu correo para que puedas restablecer tu contraseña.
        </p>
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? 'Enviando...' : 'Enviar enlace de recuperación'}
        </Button>
      </form>
      <Link
        to="/login"
        className="text-sm text-center text-muted-foreground hover:text-primary block"
      >
        ← Volver al inicio de sesión
      </Link>
    </>
  )
}
