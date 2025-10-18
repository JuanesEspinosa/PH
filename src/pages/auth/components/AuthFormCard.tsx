import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Wheat, Cloud, Sun, Tractor } from 'lucide-react'

interface AuthFormCardProps {
  icon: React.ReactNode
  title: string
  description: string
  subtitle?: string
  children: React.ReactNode
  footer?: React.ReactNode
}

export default function AuthFormCard({
  icon,
  title,
  description,
  subtitle,
  children,
  footer,
}: AuthFormCardProps) {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden p-4">
      {/* Fondo con gradiente agrícola */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
        {/* Patrón decorativo de fondo */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 animate-float">
            <Wheat className="h-32 w-32 text-green-600" />
          </div>
          <div className="absolute bottom-20 right-20 animate-float-delayed">
            <Tractor className="h-40 w-40 text-green-700" />
          </div>
          <div className="absolute top-40 right-10 animate-pulse">
            <Sun className="h-24 w-24 text-amber-500" />
          </div>
          <div className="absolute bottom-40 left-20 animate-float">
            <Cloud className="h-20 w-20 text-blue-400" />
          </div>
        </div>
      </div>

      {/* Efecto de brillo sutil */}
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/5 to-transparent pointer-events-none" />

      {/* Card principal */}
      <Card className="w-full max-w-lg relative z-10 shadow-2xl border-2 border-green-100 backdrop-blur-sm bg-white/95 hover:shadow-green-200/50 transition-all duration-500">
        <CardHeader className="space-y-3 pb-6">
          {/* Logo/Icono con efecto */}
          <div className="flex justify-center mb-2">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-emerald-600 rounded-2xl blur-lg group-hover:blur-xl opacity-75 group-hover:opacity-100 transition-all duration-500 animate-pulse" />
              <div className="relative p-4 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-lg transform group-hover:scale-110 transition-transform duration-500">
                {icon}
              </div>
            </div>
          </div>

          {/* Título */}
          <CardTitle className="text-3xl text-center font-bold bg-gradient-to-r from-green-700 via-emerald-600 to-teal-700 bg-clip-text text-transparent">
            {title}
          </CardTitle>

          {/* Descripción */}
          <CardDescription className="text-center text-base text-gray-600 font-medium">
            {description}
          </CardDescription>

          {/* Subtítulo opcional */}
          {subtitle && (
            <div className="flex items-center justify-center gap-2 pt-1">
              <div className="h-px w-8 bg-gradient-to-r from-transparent to-green-400" />
              <p className="text-xs text-green-600 font-semibold tracking-wide uppercase">
                {subtitle}
              </p>
              <div className="h-px w-8 bg-gradient-to-l from-transparent to-green-400" />
            </div>
          )}
        </CardHeader>

        <CardContent className="px-4">{children}</CardContent>
        
        {footer && (
          <CardFooter className="flex flex-col space-y-4 px-4 pb-6">
            {footer}
          </CardFooter>
        )}

        {/* Decoración inferior */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-400 via-emerald-500 to-teal-500" />
      </Card>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        
        @keyframes float-delayed {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
          animation-delay: 1s;
        }
      `}</style>
    </div>
  )
}

