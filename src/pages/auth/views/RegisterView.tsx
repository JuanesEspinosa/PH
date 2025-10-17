import { UserPlus } from 'lucide-react'
import AuthFormCard from '../components/AuthFormCard'
import RegisterForm from '../components/RegisterForm'

export default function RegisterView() {
  return (
    <AuthFormCard
      icon={<UserPlus className="h-6 w-6 text-white" />}
      title="Crear Cuenta"
      description="Completa el formulario para registrarte"
      footer={<RegisterForm />}
    >
      {null}
    </AuthFormCard>
  )
}

