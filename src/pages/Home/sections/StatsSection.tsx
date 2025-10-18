import { motion } from 'framer-motion'
import { Leaf, TrendingUp, Activity, Sprout } from 'lucide-react'

const stats = [
  { number: '177.5', label: 'Hectáreas Gestionadas', icon: Leaf },
  { number: '25K+', label: 'Kg Producidos/Mes', icon: TrendingUp },
  { number: '87.5%', label: 'Eficiencia Promedio', icon: Activity },
  { number: '4', label: 'Cultivos Activos', icon: Sprout }
]

export default function StatsSection() {
  return (
    <section className="py-16 bg-gradient-to-r from-green-600 to-emerald-600 text-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <stat.icon className="h-8 w-8 mx-auto mb-3 opacity-80" />
              <div className="text-4xl font-bold mb-2">{stat.number}</div>
              <div className="text-green-100">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

