import jsPDF from 'jspdf'
import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'
import type { ReporteAgricola } from '@/types/agricultural'
import {
  produccionMensual,
  rendimientoPorHectarea,
  distribucionCultivos,
  eficienciaPorCampo,
  costosOperacionales,
  estadisticasAgricolasMock
} from '@/data/agriculturalMockData'

// Función auxiliar para dibujar gráfico de barras horizontal
const dibujarGraficoBarrasHorizontal = (
  doc: jsPDF,
  datos: { label: string; valor: number; max: number; color: number[] }[],
  x: number,
  y: number,
  ancho: number,
  altoTotal: number
) => {
  const altoBarra = altoTotal / datos.length - 3
  const maxValor = Math.max(...datos.map(d => d.max))
  
  datos.forEach((dato, index) => {
    const yPos = y + index * (altoBarra + 3)
    
    // Etiqueta
    doc.setFontSize(9)
    doc.setTextColor(60, 60, 60)
    doc.text(dato.label, x, yPos + altoBarra / 2 + 2)
    
    // Barra de fondo (gris claro)
    doc.setFillColor(240, 240, 240)
    doc.rect(x + 50, yPos, ancho - 55, altoBarra, 'F')
    
    // Barra de valor (color)
    const anchoBarra = ((dato.valor / maxValor) * (ancho - 55))
    doc.setFillColor(...dato.color)
    doc.rect(x + 50, yPos, anchoBarra, altoBarra, 'F')
    
    // Valor en texto
    doc.setFontSize(8)
    doc.setTextColor(60, 60, 60)
    doc.text(dato.valor.toString(), x + ancho - 5, yPos + altoBarra / 2 + 2, { align: 'right' })
  })
}

// Función auxiliar para dibujar gráfico de barras vertical
const dibujarGraficoBarrasVertical = (
  doc: jsPDF,
  datos: { label: string; valor: number; color: number[] }[],
  x: number,
  y: number,
  ancho: number,
  alto: number
) => {
  const anchoBarra = (ancho / datos.length) - 5
  const maxValor = Math.max(...datos.map(d => d.valor))
  
  datos.forEach((dato, index) => {
    const xPos = x + index * (anchoBarra + 5)
    const alturaBarra = (dato.valor / maxValor) * alto
    
    // Barra
    doc.setFillColor(...dato.color)
    doc.rect(xPos, y + alto - alturaBarra, anchoBarra, alturaBarra, 'F')
    
    // Etiqueta
    doc.setFontSize(7)
    doc.setTextColor(60, 60, 60)
    doc.text(dato.label, xPos + anchoBarra / 2, y + alto + 5, { align: 'center' })
    
    // Valor
    doc.setFontSize(7)
    doc.text(
      dato.valor.toLocaleString(), 
      xPos + anchoBarra / 2, 
      y + alto - alturaBarra - 2, 
      { align: 'center' }
    )
  })
  
  // Eje X
  doc.setDrawColor(200, 200, 200)
  doc.line(x, y + alto, x + ancho, y + alto)
}

// Función auxiliar para dibujar gráfico de líneas simple
const dibujarGraficoLineas = (
  doc: jsPDF,
  datos: { label: string; valor: number; color: number[] }[],
  x: number,
  y: number,
  ancho: number,
  alto: number
) => {
  const maxValor = Math.max(...datos.map(d => d.valor))
  const minValor = Math.min(...datos.map(d => d.valor))
  const rango = maxValor - minValor
  const puntosPorDato = ancho / (datos.length - 1)
  
  // Eje X e Y
  doc.setDrawColor(200, 200, 200)
  doc.line(x, y, x, y + alto) // Eje Y
  doc.line(x, y + alto, x + ancho, y + alto) // Eje X
  
  // Dibujar puntos y líneas
  datos.forEach((dato, index) => {
    const xPos = x + index * puntosPorDato
    const valorNormalizado = rango > 0 ? ((dato.valor - minValor) / rango) : 0.5
    const yPos = y + alto - (valorNormalizado * alto)
    
    // Punto
    doc.setFillColor(...dato.color)
    doc.circle(xPos, yPos, 2, 'F')
    
    // Línea al siguiente punto
    if (index < datos.length - 1) {
      const siguienteDato = datos[index + 1]
      const siguienteX = x + (index + 1) * puntosPorDato
      const siguienteValorNormalizado = rango > 0 ? ((siguienteDato.valor - minValor) / rango) : 0.5
      const siguienteY = y + alto - (siguienteValorNormalizado * alto)
      
      doc.setDrawColor(...dato.color)
      doc.setLineWidth(1.5)
      doc.line(xPos, yPos, siguienteX, siguienteY)
    }
    
    // Etiqueta
    doc.setFontSize(7)
    doc.setTextColor(60, 60, 60)
    doc.text(dato.label, xPos, y + alto + 5, { align: 'center' })
  })
}

