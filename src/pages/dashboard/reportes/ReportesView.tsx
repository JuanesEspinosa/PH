import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  FileText, 
  Download, 
  FileSpreadsheet,
  TrendingUp,
  BarChart3,
  DollarSign,
  Award,
  GitCompare,
  Calendar,
  CheckCircle2,
  Sparkles,
  ArrowRight
} from 'lucide-react'
import { generarReportePDF, generarReporteExcel, generarReporteComparativo } from '@/lib/reportGenerator'
import { useState } from 'react'
import { useToast } from '@/hooks/use-toast'

export default function ReportesView() {
  const { toast } = useToast()
  const [generando, setGenerando] = useState<string | null>(null)

  const handleGenerarPDF = (tipo: string) => {
    setGenerando(tipo + '-pdf')
    try {
      generarReportePDF(tipo)
      toast({
        title: '✅ Reporte generado',
        description: `El reporte de ${tipo} en PDF se ha descargado correctamente.`,
      })
    } catch (error) {
      toast({
        title: '❌ Error',
        description: 'Hubo un problema al generar el reporte.',
        variant: 'destructive'
      })
    } finally {
      setTimeout(() => setGenerando(null), 1000)
    }
  }

  const handleGenerarExcel = (tipo: string) => {
    setGenerando(tipo + '-excel')
    try {
      generarReporteExcel(tipo)
      toast({
        title: '✅ Reporte generado',
        description: `El reporte de ${tipo} en Excel se ha descargado correctamente.`,
      })
    } catch (error) {
      toast({
        title: '❌ Error',
        description: 'Hubo un problema al generar el reporte.',
        variant: 'destructive'
      })
    } finally {
      setTimeout(() => setGenerando(null), 1000)
    }
  }

  const handleGenerarComparativo = () => {
    setGenerando('comparativo')
    try {
      generarReporteComparativo()
      toast({
        title: '✅ Reporte Comparativo generado',
        description: 'El reporte comparativo integral se ha descargado correctamente.',
      })
    } catch (error) {
      toast({
        title: '❌ Error',
        description: 'Hubo un problema al generar el reporte.',
        variant: 'destructive'
      })
    } finally {
      setTimeout(() => setGenerando(null), 1000)
    }
  }

  const reportes = [
    {
      id: 'productividad',
      titulo: 'Reporte de Productividad',
      descripcion: 'Análisis detallado de producción por cultivo, distribución de áreas y estadísticas generales del sistema agrícola.',
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      borderColor: 'border-green-600',
      metricas: [
        'Producción total por cultivo',
        'Distribución de áreas cultivadas',
        'Estadísticas generales',
        'Variaciones semanales y mensuales'
      ]
    },
    {
      id: 'rendimiento',
      titulo: 'Reporte de Rendimiento',
      descripcion: 'Evaluación del rendimiento por hectárea, eficiencia de campos y cumplimiento de objetivos establecidos.',
      icon: BarChart3,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      borderColor: 'border-blue-600',
      metricas: [
        'Rendimiento por hectárea',
        'Eficiencia operacional por campo',
        'Comparativa con objetivos',
        'Tendencias y proyecciones'
      ]
    },
    {
      id: 'costos',
      titulo: 'Reporte de Costos Operacionales',
      descripcion: 'Desglose completo de costos por categoría: personal, insumos, transporte y otros gastos operacionales.',
      icon: DollarSign,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
      borderColor: 'border-orange-600',
      metricas: [
        'Costos de personal',
        'Inversión en insumos',
        'Gastos de transporte',
        'Análisis de costos totales'
      ]
    },
    {
      id: 'calidad',
      titulo: 'Reporte de Calidad',
      descripcion: 'Evaluación de la calidad de producción, clasificación por categorías y evolución temporal de estándares.',
      icon: Award,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      borderColor: 'border-purple-600',
      metricas: [
        'Clasificación por calidad',
        'Evolución temporal',
        'Porcentajes de producción',
        'Indicadores de excelencia'
      ]
    }
  ]

  return (
    <div className="space-y-8">
      {/* Header Mejorado */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-600 via-green-500 to-emerald-600 p-8 text-white shadow-2xl">
        <div className="absolute top-0 right-0 -mt-4 -mr-4 h-40 w-40 rounded-full bg-white/10 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -mb-4 -ml-4 h-40 w-40 rounded-full bg-white/10 blur-3xl"></div>
        
        <div className="relative">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
              <Sparkles className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-4xl font-bold">Generación de Reportes</h1>
              <p className="text-green-100 mt-1 text-lg">
                Exporta y analiza información detallada con gráficos profesionales
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-6 mt-6">
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
              <Calendar className="h-4 w-4" />
              <span className="text-sm font-medium">
                {new Date().toLocaleDateString('es-ES', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
              <FileText className="h-4 w-4" />
              <span className="text-sm font-medium">5 Tipos de Reportes Disponibles</span>
            </div>
          </div>
        </div>
      </div>

      {/* Reporte Comparativo Especial - Mejorado */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 border-2 border-orange-200 shadow-xl">
        <div className="absolute top-0 right-0 opacity-10">
          <GitCompare className="h-64 w-64 text-orange-600" />
        </div>
        
        <div className="relative p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-start gap-4">
              <div className="p-4 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl shadow-lg">
                <GitCompare className="h-8 w-8 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-2xl font-bold text-gray-900">Reporte Comparativo Integral</h3>
                  <span className="px-3 py-1 bg-orange-100 text-orange-700 text-xs font-bold rounded-full">
                    PREMIUM
                  </span>
                </div>
                <p className="text-gray-600 max-w-2xl">
                  Análisis completo con resumen ejecutivo, mejores desempeños, gráficos comparativos y recomendaciones estratégicas personalizadas
                </p>
              </div>
            </div>
            <Button
              onClick={handleGenerarComparativo}
              disabled={generando === 'comparativo'}
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-lg hover:shadow-xl transition-all"
              size="lg"
            >
              {generando === 'comparativo' ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Generando...
                </>
              ) : (
                <>
                  <Download className="h-5 w-5 mr-2" />
                  Descargar PDF
                  <ArrowRight className="h-4 w-4 ml-2" />
                </>
              )}
            </Button>
          </div>
          
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="flex items-center gap-3 bg-white/60 backdrop-blur-sm p-3 rounded-lg">
              <CheckCircle2 className="h-5 w-5 text-orange-600 flex-shrink-0" />
              <span className="text-sm font-medium text-gray-700">Estadísticas completas con gráficos</span>
            </div>
            <div className="flex items-center gap-3 bg-white/60 backdrop-blur-sm p-3 rounded-lg">
              <CheckCircle2 className="h-5 w-5 text-orange-600 flex-shrink-0" />
              <span className="text-sm font-medium text-gray-700">Análisis de mejor desempeño</span>
            </div>
            <div className="flex items-center gap-3 bg-white/60 backdrop-blur-sm p-3 rounded-lg">
              <CheckCircle2 className="h-5 w-5 text-orange-600 flex-shrink-0" />
              <span className="text-sm font-medium text-gray-700">Recomendaciones estratégicas</span>
            </div>
          </div>
        </div>
      </div>

      {/* Grid de Reportes Mejorado */}
      <div className="grid gap-6 md:grid-cols-2">
        {reportes.map((reporte) => {
          const Icon = reporte.icon
          const generandoPDF = generando === reporte.id + '-pdf'
          const generandoExcel = generando === reporte.id + '-excel'
          
          return (
            <Card key={reporte.id} className="group relative overflow-hidden hover:shadow-2xl transition-all duration-500 border-2 hover:border-green-200">
              {/* Decoración de fondo */}
              <div className={`absolute top-0 right-0 w-32 h-32 ${reporte.bgColor} opacity-20 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500`}></div>
              
              <CardHeader className="relative">
                <div className="flex items-start gap-4">
                  <div className={`p-4 rounded-2xl ${reporte.bgColor} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`h-7 w-7 ${reporte.color}`} />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-xl mb-2 group-hover:text-green-600 transition-colors">
                      {reporte.titulo}
                    </CardTitle>
                    <CardDescription className="text-sm leading-relaxed">
                      {reporte.descripcion}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-5 relative">
                {/* Métricas incluidas */}
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 border border-gray-200">
                  <p className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    Incluye:
                  </p>
                  <ul className="space-y-2">
                    {reporte.metricas.map((metrica, index) => (
                      <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                        <div className={`w-2 h-2 rounded-full ${reporte.bgColor} mt-1.5 flex-shrink-0`} />
                        <span>{metrica}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Botones de descarga mejorados */}
                <div className="flex gap-3">
                  <Button
                    onClick={() => handleGenerarPDF(
                      reporte.id.charAt(0).toUpperCase() + reporte.id.slice(1)
                    )}
                    disabled={generandoPDF || generandoExcel}
                    className="flex-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-lg hover:shadow-xl transition-all group/btn"
                    size="lg"
                  >
                    {generandoPDF ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                        <span className="text-sm">Generando...</span>
                      </>
                    ) : (
                      <>
                        <FileText className="h-4 w-4 mr-2 group-hover/btn:scale-110 transition-transform" />
                        <span className="text-sm font-medium">PDF</span>
                      </>
                    )}
                  </Button>
                  <Button
                    onClick={() => handleGenerarExcel(
                      reporte.id.charAt(0).toUpperCase() + reporte.id.slice(1)
                    )}
                    disabled={generandoPDF || generandoExcel}
                    className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-lg hover:shadow-xl transition-all group/btn"
                    size="lg"
                  >
                    {generandoExcel ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                        <span className="text-sm">Generando...</span>
                      </>
                    ) : (
                      <>
                        <FileSpreadsheet className="h-4 w-4 mr-2 group-hover/btn:scale-110 transition-transform" />
                        <span className="text-sm font-medium">Excel</span>
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Información adicional - Mejorada */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-900">
              <FileText className="h-5 w-5 text-blue-600" />
              Formato PDF
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900">Incluye gráficos vectoriales</p>
                <p className="text-sm text-gray-600">Barras, líneas y comparativas visuales</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900">Formato profesional</p>
                <p className="text-sm text-gray-600">Ideal para presentaciones e informes</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-900">
              <FileSpreadsheet className="h-5 w-5 text-green-600" />
              Formato Excel
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900">Múltiples hojas de cálculo</p>
                <p className="text-sm text-gray-600">Datos organizados y estructurados</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900">Análisis personalizado</p>
                <p className="text-sm text-gray-600">Manipula datos y crea tus propios gráficos</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

