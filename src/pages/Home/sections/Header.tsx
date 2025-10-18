import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Sprout } from 'lucide-react'

export default function Header() {
  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="border-b bg-white/95 backdrop-blur-sm sticky top-0 z-50 shadow-sm"
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-green-600 to-emerald-600 flex items-center justify-center shadow-lg">
              <Sprout className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              TerraSync
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-gray-600 hover:text-green-600 transition-colors font-medium">
              Características
            </a>
            <a href="#modules" className="text-gray-600 hover:text-green-600 transition-colors font-medium">
              Módulos
            </a>
            <a href="#benefits" className="text-gray-600 hover:text-green-600 transition-colors font-medium">
              Beneficios
            </a>
            <Link to="/login">
              <Button size="lg" className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
                Iniciar Sesión
              </Button>
            </Link>
          </nav>
        </div>
      </div>
    </motion.header>
  )
}

