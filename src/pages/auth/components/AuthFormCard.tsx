import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

interface AuthFormCardProps {
  icon: React.ReactNode
  title: string
  description: string
  children: React.ReactNode
  footer?: React.ReactNode
}

/**
 * Componente envolvente para formularios de autenticación
 * Proporciona un diseño consistente para todas las páginas de auth
 */
export default function AuthFormCard({
  icon,
  title,
  description,
  children,
  footer,
}: AuthFormCardProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-primary rounded-full">
              {icon}
            </div>
          </div>
          <CardTitle className="text-2xl text-center">{title}</CardTitle>
          <CardDescription className="text-center">{description}</CardDescription>
        </CardHeader>
        <CardContent>{children}</CardContent>
        {footer && <CardFooter className="flex flex-col space-y-4">{footer}</CardFooter>}
      </Card>
    </div>
  )
}

