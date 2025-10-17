# API de Labores Agrícolas - Especificación

Este documento describe los endpoints esperados del backend para el módulo de registro de labores agrícolas.

## Base URL

```
/api/labores
```

## Endpoints

### 1. Listar Todas las Labores

**GET** `/api/labores`

Obtiene la lista completa de labores agrícolas registradas.

**Respuesta Exitosa (200)**
```json
[
  {
    "id": "1",
    "fecha": "2024-10-15",
    "cultivo": "Maíz",
    "lote": "Lote A-1",
    "trabajadorId": "1",
    "trabajadorNombre": "Juan Carlos Pérez González",
    "tipoLaborId": "2",
    "tipoLaborNombre": "Siembra Directa",
    "cantidadRecolectada": 150,
    "unidadMedida": "kg",
    "pesoTotal": 150,
    "horaInicio": "08:00",
    "horaFin": "14:00",
    "ubicacionGPS": {
      "latitud": -12.0464,
      "longitud": -77.0428
    },
    "condicionesClimaticas": {
      "temperatura": 24,
      "humedad": 65,
      "lluvia": false
    },
    "herramientasInsumos": ["Sembradora mecánica", "Semillas certificadas", "Fertilizante NPK"],
    "observaciones": "Siembra realizada en condiciones óptimas. Suelo bien preparado.",
    "duracionMinutos": 360,
    "rendimientoPorHora": 25,
    "costoEstimado": 180,
    "estado": "completada",
    "fechaCreacion": "2024-10-15",
    "ultimaModificacion": "2024-10-15T14:30:00"
  }
]
```

---

### 2. Obtener una Labor por ID

**GET** `/api/labores/:id`

Obtiene los detalles de una labor específica.

**Parámetros de URL**
- `id` (string, requerido): ID de la labor

**Respuesta Exitosa (200)**
```json
{
  "id": "1",
  "fecha": "2024-10-15",
  "cultivo": "Maíz",
  "lote": "Lote A-1",
  "trabajadorId": "1",
  "trabajadorNombre": "Juan Carlos Pérez González",
  "tipoLaborId": "2",
  "tipoLaborNombre": "Siembra Directa",
  "cantidadRecolectada": 150,
  "unidadMedida": "kg",
  "pesoTotal": 150,
  "horaInicio": "08:00",
  "horaFin": "14:00",
  "ubicacionGPS": {
    "latitud": -12.0464,
    "longitud": -77.0428
  },
  "condicionesClimaticas": {
    "temperatura": 24,
    "humedad": 65,
    "lluvia": false
  },
  "herramientasInsumos": ["Sembradora mecánica", "Semillas certificadas", "Fertilizante NPK"],
  "observaciones": "Siembra realizada en condiciones óptimas. Suelo bien preparado.",
  "duracionMinutos": 360,
  "rendimientoPorHora": 25,
  "costoEstimado": 180,
  "estado": "completada",
  "fechaCreacion": "2024-10-15",
  "ultimaModificacion": "2024-10-15T14:30:00"
}
```

**Respuesta de Error (404)**
```json
{
  "error": "Labor no encontrada",
  "message": "No existe una labor con el ID proporcionado"
}
```

---

### 3. Registrar una Nueva Labor

**POST** `/api/labores`

Crea un nuevo registro de labor agrícola en el sistema.

**Body (JSON)**
```json
{
  "fecha": "2024-10-17",
  "cultivo": "Café",
  "lote": "Lote B-3",
  "trabajadorId": "2",
  "tipoLaborId": "6",
  "cantidadRecolectada": 320,
  "unidadMedida": "kg",
  "pesoTotal": 320,
  "horaInicio": "06:00",
  "horaFin": "15:00",
  "ubicacionGPS": {
    "latitud": -12.0501,
    "longitud": -77.0389
  },
  "condicionesClimaticas": {
    "temperatura": 22,
    "humedad": 70,
    "lluvia": false
  },
  "herramientasInsumos": ["Cosechadora selectiva", "Sacos de yute", "Balanza digital"],
  "observaciones": "Café cereza en punto óptimo de maduración."
}
```

