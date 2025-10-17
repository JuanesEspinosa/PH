# 🏗️ Estructura Modular

Este documento explica la arquitectura modular implementada para el proyecto, siguiendo las mejores prácticas de organización de código.

## 📐 Filosofía de la Arquitectura

La aplicación está organizada en **módulos autocontenidos**. Cada módulo representa una funcionalidad completa del sistema (ej: Usuarios, Productos, Ventas, etc.) y contiene todos los recursos necesarios para funcionar de manera independiente.

### Ventajas de esta Arquitectura

✅ **Escalabilidad** - Fácil agregar nuevos módulos sin afectar los existentes  
✅ **Mantenibilidad** - Código organizado y fácil de encontrar  
✅ **Reutilización** - Components y hooks específicos del módulo  
✅ **Testabilidad** - Cada módulo puede testearse independientemente  
✅ **Colaboración** - Equipos pueden trabajar en módulos diferentes sin conflictos  

---

## 🗂️ Estructura de un Módulo

Cada módulo dentro de `src/pages/` sigue esta estructura:

```
src/pages/[nombre-modulo]/
├── components/        # Componentes específicos del módulo
│   ├── ComponenteA.tsx
│   └── ComponenteB.tsx
├── hooks/            # Hooks personalizados del módulo
│   └── useModulo.ts
├── views/            # Vistas/Páginas del módulo
│   ├── ListaView.tsx
│   ├── CreateView.tsx
│   ├── EditView.tsx
│   └── DetailView.tsx
└── services/         # Servicios y llamadas API del módulo
    └── moduloService.ts
```

### 📁 Descripción de Carpetas

#### `components/`
Componentes React **exclusivos** de este módulo. No se usan en otros módulos.

**Ejemplos:**
- Formularios específicos
- Tablas personalizadas
- Diálogos de confirmación
- Cards especializadas

**Cuándo crear aquí:**
- El componente solo se usa en este módulo
- Tiene lógica muy específica del dominio

**Cuándo NO crear aquí:**
- Es un componente genérico (va en `src/components/ui/`)
- Se usa en múltiples módulos (va en `src/components/shared/`)

#### `hooks/`
Custom hooks específicos del módulo para manejar lógica de negocio.

**Ejemplos:**
- `useUsuarios()` - Obtener lista de usuarios
- `useCreateUsuario()` - Crear usuario
- `useDeleteUsuario()` - Eliminar usuario

**Ventajas:**
- Separa lógica de UI
- Reutilizable en diferentes vistas del módulo
- Facilita testing

#### `views/`
Componentes que representan páginas completas del módulo.

**Convención de nombres:**
- `[Entidad]ListView.tsx` - Lista/Tabla
- `[Entidad]CreateView.tsx` - Crear nuevo
- `[Entidad]EditView.tsx` - Editar existente
- `[Entidad]DetailView.tsx` - Ver detalles

**Responsabilidades:**
- Composición de componentes
- Manejo de navegación
- Coordinación de hooks
- Layout específico de la vista

#### `services/`
Funciones para comunicación con el backend (API).

**Responsabilidades:**
- Definir tipos/interfaces
- Llamadas HTTP (GET, POST, PUT, DELETE)
- Transformación de datos
- Manejo de errores de red

**Patrón:**
```typescript
export const moduloService = {
  getAll(): Promise<Entidad[]>
  getById(id: string): Promise<Entidad>
  create(data: CreateDto): Promise<Entidad>
  update(id: string, data: UpdateDto): Promise<Entidad>
  delete(id: string): Promise<void>
}
```

---

## 📝 Ejemplo Completo: Módulo de Usuarios

### Estructura

```
src/pages/usuarios/
├── components/
│   ├── UsuarioForm.tsx           # Formulario reutilizable
│   ├── UsuariosTable.tsx         # Tabla de usuarios
│   └── DeleteConfirmDialog.tsx   # Diálogo de confirmación
├── hooks/
│   └── useUsuarios.ts            # Hooks del módulo
├── views/
│   ├── UsuariosListView.tsx      # Lista de usuarios
│   ├── UsuarioCreateView.tsx     # Crear usuario
│   ├── UsuarioEditView.tsx       # Editar usuario
│   └── UsuarioDetailView.tsx     # Ver detalles
└── services/
    └── usuariosService.ts        # API del módulo
```

