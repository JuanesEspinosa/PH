import { motion } from 'framer-motion'
import { Sprout, BarChart3, FileText, Users, Shield, TrendingUp } from 'lucide-react'

const features = [
  {
    title: 'Captura de Datos en Campo',
    description: 'Registro manual y automático de labores: cosecha, pesaje, corte, transporte y más.',
    icon: Sprout,
    color: 'from-green-500 to-emerald-500',
  },
  {
    title: 'Dashboard Interactivo',
    description: 'Visualiza métricas de producción, rendimiento y eficiencia en tiempo real con gráficos modernos.',
    icon: BarChart3,
    color: 'from-blue-500 to-cyan-500',
  },
  {
    title: 'Reportes Automáticos',
    description: 'Genera reportes en PDF y Excel con gráficos profesionales. Incluye productividad, costos y calidad.',
    icon: FileText,
    color: 'from-purple-500 to-pink-500',
  },
  {
    title: 'Gestión de Usuarios',
    description: 'Administra trabajadores, supervisores y personal con roles personalizados.',
    icon: Users,
    color: 'from-orange-500 to-red-500',
  },
  {
    title: 'Control de Roles',
    description: 'Define permisos y accesos para diferentes niveles del equipo de trabajo.',
    icon: Shield,
    color: 'from-indigo-500 to-blue-500',
  },
  {
    title: 'Análisis Predictivo',
    description: 'Proyecciones de rendimiento, análisis comparativo y recomendaciones estratégicas.',
    icon: TrendingUp,
    color: 'from-green-500 to-teal-500',
  },
]

export default function FeaturesSection() {
  return (
    <section id="features" className="py-20 md:py-32">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Características <span className="text-green-600">Principales</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Todo lo que necesitas para gestionar tu operación agrícola de manera eficiente
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="group relative p-8 rounded-2xl border-2 border-gray-100 hover:border-transparent hover:shadow-2xl transition-all bg-white overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity`} />
              <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.color} mb-6 shadow-lg`}>
                <feature.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3 group-hover:text-green-600 transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

