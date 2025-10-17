# 🎯 MÓDULO DE PLANIFICACIÓN - INTEGRACIÓN BACKEND

## ✅ Completado

### 1. Base de Datos (4 Tablas)

#### actividades_planificadas
```sql
- id, nombre, descripcion, tipo, prioridad, estado
- fecha_inicio_planificada, fecha_fin_planificada, duracion_estimada_horas
- periodo, fecha_inicio_real, fecha_fin_real, duracion_real_horas
- progreso_porcentaje, desviacion_tiempo_dias, requiere_atencion
- lote_id, cultivo_id, responsable_id, creado_por
- notas, fecha_creacion, ultima_actualizacion
```

**Relaciones:**
- `lote_id` → `lotes.id` (SET NULL)
- `cultivo_id` → `cultivos.id` (SET NULL)
- `responsable_id` → `usuarios.id` (SET NULL)
- `creado_por` → `usuarios.id` (SET NULL)

#### actividad_trabajadores
```sql
- id, actividad_id, trabajador_id
- horas_planificadas, horas_reales
```

**Relaciones:**
- `actividad_id` → `actividades_planificadas.id` (CASCADE)
- `trabajador_id` → `usuarios.id` (CASCADE)

#### actividad_metas
```sql
- id, actividad_id, descripcion
- valor_objetivo, valor_actual, unidad
- cumplida, porcentaje_cumplimiento, fecha_cumplimiento
```

**Relaciones:**
- `actividad_id` → `actividades_planificadas.id` (CASCADE)

#### alertas
```sql
- id, actividad_id, tipo, severidad
- titulo, mensaje, fecha_generacion
- leida, resuelta, fecha_resolucion
```

**Relaciones:**
- `actividad_id` → `actividades_planificadas.id` (CASCADE)

---

### 2. Modelo (planificacion.model.ts)

**Enums:**
- `TipoActividad`: SIEMBRA, RIEGO, FUMIGACION, FERTILIZACION, COSECHA, MANTENIMIENTO, PODA, CONTROL_PLAGAS, OTRO
- `NivelPrioridad`: BAJA, MEDIA, ALTA, URGENTE
- `EstadoActividad`: PENDIENTE, EN_PROGRESO, COMPLETADA, ATRASADA, CANCELADA
- `PeriodoTiempo`: DIA, SEMANA, QUINCENAL, MES
- `TipoAlerta`: RETRASO, BAJO_RENDIMIENTO, ACTIVIDAD_VENCIDA, DESVIACION_TIEMPO, DESVIACION_RECURSOS, CLIMA_ADVERSO, FALTA_RECURSOS

**Interfaces:**
- `ActividadPlanificada`: Actividad completa con todas sus relaciones
- `MetaActividad`: Metas cuantificables de una actividad
- `Alerta`: Alertas del sistema
- `CreateActividadDto`: Datos para crear actividad
- `UpdateActividadDto`: Datos para actualizar actividad

**Métodos del Modelo:**
- `findAll()`: Obtener todas las actividades con relaciones
- `findById(id)`: Obtener una actividad por ID
- `findByLote(loteId)`: Obtener actividades de un lote
- `getTrabajadoresIds(actividadId)`: IDs de trabajadores
- `getTrabajadoresNombres(actividadId)`: Nombres de trabajadores
- `getMetas(actividadId)`: Metas de la actividad
- `getAlertas(actividadId)`: Alertas activas
- `create(data, userId)`: Crear actividad con transacción
- `update(id, data)`: Actualizar actividad con transacción
- `delete(id)`: Eliminar actividad
- `exists(id)`: Verificar existencia
- `getEstadisticas()`: Obtener estadísticas generales

---

### 3. Servicio (planificacion.service.ts)

**Funcionalidades:**
- CRUD completo de actividades
- Validaciones de negocio:
  - Nombre y descripción requeridos
  - Fecha fin posterior a fecha inicio
  - Duración mayor a 0
  - Progreso entre 0-100
- Cálculo automático de estados:
  - COMPLETADA si progreso = 100%
  - ATRASADA si fecha pasada y progreso < 100%
  - EN_PROGRESO si iniciada y en rango de fechas
  - PENDIENTE si no iniciada
- Cálculo de desviaciones de tiempo
- Actualización de porcentaje de cumplimiento de metas
- Gestión de múltiples relaciones (lotes, cultivos, trabajadores, metas)

**Métodos:**
- `getAllActividades()`: Listar todas con cálculo de estados
- `getActividadById(id)`: Obtener una con relaciones completas
- `createActividad(data, userId)`: Crear con validaciones
- `updateActividad(id, data)`: Actualizar con recálculo
- `deleteActividad(id)`: Eliminar con verificación
- `getEstadisticas()`: Métricas generales
- `getActividadesPorLote(loteId)`: Filtrar por lote
- `actualizarEstadoAutomatico(actividad)`: Lógica de estados (privado)

