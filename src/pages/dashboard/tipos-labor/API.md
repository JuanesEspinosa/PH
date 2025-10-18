# API de Tipos de Labor - Especificación

Este documento describe los endpoints esperados del backend para el módulo de tipos de labor agrícola.

## Base URL

```
/api/tipos-labor
```

## Endpoints

### 1. Listar Todos los Tipos de Labor

**GET** `/api/tipos-labor`

Obtiene la lista completa de tipos de labor agrícola.

**Respuesta Exitosa (200)**
```json
[
  {
    "id": "1",
    "nombre": "Preparación de Terreno",
    "descripcion": "Arado, nivelación y preparación del suelo para siembra",
    "categoria": "siembra",
    "fechaCreacion": "2024-01-10",
    "ultimaModificacion": "2024-10-17T10:30:00"
  }
]
```

---

### 2. Obtener un Tipo de Labor por ID

**GET** `/api/tipos-labor/:id`

Obtiene los detalles de un tipo de labor específico.

**Parámetros de URL**
- `id` (string, requerido): ID del tipo de labor

**Respuesta Exitosa (200)**
```json
{
  "id": "1",
  "nombre": "Preparación de Terreno",
  "descripcion": "Arado, nivelación y preparación del suelo para siembra",
  "categoria": "siembra",
  "fechaCreacion": "2024-01-10",
  "ultimaModificacion": "2024-10-17T10:30:00"
}
```

**Respuesta de Error (404)**
```json
{
  "error": "Tipo de labor no encontrado",
  "message": "No existe un tipo de labor con el ID proporcionado"
}
```

---

### 3. Crear un Nuevo Tipo de Labor

**POST** `/api/tipos-labor`

Crea un nuevo tipo de labor en el sistema.

**Body (JSON)**
```json
{
  "nombre": "Riego por Aspersión",
  "descripcion": "Sistema de riego mediante aspersores de agua",
  "categoria": "riego"
}
```

**Validaciones Requeridas**
- `nombre`: string, mínimo 3 caracteres, único en el sistema (no distingue mayúsculas)
- `descripcion`: string, opcional
- `categoria`: enum ["siembra", "cosecha", "riego", "fertilizacion", "control_plagas", "mantenimiento", "otro"]

**Respuesta Exitosa (201)**
```json
{
  "id": "9",
  "nombre": "Riego por Aspersión",
  "descripcion": "Sistema de riego mediante aspersores de agua",
  "categoria": "riego",
  "fechaCreacion": "2024-10-17",
  "ultimaModificacion": "2024-10-17T12:00:00"
}
```

**Respuesta de Error (400)**
```json
{
  "error": "Validación fallida",
  "message": "Ya existe un tipo de labor con ese nombre",
  "fields": {
    "nombre": "Este nombre ya está registrado"
  }
}
```

---

### 4. Actualizar un Tipo de Labor

**PUT** `/api/tipos-labor/:id`

Actualiza la información de un tipo de labor existente.

**Parámetros de URL**
- `id` (string, requerido): ID del tipo de labor

**Body (JSON)** - Todos los campos son opcionales
```json
{
  "nombre": "Riego por Aspersión Automatizado",
  "descripcion": "Sistema de riego mediante aspersores automatizados con sensores",
  "categoria": "riego"
}
```

**Respuesta Exitosa (200)**
```json
{
  "id": "9",
  "nombre": "Riego por Aspersión Automatizado",
  "descripcion": "Sistema de riego mediante aspersores automatizados con sensores",
  "categoria": "riego",
  "fechaCreacion": "2024-10-17",
  "ultimaModificacion": "2024-10-17T14:30:00"
}
```

**Respuesta de Error (404)**
```json
{
  "error": "Tipo de labor no encontrado",
  "message": "No existe un tipo de labor con el ID proporcionado"
}
```

**Respuesta de Error (400)**
```json
{
  "error": "Validación fallida",
  "message": "Ya existe un tipo de labor con ese nombre"
}
```

---

### 5. Eliminar un Tipo de Labor

**DELETE** `/api/tipos-labor/:id`

Elimina un tipo de labor del sistema.

**Parámetros de URL**
- `id` (string, requerido): ID del tipo de labor

**Respuesta Exitosa (204)**
```
No Content
```

**Respuesta de Error (404)**
```json
{
  "error": "Tipo de labor no encontrado",
  "message": "No existe un tipo de labor con el ID proporcionado"
}
```

---

### 6. Buscar Tipos de Labor

**GET** `/api/tipos-labor/search?q={query}`

Busca tipos de labor por diferentes criterios.

**Query Parameters**
- `q` (string, requerido): Término de búsqueda

**Campos de Búsqueda**
La búsqueda debe realizarse en los siguientes campos:
- nombre
- descripcion
- categoria

**Respuesta Exitosa (200)**
```json
[
  {
    "id": "3",
    "nombre": "Riego por Goteo",
    "descripcion": "Sistema de irrigación localizada de alta eficiencia",
    "categoria": "riego",
    "fechaCreacion": "2024-02-01",
    "ultimaModificacion": "2024-10-15T09:20:00"
  }
]
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
- **Crear**: Rol de administrador o supervisor
- **Actualizar**: Rol de administrador o supervisor
- **Eliminar**: Solo administrador

## Categorías Disponibles

Las categorías válidas para tipos de labor son:

- `siembra`: Actividades relacionadas con la plantación
- `cosecha`: Actividades de recolección de cultivos
- `riego`: Sistemas y procesos de irrigación
- `fertilizacion`: Aplicación de nutrientes y fertilizantes
- `control_plagas`: Manejo y control de plagas y enfermedades
- `mantenimiento`: Cuidado y mantenimiento de cultivos
- `otro`: Otras actividades agrícolas no categorizadas

## Notas de Implementación

1. **Índices de Base de Datos**
   - Crear índice único en `nombre` (case-insensitive)
   - Crear índice en `categoria` para filtros rápidos
   - Crear índice en `fechaCreacion` para ordenamiento

2. **Validaciones de Backend**
   - El nombre debe ser único (comparación case-insensitive)
   - Validar que la categoría esté dentro de los valores permitidos
   - Sanitizar inputs para prevenir XSS
   - Validar longitud mínima del nombre (3 caracteres)

3. **Soft Delete (Recomendado)**
   - Considerar implementar soft delete en lugar de eliminar permanentemente
   - Verificar que no existan labores asociadas antes de eliminar
   - Agregar campo `deletedAt` para registros eliminados

4. **Relaciones**
   - Este modelo es referenciado por el módulo de Labores
   - Considerar restricciones de integridad referencial
   - Al eliminar, verificar que no existan labores asociadas

5. **Auditoría**
   - Registrar todos los cambios importantes
   - Mantener historial de modificaciones
   - Log de quién creó/modificó cada registro