// Generar reporte en PDF
export const generarReportePDF = (tipoReporte: string) => {
  const doc = new jsPDF()
  const fechaActual = new Date().toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  // Configuración de colores
  const colorPrimario = [34, 139, 34] // Verde agrícola
  const colorSecundario = [100, 100, 100]

  // Título principal
  doc.setFillColor(...colorPrimario)
  doc.rect(0, 0, 210, 40, 'F')
  
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(22)
  doc.text('Sistema de Gestión Agrícola', 105, 15, { align: 'center' })
  
  doc.setFontSize(16)
  doc.text(`Reporte de ${tipoReporte}`, 105, 25, { align: 'center' })
  
  doc.setFontSize(10)
  doc.text(`Generado: ${fechaActual}`, 105, 33, { align: 'center' })

  // Resetear color de texto
  doc.setTextColor(0, 0, 0)

  let yPos = 50

  if (tipoReporte === 'Productividad') {
    // Estadísticas generales
    doc.setFontSize(14)
    doc.setTextColor(...colorPrimario)
    doc.text('Estadísticas Generales', 20, yPos)
    yPos += 10

    doc.setFontSize(10)
    doc.setTextColor(...colorSecundario)
    doc.text(`Total Producción: ${estadisticasAgricolasMock.totalProduccion.toLocaleString()} kg`, 20, yPos)
    yPos += 7
    doc.text(`Área Total: ${estadisticasAgricolasMock.totalArea.toLocaleString()} hectáreas`, 20, yPos)
    yPos += 7
    doc.text(`Rendimiento Promedio: ${estadisticasAgricolasMock.rendimientoPromedio.toFixed(1)} kg/ha`, 20, yPos)
    yPos += 7
    doc.text(`Campos Activos: ${estadisticasAgricolasMock.camposActivos}`, 20, yPos)
    yPos += 7
    doc.text(`Eficiencia Promedio: ${estadisticasAgricolasMock.eficienciaPromedio}%`, 20, yPos)
    yPos += 15

    // Gráfico: Distribución de Cultivos (Barras Horizontales)
    doc.setFontSize(14)
    doc.setTextColor(...colorPrimario)
    doc.text('Distribución de Cultivos por Área', 20, yPos)
    yPos += 8

    const datosCultivos = distribucionCultivos.map(c => ({
      label: c.nombre,
      valor: c.area,
      max: 60,
      color: c.nombre === 'Café' ? [139, 69, 19] :
             c.nombre === 'Caña de Azúcar' ? [144, 238, 144] :
             c.nombre === 'Maíz' ? [255, 215, 0] : [255, 225, 53]
    }))

    dibujarGraficoBarrasHorizontal(doc, datosCultivos, 20, yPos, 170, 50)
    yPos += 60

    // Gráfico: Producción Mensual (Barras Verticales)
    doc.setFontSize(14)
    doc.setTextColor(...colorPrimario)
    doc.text('Producción Mensual Total (kg)', 20, yPos)
    yPos += 8

    const datosProduccion = produccionMensual.slice(-4).map(item => ({
      label: item.mes,
      valor: item.total,
      color: [34, 139, 34]
    }))

    dibujarGraficoBarrasVertical(doc, datosProduccion, 20, yPos, 170, 45)
    yPos += 60

    // Datos textuales adicionales
    doc.setFontSize(12)
    doc.setTextColor(...colorPrimario)
    doc.text('Producción por Cultivo (Último Mes)', 20, yPos)
    yPos += 8

    doc.setFontSize(10)
    doc.setTextColor(...colorSecundario)
    distribucionCultivos.forEach(cultivo => {
      doc.text(`${cultivo.nombre}: ${cultivo.area} ha - Producción: ${cultivo.produccion.toLocaleString()} kg`, 20, yPos)
      yPos += 6
    })

  } else if (tipoReporte === 'Rendimiento') {
    // Gráfico: Rendimiento por Hectárea (Líneas)
    doc.setFontSize(14)
    doc.setTextColor(...colorPrimario)
    doc.text('Rendimiento por Hectárea (Últimos 6 Meses)', 20, yPos)
    yPos += 8

    const datosRendimiento = rendimientoPorHectarea.map(item => ({
      label: item.mes,
      valor: item.rendimiento,
      color: [16, 185, 129]
    }))

    dibujarGraficoLineas(doc, datosRendimiento, 25, yPos, 160, 40)
    yPos += 55

    // Datos textuales
    doc.setFontSize(12)
    doc.setTextColor(...colorPrimario)
    doc.text('Datos Detallados', 20, yPos)
    yPos += 8

    doc.setFontSize(10)
    doc.setTextColor(...colorSecundario)
    rendimientoPorHectarea.slice(-4).forEach(item => {
      const cumplimiento = ((item.rendimiento / item.objetivo) * 100).toFixed(1)
      doc.text(`${item.mes}: ${item.rendimiento} kg/ha (Objetivo: ${item.objetivo} kg/ha) - ${cumplimiento}%`, 20, yPos)
      yPos += 6
    })
    yPos += 10

    // Gráfico: Eficiencia por Campo (Barras Horizontales)
    doc.setFontSize(14)
    doc.setTextColor(...colorPrimario)
    doc.text('Eficiencia Operacional por Campo', 20, yPos)
    yPos += 8

    const datosEficiencia = eficienciaPorCampo.map(campo => ({
      label: campo.campo.replace('Campo ', ''),
      valor: campo.eficiencia,
      max: 100,
      color: campo.eficiencia >= campo.meta ? [34, 197, 94] : [251, 146, 60]
    }))

    dibujarGraficoBarrasHorizontal(doc, datosEficiencia, 20, yPos, 170, 45)
    yPos += 55

    // Datos textuales de eficiencia
    doc.setFontSize(10)
    doc.setTextColor(...colorSecundario)
    eficienciaPorCampo.forEach(campo => {
      const estado = campo.eficiencia >= campo.meta ? '✓ Cumple meta' : '✗ Requiere mejora'
      doc.text(`${campo.campo}: ${campo.eficiencia}% (Meta: ${campo.meta}%) - ${estado}`, 20, yPos)
      yPos += 6
    })

  } else if (tipoReporte === 'Costos') {
    // Gráfico: Evolución de Costos Totales (Líneas)
    doc.setFontSize(14)
    doc.setTextColor(...colorPrimario)
    doc.text('Evolución de Costos Totales Mensuales (USD)', 20, yPos)
    yPos += 8

    const datosCostos = costosOperacionales.slice(-5).map(item => ({
      label: item.mes,
      valor: item.personal + item.insumos + item.transporte + item.otros,
      color: [251, 146, 60]
    }))

    dibujarGraficoLineas(doc, datosCostos, 25, yPos, 160, 40)
    yPos += 55

    // Gráfico: Desglose del Último Mes (Barras Verticales)
    doc.setFontSize(14)
    doc.setTextColor(...colorPrimario)
    doc.text('Desglose de Costos - Mes Actual', 20, yPos)
    yPos += 8

    const ultimoMes = costosOperacionales[costosOperacionales.length - 1]
    const datosDesglose = [
      { label: 'Personal', valor: ultimoMes.personal, color: [59, 130, 246] },
      { label: 'Insumos', valor: ultimoMes.insumos, color: [34, 197, 94] },
      { label: 'Transport', valor: ultimoMes.transporte, color: [251, 146, 60] },
      { label: 'Otros', valor: ultimoMes.otros, color: [139, 92, 246] }
    ]

    dibujarGraficoBarrasVertical(doc, datosDesglose, 20, yPos, 170, 45)
    yPos += 60

    // Datos textuales detallados
    doc.setFontSize(12)
    doc.setTextColor(...colorPrimario)
    doc.text('Detalle de Últimos 3 Meses', 20, yPos)
    yPos += 8

    doc.setFontSize(10)
    doc.setTextColor(...colorSecundario)
    costosOperacionales.slice(-3).forEach(item => {
      const total = item.personal + item.insumos + item.transporte + item.otros
      doc.text(`${item.mes}: Total $${total.toLocaleString()}`, 20, yPos)
      yPos += 5
      doc.text(`  Personal: $${item.personal.toLocaleString()} | Insumos: $${item.insumos.toLocaleString()}`, 25, yPos)
      yPos += 5
      doc.text(`  Transporte: $${item.transporte.toLocaleString()} | Otros: $${item.otros.toLocaleString()}`, 25, yPos)
      yPos += 8
    })
  }

  // Pie de página
  const pageCount = doc.getNumberOfPages()
  doc.setFontSize(8)
  doc.setTextColor(...colorSecundario)
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i)
    doc.text(`Página ${i} de ${pageCount}`, 105, 285, { align: 'center' })
    doc.text('Sistema de Gestión Agrícola - Confidencial', 105, 290, { align: 'center' })
  }

  // Guardar PDF
  doc.save(`Reporte_${tipoReporte}_${new Date().toISOString().split('T')[0]}.pdf`)
}

