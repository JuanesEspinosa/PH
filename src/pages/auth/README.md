# 🔐 Módulo de Autenticación

## 📋 Descripción

Módulo completo de autenticación que maneja login, registro, recuperación de contraseña y gestión de sesiones con React Query.

## 📂 Estructura

```
src/pages/auth/
├── components/
│   ├── AuthFormCard.tsx
│   ├── LoginForm.tsx
│   ├── RegisterForm.tsx
│   └── ForgotPasswordForm.tsx
├── hooks/
│   ├── useAuth.ts (legacy)
│   └── useAuthQuery.ts (React Query) ⭐
├── services/
│   └── authService.ts
├── views/
│   ├── LoginView.tsx
│   ├── RegisterView.tsx
│   └── ForgotPasswordView.tsx
├── README.md (este archivo)
├── API.md (especificaciones de API)
└── BACKEND.md (implementación backend)
```

## 🎯 Funcionalidades

- ✅ Login con React Query
- ✅ Registro de usuarios
- ✅ Recuperación de contraseña
- ✅ Verificación de token
- ✅ Logout
- ✅ Manejo de caché con React Query
- ✅ Invalidación automática de queries

## 🔧 Uso con React Query

### Login

```typescript
import { useLoginMutation } from '@/pages/auth/hooks/useAuthQuery'

const { mutate: login, isPending } = useLoginMutation()

login({ email: 'user@example.com', password: '123456' })
```

### Registro

```typescript
import { useRegisterMutation } from '@/pages/auth/hooks/useAuthQuery'

const { mutate: register, isPending } = useRegisterMutation()

register({
  nombre: 'Juan Pérez',
  email: 'juan@example.com',
  password: '123456',
  confirmPassword: '123456'
})
```

### Verificar Token

```typescript
import { useVerifyToken } from '@/pages/auth/hooks/useAuthQuery'

const { data: user, isLoading, error } = useVerifyToken()
```

### Logout

```typescript
import { useLogoutMutation } from '@/pages/auth/hooks/useAuthQuery'

const { mutate: logout } = useLogoutMutation()

logout()
```

## 📊 React Query Features

### Caché Automático
- Los datos del usuario se guardan en caché
- Se invalidan automáticamente en logout
- Verificación de token con retry automático

### Optimistic Updates
- Updates instantáneos en UI
- Rollback automático en error

### Estados de Loading
- `isPending` - Durante la mutación
- `isLoading` - Durante la query
- `isError` - Si hay error
- `isSuccess` - Si fue exitoso

## 🔗 Más Documentación

- **[API.md](./API.md)** - Especificaciones completas de API
- **[BACKEND.md](./BACKEND.md)** - Implementación backend

## 🚀 Inicio Rápido

1. Importar hook
2. Usar en componente
3. Manejar estados

```typescript
function LoginForm() {
  const { mutate: login, isPending, isError } = useLoginMutation()

  const handleSubmit = (data) => {
    login(data)
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      <Button disabled={isPending}>
        {isPending ? 'Cargando...' : 'Iniciar sesión'}
      </Button>
      {isError && <Error />}
    </form>
  )
}
```

---

**Ver documentación completa de API y backend en archivos adjuntos.**
