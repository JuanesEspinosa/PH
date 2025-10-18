import { Sprout } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t bg-gray-50 py-12">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-green-600 to-emerald-600 flex items-center justify-center">
              <Sprout className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">TerraSync</span>
          </div>
          <div className="text-gray-600 text-center md:text-right">
            <p>© 2024 TerraSync. Sistema de Gestión Agrícola Inteligente.</p>
            <p className="text-sm mt-1">Desarrollado para la Hackathon 2024</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