### Flujo de Datos

```
Vista (View)
    ↓
  Hook
    ↓
  Service
    ↓
   API
```

### Ejemplo de Uso

```typescript
// En UsuariosListView.tsx
import { useUsuarios } from '../hooks/useUsuarios'
import UsuariosTable from '../components/UsuariosTable'

export default function UsuariosListView() {
  const { usuarios, loading, refreshUsuarios } = useUsuarios()

  return (
    <div>
      <UsuariosTable usuarios={usuarios} loading={loading} />
      <button onClick={refreshUsuarios}>Actualizar</button>
    </div>
  )
}
```

---

## 🔌 Integración con el Sistema

### Rutas en App.tsx

```typescript
// src/App.tsx
import UsuariosListView from '@/pages/usuarios/views/UsuariosListView'
import UsuarioCreateView from '@/pages/usuarios/views/UsuarioCreateView'
import UsuarioEditView from '@/pages/usuarios/views/UsuarioEditView'
import UsuarioDetailView from '@/pages/usuarios/views/UsuarioDetailView'

// En Routes
<Route path="usuarios" element={<UsuariosListView />} />
<Route path="usuarios/nuevo" element={<UsuarioCreateView />} />
<Route path="usuarios/:id" element={<UsuarioDetailView />} />
<Route path="usuarios/:id/editar" element={<UsuarioEditView />} />
```

### Navegación entre Vistas

```typescript
import { useNavigate, Link } from 'react-router-dom'

// Programática
const navigate = useNavigate()
navigate('/dashboard/usuarios')

// Declarativa
<Link to="/dashboard/usuarios/nuevo">Crear Usuario</Link>
```

---

## 🛠️ Crear un Nuevo Módulo

### Paso 1: Crear Estructura de Carpetas

```bash
mkdir -p src/pages/productos/components
mkdir -p src/pages/productos/hooks
mkdir -p src/pages/productos/views
mkdir -p src/pages/productos/services
```

### Paso 2: Crear Service

```typescript
// src/pages/productos/services/productosService.ts
export interface Producto {
  id: string
  nombre: string
  precio: number
}

export const productosService = {
  async getAll(): Promise<Producto[]> {
    // Implementación
  }
  // ... más métodos
}
```

### Paso 3: Crear Hooks

```typescript
// src/pages/productos/hooks/useProductos.ts
import { useState, useEffect } from 'react'
import { productosService, Producto } from '../services/productosService'

export function useProductos() {
  const [productos, setProductos] = useState<Producto[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProductos = async () => {
      setLoading(true)
      const data = await productosService.getAll()
      setProductos(data)
      setLoading(false)
    }
    fetchProductos()
  }, [])

  return { productos, loading }
}
```

### Paso 4: Crear Componentes

```typescript
// src/pages/productos/components/ProductoForm.tsx
export default function ProductoForm({ onSubmit }) {
  // Implementación del formulario
}
```

### Paso 5: Crear Views

```typescript
// src/pages/productos/views/ProductosListView.tsx
import { useProductos } from '../hooks/useProductos'

export default function ProductosListView() {
  const { productos, loading } = useProductos()
  
  return (
    <div>
      <h1>Productos</h1>
      {/* UI del listado */}
    </div>
  )
}
```

### Paso 6: Agregar Rutas

```typescript
// src/App.tsx
import ProductosListView from '@/pages/productos/views/ProductosListView'

// En Routes
<Route path="productos" element={<ProductosListView />} />
```

### Paso 7: Actualizar Navegación

```typescript
// src/components/layouts/DashboardLayout.tsx
const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Usuarios', href: '/dashboard/usuarios', icon: Users },
  { name: 'Productos', href: '/dashboard/productos', icon: Package }, // Nuevo
]
```

---

## 📚 Mejores Prácticas

### ✅ DO - Haz esto

