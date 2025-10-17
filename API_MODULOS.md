# 📚 Documentación API - Módulos del Sistema

## Índice
1. [Dashboard](#dashboard)
2. [Reportes](#reportes)
3. [Roles](#roles)

---

## 📊 Dashboard

### Descripción
Módulo principal que muestra métricas agrícolas, gráficos de rendimiento y estadísticas en tiempo real del sistema de gestión agrícola.

### Endpoints

#### GET `/api/dashboard/estadisticas`
Obtiene las estadísticas generales del sistema agrícola.

**Response:**
```json
{
  "totalProduccion": 25150,
  "totalArea": 177.5,
  "rendimientoPromedio": 141.7,
  "variacionSemanal": 8.5,
  "variacionMensual": 15.3,
  "proyeccionRendimiento": 32000,
  "camposActivos": 3,
  "cultivosEnProceso": 4,
  "eficienciaPromedio": 87.5
}
```

#### GET `/api/dashboard/produccion-mensual`
Obtiene datos de producción de los últimos 6 meses.

**Response:**
```json
[
  {
    "mes": "Oct",
    "cafe": 28200,
    "cana": 102000,
    "maiz": 27500,
    "platano": 24000,
    "total": 181700
  }
]
```

#### GET `/api/dashboard/rendimiento-hectarea`
Obtiene el rendimiento por hectárea histórico.

**Response:**
```json
[
  {
    "mes": "Oct",
    "rendimiento": 151.2,
    "objetivo": 150
  }
]
```

#### GET `/api/dashboard/distribucion-cultivos`
Obtiene la distribución de cultivos por área.

**Response:**
```json
[
  {
    "nombre": "Café",
    "area": 45.5,
    "porcentaje": 25.6,
    "produccion": 28200,
    "color": "#8B4513"
  }
]
```

#### GET `/api/dashboard/eficiencia-campos`
Obtiene la eficiencia operacional por campo.

**Response:**
```json
[
  {
    "campo": "Campo Norte A",
    "eficiencia": 92,
    "meta": 90
  }
]
```

#### GET `/api/dashboard/labores-diarias`
Obtiene las labores realizadas en la última semana.

**Response:**
```json
[
  {
    "dia": "Lun",
    "cosecha": 8,
    "riego": 4,
    "fertilizacion": 2,
    "transporte": 5
  }
]
```

#### GET `/api/dashboard/calidad-produccion`
Obtiene la evolución de calidad de producción.

**Response:**
```json
[
  {
    "mes": "Oct",
    "excelente": 62,
    "buena": 30,
    "regular": 7,
    "mala": 1
  }
]
```

### Tipos de Datos

```typescript
interface EstadisticaAgricola {
  totalProduccion: number          // kg
  totalArea: number                 // hectáreas
  rendimientoPromedio: number      // kg/ha
  variacionSemanal: number         // porcentaje
  variacionMensual: number         // porcentaje
  proyeccionRendimiento: number    // kg
  camposActivos: number
  cultivosEnProceso: number
  eficienciaPromedio: number       // porcentaje
}

interface ProduccionMensual {
  mes: string
  cafe: number
  cana: number
  maiz: number
  platano: number
  total: number
}

interface RendimientoPorHectarea {
  mes: string
  rendimiento: number   // kg/ha
  objetivo: number      // kg/ha
}

interface DistribucionCultivo {
  nombre: string
  area: number          // hectáreas
  porcentaje: number    // %
  produccion: number    // kg
  color: string         // hex color
}

interface EficienciaCampo {
  campo: string
  eficiencia: number    // porcentaje
  meta: number          // porcentaje
}
```

---

## 📄 Reportes

### Descripción
Módulo de generación de reportes en formatos PDF y Excel con datos agrícolas y gráficos vectoriales.

### Tipos de Reportes

#### 1. Reporte de Productividad
**Contenido:**
- Estadísticas generales completas
- Gráfico de distribución de cultivos (barras horizontales)
- Gráfico de producción mensual (barras verticales)
- Desglose detallado por cultivo

**Datos de Entrada:**
```typescript
{
  tipoReporte: "Productividad"
}
```

**Datos Incluidos:**
```json
{
  "estadisticas": {
    "totalProduccion": 25150,
    "areaTotal": 177.5,
    "rendimientoPromedio": 141.7,
    "camposActivos": 3,
    "eficienciaPromedio": 87.5
  },
  "cultivosDistribucion": [
    {
      "nombre": "Café",
      "area": 45.5,
      "produccion": 28200
    }
  ],
  "produccionMensual": [
    {
      "mes": "Oct",
      "total": 181700
    }
  ]
}
```

#### 2. Reporte de Rendimiento
**Contenido:**
- Gráfico de líneas de rendimiento por hectárea
- Datos detallados de cumplimiento de objetivos
- Gráfico de eficiencia por campo (barras horizontales)
- Estado de cumplimiento de metas

**Datos de Entrada:**
```typescript
{
  tipoReporte: "Rendimiento"
}
```

**Datos Incluidos:**
```json
{
  "rendimientoHistorico": [
    {
      "mes": "Oct",
      "rendimiento": 151.2,
      "objetivo": 150,
      "cumplimiento": 100.8
    }
  ],
  "eficienciaCampos": [
    {
      "campo": "Campo Norte A",
      "eficiencia": 92,
      "meta": 90,
      "cumple": true
    }
  ]
}
```

#### 3. Reporte de Costos
**Contenido:**
- Gráfico de líneas de evolución de costos totales
- Gráfico de barras de desglose del mes actual
- Detalle de últimos 3 meses con categorías
- Análisis de tendencias

**Datos de Entrada:**
```typescript
{
  tipoReporte: "Costos"
}
```

**Datos Incluidos:**
```json
{
  "costosHistoricos": [
    {
      "mes": "Oct",
      "personal": 50000,
      "insumos": 33000,
      "transporte": 15000,
      "otros": 9200,
      "total": 107200
    }
  ]
}
```

#### 4. Reporte Comparativo Integral
**Contenido:**
- Resumen ejecutivo
- Gráfico de producción por cultivo
- Identificación de mejor desempeño
- Gráfico de tendencia de rendimiento
- Indicadores clave
- Recomendaciones estratégicas (5)

**Datos de Entrada:**
```typescript
{
  tipoReporte: "Comparativo"
}
```

**Datos Incluidos:**
```json
{
  "resumenEjecutivo": {
    "produccionTotal": 25150,
    "variacionMensual": 15.3,
    "eficienciaPromedio": 87.5,
    "camposActivos": 3
  },
  "mejorDesempeño": {
    "cultivo": "Caña de Azúcar",
    "produccion": 102000,
    "porcentaje": 21.5
  },
  "indicadores": {
    "rendimientoActual": 151.2,
    "objetivo": 150,
    "cumpleObjetivo": true,
    "tasaCrecimiento": 15.3,
    "proyeccion": 32000
  },
  "recomendaciones": [
    "Incrementar riego en Campo Este C...",
    "Activar Campo Oeste D...",
    "Optimizar costos de transporte...",
    "Mantener eficiencia de caña...",
    "Implementar monitoreo continuo..."
  ]
}
```

### Endpoints de Generación

#### POST `/api/reportes/generar-pdf`
Genera un reporte en formato PDF.

**Request:**
```json
{
  "tipoReporte": "Productividad" | "Rendimiento" | "Costos" | "Comparativo"
}
```

**Response:**
```json
{
  "success": true,
  "url": "/downloads/Reporte_Productividad_2024-10-17.pdf",
  "filename": "Reporte_Productividad_2024-10-17.pdf",
  "size": 245678,
  "generatedAt": "2024-10-17T15:30:00Z"
}
```

#### POST `/api/reportes/generar-excel`
Genera un reporte en formato Excel.

**Request:**
```json
{
  "tipoReporte": "Productividad" | "Rendimiento" | "Costos"
}
```

**Response:**
```json
{
  "success": true,
  "url": "/downloads/Reporte_Productividad_2024-10-17.xlsx",
  "filename": "Reporte_Productividad_2024-10-17.xlsx",
  "sheets": ["Producción Mensual", "Distribución Cultivos", "Estadísticas"],
  "size": 128456,
  "generatedAt": "2024-10-17T15:30:00Z"
}
```

### Tipos de Datos

```typescript
interface ReporteRequest {
  tipoReporte: 'Productividad' | 'Rendimiento' | 'Costos' | 'Comparativo'
}

interface ReporteResponse {
  success: boolean
  url: string
  filename: string
  size: number                    // bytes
  generatedAt: string            // ISO 8601
  sheets?: string[]              // solo para Excel
}

interface ReporteAgricola {
  id: string
  titulo: string
  tipo: 'productividad' | 'rendimiento' | 'costos' | 'calidad' | 'comparativo'
  fechaGeneracion: string
  periodo: {
    inicio: string
    fin: string
  }
  datos: any
  resumen: string
  recomendaciones?: string[]
}
```

### Características de los PDFs

#### Gráficos Incluidos
- **Barras Horizontales**: Comparación de valores entre categorías
- **Barras Verticales**: Evolución temporal
- **Líneas**: Tendencias y evolución histórica

#### Formato
- Cabecera con gradiente verde
- Logo del sistema
- Fecha de generación
- Pie de página con numeración
- Marca de confidencialidad

---

## 🛡️ Roles

### Descripción
Módulo de gestión de roles del sistema. Permite crear, editar, visualizar y eliminar roles de manera simple.

### Endpoints

#### GET `/api/roles`
Obtiene todos los roles del sistema.

**Response:**
```json
[
  {
    "id": 1,
    "nombre": "Administrador",
    "usuariosAsignados": 3,
    "createdAt": "2024-01-15T10:00:00Z",
    "updatedAt": "2024-10-01T15:30:00Z"
  },
  {
    "id": 2,
    "nombre": "Supervisor Agrícola",
    "usuariosAsignados": 8,
    "createdAt": "2024-02-20T09:00:00Z",
    "updatedAt": "2024-09-15T11:20:00Z"
  }
]
```

#### GET `/api/roles/:id`
Obtiene un rol específico por ID.

**Response:**
```json
{
  "id": 1,
  "nombre": "Administrador",
  "usuariosAsignados": 3,
  "createdAt": "2024-01-15T10:00:00Z",
  "updatedAt": "2024-10-01T15:30:00Z"
}
```

#### POST `/api/roles`
Crea un nuevo rol.

**Request:**
```json
{
  "nombre": "Coordinador de Campo"
}
```

**Response:**
```json
{
  "id": 6,
  "nombre": "Coordinador de Campo",
  "usuariosAsignados": 0,
  "createdAt": "2024-10-17T16:00:00Z",
  "updatedAt": "2024-10-17T16:00:00Z"
}
```

#### PUT `/api/roles/:id`
Actualiza un rol existente.

**Request:**
```json
{
  "nombre": "Coordinador de Campo Senior"
}
```

**Response:**
```json
{
  "id": 6,
  "nombre": "Coordinador de Campo Senior",
  "usuariosAsignados": 0,
  "createdAt": "2024-10-17T16:00:00Z",
  "updatedAt": "2024-10-17T16:30:00Z"
}
```

#### DELETE `/api/roles/:id`
Elimina un rol.

**Response:**
```json
{
  "success": true,
  "message": "Rol eliminado correctamente"
}
```

### Tipos de Datos

```typescript
interface Rol {
  id: number
  nombre: string
  usuariosAsignados: number
  createdAt: string              // ISO 8601
  updatedAt: string              // ISO 8601
}

interface CreateRolDTO {
  nombre: string                 // requerido, mínimo 3 caracteres
}

interface UpdateRolDTO {
  nombre?: string                // opcional
}
```

### Validaciones

#### Crear Rol
- `nombre`: Requerido, mínimo 3 caracteres, máximo 50 caracteres
- Debe ser único en el sistema

#### Actualizar Rol
- `nombre`: Opcional, si se proporciona debe cumplir las mismas reglas
- El ID debe existir en el sistema

#### Eliminar Rol
- No se puede eliminar si tiene usuarios asignados (> 0)
- El ID debe existir en el sistema

### Roles Predefinidos

El sistema incluye 5 roles predefinidos:

1. **Administrador** - Acceso completo al sistema
2. **Supervisor Agrícola** - Supervisión de operaciones
3. **Operador de Campo** - Registro de labores
4. **Analista de Datos** - Visualización y análisis
5. **Gestor de Personal** - Gestión de usuarios

---

## 🔐 Autenticación

Todos los endpoints requieren autenticación mediante token JWT.

**Headers requeridos:**
```
Authorization: Bearer {token}
Content-Type: application/json
```

---

## 📋 Códigos de Estado HTTP

### Exitosos
- `200 OK` - Solicitud exitosa
- `201 Created` - Recurso creado exitosamente
- `204 No Content` - Recurso eliminado exitosamente

### Errores del Cliente
- `400 Bad Request` - Datos inválidos
- `401 Unauthorized` - No autenticado
- `403 Forbidden` - Sin permisos
- `404 Not Found` - Recurso no encontrado
- `409 Conflict` - Conflicto (ej: nombre duplicado)

### Errores del Servidor
- `500 Internal Server Error` - Error del servidor

---

## 🔄 Formato de Errores

Todos los errores siguen el siguiente formato:

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "El nombre del rol es requerido",
    "details": {
      "field": "nombre",
      "constraint": "required"
    }
  }
}
```

---

## 📊 Límites y Paginación

### Dashboard
- Los datos históricos se limitan a los últimos 6 meses
- Las labores diarias muestran los últimos 7 días

### Reportes
- Tamaño máximo de archivo PDF: 10 MB
- Tamaño máximo de archivo Excel: 50 MB
- Los reportes se guardan en el servidor por 30 días

### Roles
- No hay límite de paginación (todos los roles se devuelven)
- Máximo 100 roles en el sistema

---

## 🔍 Ejemplos de Uso

### Ejemplo: Obtener Dashboard Completo

```javascript
const response = await fetch('/api/dashboard/estadisticas', {
  headers: {
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    'Content-Type': 'application/json'
  }
})

const data = await response.json()
console.log(data.totalProduccion) // 25150
```

### Ejemplo: Generar Reporte PDF

```javascript
const response = await fetch('/api/reportes/generar-pdf', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    tipoReporte: 'Productividad'
  })
})

