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
  Calendar,
  CheckCircle2,
  Sparkles,
  Trash2,
  RefreshCw
} from 'lucide-react'
import { useReportesQuery } from './hooks/useReportesQuery'
import { useState } from 'react'

export default function ReportesView() {
  const [mostrarGenerados, setMostrarGenerados] = useState(false)

  const {
    reportesDisponibles,
    reportesGenerados,
    isLoadingDisponibles,
    isLoadingGenerados,
    generarPDF,
    generarExcel,
    isGeneratingPDF,
    isGeneratingExcel,
    descargarReporte,
    eliminarReporte,
    isEliminando
  } = useReportesQuery()

  const handleGenerarPDF = (tipo: string) => {
    // Mapear IDs a nombres completos
    const tipoMapeado = tipo === 'productividad' ? 'Productividad' :
                       tipo === 'rendimiento' ? 'Rendimiento' :
                       tipo === 'costos' ? 'Costos' : tipo
    generarPDF({ tipoReporte: tipoMapeado as any })
  }

  const handleGenerarExcel = (tipo: string) => {
    // Mapear IDs a nombres completos
    const tipoMapeado = tipo === 'productividad' ? 'Productividad' :
                       tipo === 'rendimiento' ? 'Rendimiento' :
                       tipo === 'costos' ? 'Costos' : tipo
    generarExcel({ tipoReporte: tipoMapeado as any })
  }


  const handleDescargar = (filename: string) => {
    descargarReporte(filename)
  }

  const handleEliminar = (filename: string) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este reporte?')) {
      eliminarReporte(filename)
    }
  }

  const formatearTamaño = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const formatearFecha = (fecha: string) => {
    return new Date(fecha).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  // Mapeo de iconos
  const iconMap = {
    TrendingUp,
    BarChart3,
    DollarSign,
    Award
  }

  if (isLoadingDisponibles) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-200px)]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando reportes disponibles...</p>
        </div>
      </div>
    )
  }

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


      {/* Botón para mostrar reportes generados */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Reportes Disponibles</h2>
        <Button
          onClick={() => setMostrarGenerados(!mostrarGenerados)}
          variant="outline"
          className="flex items-center gap-2"
        >
          <RefreshCw className="h-4 w-4" />
          {mostrarGenerados ? 'Ocultar' : 'Ver'} Reportes Generados
        </Button>
      </div>

      {/* Lista de reportes generados */}
      {mostrarGenerados && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Reportes Generados
            </CardTitle>
            <CardDescription>
              Lista de reportes previamente generados y disponibles para descarga
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoadingGenerados ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Cargando reportes generados...</p>
              </div>
            ) : reportesGenerados && reportesGenerados.length > 0 ? (
              <div className="space-y-3">
                {reportesGenerados.map((reporte) => (
                  <div key={reporte.filename} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <FileText className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{reporte.filename}</p>
                        <p className="text-sm text-gray-500">
                          {formatearTamaño(reporte.size)} • {formatearFecha(reporte.created)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        onClick={() => handleDescargar(reporte.filename)}
                        size="sm"
                        variant="outline"
                        className="flex items-center gap-1"
                      >
                        <Download className="h-4 w-4" />
                        Descargar
                      </Button>
                      <Button
                        onClick={() => handleEliminar(reporte.filename)}
                        size="sm"
                        variant="outline"
                        className="flex items-center gap-1 text-red-600 hover:text-red-700 hover:bg-red-50"
                        disabled={isEliminando}
                      >
                        <Trash2 className="h-4 w-4" />
                        Eliminar
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No hay reportes generados aún</p>
                <p className="text-sm text-gray-500">Genera tu primer reporte usando los botones de arriba</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Grid de Reportes Mejorado */}
      <div className="grid gap-6 md:grid-cols-2">
        {reportesDisponibles?.map((reporte) => {
          const Icon = iconMap[reporte.icono as keyof typeof iconMap] || FileText
          
          return (
            <Card key={reporte.id} className="group relative overflow-hidden hover:shadow-2xl transition-all duration-500 border-2 hover:border-green-200">
              {/* Decoración de fondo */}
              <div className={`absolute top-0 right-0 w-32 h-32 bg-${reporte.color.replace('#', '')}-100 opacity-20 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500`}></div>
              
              <CardHeader className="relative">
                <div className="flex items-start gap-4">
                  <div className={`p-4 rounded-2xl bg-${reporte.color.replace('#', '')}-100 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`h-7 w-7 ${reporte.color}`} />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-xl mb-2 group-hover:text-green-600 transition-colors">
                      {reporte.nombre}
                    </CardTitle>
                    <CardDescription className="text-sm leading-relaxed">
                      {reporte.descripcion}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-5 relative">
                {/* Formatos disponibles */}
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 border border-gray-200">
                  <p className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    Formatos disponibles:
                  </p>
                  <div className="flex gap-2">
                    {reporte.formatos.map((formato) => (
                      <span key={formato} className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                        {formato}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Botones de descarga mejorados */}
                <div className="flex gap-3">
                  <Button
                    onClick={() => handleGenerarPDF(reporte.id)}
                    disabled={isGeneratingPDF || isGeneratingExcel}
                    className="flex-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-lg hover:shadow-xl transition-all group/btn"
                    size="lg"
                  >
                    {isGeneratingPDF ? (
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
                  {reporte.formatos.includes('Excel') && (
                    <Button
                      onClick={() => handleGenerarExcel(reporte.id)}
                      disabled={isGeneratingPDF || isGeneratingExcel}
                      className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-lg hover:shadow-xl transition-all group/btn"
                      size="lg"
                    >
                      {isGeneratingExcel ? (
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
                  )}
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

