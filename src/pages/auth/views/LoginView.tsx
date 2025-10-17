import { LogIn } from 'lucide-react'
import AuthFormCard from '../components/AuthFormCard'
import LoginForm from '../components/LoginForm'

export default function LoginView() {
  return (
    <AuthFormCard
      icon={<LogIn className="h-6 w-6 text-white" />}
      title="Iniciar Sesión"
      description="Ingresa tus credenciales para acceder"
      footer={<LoginForm />}
    >
      {null}
    </AuthFormCard>
  )
}