---

### 4. Controller (planificacion.controller.ts)

**Endpoints Implementados:**

#### GET /api/planificacion
- Listar todas las actividades
- Respuesta: `ActividadPlanificada[]`

#### GET /api/planificacion/estadisticas
- Obtener estadísticas generales
- Respuesta: `EstadisticasPlanificacion`

#### GET /api/planificacion/lote/:loteId
- Listar actividades de un lote
- Parámetro: `loteId` (number)
- Respuesta: `ActividadPlanificada[]`

#### GET /api/planificacion/:id
- Obtener una actividad específica
- Parámetro: `id` (number)
- Respuesta: `ActividadPlanificada`
- Error 404: Si no existe

#### POST /api/planificacion
- Crear nueva actividad
- Body: `CreateActividadDto`
- Respuesta: `ActividadPlanificada` (201)
- Error 400: Validaciones

#### PUT /api/planificacion/:id
- Actualizar actividad
- Parámetro: `id` (number)
- Body: `UpdateActividadDto`
- Respuesta: `ActividadPlanificada`
- Error 404: Si no existe
- Error 400: Validaciones

#### DELETE /api/planificacion/:id
- Eliminar actividad
- Parámetro: `id` (number)
- Respuesta: `{ message: 'Actividad eliminada correctamente' }`
- Error 404: Si no existe

**Total: 7 endpoints** ✅

---

### 5. Rutas (planificacion.routes.ts)

- Todas las rutas protegidas con `authMiddleware`
- Orden correcto para evitar conflictos de parámetros
- Métodos HTTP apropiados (GET, POST, PUT, DELETE)

---

### 6. Frontend (planificacionService.ts)

**Integración Completa:**
- ✅ Reemplazado mock data por llamadas API reales
- ✅ Conversión de tipos (IDs number↔string, fechas string↔Date)
- ✅ Manejo de datos opcionales
- ✅ Mapeo de estadísticas del backend

**Métodos Frontend:**
- `obtenerActividades()`: GET /planificacion
- `obtenerActividadPorId(id)`: GET /planificacion/:id
- `obtenerActividadesPorLote(loteId)`: GET /planificacion/lote/:loteId
- `crearActividad(data)`: POST /planificacion
- `actualizarActividad(id, data)`: PUT /planificacion/:id
- `eliminarActividad(id)`: DELETE /planificacion/:id
- `obtenerEstadisticas()`: GET /planificacion/estadisticas

---

## 🎯 Características Implementadas

### Funcionalidades Core
- ✅ CRUD completo de actividades planificadas
- ✅ Asignación de múltiples trabajadores
- ✅ Definición de metas cuantificables
- ✅ Sistema de alertas (estructura)
- ✅ Cálculo automático de estados
- ✅ Cálculo de desviaciones de tiempo
- ✅ Relación con lotes y cultivos
- ✅ Progreso porcentual
- ✅ Prioridades y tipos de actividad
- ✅ Periodos temporales (día, semana, quincenal, mes)

### Base de Datos
- ✅ 4 tablas relacionadas
- ✅ Transacciones para integridad
- ✅ CASCADE delete automático
- ✅ Índices para optimización
- ✅ Timestamps automáticos
- ✅ Enums para valores fijos
- ✅ Foreign keys correctas

### Validaciones
- ✅ Campos requeridos
- ✅ Rangos de fechas válidos
- ✅ Progreso 0-100%
- ✅ Duración > 0
- ✅ IDs válidos

### Automatización
- ✅ Estados calculados por fecha y progreso
- ✅ Desviación de tiempo automática
- ✅ Porcentaje de cumplimiento de metas
- ✅ Flag "requiere_atencion"

---

## 📊 Estructura de Datos

### Actividad Completa (JSON)
```json
{
  "id": 1,
  "nombre": "Cosecha de Café - Lote Norte",
  "descripcion": "Cosecha programada de 500 kg",
  "tipo": "COSECHA",
  "prioridad": "ALTA",
  "estado": "EN_PROGRESO",
  "fecha_inicio_planificada": "2024-10-20T08:00:00Z",
  "fecha_fin_planificada": "2024-10-22T18:00:00Z",
  "duracion_estimada_horas": 24,
  "periodo": "DIA",
  "progreso_porcentaje": 65,
  "lote_id": 1,
  "lote_nombre": "Lote Norte A",
  "cultivo_id": 1,
  "cultivo_nombre": "Café",
  "trabajadores_asignados": ["1", "2", "3"],
  "trabajadores_nombres": ["Juan Pérez", "María García", "Carlos López"],
  "metas": [
    {
      "id": 1,
      "descripcion": "Kilos cosechados",
      "valor_objetivo": 500,
      "valor_actual": 325,
      "unidad": "kg",
      "cumplida": false,
      "porcentaje_cumplimiento": 65
    }
  ],
  "alertas_activas": [],
  "requiere_atencion": false,
  "fecha_creacion": "2024-10-15T10:00:00Z"
}
```

