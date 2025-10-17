# API de Trabajadores - Especificación

Este documento describe los endpoints esperados del backend para el módulo de trabajadores.

## Base URL

```
/api/trabajadores
```

## Endpoints

### 1. Listar Todos los Trabajadores

**GET** `/api/trabajadores`

Obtiene la lista completa de trabajadores.

**Respuesta Exitosa (200)**
```json
[
  {
    "id": "1",
    "nombres": "Juan Carlos",
    "apellidos": "Pérez González",
    "documento": "12345678A",
    "tipoDocumento": "DNI",
    "telefono": "+34 600 123 456",
    "email": "juan.perez@empresa.com",
    "cargo": "Desarrollador Senior",
    "fechaIngreso": "2022-01-15",
    "estado": "activo",
    "direccion": "Calle Mayor 123, 28013 Madrid, España",
    "fechaCreacion": "2022-01-15",
    "ultimaModificacion": "2024-10-17T10:30:00"
  }
]
```

---

### 2. Obtener un Trabajador por ID

**GET** `/api/trabajadores/:id`

Obtiene los detalles de un trabajador específico.

**Parámetros de URL**
- `id` (string, requerido): ID del trabajador

**Respuesta Exitosa (200)**
```json
{
  "id": "1",
  "nombres": "Juan Carlos",
  "apellidos": "Pérez González",
  "documento": "12345678A",
  "tipoDocumento": "DNI",
  "telefono": "+34 600 123 456",
  "email": "juan.perez@empresa.com",
  "cargo": "Desarrollador Senior",
  "fechaIngreso": "2022-01-15",
  "estado": "activo",
  "direccion": "Calle Mayor 123, 28013 Madrid, España",
  "fechaCreacion": "2022-01-15",
  "ultimaModificacion": "2024-10-17T10:30:00"
}
```

**Respuesta de Error (404)**
```json
{
  "error": "Trabajador no encontrado",
  "message": "No existe un trabajador con el ID proporcionado"
}
```

---

### 3. Crear un Nuevo Trabajador

**POST** `/api/trabajadores`

Crea un nuevo trabajador en el sistema.

**Body (JSON)**
```json
{
  "nombres": "María Isabel",
  "apellidos": "García Martínez",
  "documento": "87654321B",
  "tipoDocumento": "DNI",
  "telefono": "+34 600 234 567",
  "email": "maria.garcia@empresa.com",
  "cargo": "Diseñadora UX/UI",
  "fechaIngreso": "2024-10-17",
  "direccion": "Avenida de la Constitución 45, 41001 Sevilla, España"
}
```

**Validaciones Requeridas**
- `nombres`: string, mínimo 2 caracteres
- `apellidos`: string, mínimo 2 caracteres
- `documento`: string, mínimo 5 caracteres, único en el sistema
- `tipoDocumento`: enum ["DNI", "Pasaporte", "Cédula", "Otro"]
- `telefono`: string, formato válido
- `email`: string, formato email válido, único en el sistema
- `cargo`: string, mínimo 3 caracteres
- `fechaIngreso`: string, formato YYYY-MM-DD, no puede ser fecha futura
- `direccion`: string, mínimo 10 caracteres

**Respuesta Exitosa (201)**
```json
{
  "id": "2",
  "nombres": "María Isabel",
  "apellidos": "García Martínez",
  "documento": "87654321B",
  "tipoDocumento": "DNI",
  "telefono": "+34 600 234 567",
  "email": "maria.garcia@empresa.com",
  "cargo": "Diseñadora UX/UI",
  "fechaIngreso": "2024-10-17",
  "estado": "activo",
  "direccion": "Avenida de la Constitución 45, 41001 Sevilla, España",
  "fechaCreacion": "2024-10-17",
  "ultimaModificacion": "2024-10-17T12:00:00"
}
```

