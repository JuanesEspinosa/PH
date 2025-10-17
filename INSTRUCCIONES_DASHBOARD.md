# 📋 Instrucciones de Uso - Dashboard Agrícola y Reportes

## 🚀 Inicio Rápido

### 1. Iniciar el Proyecto
```bash
npm run dev
```

### 2. Acceder a la Plataforma
1. Abrir navegador en `http://localhost:5173`
2. Iniciar sesión con tus credenciales
3. Serás redirigido al dashboard

## 🎯 Funcionalidades Principales

### Dashboard Agrícola
**Ruta**: `/dashboard`

El dashboard muestra:
- ✅ **4 métricas principales** en tarjetas superiores
- ✅ **6 gráficos interactivos** con datos en tiempo real
- ✅ **Información actualizada** automáticamente

#### Gráficos Disponibles:
1. **Producción Mensual** - Área chart con últimos 6 meses
2. **Rendimiento por Hectárea** - Line chart con objetivos
3. **Distribución de Cultivos** - Pie chart con porcentajes
4. **Labores Diarias** - Bar chart de última semana
5. **Calidad de Producción** - Stacked area chart
6. **Eficiencia por Campo** - Horizontal bar chart

### Módulo de Reportes
**Ruta**: `/dashboard/reportes`

#### Tipos de Reportes:

##### 1️⃣ Reporte de Productividad
Incluye:
- Producción total por cultivo
- Distribución de áreas
- Estadísticas generales
- Variaciones temporales

**Botones:**
- 🔴 **Descargar PDF** - Formato profesional con gráficos
- 🟢 **Descargar Excel** - Datos editables en 3 hojas

##### 2️⃣ Reporte de Rendimiento
Incluye:
- Rendimiento kg/ha por mes
- Eficiencia por campo
- Cumplimiento de objetivos
- Tendencias

**Botones:**
- 🔴 **Descargar PDF**
- 🟢 **Descargar Excel**

##### 3️⃣ Reporte de Costos
Incluye:
- Desglose mensual de costos
- Categorías: Personal, Insumos, Transporte, Otros
- Totales y subtotales
- Evolución temporal

**Botones:**
- 🔴 **Descargar PDF**
- 🟢 **Descargar Excel**

##### 4️⃣ Reporte de Calidad
Incluye:
- Clasificación por niveles
- Evolución de calidad
- Porcentajes de producción
- Indicadores

**Botones:**
- 🔴 **Descargar PDF**
- 🟢 **Descargar Excel**

##### 5️⃣ Reporte Comparativo Integral ⭐
Reporte especial con:
- Resumen ejecutivo completo
- Mejor desempeño identificado
- Recomendaciones estratégicas

**Botón:**
- 🔴 **Descargar PDF** (único formato disponible)

## 📖 Guía Paso a Paso

### Generar un Reporte

1. **Acceder al módulo**
   - Click en "Reportes" en el menú lateral izquierdo
   - Verás 4 tarjetas de reportes + 1 reporte especial

2. **Seleccionar tipo de reporte**
   - Lee la descripción de cada reporte
   - Revisa las métricas incluidas

3. **Elegir formato**
   - **PDF**: Para presentaciones e impresión
   - **Excel**: Para análisis y manipulación de datos

4. **Descargar**
   - Click en el botón correspondiente
   - Espera el mensaje de confirmación ✅
   - El archivo se descargará automáticamente

5. **Ubicación del archivo**
   - Los archivos se descargan en tu carpeta de Descargas
   - Formato de nombre: `Reporte_[Tipo]_[Fecha].pdf/xlsx`
   - Ejemplo: `Reporte_Productividad_2024-10-17.pdf`

### Interpretar el Dashboard

#### Tarjetas de Métricas Superiores
- **Valor grande**: Métrica actual
- **Porcentaje verde**: Variación positiva
- **Texto pequeño**: Período de referencia

#### Gráficos Interactivos
- **Hover**: Pasa el mouse sobre elementos para ver detalles
- **Leyenda**: Click para mostrar/ocultar series
- **Colores**: Cada cultivo/métrica tiene color único

## 💡 Consejos de Uso

### Para Gerentes
✅ Revisa el dashboard diariamente al inicio del día  
✅ Genera el reporte comparativo semanalmente  
✅ Comparte PDFs en reuniones  

### Para Analistas
✅ Descarga reportes en Excel para análisis profundo  
✅ Crea gráficos personalizados desde los datos  
✅ Compara períodos con datos históricos  

### Para Operadores
✅ Monitorea eficiencia por campo  
✅ Identifica áreas que necesitan atención  
✅ Verifica cumplimiento de objetivos  

## 🎨 Interfaz de Usuario

### Navegación
```
┌─────────────────────────────────────┐
│  BackOffice        [Avatar] ▼       │
├─────────────────────────────────────┤
│ 📊 Dashboard                        │
│ 📄 Reportes                         │
│ 👥 Usuarios                         │
└─────────────────────────────────────┘
```

