# Módulo de Reportes Agrícolas

## Descripción

Módulo integral para la generación de reportes del sistema de gestión agrícola. Permite exportar datos en formatos PDF y Excel con información detallada sobre productividad, rendimiento, costos y calidad.

## Estructura

```
reportes/
├── ReportesView.tsx          # Vista principal del módulo
└── README.md                 # Documentación
```

## Funcionalidades

### 1. Reporte de Productividad
- ✅ Producción total por cultivo
- ✅ Distribución de áreas cultivadas
- ✅ Estadísticas generales del sistema
- ✅ Variaciones semanales y mensuales
- ✅ Disponible en PDF y Excel

### 2. Reporte de Rendimiento
- ✅ Rendimiento por hectárea
- ✅ Eficiencia operacional por campo
- ✅ Comparativa con objetivos establecidos
- ✅ Tendencias y proyecciones
- ✅ Disponible en PDF y Excel

### 3. Reporte de Costos Operacionales
- ✅ Desglose de costos por categoría
- ✅ Personal, insumos, transporte y otros
- ✅ Análisis mensual de gastos
- ✅ Totales y subtotales
- ✅ Disponible en PDF y Excel

### 4. Reporte de Calidad
- ✅ Clasificación por niveles de calidad
- ✅ Evolución temporal de estándares
- ✅ Porcentajes de producción por categoría
- ✅ Indicadores de excelencia
- ✅ Disponible en PDF y Excel

### 5. Reporte Comparativo Integral
- ✅ Resumen ejecutivo completo
- ✅ Análisis de mejor desempeño
- ✅ Recomendaciones estratégicas
- ✅ Visión global del sistema
- ✅ Solo disponible en PDF

## Uso

### Acceso al Módulo
1. Navegar a `/dashboard/reportes` desde el menú lateral
2. Seleccionar el tipo de reporte deseado
3. Elegir formato de exportación (PDF o Excel)
4. Descargar el archivo generado

### Formatos de Exportación

#### PDF
- Formato profesional con gráficos
- Ideal para presentaciones e informes
- Incluye cabecera, pie de página y fecha de generación
- No requiere software adicional para visualizar

#### Excel
- Múltiples hojas de cálculo
- Datos estructurados y editables
- Permite análisis adicional
- Compatible con Microsoft Excel, Google Sheets, LibreOffice

## Tecnologías Utilizadas

- **jsPDF**: Generación de archivos PDF con gráficos vectoriales
- **XLSX**: Generación de archivos Excel
- **file-saver**: Descarga de archivos en el navegador
- **React**: Componentes de interfaz
- **Recharts**: Visualización de datos (en dashboard)

## Gráficos en PDFs

Los reportes PDF incluyen **gráficos vectoriales dibujados nativamente** para mejor visualización:

### Tipos de Gráficos Implementados

#### 1. Gráficos de Barras Horizontales
- **Uso**: Comparación de valores entre categorías
- **Reportes**: Productividad (cultivos), Rendimiento (eficiencia)
- **Características**: Barras de fondo grises, valores coloreados, etiquetas claras

#### 2. Gráficos de Barras Verticales
- **Uso**: Evolución temporal o comparación simple
- **Reportes**: Productividad (producción mensual), Costos (desglose)
- **Características**: Valores sobre barras, etiquetas en eje X

#### 3. Gráficos de Líneas
- **Uso**: Tendencias y evolución temporal
- **Reportes**: Rendimiento (evolución), Costos (tendencia), Comparativo
- **Características**: Puntos marcados, líneas conectoras, ejes visibles

### Ventajas de Gráficos Vectoriales
- ✅ Calidad perfecta en cualquier zoom
- ✅ Archivo PDF más ligero
- ✅ No requiere librerías externas
- ✅ Renderizado instantáneo
- ✅ Colores personalizados por cultivo/categoría

## Datos Utilizados

Los reportes utilizan los siguientes conjuntos de datos:
- `produccionMensual`: Últimos 6 meses de producción
- `rendimientoPorHectarea`: Métricas de rendimiento
- `distribucionCultivos`: Área y producción por cultivo
- `eficienciaPorCampo`: Desempeño operacional
- `costosOperacionales`: Gastos mensuales desglosados
- `estadisticasAgricolasMock`: Métricas generales del sistema

## Personalización

### Añadir Nuevo Tipo de Reporte

1. **Agregar datos en `agriculturalMockData.ts`**:
```typescript
export const nuevosDatos = [
  // ... datos
]
```

2. **Crear función de generación en `reportGenerator.ts`**:
```typescript
export const generarNuevoReporte = () => {
  // Lógica de generación
}
```

3. **Añadir al array de reportes en `ReportesView.tsx`**:
```typescript
{
  id: 'nuevo',
  titulo: 'Nuevo Reporte',
  descripcion: 'Descripción del reporte',
  icon: IconComponent,
  // ...
}
```

### Modificar Estilos PDF

En `reportGenerator.ts`, personalizar:
```typescript
const colorPrimario = [34, 139, 34]  // RGB
doc.setFontSize(16)
doc.setTextColor(255, 255, 255)
```

## Recomendaciones

1. **Frecuencia de Generación**: Generar reportes semanalmente para seguimiento continuo
2. **Respaldos**: Guardar reportes importantes en sistema de archivos o nube
3. **Análisis**: Usar formato Excel para análisis avanzado con fórmulas
4. **Presentaciones**: Usar formato PDF para reuniones y documentación oficial

## Mejoras Futuras

- [ ] Filtros por fechas personalizadas
- [ ] Programación de reportes automáticos
- [ ] Envío por correo electrónico
- [ ] Comparativas entre períodos
- [ ] Reportes personalizables por usuario
- [ ] Exportación a otros formatos (CSV, JSON)
- [ ] Gráficos en reportes PDF más avanzados

## Soporte

Para preguntas o problemas con el módulo de reportes, contactar al equipo de desarrollo.

