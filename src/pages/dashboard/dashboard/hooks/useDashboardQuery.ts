import { useQuery } from '@tanstack/react-query'
import { dashboardService } from '../services/dashboardService'

export const useDashboardQuery = () => {
  const estadisticasQuery = useQuery({
    queryKey: ['dashboard', 'estadisticas'],
    queryFn: dashboardService.getEstadisticas,
    refetchInterval: 5 * 60 * 1000, // Refrescar cada 5 minutos
  })

  const produccionMensualQuery = useQuery({
    queryKey: ['dashboard', 'produccion-mensual'],
    queryFn: dashboardService.getProduccionMensual,
    refetchInterval: 5 * 60 * 1000,
  })

  const rendimientoHectareaQuery = useQuery({
    queryKey: ['dashboard', 'rendimiento-hectarea'],
    queryFn: dashboardService.getRendimientoHectarea,
    refetchInterval: 5 * 60 * 1000,
  })

  const distribucionCultivosQuery = useQuery({
    queryKey: ['dashboard', 'distribucion-cultivos'],
    queryFn: dashboardService.getDistribucionCultivos,
    refetchInterval: 5 * 60 * 1000,
  })

  const eficienciaCamposQuery = useQuery({
    queryKey: ['dashboard', 'eficiencia-campos'],
    queryFn: dashboardService.getEficienciaCampos,
    refetchInterval: 5 * 60 * 1000,
  })

  const laboresDiariasQuery = useQuery({
    queryKey: ['dashboard', 'labores-diarias'],
    queryFn: dashboardService.getLaboresDiarias,
    refetchInterval: 5 * 60 * 1000,
  })

  const calidadProduccionQuery = useQuery({
    queryKey: ['dashboard', 'calidad-produccion'],
    queryFn: dashboardService.getCalidadProduccion,
    refetchInterval: 5 * 60 * 1000,
  })

  return {
    estadisticas: estadisticasQuery.data,
    produccionMensual: produccionMensualQuery.data,
    rendimientoHectarea: rendimientoHectareaQuery.data,
    distribucionCultivos: distribucionCultivosQuery.data,
    eficienciaCampos: eficienciaCamposQuery.data,
    laboresDiarias: laboresDiariasQuery.data,
    calidadProduccion: calidadProduccionQuery.data,
    
    isLoading: 
      estadisticasQuery.isLoading ||
      produccionMensualQuery.isLoading ||
      rendimientoHectareaQuery.isLoading ||
      distribucionCultivosQuery.isLoading ||
      eficienciaCamposQuery.isLoading ||
      laboresDiariasQuery.isLoading ||
      calidadProduccionQuery.isLoading,
      
    isError:
      estadisticasQuery.isError ||
      produccionMensualQuery.isError ||
      rendimientoHectareaQuery.isError ||
      distribucionCultivosQuery.isError ||
      eficienciaCamposQuery.isError ||
      laboresDiariasQuery.isError ||
      calidadProduccionQuery.isError,
      
    error:
      estadisticasQuery.error ||
      produccionMensualQuery.error ||
      rendimientoHectareaQuery.error ||
      distribucionCultivosQuery.error ||
      eficienciaCamposQuery.error ||
      laboresDiariasQuery.error ||
      calidadProduccionQuery.error,
  }
}

