import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { reportesService, ReporteRequest } from '../services/reportesService'
import { toast } from '@/hooks/use-toast'

export const useReportesQuery = () => {
  const queryClient = useQueryClient()

  const reportesDisponiblesQuery = useQuery({
    queryKey: ['reportes', 'disponibles'],
    queryFn: reportesService.getReportesDisponibles,
  })

  const reportesGeneradosQuery = useQuery({
    queryKey: ['reportes', 'generados'],
    queryFn: reportesService.getReportesGenerados,
  })

  const generarPDFMutation = useMutation({
    mutationFn: (request: ReporteRequest) => reportesService.generarPDF(request),
    onSuccess: async (data) => {
      console.log('Reporte generado:', data)
      // Descargar el archivo automáticamente usando window.open
      try {
        const downloadUrl = `http://localhost:5000${data.url}`
        console.log('URL de descarga:', downloadUrl)
        
        // Crear un enlace temporal para descargar
        const link = document.createElement('a')
        link.href = downloadUrl
        link.download = data.filename
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        
        toast({
          title: '✅ Reporte generado',
          description: `El reporte PDF se ha descargado correctamente: ${data.filename}`,
        })
        
        // Refrescar la lista de reportes generados
        queryClient.invalidateQueries({ queryKey: ['reportes', 'generados'] })
      } catch (error) {
        console.error('Error descargando reporte:', error)
        toast({
          title: '⚠️ Reporte generado',
          description: `El reporte se generó pero hubo un problema al descargarlo. Puedes descargarlo desde la lista de reportes.`,
        })
      }
    },
    onError: (error: any) => {
      toast({
        title: '❌ Error',
        description: error?.response?.data?.message || 'No se pudo generar el reporte PDF',
        variant: 'destructive',
      })
    },
  })

  const generarExcelMutation = useMutation({
    mutationFn: (request: Omit<ReporteRequest, 'tipoReporte'> & { tipoReporte: Exclude<ReporteRequest['tipoReporte'], 'Comparativo'> }) =>
      reportesService.generarExcel(request),
    onSuccess: async (data) => {
      // Descargar el archivo automáticamente usando window.open
      try {
        const downloadUrl = `http://localhost:5000${data.url}`
        console.log('URL de descarga Excel:', downloadUrl)
        
        // Crear un enlace temporal para descargar
        const link = document.createElement('a')
        link.href = downloadUrl
        link.download = data.filename
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        
        toast({
          title: '✅ Reporte generado',
          description: `El reporte Excel se ha descargado correctamente: ${data.filename}`,
        })
        
        // Refrescar la lista de reportes generados
        queryClient.invalidateQueries({ queryKey: ['reportes', 'generados'] })
      } catch (error) {
        console.error('Error descargando reporte Excel:', error)
        toast({
          title: '⚠️ Reporte generado',
          description: `El reporte se generó pero hubo un problema al descargarlo. Puedes descargarlo desde la lista de reportes.`,
        })
      }
    },
    onError: (error: any) => {
      toast({
        title: '❌ Error',
        description: error?.response?.data?.message || 'No se pudo generar el reporte Excel',
        variant: 'destructive',
      })
    },
  })

  const descargarReporteMutation = useMutation({
    mutationFn: (filename: string) => {
      const downloadUrl = `http://localhost:5000/uploads/reportes/${filename}`
      const link = document.createElement('a')
      link.href = downloadUrl
      link.download = filename
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      return Promise.resolve()
    },
    onSuccess: (_, filename) => {
      toast({
        title: '✅ Descarga iniciada',
        description: `El archivo ${filename} se está descargando`,
      })
    },
    onError: () => {
      toast({
        title: '❌ Error',
        description: 'No se pudo descargar el archivo',
        variant: 'destructive',
      })
    },
  })

  const eliminarReporteMutation = useMutation({
    mutationFn: reportesService.eliminarReporte,
    onSuccess: () => {
      toast({
        title: '✅ Reporte eliminado',
        description: 'El reporte se ha eliminado correctamente',
      })
      // Refrescar la lista de reportes generados
      queryClient.invalidateQueries({ queryKey: ['reportes', 'generados'] })
    },
    onError: () => {
      toast({
        title: '❌ Error',
        description: 'No se pudo eliminar el reporte',
        variant: 'destructive',
      })
    },
  })

  return {
    // Datos
    reportesDisponibles: reportesDisponiblesQuery.data,
    reportesGenerados: reportesGeneradosQuery.data,
    
    // Estados de carga
    isLoadingDisponibles: reportesDisponiblesQuery.isLoading,
    isLoadingGenerados: reportesGeneradosQuery.isLoading,
    
    // Mutaciones
    generarPDF: generarPDFMutation.mutate,
    isGeneratingPDF: generarPDFMutation.isPending,
    
    generarExcel: generarExcelMutation.mutate,
    isGeneratingExcel: generarExcelMutation.isPending,
    
    descargarReporte: descargarReporteMutation.mutate,
    isDescargando: descargarReporteMutation.isPending,
    
    eliminarReporte: eliminarReporteMutation.mutate,
    isEliminando: eliminarReporteMutation.isPending,
    
    // Refetch
    refetchGenerados: reportesGeneradosQuery.refetch,
  }
}