1. **Mantén los módulos independientes**
   ```typescript
   // ✅ Correcto
   import { useUsuarios } from '../hooks/useUsuarios'
   
   // ❌ Incorrecto - no importes de otros módulos
   import { useProductos } from '../../productos/hooks/useProductos'
   ```

2. **Usa nombres descriptivos**
   ```typescript
   // ✅ Correcto
   UsuarioCreateView.tsx
   useCreateUsuario.ts
   UsuarioForm.tsx
   
   // ❌ Incorrecto
   Create.tsx
   useCreate.ts
   Form.tsx
   ```

3. **Separa lógica de UI**
   ```typescript
   // ✅ Correcto - Hook con lógica
   export function useUsuarios() {
     const [usuarios, setUsuarios] = useState([])
     // ... lógica
     return { usuarios }
   }
   
   // Vista solo renderiza
   export default function UsuariosListView() {
     const { usuarios } = useUsuarios()
     return <UsuariosTable usuarios={usuarios} />
   }
   ```

4. **Componentes pequeños y enfocados**
   ```typescript
   // ✅ Correcto
   <UsuarioForm />
   <UsuariosTable />
   <DeleteConfirmDialog />
   
   // ❌ Incorrecto - un componente gigante con todo
   <UsuariosGrandeConTodo />
   ```

### ❌ DON'T - Evita esto

1. **No mezcles responsabilidades**
   ```typescript
   // ❌ Service haciendo renderizado
   export const usuariosService = {
     render() { return <div>Usuario</div> }
   }
   ```

2. **No hagas componentes mega-generales en módulos**
   ```typescript
   // ❌ Si es genérico, va en src/components/ui/
   // No en src/pages/usuarios/components/
   export default function GenericTable() { }
   ```

3. **No dupliques código entre módulos**
   ```typescript
   // ❌ Si dos módulos usan lo mismo, créalo en shared
   // No copies y pegues el mismo código
   ```

---

## 🔄 Migrando Código Existente

Si tienes código en la estructura antigua:

```
src/pages/
├── UsersPage.tsx         ← Antigua
└── ProductsPage.tsx      ← Antigua
```

Migrarlo a:

```
src/pages/
├── usuarios/
│   └── views/
│       └── UsuariosListView.tsx  ← Nueva
└── productos/
    └── views/
        └── ProductosListView.tsx ← Nueva
```

---

## 📊 Comparación de Estructuras

### Estructura Antigua (Flat)

```
❌ Problemas:
- Difícil encontrar archivos relacionados
- Componentes mezclados sin organización
- Hooks dispersos por todo el proyecto
- Difícil escalar
```

```
src/
├── pages/
│   ├── UsersPage.tsx
│   ├── ProductsPage.tsx
│   └── OrdersPage.tsx
├── components/
│   ├── UserForm.tsx
│   ├── UserTable.tsx
│   ├── ProductCard.tsx
│   └── ... (todo mezclado)
└── hooks/
    └── ... (todos juntos)
```

### Estructura Nueva (Modular)

```
✅ Ventajas:
- Todo relacionado está junto
- Fácil encontrar código
- Módulos independientes
- Escalable infinitamente
```

```
src/
└── pages/
    ├── usuarios/
    │   ├── components/
    │   ├── hooks/
    │   ├── views/
    │   └── services/
    ├── productos/
    │   ├── components/
    │   ├── hooks/
    │   ├── views/
    │   └── services/
    └── ordenes/
        ├── components/
        ├── hooks/
        ├── views/
        └── services/
```

---

## 🎯 Conclusión

Esta arquitectura modular:

- 📦 **Organiza** el código de forma lógica
- 🚀 **Escala** sin problemas
- 🔧 **Facilita** el mantenimiento
- 👥 **Mejora** la colaboración en equipo
- ✅ **Sigue** las mejores prácticas de React

### Próximos Pasos

1. Revisa el módulo de usuarios como ejemplo
2. Crea tu primer módulo nuevo
3. Migra código existente gradualmente
4. Comparte esta estructura con tu equipo

---

**¿Preguntas?** Revisa el código del módulo de usuarios en `src/pages/usuarios/` como referencia completa.