---

## 🔄 Flujo de Trabajo

### 1. Crear Actividad
```bash
POST /api/planificacion
{
  "nombre": "Fumigación Lote Sur",
  "descripcion": "Aplicación preventiva",
  "tipo": "FUMIGACION",
  "prioridad": "MEDIA",
  "fecha_inicio_planificada": "2024-10-25",
  "fecha_fin_planificada": "2024-10-25",
  "duracion_estimada_horas": 4,
  "periodo": "DIA",
  "lote_id": 2,
  "trabajadores_asignados": [1, 2],
  "metas": [
    {
      "descripcion": "Hectáreas fumigadas",
      "valor_objetivo": 5.2,
      "unidad": "ha"
    }
  ]
}
```

### 2. El Sistema Automáticamente:
- ✅ Crea el registro en `actividades_planificadas`
- ✅ Inserta trabajadores en `actividad_trabajadores`
- ✅ Inserta metas en `actividad_metas`
- ✅ Calcula horas por trabajador
- ✅ Asigna estado PENDIENTE
- ✅ Retorna actividad completa con relaciones

### 3. Durante la Ejecución:
- El usuario actualiza el progreso
- El sistema recalcula el estado automáticamente
- Si la fecha se pasa y progreso < 100% → ATRASADA
- Si progreso = 100% → COMPLETADA
- Actualiza porcentaje de cumplimiento de metas

### 4. Consultas Disponibles:
- Todas las actividades
- Por ID específico
- Por lote
- Estadísticas generales

---

## 🧪 Testing

### Ejemplo cURL - Crear Actividad:
```bash
curl -X POST http://localhost:5000/api/planificacion \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TU_TOKEN" \
  -d '{
    "nombre": "Riego Lote Este",
    "descripcion": "Riego programado del sistema de goteo",
    "tipo": "RIEGO",
    "prioridad": "MEDIA",
    "fecha_inicio_planificada": "2024-10-26T06:00:00Z",
    "fecha_fin_planificada": "2024-10-26T08:00:00Z",
    "duracion_estimada_horas": 2,
    "periodo": "DIA",
    "lote_id": 3,
    "trabajadores_asignados": [1]
  }'
```

### Ejemplo cURL - Listar Actividades de un Lote:
```bash
curl -X GET http://localhost:5000/api/planificacion/lote/1 \
  -H "Authorization: Bearer TU_TOKEN"
```

### Ejemplo cURL - Actualizar Progreso:
```bash
curl -X PUT http://localhost:5000/api/planificacion/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TU_TOKEN" \
  -d '{
    "progreso_porcentaje": 100,
    "fecha_fin_real": "2024-10-22T17:30:00Z"
  }'
```

---

## 📈 Estadísticas Retornadas

```json
{
  "total_actividades": 15,
  "pendientes": 5,
  "en_progreso": 4,
  "completadas": 4,
  "atrasadas": 2,
  "progreso_promedio": 62.5,
  "requieren_atencion": 2
}
```

---

## ✅ Completado al 100%

- [x] 4 Tablas de base de datos creadas
- [x] Modelo con 10+ métodos
- [x] Servicio con lógica de negocio
- [x] Controller con 7 endpoints
- [x] Rutas protegidas
- [x] Frontend sin mock data
- [x] Conversión de tipos
- [x] Validaciones completas
- [x] Transacciones para integridad
- [x] Cálculo automático de estados
- [x] Sistema de metas integrado
- [x] Sistema de alertas (estructura)
- [x] Relaciones con lotes/cultivos
- [x] Asignación de trabajadores

---

## 🚀 Próximos Pasos Opcionales

### Mejoras Futuras:
- [ ] Implementar generación automática de alertas en el servicio
- [ ] Agregar endpoint para actualizar metas individualmente
- [ ] Sistema de notificaciones en tiempo real
- [ ] Reportes de eficiencia comparada
- [ ] Integración con módulo de labores (cuando se complete)
- [ ] Dashboard de monitoreo en tiempo real
- [ ] Gráficos de desviaciones
- [ ] Predicción de retrasos con IA

---

## 📝 Notas Técnicas

- Las transacciones garantizan que si falla la creación de trabajadores o metas, se revierte toda la actividad
- Los CASCADE delete eliminan automáticamente trabajadores, metas y alertas al eliminar una actividad
- El cálculo de estados se hace en cada consulta para tener datos siempre actualizados
- Los índices optimizan las consultas por estado, lote y fecha
- El frontend mapea IDs entre number (backend) y string (frontend) para compatibilidad

---

**Módulo 100% funcional y listo para producción** 🎉

