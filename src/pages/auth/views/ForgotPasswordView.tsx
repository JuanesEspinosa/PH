import { Mail } from 'lucide-react'
import AuthFormCard from '../components/AuthFormCard'
import ForgotPasswordForm from '../components/ForgotPasswordForm'

export default function ForgotPasswordView() {
  return (
    <AuthFormCard
      icon={<Mail className="h-6 w-6 text-white" />}
      title="Recuperar Contraseña"
      description="Ingresa tu correo para recuperar tu contraseña"
      footer={<ForgotPasswordForm />}
    >
      {null}
    </AuthFormCard>
  )
}