// Generar reporte en Excel
export const generarReporteExcel = (tipoReporte: string) => {
  const wb = XLSX.utils.book_new()

  if (tipoReporte === 'Productividad') {
    // Hoja 1: Producción Mensual
    const wsProduccion = XLSX.utils.json_to_sheet(produccionMensual)
    XLSX.utils.book_append_sheet(wb, wsProduccion, 'Producción Mensual')

    // Hoja 2: Distribución de Cultivos
    const wsDistribucion = XLSX.utils.json_to_sheet(distribucionCultivos.map(c => ({
      Cultivo: c.nombre,
      'Área (ha)': c.area,
      'Porcentaje': `${c.porcentaje}%`,
      'Producción (kg)': c.produccion
    })))
    XLSX.utils.book_append_sheet(wb, wsDistribucion, 'Distribución Cultivos')

    // Hoja 3: Estadísticas
    const wsEstadisticas = XLSX.utils.json_to_sheet([
      { Métrica: 'Total Producción (kg)', Valor: estadisticasAgricolasMock.totalProduccion },
      { Métrica: 'Área Total (ha)', Valor: estadisticasAgricolasMock.totalArea },
      { Métrica: 'Rendimiento Promedio (kg/ha)', Valor: estadisticasAgricolasMock.rendimientoPromedio },
      { Métrica: 'Campos Activos', Valor: estadisticasAgricolasMock.camposActivos },
      { Métrica: 'Eficiencia Promedio (%)', Valor: estadisticasAgricolasMock.eficienciaPromedio },
      { Métrica: 'Variación Semanal (%)', Valor: estadisticasAgricolasMock.variacionSemanal },
      { Métrica: 'Variación Mensual (%)', Valor: estadisticasAgricolasMock.variacionMensual }
    ])
    XLSX.utils.book_append_sheet(wb, wsEstadisticas, 'Estadísticas')

  } else if (tipoReporte === 'Rendimiento') {
    // Hoja 1: Rendimiento por Hectárea
    const wsRendimiento = XLSX.utils.json_to_sheet(rendimientoPorHectarea.map(r => ({
      Mes: r.mes,
      'Rendimiento (kg/ha)': r.rendimiento,
      'Objetivo (kg/ha)': r.objetivo,
      'Cumplimiento (%)': ((r.rendimiento / r.objetivo) * 100).toFixed(2)
    })))
    XLSX.utils.book_append_sheet(wb, wsRendimiento, 'Rendimiento')

    // Hoja 2: Eficiencia por Campo
    const wsEficiencia = XLSX.utils.json_to_sheet(eficienciaPorCampo.map(e => ({
      Campo: e.campo,
      'Eficiencia (%)': e.eficiencia,
      'Meta (%)': e.meta,
      Estado: e.eficiencia >= e.meta ? 'Cumple' : 'No cumple'
    })))
    XLSX.utils.book_append_sheet(wb, wsEficiencia, 'Eficiencia Campos')

  } else if (tipoReporte === 'Costos') {
    // Hoja de costos con totales
    const wsCostos = XLSX.utils.json_to_sheet(costosOperacionales.map(c => ({
      Mes: c.mes,
      'Personal (USD)': c.personal,
      'Insumos (USD)': c.insumos,
      'Transporte (USD)': c.transporte,
      'Otros (USD)': c.otros,
      'Total (USD)': c.personal + c.insumos + c.transporte + c.otros
    })))
    XLSX.utils.book_append_sheet(wb, wsCostos, 'Costos Operacionales')
  }

  // Generar archivo Excel
  const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
  const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
  saveAs(data, `Reporte_${tipoReporte}_${new Date().toISOString().split('T')[0]}.xlsx`)
}