**Validaciones Requeridas**
- `fecha`: string, formato YYYY-MM-DD, no puede ser fecha futura
- `cultivo`: string, requerido
- `lote`: string, requerido
- `trabajadorId`: string, requerido, debe existir en tabla de trabajadores
- `tipoLaborId`: string, requerido, debe existir en tabla de tipos de labor
- `cantidadRecolectada`: number, no puede ser negativo
- `unidadMedida`: enum ["kg", "litros", "unidades", "toneladas", "quintales"]
- `pesoTotal`: number, no puede ser negativo
- `horaInicio`: string, formato HH:mm
- `horaFin`: string, formato HH:mm, debe ser posterior a horaInicio
- `ubicacionGPS`: object, requerido
  - `latitud`: number, rango válido -90 a 90
  - `longitud`: number, rango válido -180 a 180
- `condicionesClimaticas`: object, opcional
  - `temperatura`: number, opcional
  - `humedad`: number, opcional, rango 0-100
  - `lluvia`: boolean, opcional
- `herramientasInsumos`: array de strings, opcional
- `observaciones`: string, opcional

**Campos Calculados Automáticamente**
- `duracionMinutos`: calculado desde horaInicio y horaFin
- `rendimientoPorHora`: calculado desde cantidadRecolectada y duración
- `costoEstimado`: calculado desde duración (fórmula: duracionMinutos * 0.5)
- `trabajadorNombre`: obtenido desde la tabla de trabajadores
- `tipoLaborNombre`: obtenido desde la tabla de tipos de labor
- `estado`: por defecto "completada"

**Respuesta Exitosa (201)**
```json
{
  "id": "5",
  "fecha": "2024-10-17",
  "cultivo": "Café",
  "lote": "Lote B-3",
  "trabajadorId": "2",
  "trabajadorNombre": "María Isabel García Martínez",
  "tipoLaborId": "6",
  "tipoLaborNombre": "Cosecha Mecanizada",
  "cantidadRecolectada": 320,
  "unidadMedida": "kg",
  "pesoTotal": 320,
  "horaInicio": "06:00",
  "horaFin": "15:00",
  "ubicacionGPS": {
    "latitud": -12.0501,
    "longitud": -77.0389
  },
  "condicionesClimaticas": {
    "temperatura": 22,
    "humedad": 70,
    "lluvia": false
  },
  "herramientasInsumos": ["Cosechadora selectiva", "Sacos de yute", "Balanza digital"],
  "observaciones": "Café cereza en punto óptimo de maduración.",
  "duracionMinutos": 540,
  "rendimientoPorHora": 35.5,
  "costoEstimado": 270,
  "estado": "completada",
  "fechaCreacion": "2024-10-17",
  "ultimaModificacion": "2024-10-17T12:00:00"
}
```

**Respuesta de Error (400)**
```json
{
  "error": "Validación fallida",
  "message": "La fecha no puede ser futura",
  "fields": {
    "fecha": "La fecha de labor no puede ser posterior a hoy"
  }
}
```

---

### 4. Actualizar una Labor

**PUT** `/api/labores/:id`

Actualiza la información de una labor existente.

**Parámetros de URL**
- `id` (string, requerido): ID de la labor

**Body (JSON)** - Todos los campos son opcionales
```json
{
  "fecha": "2024-10-17",
  "cultivo": "Café",
  "lote": "Lote B-3",
  "trabajadorId": "2",
  "tipoLaborId": "6",
  "cantidadRecolectada": 350,
  "unidadMedida": "kg",
  "pesoTotal": 350,
  "horaInicio": "06:00",
  "horaFin": "16:00",
  "ubicacionGPS": {
    "latitud": -12.0501,
    "longitud": -77.0389
  },
  "condicionesClimaticas": {
    "temperatura": 23,
    "humedad": 68,
    "lluvia": false
  },
  "herramientasInsumos": ["Cosechadora selectiva", "Sacos de yute"],
  "observaciones": "Labor completada satisfactoriamente.",
  "estado": "completada"
}
```

