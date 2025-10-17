# 🔌 API - Módulo de Autenticación

## Endpoints Requeridos

### 1. Login

**POST** `/api/auth/login`

**Request:**
```typescript
{
  email: string
  password: string
}
```

**Response:**
```typescript
{
  user: {
    id: string
    nombre: string
    email: string
    rol: 'admin' | 'usuario'
    avatar?: string
  },
  token: string
}
```

---

### 2. Registro

**POST** `/api/auth/register`

**Request:**
```typescript
{
  nombre: string
  email: string
  password: string
  // confirmPassword se valida en frontend
}
```

**Response:**
```typescript
{
  user: {
    id: string
    nombre: string
    email: string
    rol: 'usuario'
    avatar?: string
  },
  token: string
}
```

---

### 3. Recuperar Contraseña

**POST** `/api/auth/forgot-password`

**Request:**
```typescript
{
  email: string
}
```

**Response:**
```typescript
{
  message: string
}
```

---

### 4. Resetear Contraseña

**POST** `/api/auth/reset-password`

**Request:**
```typescript
{
  token: string
  password: string
}
```

**Response:**
```typescript
{
  message: string
}
```

---

### 5. Verificar Token

**GET** `/api/auth/verify`

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
  avatar?: string
}
```

---

### 6. Logout

**POST** `/api/auth/logout`

**Headers:**
```
Authorization: Bearer {token}
```

**Response:**
```typescript
{
  message: string
}
```

---

## Códigos de Error

| Código | Descripción |
|--------|-------------|
| 400 | Datos inválidos |
| 401 | Credenciales incorrectas |
| 404 | Usuario no encontrado |
| 409 | Email ya existe |
| 500 | Error del servidor |

---

## Validaciones Requeridas

### Login
- Email formato válido
- Contraseña requerida

### Registro
- Email único
- Contraseña mínimo 6 caracteres
- Nombre requerido

### Forgot Password
- Email debe existir en BD

### Reset Password
- Token válido y no expirado
- Contraseña mínimo 6 caracteres

---

Ver [BACKEND.md](./BACKEND.md) para código de implementación.