### Colores del Sistema
- 🟢 Verde: Agricultura, positivo, éxito
- 🔵 Azul: Información, agua, riego
- 🟠 Naranja: Advertencia, costos
- 🟣 Morado: Transporte, logística
- 🟡 Amarillo: Cultivos específicos (maíz, plátano)
- 🟤 Café: Cultivo de café

## 📊 Entendiendo los Datos

### Métricas Clave

**Producción Total** (toneladas)
- Total de kilogramos cosechados
- Incluye todos los cultivos activos
- Se actualiza mensualmente

**Rendimiento Promedio** (kg/ha)
- Producción dividida por área
- Métrica de eficiencia principal
- Objetivo: >140 kg/ha

**Campos Activos**
- Número de campos en producción
- Total de cultivos diferentes
- Estado actual del sistema

**Eficiencia** (%)
- Promedio de eficiencia operacional
- Basado en múltiples factores
- Objetivo: >85%

### Interpretando Gráficos

#### Producción Mensual
- **Subida**: Mejora en producción ✅
- **Bajada**: Reducción (investigar causa) ⚠️
- **Estable**: Producción consistente 📊

#### Rendimiento vs Objetivo
- **Por encima**: Cumpliendo meta ✅
- **Por debajo**: Requiere mejoras ⚠️
- **En línea**: Desempeño esperado 📈

#### Distribución de Cultivos
- **Porcentaje grande**: Cultivo dominante
- **Equilibrado**: Buena diversificación
- **Desbalanceado**: Considerar ajustes

## 🔧 Solución de Problemas

### El reporte no se descarga
1. Verifica que no haya bloqueador de popups
2. Revisa tu carpeta de Descargas
3. Intenta con otro navegador
4. Verifica espacio en disco

### Los gráficos no se ven
1. Refresca la página (F5)
2. Limpia caché del navegador
3. Verifica conexión a internet
4. Intenta con otro navegador

### Datos no actualizados
1. Cierra sesión y vuelve a entrar
2. Limpia caché del navegador
3. Contacta a soporte técnico

## 📱 Acceso Móvil

El dashboard es responsive y funciona en:
- ✅ Smartphones (iOS/Android)
- ✅ Tablets
- ✅ Laptops
- ✅ Monitores grandes

### Recomendaciones Móviles
- Usar modo horizontal para gráficos grandes
- Los reportes se descargan normalmente
- Navegar con menú hamburguesa (≡)

## 🔐 Seguridad y Privacidad

- ✅ Todos los datos son confidenciales
- ✅ Reportes incluyen marca de confidencialidad
- ✅ Sesión expira por inactividad
- ✅ No compartir archivos fuera de la organización

## 📞 Soporte

Si necesitas ayuda:
1. Revisa esta documentación
2. Lee el README del módulo de reportes
3. Contacta al equipo de desarrollo
4. Reporta bugs en el sistema

## 🎯 Mejores Prácticas

### Frecuencia de Reportes
- **Diario**: Revisar dashboard
- **Semanal**: Reporte de productividad
- **Quincenal**: Reporte de rendimiento
- **Mensual**: Todos los reportes + comparativo

### Almacenamiento
- Crear carpeta por mes: `Reportes_2024_10`
- Nombrar con fecha: `Productividad_2024-10-17`
- Respaldar en la nube
- No duplicar innecesariamente

### Análisis
- Comparar mes actual vs anterior
- Identificar tendencias a largo plazo
- Buscar patrones estacionales
- Documentar decisiones tomadas

## ✨ Características Especiales

### Notificaciones Toast
Cuando generas un reporte, verás:
- ✅ **Verde**: Reporte generado exitosamente
- ❌ **Rojo**: Error en la generación

### Estados de Carga
Los botones muestran:
- 🔄 **Animación**: Generando reporte
- ✓ **Normal**: Listo para usar

### Tooltips
Pasa el mouse sobre gráficos para ver:
- Valores exactos
- Fechas específicas
- Categorías detalladas

## 📈 Métricas de Negocio

### KPIs Principales
1. **Producción**: Objetivo +10% mensual
2. **Rendimiento**: >140 kg/ha
3. **Eficiencia**: >85%
4. **Calidad**: >60% excelente

### Alertas
Prestar atención si:
- ⚠️ Rendimiento <120 kg/ha
- ⚠️ Eficiencia <80%
- ⚠️ Producción baja 2 meses consecutivos
- ⚠️ Costos suben >10%

## 🎓 Glosario

- **ha**: Hectárea (10,000 m²)
- **kg/ha**: Kilogramos por hectárea (rendimiento)
- **Eficiencia**: % de cumplimiento operacional
- **Campo**: Área de cultivo específica
- **Labor**: Actividad agrícola (cosecha, riego, etc.)

---

**¡Estás listo para usar el sistema!** 🚀

Si tienes dudas, consulta la documentación técnica o contacta al equipo de soporte.