const data = await response.json()
window.location.href = data.url // Descargar PDF
```

### Ejemplo: Crear Rol

```javascript
const response = await fetch('/api/roles', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    nombre: 'Técnico Agrónomo'
  })
})

const newRole = await response.json()
console.log(newRole.id) // 6
```

---

## 📝 Notas Importantes

### Dashboard
- Los datos se actualizan cada 5 minutos
- Las proyecciones se calculan basándose en los últimos 3 meses
- Los colores de los cultivos son fijos y están definidos en el sistema

### Reportes
- Los PDFs incluyen gráficos vectoriales (no imágenes)
- Los archivos Excel tienen múltiples hojas de cálculo
- Los reportes comparativos solo están disponibles en PDF
- La generación puede tomar hasta 30 segundos para datasets grandes

### Roles
- Los roles predefinidos no se pueden eliminar
- El nombre del rol debe ser único
- Los usuarios deben ser reasignados antes de eliminar un rol
- Los cambios en roles no afectan sesiones activas hasta el próximo login

---

## 🆘 Soporte

Para consultas sobre la API, contactar al equipo de desarrollo:
- Email: dev@sistema-agricola.com
- Documentación completa: https://docs.sistema-agricola.com
- Issues: https://github.com/sistema-agricola/issues

---

**Versión**: 1.0.0  
**Última actualización**: 17 de Octubre, 2024  
**Licencia**: MIT

