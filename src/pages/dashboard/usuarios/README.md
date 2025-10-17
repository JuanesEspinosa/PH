# 👥 Módulo de Usuarios

## 📋 Descripción

Módulo CRUD completo con React Query, búsqueda con searchParams, y gestión avanzada de usuarios.

## 📂 Estructura

```
src/pages/dashboard/usuarios/
├── components/
│   ├── UsuarioForm.tsx
│   ├── UsuariosTable.tsx
│   └── DeleteConfirmDialog.tsx
├── hooks/
│   ├── useUsuarios.ts (legacy)
│   └── useUsuariosQuery.ts (React Query) ⭐
├── services/
│   └── usuariosService.ts
├── views/
│   ├── UsuariosListView.tsx
│   ├── UsuarioCreateView.tsx
│   ├── UsuarioEditView.tsx
│   └── UsuarioDetailView.tsx
├── README.md (este archivo)
├── API.md (especificaciones de API)
└── BACKEND.md (implementación backend)
```

## 🎯 Funcionalidades

- ✅ Lista con estadísticas
- ✅ Búsqueda con searchParams (mantiene estado en URL)
- ✅ Crear usuarios
- ✅ Editar usuarios
- ✅ Eliminar usuarios
- ✅ Ver detalles completos
- ✅ React Query con caché inteligente

## 🔧 Uso con React Query

### Listar Usuarios (con búsqueda)

```typescript
import { useUsuariosQuery, useUsuariosSearch } from '../hooks/useUsuariosQuery'

const { data: usuarios, isLoading } = useUsuariosQuery()
const { searchQuery, setSearch, clearSearch } = useUsuariosSearch()

// Búsqueda se refleja en URL: /usuarios?q=juan
setSearch('juan')
```

### Crear Usuario

```typescript
import { useCreateUsuarioMutation } from '../hooks/useUsuariosQuery'

const { mutate: createUsuario, isPending } = useCreateUsuarioMutation()

createUsuario({
  nombre: 'Juan Pérez',
  email: 'juan@example.com',
  password: '123456',
  rol: 'usuario'
})
```

### Actualizar Usuario

```typescript
import { useUpdateUsuarioMutation } from '../hooks/useUsuariosQuery'

const { mutate: updateUsuario, isPending } = useUpdateUsuarioMutation()

updateUsuario({
  id: '123',
  data: { nombre: 'Juan Pérez Actualizado' }
})
```

### Eliminar Usuario

```typescript
import { useDeleteUsuarioMutation } from '../hooks/useUsuariosQuery'

const { mutate: deleteUsuario, isPending } = useDeleteUsuarioMutation()

deleteUsuario('user-id-123')
```

### Ver Detalles

```typescript
import { useUsuarioQuery } from '../hooks/useUsuariosQuery'

const { data: usuario, isLoading } = useUsuarioQuery(id)
```

## 🔍 SearchParams

La búsqueda usa searchParams para mantener el estado en la URL:

```typescript
// URL: /dashboard/usuarios?q=juan
const { searchQuery, setSearch, clearSearch } = useUsuariosSearch()

// searchQuery = "juan"
// Se puede compartir la URL con búsqueda
// Al recargar página se mantiene la búsqueda
```

## ⚡ React Query Features

- **Caché automático** - Los datos se guardan en caché
- **Invalidación** - Se actualiza automáticamente al crear/editar/eliminar
- **Optimistic updates** - UI instantánea
- **Refetch** - Actualizar datos manualmente
- **Estados** - Loading, error, success automáticos

## 🔗 Más Documentación

- **[API.md](./API.md)** - Especificaciones completas de API
- **[BACKEND.md](./BACKEND.md)** - Implementación backend y schemas

---

**Ver documentación técnica completa en archivos adjuntos.**
