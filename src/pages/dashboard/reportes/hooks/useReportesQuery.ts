import { useMutation, useQuery } from '@tanstack/react-query'
import { reportesService, ReporteRequest } from '../services/reportesService'
import { toast } from '@/hooks/use-toast'

export const useReportesQuery = () => {
  const reportesDisponiblesQuery = useQuery({
    queryKey: ['reportes', 'disponibles'],
    queryFn: reportesService.getReportesDisponibles,
  })

  const generarPDFMutation = useMutation({
    mutationFn: (tipoReporte: ReporteRequest['tipoReporte']) =>
      reportesService.generarPDF(tipoReporte),
    onSuccess: (data) => {
      toast({
        title: 'Reporte generado',
        description: `El reporte PDF se ha generado correctamente: ${data.filename}`,
      })
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error?.response?.data?.message || 'No se pudo generar el reporte PDF',
        variant: 'destructive',
      })
    },
  })

  const generarExcelMutation = useMutation({
    mutationFn: (tipoReporte: Exclude<ReporteRequest['tipoReporte'], 'Comparativo'>) =>
      reportesService.generarExcel(tipoReporte),
    onSuccess: (data) => {
      toast({
        title: 'Reporte generado',
        description: `El reporte Excel se ha generado correctamente: ${data.filename}`,
      })
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error?.response?.data?.message || 'No se pudo generar el reporte Excel',
        variant: 'destructive',
      })
    },
  })

  return {
    reportesDisponibles: reportesDisponiblesQuery.data,
    isLoadingDisponibles: reportesDisponiblesQuery.isLoading,
    
    generarPDF: generarPDFMutation.mutate,
    isGeneratingPDF: generarPDFMutation.isPending,
    
    generarExcel: generarExcelMutation.mutate,
    isGeneratingExcel: generarExcelMutation.isPending,
  }
}