**Nota:** Los campos `duracionMinutos`, `rendimientoPorHora` y `costoEstimado` se recalculan automáticamente si se modifican `horaInicio`, `horaFin` o `cantidadRecolectada`.

**Respuesta Exitosa (200)**
```json
{
  "id": "5",
  "fecha": "2024-10-17",
  "cultivo": "Café",
  "lote": "Lote B-3",
  "trabajadorId": "2",
  "trabajadorNombre": "María Isabel García Martínez",
  "tipoLaborId": "6",
  "tipoLaborNombre": "Cosecha Mecanizada",
  "cantidadRecolectada": 350,
  "unidadMedida": "kg",
  "pesoTotal": 350,
  "horaInicio": "06:00",
  "horaFin": "16:00",
  "ubicacionGPS": {
    "latitud": -12.0501,
    "longitud": -77.0389
  },
  "condicionesClimaticas": {
    "temperatura": 23,
    "humedad": 68,
    "lluvia": false
  },
  "herramientasInsumos": ["Cosechadora selectiva", "Sacos de yute"],
  "observaciones": "Labor completada satisfactoriamente.",
  "duracionMinutos": 600,
  "rendimientoPorHora": 35,
  "costoEstimado": 300,
  "estado": "completada",
  "fechaCreacion": "2024-10-17",
  "ultimaModificacion": "2024-10-17T14:30:00"
}
```

**Respuesta de Error (404)**
```json
{
  "error": "Labor no encontrada",
  "message": "No existe una labor con el ID proporcionado"
}
```

---

### 5. Eliminar una Labor

**DELETE** `/api/labores/:id`

Elimina un registro de labor del sistema.

**Parámetros de URL**
- `id` (string, requerido): ID de la labor

**Respuesta Exitosa (204)**
```
No Content
```

**Respuesta de Error (404)**
```json
{
  "error": "Labor no encontrada",
  "message": "No existe una labor con el ID proporcionado"
}
```

---

### 6. Buscar Labores

**GET** `/api/labores/search?q={query}`

Busca labores por diferentes criterios.

**Query Parameters**
- `q` (string, requerido): Término de búsqueda

**Campos de Búsqueda**
La búsqueda debe realizarse en los siguientes campos:
- cultivo
- lote
- trabajadorNombre
- tipoLaborNombre
- observaciones

**Respuesta Exitosa (200)**
```json
[
  {
    "id": "1",
    "fecha": "2024-10-15",
    "cultivo": "Maíz",
    "lote": "Lote A-1",
    "trabajadorId": "1",
    "trabajadorNombre": "Juan Carlos Pérez González",
    "tipoLaborId": "2",
    "tipoLaborNombre": "Siembra Directa",
    "cantidadRecolectada": 150,
    "unidadMedida": "kg",
    "pesoTotal": 150,
    "horaInicio": "08:00",
    "horaFin": "14:00",
    "ubicacionGPS": {
      "latitud": -12.0464,
      "longitud": -77.0428
    },
    "estado": "completada",
    "fechaCreacion": "2024-10-15"
  }
]
```

---

### 7. Obtener Labores por Rango de Fechas

**GET** `/api/labores/fecha-rango?inicio={fechaInicio}&fin={fechaFin}`

Obtiene labores dentro de un rango de fechas específico.

**Query Parameters**
- `inicio` (string, requerido): Fecha inicio en formato YYYY-MM-DD
- `fin` (string, requerido): Fecha fin en formato YYYY-MM-DD

**Respuesta Exitosa (200)**
```json
[
  {
    "id": "1",
    "fecha": "2024-10-15",
    "cultivo": "Maíz",
    "lote": "Lote A-1",
    "estado": "completada"
  }
]
```

---

### 8. Obtener Labores por Trabajador

**GET** `/api/labores/trabajador/:trabajadorId`

Obtiene todas las labores realizadas por un trabajador específico.

