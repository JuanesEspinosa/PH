import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Download, ArrowRight } from 'lucide-react'

export default function CTASection() {
  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-green-600 via-emerald-600 to-green-700" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full mix-blend-soft-light filter blur-3xl opacity-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full mix-blend-soft-light filter blur-3xl opacity-10" />
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center text-white max-w-3xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Comienza a Optimizar tu Producción Hoy
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Únete a los agricultores que ya están transformando sus operaciones con tecnología
          </p>
          <Link to="/login">
            <Button 
              size="lg" 
              className="bg-white text-green-600 hover:bg-gray-100 text-lg h-14 px-10 shadow-xl hover:shadow-2xl transition-all"
            >
              <Download className="mr-2 h-5 w-5" />
              Acceder al Sistema
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <p className="mt-6 text-sm opacity-75">
            Sistema listo para usar • Sin instalación • Soporte incluido
          </p>
        </motion.div>
      </div>
    </section>
  )
}

