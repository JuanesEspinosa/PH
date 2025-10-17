import { Sprout } from 'lucide-react'
import AuthFormCard from '../components/AuthFormCard'
import LoginForm from '../components/LoginForm'

export default function LoginView() {
  return (
    <AuthFormCard
      icon={<Sprout className="h-8 w-8 text-white" />}
      title="Bienvenido de Vuelta"
      description="Accede a tu sistema de gestión agrícola"
      subtitle="Cultiva el futuro con tecnología"
      footer={<LoginForm />}
    >
      {null}
    </AuthFormCard>
  )
}