**Parámetros de URL**
- `trabajadorId` (string, requerido): ID del trabajador

**Respuesta Exitosa (200)**
```json
[
  {
    "id": "1",
    "fecha": "2024-10-15",
    "cultivo": "Maíz",
    "lote": "Lote A-1",
    "trabajadorNombre": "Juan Carlos Pérez González",
    "tipoLaborNombre": "Siembra Directa",
    "estado": "completada"
  }
]
```

---

### 9. Obtener Estadísticas de Labores

**GET** `/api/labores/estadisticas`

Obtiene métricas y estadísticas generales de las labores registradas.

**Respuesta Exitosa (200)**
```json
{
  "totalLabores": 4,
  "completadas": 4,
  "enProceso": 0,
  "totalRecolectado": 470,
  "promedioRendimiento": 15.125,
  "costoTotal": 660
}
```

---

## Códigos de Estado HTTP

- **200 OK**: Solicitud exitosa
- **201 Created**: Recurso creado exitosamente
- **204 No Content**: Eliminación exitosa
- **400 Bad Request**: Error de validación
- **404 Not Found**: Recurso no encontrado
- **500 Internal Server Error**: Error del servidor

## Seguridad

### Autenticación

Todos los endpoints requieren autenticación mediante token JWT en el header:

```
Authorization: Bearer {token}
```

### Autorización

Los permisos necesarios para cada operación:

- **Listar/Ver**: Cualquier usuario autenticado
- **Crear**: Rol de supervisor o administrador
- **Actualizar**: Rol de supervisor o administrador
- **Eliminar**: Solo administrador
- **Estadísticas**: Cualquier usuario autenticado

## Estados de Labor

Los estados válidos para una labor son:

- `en_proceso`: Labor actualmente en ejecución
- `completada`: Labor finalizada exitosamente
- `pausada`: Labor temporalmente detenida
- `cancelada`: Labor cancelada o no completada

## Unidades de Medida

Las unidades de medida válidas son:

- `kg`: Kilogramos
- `litros`: Litros
- `unidades`: Unidades individuales
- `toneladas`: Toneladas métricas
- `quintales`: Quintales

## Notas de Implementación

1. **Índices de Base de Datos**
   - Crear índice en `fecha` para consultas por rango
   - Crear índice en `trabajadorId` para filtrado por trabajador
   - Crear índice en `tipoLaborId` para filtrado por tipo
   - Crear índice en `estado` para filtros rápidos
   - Crear índice compuesto en `(fecha, trabajadorId)` para reportes

2. **Validaciones de Backend**
   - Verificar que trabajadorId exista en la tabla de trabajadores
   - Verificar que tipoLaborId exista en la tabla de tipos de labor
   - Validar que horaFin sea posterior a horaInicio
   - Validar que la fecha no sea futura
   - Validar rangos de coordenadas GPS
   - Validar que cantidades y pesos no sean negativos
   - Sanitizar inputs para prevenir XSS

3. **Cálculos Automáticos**
   - Implementar cálculo de duracionMinutos desde horaInicio/horaFin
   - Implementar cálculo de rendimientoPorHora
   - Implementar cálculo de costoEstimado
   - Recalcular automáticamente en actualizaciones

4. **Integridad Referencial**
   - Establecer foreign keys a trabajadores y tipos_labor
   - Considerar comportamiento al eliminar trabajadores o tipos de labor
   - Recomendado: no permitir eliminar si tienen labores asociadas

5. **Geolocalización**
   - Validar formato de coordenadas GPS
   - Considerar almacenar en tipo geography/geometry para consultas espaciales
   - Implementar índices espaciales para búsquedas por ubicación

6. **Auditoría**
   - Registrar todos los cambios importantes
   - Mantener historial completo de modificaciones
   - Log de quién creó/modificó cada registro
   - Considerar tabla de auditoría separada para cambios críticos

7. **Optimizaciones**
   - Implementar paginación en listados grandes
   - Considerar caché para estadísticas si se consultan frecuentemente
   - Implementar consultas eficientes para reportes de rango de fechas

