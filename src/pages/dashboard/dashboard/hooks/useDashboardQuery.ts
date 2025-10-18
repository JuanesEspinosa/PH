import { useQuery } from '@tanstack/react-query'
import { dashboardService, DashboardFilters } from '../services/dashboardService'

export const useDashboardQuery = (filters?: DashboardFilters) => {
  // Query principal que obtiene todos los datos de una vez (más eficiente)
  const dashboardQuery = useQuery({
    queryKey: ['dashboard', 'completo', filters],
    queryFn: () => dashboardService.getDashboardCompleto(filters),
    refetchInterval: 5 * 60 * 1000, // Refrescar cada 5 minutos
    staleTime: 2 * 60 * 1000, // Los datos son válidos por 2 minutos
    retry: 3, // Reintentar 3 veces en caso de error
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000), // Backoff exponencial
  })

  // Queries individuales para casos específicos (opcional)
  const estadisticasQuery = useQuery({
    queryKey: ['dashboard', 'estadisticas', filters],
    queryFn: () => dashboardService.getEstadisticas(filters),
    refetchInterval: 5 * 60 * 1000,
    enabled: false, // Deshabilitado por defecto, usar dashboardQuery
  })

  const produccionMensualQuery = useQuery({
    queryKey: ['dashboard', 'produccion-mensual', filters],
    queryFn: () => dashboardService.getProduccionMensual(filters),
    refetchInterval: 5 * 60 * 1000,
    enabled: false,
  })

  const rendimientoHectareaQuery = useQuery({
    queryKey: ['dashboard', 'rendimiento-hectarea', filters],
    queryFn: () => dashboardService.getRendimientoHectarea(filters),
    refetchInterval: 5 * 60 * 1000,
    enabled: false,
  })

  const distribucionCultivosQuery = useQuery({
    queryKey: ['dashboard', 'distribucion-cultivos', filters],
    queryFn: () => dashboardService.getDistribucionCultivos(filters),
    refetchInterval: 5 * 60 * 1000,
    enabled: false,
  })

  const eficienciaCamposQuery = useQuery({
    queryKey: ['dashboard', 'eficiencia-campos', filters],
    queryFn: () => dashboardService.getEficienciaCampos(filters),
    refetchInterval: 5 * 60 * 1000,
    enabled: false,
  })

  const laboresDiariasQuery = useQuery({
    queryKey: ['dashboard', 'labores-diarias', filters],
    queryFn: () => dashboardService.getLaboresDiarias(filters),
    refetchInterval: 5 * 60 * 1000,
    enabled: false,
  })

  const calidadProduccionQuery = useQuery({
    queryKey: ['dashboard', 'calidad-produccion', filters],
    queryFn: () => dashboardService.getCalidadProduccion(filters),
    refetchInterval: 5 * 60 * 1000,
    enabled: false,
  })

  // Nuevas queries para gráficas adicionales
  const actividadesPlanificadasQuery = useQuery({
    queryKey: ['dashboard', 'actividades-planificadas', filters],
    queryFn: () => dashboardService.getActividadesPlanificadas(filters),
    refetchInterval: 5 * 60 * 1000,
    enabled: false,
  })

  const trabajadoresPorCargoQuery = useQuery({
    queryKey: ['dashboard', 'trabajadores-por-cargo', filters],
    queryFn: () => dashboardService.getTrabajadoresPorCargo(filters),
    refetchInterval: 5 * 60 * 1000,
    enabled: false,
  })

  const tiposLaborFrecuentesQuery = useQuery({
    queryKey: ['dashboard', 'tipos-labor-frecuentes', filters],
    queryFn: () => dashboardService.getTiposLaborFrecuentes(filters),
    refetchInterval: 5 * 60 * 1000,
    enabled: false,
  })

  const estadoLotesQuery = useQuery({
    queryKey: ['dashboard', 'estado-lotes', filters],
    queryFn: () => dashboardService.getEstadoLotes(filters),
    refetchInterval: 5 * 60 * 1000,
    enabled: false,
  })

  const rendimientoPorTrabajadorQuery = useQuery({
    queryKey: ['dashboard', 'rendimiento-por-trabajador', filters],
    queryFn: () => dashboardService.getRendimientoPorTrabajador(filters),
    refetchInterval: 5 * 60 * 1000,
    enabled: false,
  })

  const costosPorActividadQuery = useQuery({
    queryKey: ['dashboard', 'costos-por-actividad', filters],
    queryFn: () => dashboardService.getCostosPorActividad(filters),
    refetchInterval: 5 * 60 * 1000,
    enabled: false,
  })

  // Usar datos del query principal o individuales
  const data = dashboardQuery.data

  return {
    // Datos del dashboard
    estadisticas: data?.estadisticas || estadisticasQuery.data,
    produccionMensual: data?.produccionMensual || produccionMensualQuery.data,
    rendimientoHectarea: data?.rendimientoHectarea || rendimientoHectareaQuery.data,
    distribucionCultivos: data?.distribucionCultivos || distribucionCultivosQuery.data,
    eficienciaCampos: data?.eficienciaCampos || eficienciaCamposQuery.data,
    laboresDiarias: data?.laboresDiarias || laboresDiariasQuery.data,
    calidadProduccion: data?.calidadProduccion || calidadProduccionQuery.data,
    // Nuevas gráficas
    actividadesPlanificadas: data?.actividadesPlanificadas || actividadesPlanificadasQuery.data,
    trabajadoresPorCargo: data?.trabajadoresPorCargo || trabajadoresPorCargoQuery.data,
    tiposLaborFrecuentes: data?.tiposLaborFrecuentes || tiposLaborFrecuentesQuery.data,
    estadoLotes: data?.estadoLotes || estadoLotesQuery.data,
    rendimientoPorTrabajador: data?.rendimientoPorTrabajador || rendimientoPorTrabajadorQuery.data,
    costosPorActividad: data?.costosPorActividad || costosPorActividadQuery.data,
    
    // Estados de carga
    isLoading: dashboardQuery.isLoading || (
      estadisticasQuery.isLoading ||
      produccionMensualQuery.isLoading ||
      rendimientoHectareaQuery.isLoading ||
      distribucionCultivosQuery.isLoading ||
      eficienciaCamposQuery.isLoading ||
      laboresDiariasQuery.isLoading ||
      calidadProduccionQuery.isLoading ||
      actividadesPlanificadasQuery.isLoading ||
      trabajadoresPorCargoQuery.isLoading ||
      tiposLaborFrecuentesQuery.isLoading ||
      estadoLotesQuery.isLoading ||
      rendimientoPorTrabajadorQuery.isLoading ||
      costosPorActividadQuery.isLoading
    ),
      
    // Estados de error
    isError: dashboardQuery.isError || (
      estadisticasQuery.isError ||
      produccionMensualQuery.isError ||
      rendimientoHectareaQuery.isError ||
      distribucionCultivosQuery.isError ||
      eficienciaCamposQuery.isError ||
      laboresDiariasQuery.isError ||
      calidadProduccionQuery.isError ||
      actividadesPlanificadasQuery.isError ||
      trabajadoresPorCargoQuery.isError ||
      tiposLaborFrecuentesQuery.isError ||
      estadoLotesQuery.isError ||
      rendimientoPorTrabajadorQuery.isError ||
      costosPorActividadQuery.isError
    ),
      
    // Errores
    error: dashboardQuery.error || (
      estadisticasQuery.error ||
      produccionMensualQuery.error ||
      rendimientoHectareaQuery.error ||
      distribucionCultivosQuery.error ||
      eficienciaCamposQuery.error ||
      laboresDiariasQuery.error ||
      calidadProduccionQuery.error ||
      actividadesPlanificadasQuery.error ||
      trabajadoresPorCargoQuery.error ||
      tiposLaborFrecuentesQuery.error ||
      estadoLotesQuery.error ||
      rendimientoPorTrabajadorQuery.error ||
      costosPorActividadQuery.error
    ),

    // Métodos para refetch individual
    refetchEstadisticas: estadisticasQuery.refetch,
    refetchProduccionMensual: produccionMensualQuery.refetch,
    refetchRendimientoHectarea: rendimientoHectareaQuery.refetch,
    refetchDistribucionCultivos: distribucionCultivosQuery.refetch,
    refetchEficienciaCampos: eficienciaCamposQuery.refetch,
    refetchLaboresDiarias: laboresDiariasQuery.refetch,
    refetchCalidadProduccion: calidadProduccionQuery.refetch,
    refetchActividadesPlanificadas: actividadesPlanificadasQuery.refetch,
    refetchTrabajadoresPorCargo: trabajadoresPorCargoQuery.refetch,
    refetchTiposLaborFrecuentes: tiposLaborFrecuentesQuery.refetch,
    refetchEstadoLotes: estadoLotesQuery.refetch,
    refetchRendimientoPorTrabajador: rendimientoPorTrabajadorQuery.refetch,
    refetchCostosPorActividad: costosPorActividadQuery.refetch,
    refetchAll: dashboardQuery.refetch,
  }
}