**Respuesta de Error (400)**
```json
{
  "error": "Validación fallida",
  "message": "El email ya existe en el sistema",
  "fields": {
    "email": "Este email ya está registrado"
  }
}
```

---

### 4. Actualizar un Trabajador

**PUT** `/api/trabajadores/:id`

Actualiza la información de un trabajador existente.

**Parámetros de URL**
- `id` (string, requerido): ID del trabajador

**Body (JSON)** - Todos los campos son opcionales
```json
{
  "nombres": "María Isabel",
  "apellidos": "García Martínez",
  "documento": "87654321B",
  "tipoDocumento": "DNI",
  "telefono": "+34 600 234 567",
  "email": "maria.garcia@empresa.com",
  "cargo": "Senior UX/UI Designer",
  "fechaIngreso": "2024-10-17",
  "estado": "activo",
  "direccion": "Nueva Dirección 123, 41001 Sevilla, España"
}
```

**Respuesta Exitosa (200)**
```json
{
  "id": "2",
  "nombres": "María Isabel",
  "apellidos": "García Martínez",
  "documento": "87654321B",
  "tipoDocumento": "DNI",
  "telefono": "+34 600 234 567",
  "email": "maria.garcia@empresa.com",
  "cargo": "Senior UX/UI Designer",
  "fechaIngreso": "2024-10-17",
  "estado": "activo",
  "direccion": "Nueva Dirección 123, 41001 Sevilla, España",
  "fechaCreacion": "2024-10-17",
  "ultimaModificacion": "2024-10-17T14:30:00"
}
```

**Respuesta de Error (404)**
```json
{
  "error": "Trabajador no encontrado",
  "message": "No existe un trabajador con el ID proporcionado"
}
```

---

### 5. Eliminar un Trabajador

**DELETE** `/api/trabajadores/:id`

Elimina un trabajador del sistema.

**Parámetros de URL**
- `id` (string, requerido): ID del trabajador

**Respuesta Exitosa (204)**
```
No Content
```

**Respuesta de Error (404)**
```json
{
  "error": "Trabajador no encontrado",
  "message": "No existe un trabajador con el ID proporcionado"
}
```

---

### 6. Buscar Trabajadores

**GET** `/api/trabajadores/search?q={query}`

Busca trabajadores por diferentes criterios.

**Query Parameters**
- `q` (string, requerido): Término de búsqueda

**Campos de Búsqueda**
La búsqueda debe realizarse en los siguientes campos:
- nombres
- apellidos
- email
- documento
- cargo

**Respuesta Exitosa (200)**
```json
[
  {
    "id": "1",
    "nombres": "Juan Carlos",
    "apellidos": "Pérez González",
    "documento": "12345678A",
    "tipoDocumento": "DNI",
    "telefono": "+34 600 123 456",
    "email": "juan.perez@empresa.com",
    "cargo": "Desarrollador Senior",
    "fechaIngreso": "2022-01-15",
    "estado": "activo",
    "direccion": "Calle Mayor 123, 28013 Madrid, España",
    "fechaCreacion": "2022-01-15",
    "ultimaModificacion": "2024-10-17T10:30:00"
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
- **Crear**: Rol de administrador o RRHH
- **Actualizar**: Rol de administrador o RRHH
- **Eliminar**: Solo administrador

## Notas de Implementación

1. **Índices de Base de Datos**
   - Crear índice único en `email`
   - Crear índice único en `documento`
   - Crear índice en `estado` para filtros rápidos

2. **Validaciones de Backend**
   - Todas las validaciones del frontend deben replicarse en backend
   - Validar unicidad de email y documento
   - Validar formato de fecha
   - Sanitizar inputs para prevenir XSS

3. **Soft Delete (Recomendado)**
   - Considerar implementar soft delete en lugar de eliminar permanentemente
   - Agregar campo `deletedAt` para registros eliminados

4. **Auditoría**
   - Registrar todos los cambios importantes
   - Mantener historial de modificaciones
   - Log de quién creó/modificó cada registro