// Generar reporte comparativo
export const generarReporteComparativo = () => {
  const doc = new jsPDF()
  const fechaActual = new Date().toLocaleDateString('es-ES')
  const colorPrimario = [34, 139, 34]
  const colorSecundario = [100, 100, 100]

  // Header
  doc.setFillColor(...colorPrimario)
  doc.rect(0, 0, 210, 35, 'F')
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(18)
  doc.text('Reporte Comparativo Integral', 105, 15, { align: 'center' })
  doc.setFontSize(10)
  doc.text(`Sistema de Gestión Agrícola`, 105, 23, { align: 'center' })
  doc.text(`Fecha: ${fechaActual}`, 105, 29, { align: 'center' })

  doc.setTextColor(0, 0, 0)
  let yPos = 45

  // Resumen ejecutivo
  doc.setFontSize(14)
  doc.setTextColor(...colorPrimario)
  doc.text('📊 Resumen Ejecutivo', 20, yPos)
  yPos += 10

  doc.setFontSize(10)
  doc.setTextColor(...colorSecundario)
  doc.text(`• Producción total: ${estadisticasAgricolasMock.totalProduccion.toLocaleString()} kg`, 25, yPos)
  yPos += 6
  doc.text(`• Variación mensual: +${estadisticasAgricolasMock.variacionMensual}%`, 25, yPos)
  yPos += 6
  doc.text(`• Eficiencia promedio: ${estadisticasAgricolasMock.eficienciaPromedio}%`, 25, yPos)
  yPos += 6
  doc.text(`• Campos activos: ${estadisticasAgricolasMock.camposActivos} de 4`, 25, yPos)
  yPos += 15

  // Gráfico: Comparativa de Producción por Cultivo
  doc.setFontSize(14)
  doc.setTextColor(...colorPrimario)
  doc.text('🌾 Producción por Cultivo', 20, yPos)
  yPos += 8

  const datosCultivosComparativo = distribucionCultivos.map(c => ({
    label: c.nombre,
    valor: c.produccion / 1000, // En toneladas
    max: 110,
    color: c.nombre === 'Café' ? [139, 69, 19] :
           c.nombre === 'Caña de Azúcar' ? [144, 238, 144] :
           c.nombre === 'Maíz' ? [255, 215, 0] : [255, 225, 53]
  }))

  dibujarGraficoBarrasHorizontal(doc, datosCultivosComparativo, 20, yPos, 170, 45)
  yPos += 55

  // Cultivo más productivo
  const cultivoMasProductivo = distribucionCultivos.reduce((prev, current) => 
    prev.produccion > current.produccion ? prev : current
  )

  doc.setFontSize(12)
  doc.setTextColor(...colorPrimario)
  doc.text('⭐ Mejor Desempeño', 20, yPos)
  yPos += 8
  doc.setFontSize(10)
  doc.setTextColor(...colorSecundario)
  doc.text(`Cultivo destacado: ${cultivoMasProductivo.nombre} con ${cultivoMasProductivo.produccion.toLocaleString()} kg`, 25, yPos)
  yPos += 6
  doc.text(`Representa el ${cultivoMasProductivo.porcentaje}% del área total cultivada`, 25, yPos)
  yPos += 15

  // Gráfico: Tendencia de Rendimiento
  doc.setFontSize(14)
  doc.setTextColor(...colorPrimario)
  doc.text('📈 Tendencia de Rendimiento (kg/ha)', 20, yPos)
  yPos += 8

  const datosRendimientoComparativo = rendimientoPorHectarea.slice(-5).map(item => ({
    label: item.mes,
    valor: item.rendimiento,
    color: [16, 185, 129]
  }))

  dibujarGraficoLineas(doc, datosRendimientoComparativo, 25, yPos, 160, 35)
  yPos += 50

  // Indicadores clave
  doc.setFontSize(12)
  doc.setTextColor(...colorPrimario)
  doc.text('📊 Indicadores Clave', 20, yPos)
  yPos += 8

  doc.setFontSize(10)
  doc.setTextColor(...colorSecundario)
  const rendimientoActual = rendimientoPorHectarea[rendimientoPorHectarea.length - 1]
  const mejora = rendimientoActual.rendimiento > rendimientoActual.objetivo ? '✓' : '✗'
  doc.text(`${mejora} Rendimiento actual: ${rendimientoActual.rendimiento} kg/ha (Objetivo: ${rendimientoActual.objetivo} kg/ha)`, 25, yPos)
  yPos += 6
  doc.text(`✓ Tasa de crecimiento: +${estadisticasAgricolasMock.variacionMensual}% mensual`, 25, yPos)
  yPos += 6
  doc.text(`✓ Proyección fin de mes: ${estadisticasAgricolasMock.proyeccionRendimiento.toLocaleString()} kg`, 25, yPos)
  yPos += 15

  // Recomendaciones estratégicas
  doc.setFontSize(12)
  doc.setTextColor(...colorPrimario)
  doc.text('💡 Recomendaciones Estratégicas', 20, yPos)
  yPos += 8
  doc.setFontSize(9)
  doc.setTextColor(...colorSecundario)
  doc.text('1. Incrementar frecuencia de riego en Campo Este C para mejorar rendimiento del maíz', 25, yPos, { maxWidth: 160 })
  yPos += 7
  doc.text('2. Activar Campo Oeste D para aumentar producción total y diversificación', 25, yPos, { maxWidth: 160 })
  yPos += 7
  doc.text('3. Optimizar costos de transporte mediante consolidación de rutas y horarios', 25, yPos, { maxWidth: 160 })
  yPos += 7
  doc.text('4. Mantener el nivel de eficiencia actual del cultivo de caña de azúcar', 25, yPos, { maxWidth: 160 })
  yPos += 7
  doc.text('5. Implementar monitoreo continuo de calidad para mantener estándares de excelencia', 25, yPos, { maxWidth: 160 })

  // Pie de página
  doc.setFontSize(8)
  doc.setTextColor(...colorSecundario)
  doc.text('Página 1 de 1', 105, 285, { align: 'center' })
  doc.text('Sistema de Gestión Agrícola - Confidencial', 105, 290, { align: 'center' })

  doc.save(`Reporte_Comparativo_${new Date().toISOString().split('T')[0]}.pdf`)
}

