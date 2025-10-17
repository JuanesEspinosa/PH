# 🔌 API - Módulo de Usuarios

## Endpoints Requeridos

### 1. Listar Usuarios

**GET** `/api/usuarios`

**Query Params:**
```typescript
?q=juan          // Búsqueda (opcional)
?page=1          // Paginación (opcional)
?limit=10        // Límite por página (opcional)
?rol=admin       // Filtro por rol (opcional)
?estado=activo   // Filtro por estado (opcional)
```

**Headers:**
```
Authorization: Bearer {token}
```

**Response:**
```typescript
[
  {
    id: string
    nombre: string
    email: string
    rol: 'admin' | 'usuario'
    estado: 'activo' | 'inactivo'
    departamento?: string
    telefono?: string
    avatar?: string
    fechaCreacion: string // ISO 8601
    ultimoAcceso?: string // ISO 8601
  },
  // ...
]
```

---

### 2. Obtener Usuario por ID

**GET** `/api/usuarios/:id`

**Headers:**
```
Authorization: Bearer {token}
```

**Response:**
```typescript
{
  id: string
  nombre: string
  email: string
  rol: 'admin' | 'usuario'
  estado: 'activo' | 'inactivo'
  departamento?: string
  telefono?: string
  avatar?: string
  fechaCreacion: string
  ultimoAcceso?: string
}
```

---

### 3. Crear Usuario

**POST** `/api/usuarios`

**Headers:**
```
Authorization: Bearer {token}
```

**Request:**
```typescript
{
  nombre: string         // Requerido
  email: string          // Requerido, único
  password: string       // Requerido, min 6 caracteres
  rol: 'admin' | 'usuario'  // Requerido
  estado?: 'activo' | 'inactivo'  // Default: activo
  departamento?: string
  telefono?: string
  avatar?: string
}
```

**Response:**
```typescript
{
  id: string
  nombre: string
  email: string
  rol: 'admin' | 'usuario'
  estado: 'activo' | 'inactivo'
  departamento?: string
  telefono?: string
  avatar?: string
  fechaCreacion: string
}
```

---

### 4. Actualizar Usuario

**PUT** `/api/usuarios/:id` o **PATCH** `/api/usuarios/:id`

**Headers:**
```
Authorization: Bearer {token}
```

**Request:**
```typescript
{
  nombre?: string
  email?: string          // Debe ser único
  password?: string       // Si se envía, se actualiza
  rol?: 'admin' | 'usuario'
  estado?: 'activo' | 'inactivo'
  departamento?: string
  telefono?: string
  avatar?: string
}
```

**Response:**
```typescript
{
  id: string
  nombre: string
  email: string
  rol: 'admin' | 'usuario'
  estado: 'activo' | 'inactivo'
  departamento?: string
  telefono?: string
  avatar?: string
  fechaCreacion: string
  ultimoAcceso?: string
}
```

---

### 5. Eliminar Usuario

**DELETE** `/api/usuarios/:id`

**Headers:**
```
Authorization: Bearer {token}
```

**Response:**
```typescript
{
  message: string
  id: string
}
```

---

### 6. Buscar Usuarios

**GET** `/api/usuarios/search`

**Query Params:**
```typescript
?q=juan  // Búsqueda en nombre, email, departamento
```

**Headers:**
```
Authorization: Bearer {token}
```

**Response:**
```typescript
[
  {
    id: string
    nombre: string
    email: string
    rol: 'admin' | 'usuario'
    estado: 'activo' | 'inactivo'
    departamento?: string
    telefono?: string
    avatar?: string
    fechaCreacion: string
  },
  // ...
]
```

---

## Códigos de Error

| Código | Descripción |
|--------|-------------|
| 400 | Datos inválidos |
| 401 | No autenticado |
| 403 | Sin permisos |
| 404 | Usuario no encontrado |
| 409 | Email ya existe |
| 500 | Error del servidor |

---

## Permisos Requeridos

| Endpoint | Admin | Usuario |
|----------|-------|---------|
| GET /usuarios | ✅ | ✅ |
| GET /usuarios/:id | ✅ | ✅ (solo propio) |
| POST /usuarios | ✅ | ❌ |
| PUT /usuarios/:id | ✅ | ✅ (solo propio) |
| DELETE /usuarios/:id | ✅ | ❌ |

---

Ver [BACKEND.md](./BACKEND.md) para implementación.

