import { motion } from 'framer-motion'
import { BarChart3, FileText, Users, Shield } from 'lucide-react'

const modules = [
  {
    name: 'Dashboard Agrícola',
    description: 'Panel de control con 6 gráficos interactivos: producción mensual, rendimiento por hectárea, distribución de cultivos, labores diarias, calidad y eficiencia por campo.',
    metrics: ['25.2t Producción', '141.7 kg/ha Rendimiento', '87.5% Eficiencia'],
    icon: BarChart3,
    color: 'bg-blue-500'
  },
  {
    name: 'Módulo de Reportes',
    description: 'Generación automática de reportes en PDF con gráficos vectoriales y Excel con múltiples hojas. Incluye análisis de productividad, rendimiento, costos y calidad.',
    metrics: ['4 Tipos de Reportes', 'Gráficos Profesionales', 'Export PDF/Excel'],
    icon: FileText,
    color: 'bg-purple-500'
  },
  {
    name: 'Gestión de Usuarios',
    description: 'CRUD completo para administrar trabajadores y personal del campo. Asignación de roles, permisos y control de acceso.',
    metrics: ['Roles Personalizados', 'Permisos Granulares', 'Auditoría Completa'],
    icon: Users,
    color: 'bg-orange-500'
  },
  {
    name: 'Sistema de Roles',
    description: 'Crea y gestiona roles del sistema de manera simple. Define niveles de acceso para Administradores, Supervisores, Operadores y más.',
    metrics: ['5 Roles Predefinidos', 'Creación Rápida', 'Gestión Sencilla'],
    icon: Shield,
    color: 'bg-green-500'
  }
]

export default function ModulesSection() {
  return (
    <section id="modules" className="py-20 md:py-32 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Módulos del <span className="text-green-600">Sistema</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Cada módulo diseñado para optimizar un aspecto específico de tu operación
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {modules.map((module, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="group p-8 rounded-2xl bg-white border-2 border-gray-100 hover:border-green-200 hover:shadow-xl transition-all"
            >
              <div className="flex items-start gap-6">
                <div className={`${module.color} p-4 rounded-xl shadow-lg group-hover:scale-110 transition-transform`}>
                  <module.icon className="h-8 w-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-green-600 transition-colors">
                    {module.name}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {module.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {module.metrics.map((metric, idx) => (
                      <span 
                        key={idx}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
                      >
                        {metric}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

