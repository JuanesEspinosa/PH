import { motion } from 'framer-motion'
import { CheckCircle2, Leaf } from 'lucide-react'

const benefits = [
  'Reducción de costos operacionales hasta un 30%',
  'Incremento en productividad del 25% promedio',
  'Toma de decisiones basada en datos reales',
  'Reportes automáticos que ahorran horas de trabajo',
  'Acceso desde cualquier dispositivo conectado',
  'Soporte técnico especializado en agricultura'
]

export default function BenefitsSection() {
  return (
    <section id="benefits" className="py-20 md:py-32">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              ¿Por qué elegir <span className="text-green-600">TerraSync</span>?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Moderniza tus procesos agrícolas con tecnología de punta diseñada específicamente para el campo.
            </p>
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle2 className="h-6 w-6 text-green-600 flex-shrink-0" />
                  <span className="text-lg text-gray-700">{benefit}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="aspect-square rounded-3xl bg-gradient-to-br from-green-100 to-emerald-100 p-8 shadow-2xl">
              <div className="h-full w-full bg-white rounded-2xl p-6 flex flex-col justify-center">
                <Leaf className="h-24 w-24 text-green-600 mb-6 mx-auto" />
                <h3 className="text-2xl font-bold text-center mb-4">Agricultura de Precisión</h3>
                <p className="text-gray-600 text-center">
                  Integra sensores, dispositivos móviles y análisis en la nube para obtener el máximo rendimiento de tus cultivos.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

